import { forwardRef } from 'react';
import Box from '@mui/material/Box';

/**
 * AspectMedia Component
 *
 * 이미지 또는 비디오를 지정된 비율로 표시하는 범용 미디어 컴포넌트입니다.
 * CSS aspect-ratio 속성을 사용하여 반응형 비율을 유지합니다.
 *
 * ## 동작 방식
 * 1. type prop으로 이미지/비디오 렌더링 방식 결정
 * 2. aspectRatio prop으로 고정 비율 유지 (예: '16/9', '4/3', '1/1')
 * 3. objectFit prop으로 미디어가 컨테이너에 맞춰지는 방식 결정
 * 4. 비디오의 경우 autoPlay, muted, loop, controls 등 제어 가능
 *
 * Props:
 * @param {string} src - 미디어 소스 URL [Required]
 * @param {string} alt - 대체 텍스트 (이미지용) [Optional, 기본값: '']
 * @param {string} type - 미디어 타입 ('image' | 'video') [Optional, 기본값: 'image']
 * @param {string} aspectRatio - CSS aspect-ratio 값 [Optional, 기본값: '16/9']
 * @param {string} objectFit - CSS object-fit 값 [Optional, 기본값: 'cover']
 * @param {boolean} isLazy - 지연 로딩 활성화 [Optional, 기본값: true]
 * @param {string} poster - 비디오 포스터 이미지 URL [Optional]
 * @param {boolean} isAutoPlay - 비디오 자동 재생 [Optional, 기본값: false]
 * @param {boolean} isMuted - 비디오 음소거 [Optional, 기본값: true]
 * @param {boolean} isLoop - 비디오 반복 재생 [Optional, 기본값: false]
 * @param {boolean} hasControls - 비디오 컨트롤 표시 [Optional, 기본값: false]
 * @param {boolean} isPlaysInline - 인라인 재생 (모바일) [Optional, 기본값: true]
 * @param {Object} sx - 추가 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * // 이미지
 * <AspectMedia
 *   src="/photo.jpg"
 *   alt="Photo description"
 *   aspectRatio="4/3"
 * />
 *
 * // 비디오
 * <AspectMedia
 *   type="video"
 *   src="/video.mp4"
 *   aspectRatio="16/9"
 *   isAutoPlay
 *   isMuted
 *   isLoop
 * />
 */
const AspectMedia = forwardRef(function AspectMedia(
  {
    src,
    alt = '',
    type = 'image',
    aspectRatio = '16/9',
    objectFit = 'cover',
    isLazy = true,
    poster,
    isAutoPlay = false,
    isMuted = true,
    isLoop = false,
    hasControls = false,
    isPlaysInline = true,
    sx = {},
    ...props
  },
  ref
) {
  // 공통 스타일
  const commonStyles = {
    width: '100%',
    height: 'auto',
    aspectRatio,
    objectFit,
    display: 'block',
    ...sx,
  };

  // 이미지 렌더링
  if (type === 'image') {
    return (
      <Box
        ref={ref}
        component="img"
        src={src}
        alt={alt}
        loading={isLazy ? 'lazy' : 'eager'}
        sx={commonStyles}
        {...props}
      />
    );
  }

  // 비디오 렌더링
  if (type === 'video') {
    return (
      <Box
        ref={ref}
        component="video"
        src={src}
        poster={poster}
        autoPlay={isAutoPlay}
        muted={isMuted}
        loop={isLoop}
        controls={hasControls}
        playsInline={isPlaysInline}
        sx={commonStyles}
        {...props}
      />
    );
  }

  return null;
});

export default AspectMedia;
