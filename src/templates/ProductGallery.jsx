import { forwardRef, useState, useMemo } from 'react';
import { CenteredAsideLayout } from '../components/layout/CenteredAsideLayout';
import { ProductFilter } from '../components/navigation/ProductFilter';
import { ProductGrid } from './ProductGrid';

/**
 * 시각적 상수 (ProductGallery 전용)
 */
const LAYOUT = {
  CENTER_SIZE: 9,      // 중앙 그리드 크기 (aside: 1, center: 10, empty: 1)
  SPACING: 0,           // 그리드 간격
  STICKY_TOP: 88,       // sticky 위치 (GNB 64px + 여백 24px)
};

/**
 * ProductGallery 템플릿 컴포넌트
 *
 * CenteredAsideLayout을 사용하여 ProductFilter와 ProductGrid를 배치.
 * 좌측 필터는 sticky, 중앙에 제품 그리드, 우측은 빈 영역으로 시각적 중앙 정렬.
 *
 * 동작 방식:
 * 1. CenteredAsideLayout(1:10:1)으로 대칭 레이아웃 구성
 * 2. 좌측 필터에서 제품 타입 선택 (sticky로 스크롤 시 고정)
 * 3. 중앙 그리드에서 필터링된 제품 표시 (시각적 정중앙)
 * 4. 'All' 선택 시 전체 제품 표시
 * 5. 모바일(md 미만)에서는 필터가 상단, 그리드가 하단으로 스택
 *
 * Props:
 * @param {Array} products - 제품 데이터 배열 [Required]
 * @param {number} timeline - 시간대 값 (0-1) [Optional, 기본값: 0]
 * @param {function} onProductClick - 제품 클릭 핸들러 [Optional]
 * @param {string|number} selectedProductId - 선택된 제품 ID [Optional]
 * @param {string} defaultFilter - 초기 필터 값 [Optional, 기본값: 'all']
 * @param {boolean} showAllOption - 'All' 탭 표시 여부 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductGallery
 *   products={products}
 *   timeline={0.5}
 *   onProductClick={(product) => console.log(product)}
 * />
 */
const ProductGallery = forwardRef(function ProductGallery({
  products = [],
  timeline = 0,
  onProductClick,
  selectedProductId,
  defaultFilter = 'all',
  showAllOption = true,
  sx,
  ...props
}, ref) {
  const [filter, setFilter] = useState(defaultFilter);

  // 필터링된 제품 목록
  const filteredProducts = useMemo(() => {
    if (filter === 'all') {
      return products;
    }
    return products.filter((product) => product.type === filter);
  }, [products, filter]);

  return (
    <CenteredAsideLayout
      ref={ref}
      centerSize={LAYOUT.CENTER_SIZE}
      stickyTop={LAYOUT.STICKY_TOP}
      spacing={LAYOUT.SPACING}
      aside={
        <ProductFilter
          selected={filter}
          onChange={setFilter}
          showAll={showAllOption}
        />
      }
      sx={sx}
      {...props}
    >
      <ProductGrid
        products={filteredProducts}
        timeline={timeline}
        onProductClick={onProductClick}
        selectedProductId={selectedProductId}
      />
    </CenteredAsideLayout>
  );
});

export { ProductGallery };
export default ProductGallery;
