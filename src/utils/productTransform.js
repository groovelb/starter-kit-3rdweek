/**
 * Product Transform Utilities
 *
 * Supabase 데이터와 로컬 컴포넌트 간의 데이터 변환 유틸리티
 */

/**
 * Supabase 제품 데이터를 기존 컴포넌트 호환 형식으로 변환
 *
 * Supabase 스키마:
 * - id: UUID
 * - type_value: string (products_with_type view에서 JOIN)
 * - day_image_url, night_image_url: Storage URL
 * - video_url: Storage URL
 *
 * 컴포넌트 기대 형식:
 * - id: any
 * - type: string
 * - images: [dayImage, nightImage]
 * - video: string
 *
 * @param {Object} product - Supabase products_with_type 데이터
 * @returns {Object} ProductCard 호환 형식
 */
export function transformSupabaseProduct(product) {
  if (!product) return null;

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    type: product.type_value || '', // type_value → type
    lux: product.lux,
    kelvin: product.kelvin,
    price: product.price,
    images: [product.day_image_url, product.night_image_url].filter(Boolean),
    video: product.video_url || null,
    isActive: product.is_active,
    sortOrder: product.sort_order,
    // 원본 데이터 보존 (필요 시 접근용)
    _raw: product,
  };
}

/**
 * Supabase 제품 배열을 컴포넌트 호환 형식으로 일괄 변환
 *
 * @param {Array} products - Supabase products_with_type 배열
 * @returns {Array} ProductCard 호환 형식 배열
 */
export function transformSupabaseProducts(products) {
  if (!Array.isArray(products)) return [];
  return products.map(transformSupabaseProduct).filter(Boolean);
}

/**
 * 로컬 제품 데이터 형식 확인 (이미 호환 형식인지)
 *
 * @param {Object} product - 제품 데이터
 * @returns {boolean} 로컬 형식 여부
 */
export function isLocalProductFormat(product) {
  return product && Array.isArray(product.images) && typeof product.type === 'string';
}

/**
 * 데이터 소스에 관계없이 통일된 형식으로 변환
 *
 * @param {Object} product - 제품 데이터 (Supabase 또는 로컬)
 * @returns {Object} 통일된 형식
 */
export function normalizeProduct(product) {
  if (!product) return null;

  // 이미 로컬 형식이면 그대로 반환
  if (isLocalProductFormat(product)) {
    return product;
  }

  // Supabase 형식이면 변환
  return transformSupabaseProduct(product);
}

export default {
  transformSupabaseProduct,
  transformSupabaseProducts,
  isLocalProductFormat,
  normalizeProduct,
};
