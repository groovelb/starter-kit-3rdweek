import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { isSupabaseEnabled } from '../lib/supabase';
import { getProducts } from '../services/productService';
import { products as localProducts } from '../data/products';

/**
 * ProductContext
 * 제품 데이터를 전역으로 관리하는 컨텍스트
 *
 * 동작 방식:
 * 1. 앱 시작 시 전체 제품 데이터를 1회 로드
 * 2. Context에 캐싱하여 모든 컴포넌트에서 재사용
 * 3. 세션 유지되는 동안 재호출 없음
 * 4. Supabase 비활성화 시 로컬 데이터 즉시 반환
 *
 * 사용처:
 * - ProductShowcase: 전체 제품 목록 표시
 * - ProductDetailRoute: ID로 단일 제품 조회
 */

const ProductContext = createContext(null);

/**
 * ProductProvider
 *
 * Props:
 * @param {ReactNode} children - 자식 컴포넌트 [Required]
 *
 * 제공하는 값:
 * - products: 전체 제품 목록 (변환된 형식)
 * - isLoading: 로딩 상태
 * - error: 에러 메시지
 * - getProductById: ID로 제품 조회하는 헬퍼 함수
 * - refetch: 데이터 새로고침 함수 (필요시)
 */
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedRef = useRef(false);

  /**
   * 제품 데이터 로드
   * Supabase에서 활성화된 제품만 가져와서 변환
   * Supabase 비활성화 시 로컬 데이터 즉시 반환
   */
  const loadProducts = useCallback(async (force = false) => {
    // 이미 fetch 완료된 경우 재호출 방지 (force가 아닌 경우)
    if (hasFetchedRef.current && !force) {
      console.log('[ProductContext] Already fetched, skip');
      return;
    }

    hasFetchedRef.current = true;
    console.log('[ProductContext] Starting product fetch...');
    setIsLoading(true);
    setError(null);

    // Supabase 비활성화 시 로컬 데이터 즉시 반환
    if (!isSupabaseEnabled()) {
      console.log('[ProductContext] Supabase not enabled, using local data');
      setProducts(localProducts);
      setIsLoading(false);
      return;
    }

    // 타임아웃 Promise (5초) - AbortController 대신 Promise.race 사용
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Supabase request timeout (5s)')), 5000);
    });

    try {
      // Supabase 요청과 타임아웃 경쟁
      const { data, error: fetchError } = await Promise.race([
        getProducts({
          isActive: true,
          sortBy: 'sort_order',
          ascending: true,
          limit: 100,
        }),
        timeoutPromise,
      ]);

      console.log('[ProductContext] getProducts returned:', { dataLength: data?.length, error: fetchError?.message });

      if (fetchError) {
        console.error('[ProductContext] Fetch error:', fetchError);
        setError(fetchError?.message || 'Failed to load products');
        // 에러 시 로컬 데이터로 fallback
        console.log('[ProductContext] Falling back to local data');
        setProducts(localProducts);
      } else if (data && data.length > 0) {
        console.log('[ProductContext] Fetch success, products:', data.length);
        // Supabase 데이터를 컴포넌트 형식으로 변환
        const transformedProducts = data.map((product) => ({
          id: product.id,
          title: product.title,
          type: product.type_value,
          lux: product.lux,
          kelvin: product.kelvin,
          images: [product.day_image_url, product.night_image_url].filter(Boolean),
          video: product.video_url,
          price: product.price || 1290,
          description: product.description,
        }));
        setProducts(transformedProducts);
        setError(null);
      } else {
        // 빈 데이터인 경우 로컬 fallback
        console.log('[ProductContext] Empty data, using local data');
        setProducts(localProducts);
      }
    } catch (err) {
      console.error('[ProductContext] Unexpected error:', err);
      setError(err?.message || 'Unexpected error');
      // 에러 시 로컬 데이터로 fallback
      console.log('[ProductContext] Falling back to local data');
      setProducts(localProducts);
    } finally {
      setIsLoading(false);
    }
  }, []); // 의존성 제거 - 최초 1회만 실행

  /**
   * 최초 마운트 시 제품 데이터 로드
   */
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /**
   * ID로 제품 조회
   * @param {string|number} id - 제품 UUID 또는 숫자 ID
   * @returns {Object|null} 제품 데이터 또는 null
   */
  const getProductById = useCallback(
    (id) => {
      // 문자열과 숫자 ID 모두 지원 (로컬 데이터는 숫자, Supabase는 UUID)
      return products.find((product) =>
        String(product.id) === String(id)
      ) || null;
    },
    [products]
  );

  /**
   * 강제 refetch (force = true)
   */
  const refetch = useCallback(() => {
    hasFetchedRef.current = false;
    return loadProducts(true);
  }, [loadProducts]);

  const value = {
    products,
    isLoading,
    error,
    getProductById,
    refetch,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

/**
 * useProduct Hook
 * @returns {Object} ProductContext 값
 */
export function useProduct() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return context;
}

export default ProductContext;
