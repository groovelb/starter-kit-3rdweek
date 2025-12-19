import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { getProducts } from '../services/productService';

/**
 * ProductContext
 * 제품 데이터를 전역으로 관리하는 컨텍스트
 *
 * 동작 방식:
 * 1. 앱 시작 시 전체 제품 데이터를 1회 로드
 * 2. Context에 캐싱하여 모든 컴포넌트에서 재사용
 * 3. 세션 유지되는 동안 재호출 없음
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
  const fetchingRef = useRef(false);

  /**
   * 제품 데이터 로드
   * Supabase에서 활성화된 제품만 가져와서 변환
   */
  const loadProducts = useCallback(async () => {
    // 이미 데이터가 있으면 재호출 방지
    if (products.length > 0) {
      console.log('[ProductContext] Already has products, skip');
      setIsLoading(false);
      return;
    }

    // Strict Mode 중복 호출 방지
    if (fetchingRef.current) {
      console.log('[ProductContext] Already fetching, skip');
      return;
    }

    fetchingRef.current = true;

    console.log('[ProductContext] Starting product fetch...');
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await getProducts({
        isActive: true,
        sortBy: 'sort_order',
        ascending: true,
        limit: 100,
      });

      console.log('[ProductContext] getProducts returned:', { dataLength: data?.length, error: fetchError?.message });

      if (fetchError) {
        console.error('[ProductContext] Fetch error:', fetchError);
        setError(fetchError?.message || 'Failed to load products');
        setProducts([]);
      } else {
        console.log('[ProductContext] Fetch success, products:', data?.length || 0);
        // Supabase 데이터를 컴포넌트 형식으로 변환
        const transformedProducts = (data || []).map((product) => ({
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
      }
    } catch (err) {
      console.error('[ProductContext] Unexpected error:', err);
      setError(err?.message || 'Unexpected error');
      setProducts([]);
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, [products.length]);

  /**
   * 최초 마운트 시 제품 데이터 로드
   */
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /**
   * ID로 제품 조회
   * @param {string} id - 제품 UUID
   * @returns {Object|null} 제품 데이터 또는 null
   */
  const getProductById = useCallback(
    (id) => {
      return products.find((product) => product.id === id) || null;
    },
    [products]
  );

  const value = {
    products,
    isLoading,
    error,
    getProductById,
    refetch: loadProducts,
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
