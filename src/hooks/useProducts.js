import { useState, useEffect, useCallback } from 'react';
import { isSupabaseEnabled } from '../lib/supabase';
import { getProducts, getProductTypes } from '../services/productService';
import { transformSupabaseProducts } from '../utils/productTransform';
import { products as localProducts } from '../data/products';

/**
 * useProducts Hook
 *
 * Supabase에서 제품 데이터를 fetch하고 컴포넌트 호환 형식으로 변환.
 * Supabase 미활성화 시 로컬 데이터 fallback.
 *
 * 동작 방식:
 * 1. isSupabaseEnabled() 체크
 * 2. Supabase 활성화: API 호출 → 데이터 변환 → 상태 업데이트
 * 3. Supabase 비활성화: 로컬 데이터 즉시 반환
 * 4. 로딩/에러 상태 관리
 *
 * @param {Object} options - 조회 옵션
 * @param {string} options.typeValue - 제품 타입 필터 (ceiling, stand, wall, desk)
 * @param {boolean} options.isActive - 활성화 상태 필터 (기본값: true)
 * @param {string} options.search - 검색어 (제목)
 * @param {number} options.page - 페이지 번호 (1부터 시작)
 * @param {number} options.limit - 페이지당 항목 수
 * @param {string} options.sortBy - 정렬 기준 컬럼
 * @param {boolean} options.ascending - 오름차순 여부
 *
 * @returns {Object} { products, isLoading, error, refetch, totalCount }
 *
 * Example usage:
 * const { products, isLoading, error } = useProducts({ isActive: true });
 * const { products } = useProducts({ typeValue: 'ceiling' });
 */
export function useProducts({
  typeValue = null,
  isActive = true,
  search = '',
  page = 1,
  limit = 100, // 기본값 높게 설정 (전체 조회용)
  sortBy = 'sort_order',
  ascending = true,
} = {}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  /**
   * 제품 데이터 fetch
   */
  const fetchProducts = useCallback(async () => {
    console.log('[useProducts] fetchProducts called, isSupabaseEnabled:', isSupabaseEnabled());

    // Supabase 미활성화 시 로컬 데이터 반환
    if (!isSupabaseEnabled()) {
      console.log('[useProducts] Supabase not enabled, using local data');
      let filteredProducts = [...localProducts];

      // 로컬 데이터 필터링 (typeValue)
      if (typeValue) {
        filteredProducts = filteredProducts.filter((p) => p.type === typeValue);
      }

      // 로컬 데이터 검색 (title)
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter((p) =>
          p.title.toLowerCase().includes(searchLower)
        );
      }

      setProducts(filteredProducts);
      setTotalCount(filteredProducts.length);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Supabase에서 데이터 fetch (5초 타임아웃)
    setIsLoading(true);
    setError(null);

    // 타임아웃 Promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 5000);
    });

    try {
      console.log('[useProducts] Fetching from Supabase...');

      // API 호출과 타임아웃 경쟁
      const result = await Promise.race([
        getProducts({
          typeValue,
          isActive,
          search,
          page,
          limit,
          sortBy,
          ascending,
        }),
        timeoutPromise,
      ]);

      const { data, count, error: fetchError } = result;

      if (fetchError) {
        console.error('[useProducts] Fetch error:', fetchError);
        setError(fetchError);
        // 에러 시 로컬 데이터로 fallback
        setProducts(localProducts);
        setTotalCount(localProducts.length);
      } else {
        // Supabase 데이터 변환
        const transformedProducts = transformSupabaseProducts(data || []);
        console.log('[useProducts] Fetched', transformedProducts.length, 'products');
        setProducts(transformedProducts);
        setTotalCount(count || transformedProducts.length);
      }
    } catch (err) {
      console.error('[useProducts] Error (timeout or network):', err.message);
      setError(err);
      // 에러 시 로컬 데이터로 fallback
      console.log('[useProducts] Falling back to local data');
      setProducts(localProducts);
      setTotalCount(localProducts.length);
    } finally {
      setIsLoading(false);
    }
  }, [typeValue, isActive, search, page, limit, sortBy, ascending]);

  /**
   * 초기 로드 및 옵션 변경 시 refetch
   */
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    totalCount,
  };
}

/**
 * useProductTypes Hook
 *
 * 제품 타입 목록 조회 (필터 UI용)
 *
 * @returns {Object} { types, isLoading, error }
 */
export function useProductTypes() {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      // Supabase 미활성화 시 로컬 타입 목록
      if (!isSupabaseEnabled()) {
        const localTypes = [
          { value: 'ceiling', label: 'Ceiling' },
          { value: 'stand', label: 'Stand' },
          { value: 'wall', label: 'Wall' },
          { value: 'desk', label: 'Desk' },
        ];
        setTypes(localTypes);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await getProductTypes();

        if (fetchError) {
          setError(fetchError);
        } else {
          setTypes(data || []);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, isLoading, error };
}

export default useProducts;
