import { Box } from '@mui/material';

/**
 * SplitScreen 컴포넌트
 *
 * 화면을 두 영역으로 분할하는 레이아웃 컴포넌트.
 * 기본 50:50 분할부터 커스텀 비율까지 지원한다.
 *
 * 동작 방식:
 * 1. direction에 따라 가로(row) 또는 세로(column) 분할
 * 2. ratio로 분할 비율 조정 (기본 50:50)
 * 3. stackAt 브레이크포인트에서 스택 레이아웃으로 전환
 * 4. 각 영역에 개별 배경, 스타일 적용 가능
 *
 * Props:
 * @param {ReactNode} left - 왼쪽(또는 상단) 영역 콘텐츠 [Required]
 * @param {ReactNode} right - 오른쪽(또는 하단) 영역 콘텐츠 [Required]
 * @param {string} direction - 분할 방향 ('row' | 'column') [Optional, 기본값: 'row']
 * @param {string|number[]} ratio - 분할 비율 ('50:50' | '60:40' | '70:30' | [number, number]) [Optional, 기본값: '50:50']
 * @param {number} gap - 영역 간 간격 [Optional, 기본값: 0]
 * @param {string} stackAt - 스택 전환 브레이크포인트 ('xs' | 'sm' | 'md' | 'lg' | 'none') [Optional, 기본값: 'sm']
 * @param {string} stackOrder - 스택 시 순서 ('normal' | 'reverse') [Optional, 기본값: 'normal']
 * @param {string} minHeight - 최소 높이 [Optional]
 * @param {boolean} isFullHeight - 100vh 높이 적용 [Optional, 기본값: false]
 * @param {object} leftSx - 왼쪽 영역 추가 스타일 [Optional]
 * @param {object} rightSx - 오른쪽 영역 추가 스타일 [Optional]
 * @param {object} sx - 컨테이너 추가 스타일 [Optional]
 *
 * Example usage:
 * <SplitScreen
 *   left={<ImageSection />}
 *   right={<ContentSection />}
 *   ratio="60:40"
 * />
 * <SplitScreen
 *   direction="column"
 *   left={<Header />}
 *   right={<Main />}
 *   ratio={[30, 70]}
 *   isFullHeight
 * />
 */
export function SplitScreen({
  left,
  right,
  direction = 'row',
  ratio = '50:50',
  gap = 0,
  stackAt = 'sm',
  stackOrder = 'normal',
  minHeight,
  isFullHeight = false,
  leftSx,
  rightSx,
  sx,
  ...props
}) {
  /**
   * ratio prop을 flex 비율로 변환
   * - 문자열 ('50:50') → [50, 50]
   * - 배열 → 그대로 사용
   */
  const getRatios = () => {
    if (Array.isArray(ratio)) {
      return ratio;
    }

    // 프리셋 비율
    const presets = {
      '50:50': [50, 50],
      '60:40': [60, 40],
      '40:60': [40, 60],
      '70:30': [70, 30],
      '30:70': [30, 70],
      '75:25': [75, 25],
      '25:75': [25, 75],
    };

    if (presets[ratio]) {
      return presets[ratio];
    }

    // 커스텀 문자열 파싱
    if (typeof ratio === 'string' && ratio.includes(':')) {
      return ratio.split(':').map(Number);
    }

    return [50, 50];
  };

  const [leftRatio, rightRatio] = getRatios();

  /**
   * 반응형 flex-direction 설정
   */
  const getResponsiveDirection = () => {
    if (stackAt === 'none') {
      return direction;
    }

    const stackDirection = stackOrder === 'reverse' ? 'column-reverse' : 'column';

    const breakpoints = {
      xs: { xs: stackDirection, sm: direction },
      sm: { xs: stackDirection, sm: stackDirection, md: direction },
      md: { xs: stackDirection, sm: stackDirection, md: stackDirection, lg: direction },
      lg: { xs: stackDirection, sm: stackDirection, md: stackDirection, lg: stackDirection, xl: direction },
    };

    return breakpoints[stackAt] || direction;
  };

  /**
   * 반응형 flex 값 설정
   */
  const getResponsiveFlex = (ratioValue) => {
    if (stackAt === 'none') {
      return `0 0 ${ratioValue}%`;
    }

    const stackValue = '0 0 auto';
    const normalValue = `0 0 ${ratioValue}%`;

    const breakpoints = {
      xs: { xs: stackValue, sm: normalValue },
      sm: { xs: stackValue, sm: stackValue, md: normalValue },
      md: { xs: stackValue, sm: stackValue, md: stackValue, lg: normalValue },
      lg: { xs: stackValue, sm: stackValue, md: stackValue, lg: stackValue, xl: normalValue },
    };

    return breakpoints[stackAt] || normalValue;
  };

  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: getResponsiveDirection(),
        gap: gap,
        minHeight: minHeight,
        height: isFullHeight ? '100svh' : undefined,
        width: '100%',
        ...sx,
      } }
      { ...props }
    >
      <Box
        sx={ {
          flex: getResponsiveFlex(leftRatio),
          minWidth: 0,
          minHeight: 0,
          ...leftSx,
        } }
      >
        { left }
      </Box>
      <Box
        sx={ {
          flex: getResponsiveFlex(rightRatio),
          minWidth: 0,
          minHeight: 0,
          ...rightSx,
        } }
      >
        { right }
      </Box>
    </Box>
  );
}

/**
 * StickySection 컴포넌트
 *
 * SplitScreen과 함께 사용하여 한쪽 영역을 sticky로 고정.
 * 스크롤 시 반대편 콘텐츠가 스크롤되는 동안 고정 유지.
 *
 * Props:
 * @param {ReactNode} children - 섹션 콘텐츠 [Required]
 * @param {string} position - sticky 위치 ('top' | 'bottom') [Optional, 기본값: 'top']
 * @param {string|number} offset - top/bottom 오프셋 [Optional, 기본값: 0]
 * @param {string} height - 섹션 높이 [Optional, 기본값: '100vh']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SplitScreen
 *   left={
 *     <StickySection>
 *       <FixedImage />
 *     </StickySection>
 *   }
 *   right={<ScrollingContent />}
 * />
 */
export function StickySection({
  children,
  position = 'top',
  offset = 0,
  height = '100vh',
  sx,
  ...props
}) {
  const offsetValue = typeof offset === 'number' ? `${offset}px` : offset;

  return (
    <Box
      sx={ {
        position: 'sticky',
        [position]: offsetValue,
        height: height,
        overflow: 'hidden',
        ...sx,
      } }
      { ...props }
    >
      { children }
    </Box>
  );
}

/**
 * SplitOverlay 컴포넌트
 *
 * SplitScreen 영역에 오버레이 효과를 적용하는 래퍼.
 *
 * Props:
 * @param {ReactNode} children - 콘텐츠 [Required]
 * @param {string} background - 배경 이미지 URL 또는 CSS 값 [Optional]
 * @param {string|number} overlay - 오버레이 색상 또는 불투명도 [Optional]
 * @param {string} align - 콘텐츠 수직 정렬 [Optional, 기본값: 'center']
 * @param {string} justify - 콘텐츠 수평 정렬 [Optional, 기본값: 'center']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SplitScreen
 *   left={
 *     <SplitOverlay background="hero.jpg" overlay={0.4}>
 *       <Content />
 *     </SplitOverlay>
 *   }
 *   right={<FormSection />}
 * />
 */
export function SplitOverlay({
  children,
  background,
  overlay,
  align = 'center',
  justify = 'center',
  sx,
  ...props
}) {
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
  };

  const getBackgroundStyle = () => {
    if (!background) return {};

    if (background.startsWith('http') || background.startsWith('/') || background.startsWith('data:')) {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }

    return { background };
  };

  const getOverlayStyle = () => {
    if (!overlay) return null;

    return {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: typeof overlay === 'number' ? `rgba(0,0,0,${overlay})` : overlay,
      pointerEvents: 'none',
    };
  };

  return (
    <Box
      sx={ {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignMap[align] || 'center',
        justifyContent: alignMap[justify] || 'center',
        ...getBackgroundStyle(),
        ...(overlay && { '&::before': getOverlayStyle() }),
        ...sx,
      } }
      { ...props }
    >
      <Box sx={ { position: 'relative', zIndex: 1 } }>
        { children }
      </Box>
    </Box>
  );
}
