import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ProductCard } from '../components/product/ProductCard';

/**
 * 시각적 상수 (ProductGrid 전용)
 */
const GRID = {
  SPACING: 1.5,                       // 그리드 간격
  SIZE: { xs: 6, sm: 4, md: 3 },    // 반응형 열 크기 (xs: 2열, sm: 3열, md: 4열)
};

/**
 * ProductGrid 템플릿 컴포넌트
 *
 * ProductCard들을 반응형 그리드로 배치하는 템플릿.
 *
 * 동작 방식:
 * 1. products 배열을 받아 그리드로 렌더링
 * 2. timeline 값에 따라 모든 카드의 낮/밤 이미지 동기화
 * 3. 반응형 열 구성 (xs: 2열, sm: 3열, md: 4열)
 *
 * Props:
 * @param {Array} products - 제품 데이터 배열 [Required]
 * @param {number} timeline - 시간대 값 (0-1) [Optional, 기본값: 0]
 * @param {function} onProductClick - 제품 클릭 핸들러 [Optional]
 * @param {string|number} selectedProductId - 선택된 제품 ID [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductGrid
 *   products={products}
 *   timeline={0.5}
 *   onProductClick={(product) => console.log(product)}
 * />
 */
const ProductGrid = forwardRef(function ProductGrid({
  products = [],
  timeline = 0,
  onProductClick,
  selectedProductId,
  sx,
  ...props
}, ref) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Box ref={ref} sx={sx} {...props}>
      <Grid container spacing={GRID.SPACING} rowSpacing={8}>
        {products.map((product) => (
          <Grid key={product.id} size={GRID.SIZE}>
            <ProductCard
              product={product}
              timeline={timeline}
              onClick={onProductClick ? () => onProductClick(product) : undefined}
              isSelected={selectedProductId === product.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export { ProductGrid };
export default ProductGrid;
