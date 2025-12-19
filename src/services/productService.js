import { supabase, isSupabaseEnabled } from '../lib/supabase';

/**
 * Product Service
 * Supabase와 연동하여 제품 데이터를 관리하는 서비스
 */

/**
 * Promise에 타임아웃을 적용하는 헬퍼 함수
 * Supabase 요청이 hang되는 경우를 방지
 * @param {Promise} promise - 원본 Promise
 * @param {number} ms - 타임아웃 밀리초
 * @param {string} operation - 작업 이름 (로깅용)
 * @returns {Promise}
 */
const withTimeout = (promise, ms = 15000, operation = 'Operation') => {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`${operation} timeout after ${ms}ms`));
      }, ms);
    }),
  ]);
};

/**
 * 모든 제품 타입 조회
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export const getProductTypes = async () => {
  if (!isSupabaseEnabled()) {
    return { data: [], error: new Error('Supabase is not enabled') };
  }

  const { data, error } = await supabase
    .from('product_types')
    .select('*')
    .order('sort_order', { ascending: true });

  return { data, error };
};

/**
 * 모든 제품 옵션 조회 (카테고리별)
 * @param {string} category - 'glass_finish' | 'hardware' | 'height'
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export const getProductOptions = async (category = null) => {
  if (!isSupabaseEnabled()) {
    return { data: [], error: new Error('Supabase is not enabled') };
  }

  let query = supabase
    .from('product_options')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  return { data, error };
};

/**
 * 제품 목록 조회 (View 사용)
 * @param {Object} options - 조회 옵션
 * @param {string} options.typeValue - 제품 타입 필터 (ceiling, stand, wall, desk)
 * @param {boolean} options.isActive - 활성화 상태 필터
 * @param {string} options.search - 검색어 (제목)
 * @param {number} options.page - 페이지 번호 (1부터 시작)
 * @param {number} options.limit - 페이지당 항목 수
 * @param {string} options.sortBy - 정렬 기준 컬럼
 * @param {boolean} options.ascending - 오름차순 여부
 * @param {AbortSignal} options.signal - AbortController signal (optional)
 * @returns {Promise<{data: Array, count: number, error: Error|null}>}
 */
export const getProducts = async ({
  typeValue = null,
  isActive = true,
  search = '',
  page = 1,
  limit = 10,
  sortBy = 'sort_order',
  ascending = true,
  signal = null,
} = {}) => {
  console.log('[productService] getProducts called, isSupabaseEnabled:', isSupabaseEnabled());
  console.log('[productService] supabase client:', supabase ? 'exists' : 'NULL');
  if (!isSupabaseEnabled()) {
    console.warn('[productService] Supabase is not enabled, returning empty array');
    return { data: [], count: 0, error: new Error('Supabase is not enabled') };
  }

  // 요청 전 취소 확인
  if (signal?.aborted) {
    return { data: [], count: 0, error: new Error('Request aborted') };
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // count 옵션은 페이지네이션이 필요한 경우에만 사용 (성능 이슈)
  let query = supabase
    .from('products_with_type')
    .select('*');

  // 활성화 상태 필터
  if (isActive !== null) {
    query = query.eq('is_active', isActive);
  }

  // 타입 필터
  if (typeValue) {
    query = query.eq('type_value', typeValue);
  }

  // 검색어 필터
  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  // 정렬 및 페이지네이션
  query = query
    .order(sortBy, { ascending })
    .range(from, to);

  // AbortSignal 전달
  if (signal) {
    query = query.abortSignal(signal);
  }

  try {
    console.log('[productService] Executing query...');
    const result = await query;
    console.log('[productService] Query completed:', { dataLength: result.data?.length, error: result.error?.message });
    return { data: result.data, count: result.data?.length || 0, error: result.error };
  } catch (err) {
    console.error('[productService] Query error:', err);
    return { data: [], count: 0, error: err };
  }
};

/**
 * 단일 제품 조회
 * @param {string} id - 제품 UUID
 * @param {AbortSignal} signal - AbortController signal (optional)
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getProductById = async (id, signal = null) => {
  if (!isSupabaseEnabled()) {
    return { data: null, error: new Error('Supabase is not enabled') };
  }

  // 요청 전 취소 확인
  if (signal?.aborted) {
    return { data: null, error: new Error('Request aborted') };
  }

  let query = supabase
    .from('products_with_type')
    .select('*')
    .eq('id', id)
    .single();

  // AbortSignal 전달
  if (signal) {
    query = query.abortSignal(signal);
  }

  try {
    const { data, error } = await withTimeout(query, 8000, 'getProductById');
    return { data, error };
  } catch (timeoutError) {
    console.error('[productService] getProductById timeout:', timeoutError.message);
    return { data: null, error: timeoutError };
  }
};

/**
 * 제품 생성 (Admin 권한 필요)
 * @param {Object} product - 제품 데이터
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createProduct = async (product) => {
  if (!isSupabaseEnabled()) {
    return { data: null, error: new Error('Supabase is not enabled') };
  }

  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  return { data, error };
};

/**
 * 제품 수정 (Admin 권한 필요)
 * @param {string} id - 제품 UUID
 * @param {Object} updates - 수정할 데이터
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateProduct = async (id, updates) => {
  if (!isSupabaseEnabled()) {
    return { data: null, error: new Error('Supabase is not enabled') };
  }

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

/**
 * 제품 삭제 (Soft delete - is_active = false)
 * @param {string} id - 제품 UUID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const deleteProduct = async (id) => {
  return updateProduct(id, { is_active: false });
};

/**
 * 제품 이미지 업로드
 * @param {File} file - 이미지 파일
 * @param {string} productId - 제품 UUID
 * @param {'day'|'night'} type - 이미지 타입
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export const uploadProductImage = async (file, productId, type) => {
  if (!isSupabaseEnabled()) {
    return { url: null, error: new Error('Supabase is not enabled') };
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${type}/${productId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    return { url: null, error: uploadError };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return { url: publicUrl, error: null };
};

/**
 * 제품 비디오 업로드
 * @param {File} file - 비디오 파일
 * @param {string} productId - 제품 UUID
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export const uploadProductVideo = async (file, productId) => {
  if (!isSupabaseEnabled()) {
    return { url: null, error: new Error('Supabase is not enabled') };
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${productId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('product-videos')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    return { url: null, error: uploadError };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('product-videos')
    .getPublicUrl(filePath);

  return { url: publicUrl, error: null };
};

/**
 * 로컬 제품 데이터 일괄 업로드 (Admin 권한 필요)
 * products.js의 데이터를 Supabase에 일괄 등록
 *
 * @param {Array} localProducts - 로컬 제품 데이터 배열
 * @param {Array} productTypes - product_types 테이블 데이터 (value → id 매핑용)
 * @returns {Promise<{success: number, failed: number, errors: Array}>}
 */
export const bulkUploadProducts = async (localProducts, productTypes) => {
  if (!isSupabaseEnabled()) {
    return { success: 0, failed: 0, errors: [new Error('Supabase is not enabled')] };
  }

  // type value → type id 매핑 생성
  const typeMap = {};
  productTypes.forEach((type) => {
    typeMap[type.value] = type.id;
  });

  const results = { success: 0, failed: 0, errors: [] };

  for (const product of localProducts) {
    try {
      // 로컬 데이터를 Supabase 스키마에 맞게 변환
      const supabaseProduct = {
        title: product.title,
        description: product.description || '',
        type_id: typeMap[product.type] || null,
        lux: product.lux || 0,
        kelvin: product.kelvin || 0,
        price: product.price || null,
        day_image_url: product.images?.[0] || null,
        night_image_url: product.images?.[1] || null,
        video_url: product.video || null,
        is_active: true,
        sort_order: product.id || results.success + 1,
      };

      const { error } = await supabase
        .from('products')
        .insert(supabaseProduct);

      if (error) {
        results.failed++;
        results.errors.push({ product: product.title, error: error.message });
      } else {
        results.success++;
      }
    } catch (err) {
      results.failed++;
      results.errors.push({ product: product.title, error: err.message });
    }
  }

  return results;
};

export default {
  getProductTypes,
  getProductOptions,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  uploadProductVideo,
  bulkUploadProducts,
};
