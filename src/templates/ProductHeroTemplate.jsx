import { forwardRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Lamp,
  LampCeiling,
  LampDesk,
  LampFloor,
  Sun,
  SlidersHorizontal,
} from 'lucide-react';
import LineGrid from '../components/layout/LineGrid';
import { ProductSpecCard } from '../components/product/ProductSpecCard';

/**
 * ProductHeroTemplate 컴포넌트
 *
 * 제품 상세 페이지의 Hero 영역 템플릿.
 * 제품명, 설명, 스펙(타입/조도/색온도) 카드를 표시.
 *
 * 동작 방식:
 * 1. 상단: 제품명 (h2 타이포그래피)
 * 2. 중단: 제품 설명 (옵션)
 * 3. 하단: 3열 스펙 카드 (타입, Lux, Kelvin)
 *
 * Props:
 * @param {string} title - 제품명 [Required]
 * @param {string} description - 제품 설명 [Optional]
 * @param {string} type - 제품 타입 (ceiling, stand, wall, desk) [Optional]
 * @param {number} lux - 조도 값 [Optional]
 * @param {number} kelvin - 색온도 값 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductHeroTemplate
 *   title="Aurora Pendant"
 *   description="A stunning ceiling lamp"
 *   type="ceiling"
 *   lux={480}
 *   kelvin={3800}
 * />
 */
const ProductHeroTemplate = forwardRef(function ProductHeroTemplate(
  {
    title = 'Product Name',
    description,
    type,
    lux,
    kelvin,
    sx = {},
    ...props
  },
  ref
) {
  /**
   * 제품 타입별 아이콘 매핑 (lucide-react)
   */
  const TypeIcon = useMemo(() => {
    const iconMap = {
      ceiling: LampCeiling,
      stand: LampFloor,
      wall: Lamp,
      desk: LampDesk,
    };
    return iconMap[type] || Lamp;
  }, [type]);

  /**
   * 제품 타입 라벨
   */
  const typeLabel = useMemo(() => {
    const labelMap = {
      ceiling: 'Ceiling',
      stand: 'Stand',
      wall: 'Wall',
      desk: 'Desk',
    };
    return labelMap[type] || type || 'Light';
  }, [type]);

  const hasSpecs = type || lux || kelvin;

  return (
    <Box ref={ref} sx={sx} {...props}>
      {/* 제품명 */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '2rem', md: '3rem' },
          lineHeight: 1.1,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {/* 제품 설명 */}
      {description && (
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 2.5,
          }}
        >
          {description}
        </Typography>
      )}

      {/* 제품 스펙: 카테고리 / Lux / Kelvin */}
      {hasSpecs && (
        <LineGrid container gap={24} sx={{ mt: 5 }}>
          {type && (
            <Grid size={{ xs: 4 }}>
              <ProductSpecCard
                icon={<TypeIcon size={32} strokeWidth={1.5} />}
                label="Type"
                value={typeLabel}
              />
            </Grid>
          )}
          {lux && (
            <Grid size={{ xs: 4 }}>
              <ProductSpecCard
                icon={<Sun size={32} strokeWidth={1.5} />}
                label="Luminance"
                value={`${lux} lx`}
              />
            </Grid>
          )}
          {kelvin && (
            <Grid size={{ xs: 4 }}>
              <ProductSpecCard
                icon={<SlidersHorizontal size={32} strokeWidth={1.5} />}
                label="Color Temp"
                value={`${kelvin} K`}
              />
            </Grid>
          )}
        </LineGrid>
      )}
    </Box>
  );
});

export { ProductHeroTemplate };
export default ProductHeroTemplate;
