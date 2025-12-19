import { Box } from '@mui/material';

/**
 * 황금비율 상수
 */
const PHI = 1.618033988749895;

/**
 * RatioContainer 컴포넌트
 *
 * 고정된 종횡비를 유지하는 컨테이너 컴포넌트.
 * CSS aspect-ratio 속성을 활용하여 16:9, 4:3, 1:1, 황금비율 등 다양한 비율을 지원한다.
 *
 * 동작 방식:
 * 1. ratio prop에 따라 컨테이너의 종횡비가 설정됨
 * 2. 컨테이너 너비가 변해도 비율이 유지됨
 * 3. children은 컨테이너 내부에 align prop에 따라 배치됨
 * 4. contain이 true면 overflow: hidden 적용
 *
 * Props:
 * @param {ReactNode} children - 컨테이너 내용 [Required]
 * @param {string|number} ratio - 비율 ('16:9' | '4:3' | '1:1' | '3:2' | '21:9' | 'phi' | 'phi-vertical' | number) [Optional, 기본값: '16:9']
 * @param {string} maxWidth - 최대 너비 [Optional]
 * @param {string} minHeight - 최소 높이 [Optional]
 * @param {boolean} isContained - 내용이 컨테이너를 넘지 않도록 overflow hidden [Optional, 기본값: true]
 * @param {string} align - 내용 정렬 ('center' | 'start' | 'end' | 'stretch') [Optional, 기본값: 'center']
 * @param {string} justify - 수평 정렬 ('center' | 'start' | 'end' | 'stretch') [Optional, 기본값: 'center']
 * @param {string} background - 배경색 또는 그라데이션 [Optional]
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <RatioContainer ratio="16:9">
 *   <img src="hero.jpg" alt="Hero" />
 * </RatioContainer>
 * <RatioContainer ratio="phi" align="center">
 *   <Typography>Golden Ratio Container</Typography>
 * </RatioContainer>
 */
export function RatioContainer({
  children,
  ratio = '16:9',
  maxWidth,
  minHeight,
  isContained = true,
  align = 'center',
  justify = 'center',
  background,
  sx,
  ...props
}) {
  /**
   * ratio prop을 CSS aspect-ratio 값으로 변환
   * - 문자열 비율 (예: '16:9') → '16/9'
   * - 프리셋 키워드 (예: 'phi') → 황금비율 값
   * - 숫자 → 그대로 사용 (width/height 비율)
   */
  const getAspectRatio = () => {
    // 숫자인 경우 그대로 반환
    if (typeof ratio === 'number') {
      return ratio;
    }

    // 프리셋 키워드 처리
    const presets = {
      'phi': PHI,           // 1.618:1 (가로로 긴 황금비율)
      'phi-vertical': 1 / PHI,  // 1:1.618 (세로로 긴 황금비율)
      'square': 1,          // 1:1
      'golden': PHI,        // phi와 동일
    };

    if (presets[ratio]) {
      return presets[ratio];
    }

    // 문자열 비율 파싱 (예: '16:9' → '16/9')
    if (typeof ratio === 'string' && ratio.includes(':')) {
      const [width, height] = ratio.split(':').map(Number);
      if (!isNaN(width) && !isNaN(height) && height !== 0) {
        return width / height;
      }
    }

    // 기본값
    return 16 / 9;
  };

  // 정렬 값 매핑
  const alignMap = {
    center: 'center',
    start: 'flex-start',
    end: 'flex-end',
    stretch: 'stretch',
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: maxWidth,
        minHeight: minHeight,
        aspectRatio: getAspectRatio(),
        overflow: isContained ? 'hidden' : 'visible',
        display: 'flex',
        alignItems: alignMap[align] || 'center',
        justifyContent: alignMap[justify] || 'center',
        background: background,
        // 이미지가 컨테이너를 채우도록
        '& > img, & > video': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

/**
 * 황금비율 상수 export (다른 컴포넌트에서 사용)
 */
export { PHI };
