import { Box } from '@mui/material';

/**
 * 황금비율 상수
 */
const PHI = 1.618033988749895;

/**
 * PhiSplit 컴포넌트
 *
 * 황금비율(φ = 1.618)을 기반으로 두 영역을 분할하는 레이아웃 컴포넌트.
 * CSS Flexbox를 활용하여 약 61.8% : 38.2% 비율로 콘텐츠를 배치한다.
 *
 * 동작 방식:
 * 1. direction prop에 따라 가로(row) 또는 세로(column) 분할 결정
 * 2. primary와 secondary 영역이 황금비율로 배치됨
 * 3. reversed가 true면 비율이 반전되어 작은 영역이 먼저 옴
 * 4. 반응형 브레이크포인트에서 자동으로 스택 레이아웃으로 전환
 *
 * Props:
 * @param {ReactNode} primary - 황금비율의 큰 영역에 배치될 콘텐츠 [Required]
 * @param {ReactNode} secondary - 황금비율의 작은 영역에 배치될 콘텐츠 [Required]
 * @param {string} direction - 분할 방향 ('row' | 'column') [Optional, 기본값: 'row']
 * @param {boolean} isReversed - 비율 반전 (작은 영역이 먼저) [Optional, 기본값: false]
 * @param {number} gap - 영역 간 간격 (theme spacing 단위) [Optional, 기본값: 0]
 * @param {string} stackAt - 스택으로 전환되는 브레이크포인트 ('xs' | 'sm' | 'md' | 'lg' | 'none') [Optional, 기본값: 'sm']
 * @param {string} minHeight - 컨테이너 최소 높이 [Optional]
 * @param {object} primarySx - primary 영역 추가 스타일 [Optional]
 * @param {object} secondarySx - secondary 영역 추가 스타일 [Optional]
 * @param {object} sx - 컨테이너 추가 스타일 [Optional]
 *
 * Example usage:
 * <PhiSplit
 *   primary={<HeroImage />}
 *   secondary={<HeroText />}
 *   gap={4}
 * />
 * <PhiSplit
 *   direction="column"
 *   isReversed
 *   primary={<MainContent />}
 *   secondary={<Sidebar />}
 * />
 */
export function PhiSplit({
  primary,
  secondary,
  direction = 'row',
  isReversed = false,
  gap = 0,
  stackAt = 'sm',
  minHeight,
  primarySx,
  secondarySx,
  sx,
  ...props
}) {
  /**
   * 황금비율 계산
   * - 큰 영역: φ / (φ + 1) ≈ 61.8%
   * - 작은 영역: 1 / (φ + 1) ≈ 38.2%
   */
  const primaryRatio = PHI / (PHI + 1); // ≈ 0.618
  const secondaryRatio = 1 / (PHI + 1); // ≈ 0.382

  /**
   * 브레이크포인트별 flex-direction 설정
   * stackAt 값에 따라 해당 브레이크포인트 이하에서 column으로 전환
   */
  const getResponsiveDirection = () => {
    if (stackAt === 'none') {
      return direction;
    }

    const breakpoints = {
      xs: { xs: 'column', sm: direction, md: direction, lg: direction, xl: direction },
      sm: { xs: 'column', sm: 'column', md: direction, lg: direction, xl: direction },
      md: { xs: 'column', sm: 'column', md: 'column', lg: direction, xl: direction },
      lg: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: direction },
    };

    return breakpoints[stackAt] || direction;
  };

  /**
   * 스택 모드에서 flex-basis 조정
   * 스택(column) 상태에서는 각 영역이 auto로 전환
   */
  const getResponsiveFlex = (ratio) => {
    if (stackAt === 'none') {
      return `0 0 ${ratio * 100}%`;
    }

    const stackValue = '0 0 auto';
    const normalValue = `0 0 ${ratio * 100}%`;

    const breakpoints = {
      xs: { xs: stackValue, sm: normalValue },
      sm: { xs: stackValue, sm: stackValue, md: normalValue },
      md: { xs: stackValue, sm: stackValue, md: stackValue, lg: normalValue },
      lg: { xs: stackValue, sm: stackValue, md: stackValue, lg: stackValue, xl: normalValue },
    };

    return breakpoints[stackAt] || normalValue;
  };

  // 실제 배치 순서 결정
  const firstContent = isReversed ? secondary : primary;
  const secondContent = isReversed ? primary : secondary;
  const firstRatio = isReversed ? secondaryRatio : primaryRatio;
  const secondRatio = isReversed ? primaryRatio : secondaryRatio;
  const firstSx = isReversed ? secondarySx : primarySx;
  const secondSx = isReversed ? primarySx : secondarySx;

  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: getResponsiveDirection(),
        gap: gap,
        minHeight: minHeight,
        width: '100%',
        ...sx,
      } }
      { ...props }
    >
      <Box
        sx={ {
          flex: getResponsiveFlex(firstRatio),
          minWidth: 0, // flex item 오버플로우 방지
          ...firstSx,
        } }
      >
        { firstContent }
      </Box>
      <Box
        sx={ {
          flex: getResponsiveFlex(secondRatio),
          minWidth: 0,
          ...secondSx,
        } }
      >
        { secondContent }
      </Box>
    </Box>
  );
}

/**
 * 황금비율 상수 export (다른 컴포넌트에서 사용)
 */
export { PHI };
