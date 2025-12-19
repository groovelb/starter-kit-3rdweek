import { supabase, isSupabaseEnabled } from '../lib/supabase';

/**
 * Option Service
 * Supabase와 연동하여 제품 옵션 데이터를 관리하는 서비스
 */

/**
 * 카테고리별 옵션 조회
 * @param {string} category - 'glass_finish' | 'hardware' | 'height'
 * @param {boolean} includeInactive - 비활성 옵션 포함 여부 (Admin용)
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export const getOptionsByCategory = async (category, includeInactive = false) => {
  if (!isSupabaseEnabled()) {
    return { data: [], error: new Error('Supabase is not enabled') };
  }

  let query = supabase
    .from('product_options')
    .select('*')
    .eq('category', category)
    .order('sort_order', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;
  return { data, error };
};

/**
 * 모든 옵션 조회 (카테고리별로 그룹화)
 * @param {boolean} includeInactive - 비활성 옵션 포함 여부
 * @returns {Promise<{data: Object, error: Error|null}>}
 */
export const getAllOptions = async (includeInactive = false) => {
  if (!isSupabaseEnabled()) {
    return { data: {}, error: new Error('Supabase is not enabled') };
  }

  let query = supabase
    .from('product_options')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    return { data: {}, error };
  }

  // 카테고리별로 그룹화
  const grouped = {
    glass_finish: [],
    hardware: [],
    height: [],
  };

  data?.forEach(option => {
    if (grouped[option.category]) {
      grouped[option.category].push(option);
    }
  });

  return { data: grouped, error: null };
};

/**
 * 옵션 생성 (Admin 권한 필요)
 * @param {Object} option - 옵션 데이터
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createOption = async (option) => {
  if (!isSupabaseEnabled()) {
    return { data: null, error: new Error('Supabase is not enabled') };
  }

  const { data, error } = await supabase
    .from('product_options')
    .insert(option)
    .select()
    .single();

  return { data, error };
};

/**
 * 옵션 수정 (Admin 권한 필요)
 * @param {string} id - 옵션 UUID
 * @param {Object} updates - 수정할 데이터
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateOption = async (id, updates) => {
  if (!isSupabaseEnabled()) {
    return { data: null, error: new Error('Supabase is not enabled') };
  }

  const { data, error } = await supabase
    .from('product_options')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};

/**
 * 옵션 삭제 (Soft delete - is_active = false)
 * @param {string} id - 옵션 UUID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const deleteOption = async (id) => {
  return updateOption(id, { is_active: false });
};

/**
 * 옵션 순서 변경 (Admin 권한 필요)
 * @param {string} category - 카테고리
 * @param {Array<{id: string, sort_order: number}>} orderUpdates - 순서 업데이트 배열
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export const reorderOptions = async (category, orderUpdates) => {
  if (!isSupabaseEnabled()) {
    return { success: false, error: new Error('Supabase is not enabled') };
  }

  // 각 옵션의 순서 업데이트
  const promises = orderUpdates.map(({ id, sort_order }) =>
    supabase
      .from('product_options')
      .update({ sort_order })
      .eq('id', id)
      .eq('category', category)
  );

  try {
    await Promise.all(promises);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};

export default {
  getOptionsByCategory,
  getAllOptions,
  createOption,
  updateOption,
  deleteOption,
  reorderOptions,
};
