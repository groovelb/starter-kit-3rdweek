import { forwardRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';

/**
 * 활성 인디케이터 펄스 애니메이션
 */
const pulseKeyframe = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

/**
 * 프로그레스 바 shimmer 효과
 */
const shimmerKeyframe = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

/**
 * Indicator 컴포넌트
 *
 * 캐러셀, 슬라이더, 페이지네이션 등에서 현재 위치를 표시하는 인디케이터.
 * 다양한 시각적 스타일과 인터랙션을 지원한다.
 *
 * 동작 방식:
 * 1. total과 current로 전체 개수와 현재 위치 표시
 * 2. variant에 따라 다른 시각적 스타일 적용 (dot, line, dash, fraction, progress)
 * 3. onClick으로 특정 인덱스 클릭 시 이동 가능
 * 4. 키보드 접근성 지원 (화살표 키로 탐색)
 *
 * Props:
 * @param {number} total - 전체 아이템 개수 [Required]
 * @param {number} current - 현재 활성 인덱스 (0-based) [Required]
 * @param {string} variant - 인디케이터 스타일 ('dot' | 'line' | 'dash' | 'fraction' | 'progress') [Optional, 기본값: 'dot']
 * @param {string} direction - 배치 방향 ('horizontal' | 'vertical') [Optional, 기본값: 'horizontal']
 * @param {string} size - 크기 ('sm' | 'md' | 'lg') [Optional, 기본값: 'md']
 * @param {string} activeColor - 활성 색상 [Optional, 기본값: 'common.white']
 * @param {string} inactiveColor - 비활성 색상 [Optional, 기본값: 'rgba(255,255,255,0.4)']
 * @param {number} gap - 아이템 간 간격 (spacing unit) [Optional, 기본값: 1]
 * @param {boolean} hasAnimation - 애니메이션 활성화 [Optional, 기본값: true]
 * @param {boolean} hasHoverEffect - 호버 효과 활성화 [Optional, 기본값: true]
 * @param {function} onClick - 클릭 핸들러 (index) => void [Optional]
 * @param {function} onKeyNavigate - 키보드 탐색 핸들러 (direction: 'prev' | 'next') => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <Indicator
 *   total={5}
 *   current={2}
 *   variant="dot"
 *   onClick={(index) => setCurrentSlide(index)}
 * />
 */
const Indicator = forwardRef(function Indicator({
  total,
  current,
  variant = 'dot',
  direction = 'horizontal',
  size = 'md',
  activeColor = 'common.white',
  inactiveColor = 'rgba(255,255,255,0.4)',
  gap = 1,
  hasAnimation = true,
  hasHoverEffect = true,
  onClick,
  onKeyNavigate,
  sx,
  ...props
}, ref) {
  /**
   * 크기별 치수 정의
   */
  const sizeMap = {
    sm: {
      dot: 6,
      line: { width: 16, height: 2 },
      dash: { width: 12, height: 2, activeWidth: 24 },
      fontSize: 11,
      progressHeight: 2,
    },
    md: {
      dot: 8,
      line: { width: 24, height: 3 },
      dash: { width: 16, height: 3, activeWidth: 32 },
      fontSize: 13,
      progressHeight: 3,
    },
    lg: {
      dot: 10,
      line: { width: 32, height: 4 },
      dash: { width: 20, height: 4, activeWidth: 40 },
      fontSize: 15,
      progressHeight: 4,
    },
  };

  const dimensions = sizeMap[size] || sizeMap.md;
  const isVertical = direction === 'vertical';
  const isInteractive = Boolean(onClick);

  /**
   * 키보드 네비게이션 핸들러
   */
  const handleKeyDown = useCallback((e) => {
    if (!onKeyNavigate) return;

    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

    if (e.key === prevKey) {
      e.preventDefault();
      onKeyNavigate('prev');
    } else if (e.key === nextKey) {
      e.preventDefault();
      onKeyNavigate('next');
    }
  }, [isVertical, onKeyNavigate]);

  /**
   * 공통 인터랙션 스타일
   */
  const getInteractionStyles = (isActive) => {
    if (!isInteractive) return {};

    return {
      cursor: 'pointer',
      '&:hover': hasHoverEffect ? {
        transform: isActive ? 'scale(1.15)' : 'scale(1.25)',
        opacity: 1,
      } : {},
      '&:focus-visible': {
        outline: '2px solid',
        outlineColor: activeColor,
        outlineOffset: 2,
      },
    };
  };

  /**
   * Fraction 타입 렌더링 (예: "02 / 05")
   */
  if (variant === 'fraction') {
    const formatNumber = (n) => String(n).padStart(2, '0');

    return (
      <Box
        ref={ref}
        role="status"
        aria-label={`${current + 1} of ${total}`}
        sx={{
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 0.75,
          fontFamily: '"JetBrains Mono", "SF Mono", monospace',
          fontSize: dimensions.fontSize,
          fontWeight: 500,
          letterSpacing: '0.05em',
          ...sx,
        }}
        {...props}
      >
        <Typography
          component="span"
          sx={{
            color: activeColor,
            fontWeight: 600,
            fontSize: 'inherit',
            fontFamily: 'inherit',
            letterSpacing: 'inherit',
          }}
        >
          {formatNumber(current + 1)}
        </Typography>
        <Typography
          component="span"
          sx={{
            color: inactiveColor,
            fontSize: '0.85em',
            fontFamily: 'inherit',
          }}
        >
          /
        </Typography>
        <Typography
          component="span"
          sx={{
            color: inactiveColor,
            fontSize: 'inherit',
            fontFamily: 'inherit',
            letterSpacing: 'inherit',
          }}
        >
          {formatNumber(total)}
        </Typography>
      </Box>
    );
  }

  /**
   * Progress 타입 렌더링 (진행 바)
   */
  if (variant === 'progress') {
    const progressPercent = ((current + 1) / total) * 100;

    return (
      <Box
        ref={ref}
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Progress: ${current + 1} of ${total}`}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 180,
          height: dimensions.progressHeight,
          backgroundColor: inactiveColor,
          borderRadius: dimensions.progressHeight / 2,
          overflow: 'hidden',
          ...sx,
        }}
        {...props}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: activeColor,
            borderRadius: 'inherit',
            transition: hasAnimation ? 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            // Shimmer 효과
            '&::after': hasAnimation ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(
                90deg,
                transparent 0%,
                rgba(255,255,255,0.3) 50%,
                transparent 100%
              )`,
              backgroundSize: '200% 100%',
              animation: `${shimmerKeyframe} 2s ease-in-out infinite`,
            } : {},
          }}
        />
      </Box>
    );
  }

  /**
   * Dot / Line / Dash 타입 렌더링
   */
  const items = Array.from({ length: total }, (_, index) => index);

  return (
    <Box
      ref={ref}
      role="tablist"
      aria-label="Slide indicators"
      tabIndex={onKeyNavigate ? 0 : undefined}
      onKeyDown={handleKeyDown}
      sx={{
        display: 'inline-flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        gap: gap,
        outline: 'none',
        ...sx,
      }}
      {...props}
    >
      {items.map((index) => {
        const isActive = index === current;

        // Dot variant
        if (variant === 'dot') {
          return (
            <Box
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={isInteractive ? 0 : -1}
              onClick={onClick ? () => onClick(index) : undefined}
              sx={{
                width: dimensions.dot,
                height: dimensions.dot,
                borderRadius: '50%',
                backgroundColor: isActive ? activeColor : inactiveColor,
                opacity: isActive ? 1 : 0.6,
                transition: hasAnimation
                  ? 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                animation: isActive && hasAnimation
                  ? `${pulseKeyframe} 2s ease-in-out infinite`
                  : 'none',
                ...getInteractionStyles(isActive),
              }}
            />
          );
        }

        // Line variant
        if (variant === 'line') {
          return (
            <Box
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={isInteractive ? 0 : -1}
              onClick={onClick ? () => onClick(index) : undefined}
              sx={{
                width: isVertical ? dimensions.line.height : dimensions.line.width,
                height: isVertical ? dimensions.line.width : dimensions.line.height,
                borderRadius: dimensions.line.height / 2,
                backgroundColor: isActive ? activeColor : inactiveColor,
                opacity: isActive ? 1 : 0.5,
                transition: hasAnimation
                  ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
                transform: isActive
                  ? (isVertical ? 'scaleY(1.3)' : 'scaleX(1.3)')
                  : 'scale(1)',
                transformOrigin: 'center',
                ...getInteractionStyles(isActive),
              }}
            />
          );
        }

        // Dash variant (활성 시 확장)
        if (variant === 'dash') {
          const baseWidth = isVertical ? dimensions.dash.height : dimensions.dash.width;
          const activeWidth = isVertical ? dimensions.dash.height : dimensions.dash.activeWidth;
          const baseHeight = isVertical ? dimensions.dash.width : dimensions.dash.height;
          const activeHeight = isVertical ? dimensions.dash.activeWidth : dimensions.dash.height;

          return (
            <Box
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={isInteractive ? 0 : -1}
              onClick={onClick ? () => onClick(index) : undefined}
              sx={{
                width: isActive ? activeWidth : baseWidth,
                height: isActive ? activeHeight : baseHeight,
                borderRadius: dimensions.dash.height / 2,
                backgroundColor: isActive ? activeColor : inactiveColor,
                opacity: isActive ? 1 : 0.5,
                transition: hasAnimation
                  ? 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
                ...getInteractionStyles(isActive),
              }}
            />
          );
        }

        return null;
      })}
    </Box>
  );
});

export { Indicator };
