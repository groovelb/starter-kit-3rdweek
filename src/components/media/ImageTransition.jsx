import { useMemo } from 'react';
import Box from '@mui/material/Box';

/**
 * ImageTransition 컴포넌트
 *
 * 인덱스 기반 이미지 크로스페이드 컴포넌트.
 * 모든 이미지를 스택으로 렌더링하고 CSS transition으로 opacity를 전환한다.
 *
 * 동작 방식:
 * 1. 모든 이미지를 absolute 포지션으로 스택 렌더링
 * 2. activeIndex에 해당하는 이미지만 opacity: 1, 나머지는 opacity: 0
 * 3. CSS transition으로 부드러운 크로스페이드
 * 4. 복잡한 상태 관리 없이 깜빡임 없는 전환
 *
 * Props:
 * @param {Array} images - 이미지 소스 배열 [{ src, alt }] 또는 string[] [Required]
 * @param {number} activeIndex - 현재 활성 이미지 인덱스 [Required]
 * @param {number} duration - 트랜지션 지속 시간 (ms) [Optional, 기본값: 500]
 * @param {string} easing - CSS 이징 함수 [Optional, 기본값: 'ease-out']
 * @param {string} aspectRatio - 컨테이너 종횡비 [Optional, 기본값: '16/9']
 * @param {string} objectFit - 이미지 맞춤 방식 [Optional, 기본값: 'cover']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ImageTransition
 *   images={['img1.jpg', 'img2.jpg']}
 *   activeIndex={currentIndex}
 *   duration={600}
 * />
 */
export function ImageTransition({
  images = [],
  activeIndex = 0,
  duration = 500,
  easing = 'ease-out',
  aspectRatio = '16/9',
  objectFit = 'cover',
  sx,
  ...props
}) {
  /**
   * 이미지 데이터 정규화
   * string[] → [{ src, alt }] 형태로 변환
   */
  const normalizedImages = useMemo(() => {
    return images.map((img, idx) => {
      if (typeof img === 'string') {
        return { src: img, alt: `Image ${idx + 1}` };
      }
      return img;
    });
  }, [images]);

  /**
   * 유효한 인덱스 범위 확인
   */
  const safeIndex = Math.max(0, Math.min(activeIndex, normalizedImages.length - 1));

  if (normalizedImages.length === 0) {
    return (
      <Box
        sx={ {
          position: 'relative',
          width: '100%',
          aspectRatio,
          backgroundColor: 'grey.200',
          ...sx,
        } }
        { ...props }
      />
    );
  }

  return (
    <Box
      sx={ {
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        backgroundColor: 'grey.900',
        ...sx,
      } }
      { ...props }
    >
      {/* 모든 이미지를 스택으로 렌더링 */}
      { normalizedImages.map((image, index) => (
        <Box
          key={ image.src }
          component="img"
          src={ image.src }
          alt={ image.alt }
          sx={ {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit,
            opacity: index === safeIndex ? 1 : 0,
            transition: `opacity ${duration}ms ${easing}`,
            // 활성 이미지를 맨 위로
            zIndex: index === safeIndex ? 1 : 0,
          } }
        />
      )) }
    </Box>
  );
}
