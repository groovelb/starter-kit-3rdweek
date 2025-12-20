import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { isSupabaseEnabled, supabase } from '../lib/supabase';
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
  // 로컬 데이터를 초기값으로 설정하여 즉시 렌더링 가능
  const [products, setProducts] = useState(localProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchAttemptRef = useRef(0);
  const isMountedRef = useRef(true);

  /**
   * 제품 데이터 로드
   * Supabase에서 활성화된 제품만 가져와서 변환
   * Supabase 비활성화 시 로컬 데이터 즉시 반환
   */
  const loadProducts = useCallback(async () => {
    const attemptId = ++fetchAttemptRef.current;
    console.log(`[ProductContext] Attempt #${attemptId} - Starting product fetch...`);

    // Supabase 비활성화 시 로컬 데이터 즉시 반환
    if (!isSupabaseEnabled()) {
      console.log('[ProductContext] Supabase not enabled, using local data');
      if (isMountedRef.current) {
        setProducts(localProducts);
        setIsLoading(false);
        setError(null);
      }
      return;
    }

    if (isMountedRef.current) {
      setIsLoading(true);
      setError(null);
    }

    try {
      // 직접 Supabase 쿼리 실행 (productService 우회)
      console.log('[ProductContext] Executing Supabase query directly...');

      const { data, error: fetchError } = await supabase
        .from('products_with_type')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(100);

      // 이 요청이 최신 요청인지 확인 (이전 요청 무시)
      if (attemptId !== fetchAttemptRef.current) {
        console.log(`[ProductContext] Attempt #${attemptId} is stale, ignoring result`);
        return;
      }

      // 컴포넌트가 언마운트됐으면 상태 업데이트 하지 않음
      if (!isMountedRef.current) {
        console.log('[ProductContext] Component unmounted, skipping state update');
        return;
      }

      console.log('[ProductContext] Query completed:', {
        dataLength: data?.length,
        error: fetchError?.message,
      });

      if (fetchError) {
        console.error('[ProductContext] Fetch error:', fetchError);
        setError(fetchError.message || 'Failed to load products');
        // 에러 시 로컬 데이터 유지 (이미 초기값으로 설정됨)
        console.log('[ProductContext] Keeping local data due to error');
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
        // 빈 데이터인 경우 로컬 데이터 유지
        console.log('[ProductContext] Empty data from Supabase, keeping local data');
      }
    } catch (err) {
      // 이 요청이 최신 요청인지 확인
      if (attemptId !== fetchAttemptRef.current || !isMountedRef.current) {
        return;
      }

      console.error('[ProductContext] Unexpected error:', err);
      setError(err?.message || 'Unexpected error');
      // 에러 시 로컬 데이터 유지 (이미 초기값으로 설정됨)
      console.log('[ProductContext] Keeping local data due to error');
    } finally {
      if (attemptId === fetchAttemptRef.current && isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  /**
   * 최초 마운트 시 제품 데이터 로드
   */
  useEffect(() => {
    isMountedRef.current = true;
    loadProducts();

    return () => {
      isMountedRef.current = false;
    };
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
   * 강제 refetch
   */
  const refetch = useCallback(() => {
    return loadProducts();
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
