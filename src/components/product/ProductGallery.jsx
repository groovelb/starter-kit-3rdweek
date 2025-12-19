import { useState, forwardRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TimeBlendImage } from '../media/TimeBlendImage';

/**
 * ProductGallery 컴포넌트
 *
 * 제품 이미지 갤러리. 메인 이미지 + 썸네일 스트립 형태.
 * TimeBlendImage를 사용하여 타임라인에 따른 낮/밤 이미지 블렌딩 지원.
 *
 * 동작 방식:
 * 1. 메인 이미지 영역에 현재 선택된 이미지 표시
 * 2. 하단 썸네일 스트립에서 이미지 선택 가능
 * 3. timeline 값에 따라 낮/밤 이미지 블렌딩
 * 4. 페이지네이션 인디케이터로 현재 위치 표시
 *
 * Props:
 * @param {object} product - 제품 데이터 { images: [day, night], video? } [Required]
 * @param {number} timeline - 타임라인 값 (0-1) [Optional, 기본값: 0]
 * @param {number} selectedIndex - 현재 선택된 이미지 인덱스 [Optional, 기본값: 0]
 * @param {function} onIndexChange - 인덱스 변경 핸들러 [Optional]
 * @param {boolean} showThumbnails - 썸네일 표시 여부 [Optional, 기본값: true]
 * @param {boolean} showIndicator - 페이지네이션 인디케이터 표시 여부 [Optional, 기본값: true]
 * @param {string} aspectRatio - 메인 이미지 종횡비 [Optional, 기본값: 'auto']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductGallery
 *   product={product}
 *   timeline={timeline}
 *   onIndexChange={setIndex}
 * />
 */
const ProductGallery = forwardRef(function ProductGallery(
  {
    product,
    timeline = 0,
    selectedIndex = 0,
    onIndexChange,
    showThumbnails = true,
    showIndicator = true,
    aspectRatio = 'auto',
    sx = {},
    ...props
  },
  ref
) {
  const [internalIndex, setInternalIndex] = useState(selectedIndex);

  // 외부/내부 인덱스 관리
  const currentIndex = onIndexChange ? selectedIndex : internalIndex;
  const handleIndexChange = (index) => {
    if (onIndexChange) {
      onIndexChange(index);
    } else {
      setInternalIndex(index);
    }
  };

  // 이미지 데이터 추출
  const images = product?.images || [];
  const dayImage = images[0];
  const nightImage = images[1];

  // 이미지가 없는 경우
  if (!dayImage && !nightImage) {
    return (
      <Box
        ref={ref}
        sx={{
          width: '100%',
          aspectRatio: aspectRatio === 'auto' ? '4/5' : aspectRatio,
          backgroundColor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
          ...sx,
        }}
        {...props}
      >
        No image
      </Box>
    );
  }

  // 썸네일 개수 (현재는 1개의 day/night 쌍만 지원)
  const thumbnailCount = 4; // UI 표시용 더미 썸네일

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        ...sx,
      }}
      {...props}
    >
      {/* 메인 이미지 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          backgroundColor: 'grey.100',
        }}
      >
        <TimeBlendImage
          dayImage={dayImage}
          nightImage={nightImage}
          timeline={timeline}
          alt={product?.title || 'Product'}
          aspectRatio={aspectRatio}
          objectFit="contain"
        />

        {/* 페이지네이션 인디케이터 */}
        {showIndicator && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              backgroundColor: 'rgba(18, 16, 14, 0.6)',
              borderRadius: 0,
              px: 1,
              py: 0.5,
            }}
          >
            {[...Array(thumbnailCount)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: 0,
                  backgroundColor: index === currentIndex ? '#F5F2EE' : 'rgba(245, 242, 238, 0.4)',
                  transition: 'background-color 200ms',
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* 썸네일 스트립 */}
      {showThumbnails && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: 'flex-start',
          }}
        >
          {[...Array(thumbnailCount)].map((_, index) => (
            <Box
              key={index}
              onClick={() => handleIndexChange(index)}
              sx={{
                width: 64,
                height: 64,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: index === currentIndex ? 'secondary.main' : 'transparent',
                opacity: index === currentIndex ? 1 : 0.6,
                transition: 'all 200ms',
                overflow: 'hidden',
                '&:hover': {
                  opacity: 1,
                  borderColor: index === currentIndex ? 'secondary.main' : 'divider',
                },
              }}
            >
              <TimeBlendImage
                dayImage={dayImage}
                nightImage={nightImage}
                timeline={timeline}
                alt={`Thumbnail ${index + 1}`}
                aspectRatio="1/1"
                objectFit="cover"
              />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
});

export default ProductGallery;
