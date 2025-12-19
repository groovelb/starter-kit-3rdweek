import { forwardRef, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { TimeBlendImage } from '../media/TimeBlendImage';
import TimelineSlider from '../shared/TimelineSlider';

/**
 * ProductImageViewer 컴포넌트
 *
 * 제품 이미지 뷰어. 낮/밤 이미지를 TimeBlendImage로 블렌딩.
 * 이미지는 원본 비율을 유지하며, 하단에 overlay로 슬라이더 표시.
 *
 * 동작 방식:
 * 1. 배경: TimeBlendImage (원본 비율 유지, 낮/밤 블렌딩)
 * 2. 오버레이: 하단 그래디언트 + TimelineSlider
 * 3. 슬라이더 조작 시 이미지가 실시간으로 블렌딩
 *
 * Props:
 * @param {Array} images - 제품 이미지 배열 [dayImage, nightImage] [Required]
 * @param {string} productName - 제품명 (alt 텍스트용) [Optional]
 * @param {number} lux - 제품 조도 값 [Optional]
 * @param {number} kelvin - 제품 색온도 값 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductImageViewer
 *   images={[dayImage, nightImage]}
 *   productName="Lumen Desk Pro"
 *   lux={260}
 *   kelvin={3200}
 * />
 */
const ProductImageViewer = forwardRef(function ProductImageViewer(
  {
    images = [],
    productName = 'Product',
    lux,
    kelvin,
    ...props
  },
  ref
) {
  const [timeline, setTimeline] = useState(0);

  // 낮/밤 이미지 분리
  const dayImage = images[0] || null;
  const nightImage = images[1] || images[0] || null;

  /**
   * 타임라인 변경 핸들러
   */
  const handleTimelineChange = useCallback((newValue) => {
    setTimeline(newValue);
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
      }}
      {...props}
    >
      {/* 배경 이미지 - TimeBlendImage (원본 비율 유지) */}
      <TimeBlendImage
        dayImage={dayImage}
        nightImage={nightImage}
        timeline={timeline}
        alt={productName}
        aspectRatio="auto"
        objectFit="cover"
        sx={ { width: '100%', height: '100%' } }
      />

      {/* Overlay Container - 이미지 위에 패딩 적용된 레이어 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          p: { xs: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        {/* Bottom Gradient */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(18, 16, 14, 0.8) 0%, rgba(18, 16, 14, 0) 100%)',
          }}
        />

        {/* Lux / Kelvin 정보 - 우측 상단 */}
        {(lux || kelvin) && (
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.8125rem',
                color: '#F2E9DA',
              }}
            >
              {lux && `${lux} lx`}
              {lux && kelvin && ' · '}
              {kelvin && `${kelvin} K`}
            </Typography>
          </Box>
        )}

        {/* 하단 컨트롤 영역 - 슬라이더 */}
        <Box
          sx={{
            position: 'relative',
            pointerEvents: 'auto',
          }}
        >
          {/* TimelineSlider */}
          <TimelineSlider
            value={timeline}
            onChange={handleTimelineChange}
            useGlobalState={false}
            showLabels={false}
            color="#F2E9DA"
            sx={{ width: '100%', position: 'relative', zIndex: 1 }}
          />
        </Box>
      </Box>
    </Box>
  );
});

export { ProductImageViewer };
export default ProductImageViewer;
