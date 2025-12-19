import { useMemo } from 'react';
import Box from '@mui/material/Box';

/**
 * TimeBlendImage 컴포넌트
 *
 * 12시간 주기(12pm→12am)에 따라 낮/밤 이미지의 opacity를 블렌딩하는 컴포넌트.
 * 두 이미지를 스택으로 렌더링하고 timeline 값에 따라 opacity를 조절한다.
 *
 * 동작 방식:
 * 1. timeline 0-1 값을 12시간 주기로 매핑 (시간이 지날수록 어두워짐)
 *    - timeline 0.00 = 12pm (정오) → 완전 낮 이미지
 *    - timeline 0.33 = 4pm (오후) → 낮 67% + 밤 33%
 *    - timeline 0.67 = 8pm (저녁) → 낮 33% + 밤 67%
 *    - timeline 1.00 = 12am (자정) → 완전 밤 이미지
 * 2. 선형 블렌딩: timeline 값이 증가할수록 밤 이미지 opacity 증가
 * 3. 이미지 2개만 사용:
 *    - 낮 이미지: 공간 확보(relative) + 표시
 *    - 밤 이미지: absolute로 포개기
 * 4. aspectRatio="auto"일 때: 낮 이미지 원본 비율로 컨테이너 크기 결정
 * 5. 사용자가 타임라인 스크러버를 움직이면 실시간으로 블렌딩 반영
 *
 * Props:
 * @param {string} dayImage - 낮 이미지 소스 (12pm) [Required]
 * @param {string} nightImage - 밤 이미지 소스 (12am) [Required]
 * @param {number} timeline - 시간대 값 (0-1, 0=12pm, 1=12am) [Optional, 기본값: 0]
 * @param {string} alt - 이미지 대체 텍스트 [Optional, 기본값: '']
 * @param {string} aspectRatio - 컨테이너 종횡비, 'auto'면 원본 비율 [Optional, 기본값: '1/1']
 * @param {string} objectFit - 이미지 맞춤 방식 [Optional, 기본값: 'cover']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TimeBlendImage
 *   dayImage="/images/product-day.jpg"
 *   nightImage="/images/product-night.jpg"
 *   timeline={0.5}
 *   alt="Product"
 *   aspectRatio="auto"
 * />
 */
export function TimeBlendImage({
  dayImage,
  nightImage,
  timeline = 0,
  alt = '',
  aspectRatio = '1/1',
  objectFit = 'cover',
  sx,
  ...props
}) {
  /**
   * timeline 값(0-1)을 12시간 주기에 따른 opacity 값으로 변환
   *
   * 시간 매핑 (선형 블렌딩):
   * - timeline 0.0 = 12pm (정오) → dayOpacity: 1, nightOpacity: 0
   * - timeline 0.5 = 8pm (저녁) → dayOpacity: 0.5, nightOpacity: 0.5
   * - timeline 1.0 = 12am (자정) → dayOpacity: 0, nightOpacity: 1
   *
   * 시간이 지날수록 점점 어두워짐 (낮→밤 단방향 전환)
   */
  const { dayOpacity, nightOpacity } = useMemo(() => {
    // 선형 블렌딩: timeline이 증가할수록 밤 이미지 opacity 증가
    return {
      dayOpacity: 1 - timeline,
      nightOpacity: timeline,
    };
  }, [timeline]);

  // aspectRatio="auto" 여부
  const isAutoRatio = aspectRatio === 'auto';

  // 이미지가 없는 경우 빈 박스 렌더링
  if (!dayImage && !nightImage) {
    return (
      <Box
        sx={ {
          position: 'relative',
          width: '100%',
          ...(!isAutoRatio && { aspectRatio }),
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
        ...(!isAutoRatio && { aspectRatio }),
        overflow: 'hidden',
        ...sx,
      } }
      { ...props }
    >
      {/* 낮 이미지 (하단 레이어) - 공간 확보 + 표시 */}
      { dayImage && (
        <Box
          component="img"
          src={ dayImage }
          alt={ `${alt} - Day` }
          sx={ {
            position: isAutoRatio ? 'relative' : 'absolute',
            ...(isAutoRatio ? {} : { top: 0, left: 0, height: '100%' }),
            width: '100%',
            height: isAutoRatio ? 'auto' : '100%',
            display: 'block',
            objectFit: isAutoRatio ? 'contain' : objectFit,
            opacity: dayOpacity,
            transition: 'opacity 600ms ease-out',
          } }
        />
      ) }

      {/* 밤 이미지 (상단 레이어) - 낮 이미지 위에 포개기 */}
      { nightImage && (
        <Box
          component="img"
          src={ nightImage }
          alt={ `${alt} - Night` }
          sx={ {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: isAutoRatio ? 'contain' : objectFit,
            opacity: nightOpacity,
            transition: 'opacity 600ms ease-out',
          } }
        />
      ) }
    </Box>
  );
}
