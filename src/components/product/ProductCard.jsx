import { forwardRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CustomCard } from '../card/CustomCard';
import { TimeBlendImage } from '../media/TimeBlendImage';

/**
 * ProductCard 컴포넌트
 *
 * Lumenstate 제품 카드. 썸네일(12시간 주기 기반 낮/밤 블렌딩), 제품명, 타입 태그, 상태 라벨을 표시한다.
 *
 * 동작 방식:
 * 1. timeline 값(0-1)에 따라 12시간 주기 기반으로 낮/밤 이미지 opacity 블렌딩
 *    - timeline 0.0 = 12pm (정오) → 완전 낮 이미지
 *    - timeline 0.33 = 4pm (오후) → 낮 67% + 밤 33%
 *    - timeline 0.67 = 8pm (저녁) → 낮 33% + 밤 67%
 *    - timeline 1.0 = 12am (자정) → 완전 밤 이미지
 * 2. 시간이 지날수록 점점 어두워짐 (선형 블렌딩)
 * 3. 상태 라벨에 조도(lux)·색온도(K) 실시간 표시
 * 4. 카드 클릭 시 onClick 콜백 호출
 * 5. hover 시 미디어 확대 효과 (CustomCard hoverMediaScale 사용)
 *
 * Props:
 * @param {object} product - 제품 데이터 { id, title, type, lux, kelvin, images, video } [Required]
 * @param {number} timeline - 시간대 값 (0-1) [Optional, 기본값: 0]
 * @param {function} onClick - 카드 클릭 핸들러 [Optional]
 * @param {boolean} isSelected - 선택 상태 [Optional, 기본값: false]
 * @param {number} hoverMediaScale - hover 시 미디어 확대 비율 [Optional, 기본값: 1.05]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductCard
 *   product={products[0]}
 *   timeline={0.5}
 *   onClick={() => handleProductClick(product)}
 *   hoverMediaScale={1.08}
 * />
 */
const ProductCard = forwardRef(function ProductCard({
  product,
  timeline = 0,
  onClick,
  isSelected = false,
  hoverMediaScale = 1.05,
  sx,
  ...props
}, ref) {
  const { title, type, lux, kelvin, images } = product;

  /**
   * 낮/밤 이미지 추출
   * images[0]: 낮 이미지
   * images[1]: 밤 이미지
   */
  const { dayImage, nightImage } = useMemo(() => {
    if (!images || images.length === 0) {
      return { dayImage: null, nightImage: null };
    }
    return {
      dayImage: images[0] || null,
      nightImage: images[1] || images[0] || null,
    };
  }, [images]);

  /**
   * 타입 태그 라벨
   */
  const typeLabel = useMemo(() => {
    const typeMap = {
      ceiling: 'Ceiling',
      stand: 'Stand',
      wall: 'Wall',
      desk: 'Desk',
    };
    return typeMap[type] || type;
  }, [type]);

  /**
   * 미디어 슬롯 - TimeBlendImage로 4개 시간대 기반 낮/밤 블렌딩
   */
  const renderMediaSlot = () => {
    if (!dayImage && !nightImage) {
      return (
        <Box
          sx={ {
            width: '100%',
            height: '100%',
            backgroundColor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          } }
        >
          <Typography variant="caption" color="text.secondary">
            No image
          </Typography>
        </Box>
      );
    }

    return (
      <TimeBlendImage
        dayImage={ dayImage }
        nightImage={ nightImage }
        timeline={ timeline }
        alt={ title }
        aspectRatio="auto"
        objectFit="cover"
        sx={ { width: '100%', height: '100%' } }
      />
    );
  };

  return (
    <CustomCard
      ref={ ref }
      layout="vertical"
      mediaRatio="auto"
      mediaSlot={ renderMediaSlot() }
      gap="sm"
      contentPadding="none"
      variant="ghost"
      isInteractive
      onClick={ onClick }
      hoverMediaScale={ hoverMediaScale }
      { ...props }
    >
      {/* 타입 태그 */}
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1,
            py: 0.25,
            backgroundColor: '#12100E',
            color: '#F2E9DA',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {typeLabel}
        </Typography>
      </Box>

      {/* 제품명 + 상태 라벨 */}
      <Stack spacing={0.5}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'monospace',
            color: 'text.secondary',
          }}
        >
          {lux}lx · {kelvin}K
        </Typography>
      </Stack>
    </CustomCard>
  );
});

export { ProductCard };
