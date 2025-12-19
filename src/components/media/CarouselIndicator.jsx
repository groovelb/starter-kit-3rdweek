import Box from '@mui/material/Box';

/**
 * CarouselIndicator 컴포넌트
 *
 * 캐러셀, 슬라이더 등에서 현재 위치를 표시하는 인디케이터 컴포넌트.
 * dot, line, fraction 등 다양한 스타일을 지원한다.
 *
 * 동작 방식:
 * 1. total과 current로 전체 개수와 현재 위치 표시
 * 2. type에 따라 다른 시각적 스타일 적용
 * 3. onClick으로 특정 인덱스 클릭 시 이동 가능
 *
 * Props:
 * @param {number} total - 전체 아이템 개수 [Required]
 * @param {number} current - 현재 활성 인덱스 (0-based) [Required]
 * @param {string} type - 인디케이터 타입 ('dot' | 'line' | 'fraction' | 'progress') [Optional, 기본값: 'dot']
 * @param {string} direction - 배치 방향 ('horizontal' | 'vertical') [Optional, 기본값: 'horizontal']
 * @param {string} size - 크기 ('sm' | 'md' | 'lg') [Optional, 기본값: 'md']
 * @param {string} activeColor - 활성 색상 [Optional, 기본값: 'primary.main']
 * @param {string} inactiveColor - 비활성 색상 [Optional, 기본값: 'grey.400']
 * @param {number} gap - 아이템 간 간격 [Optional, 기본값: 1]
 * @param {function} onClick - 클릭 핸들러 (index) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CarouselIndicator
 *   total={5}
 *   current={2}
 *   type="dot"
 *   onClick={(index) => setCurrentSlide(index)}
 * />
 */
export function CarouselIndicator({
  total,
  current,
  type = 'dot',
  direction = 'horizontal',
  size = 'md',
  activeColor = 'primary.main',
  inactiveColor = 'grey.400',
  gap = 1,
  onClick,
  sx,
  ...props
}) {
  /**
   * 크기별 치수 정의
   */
  const sizes = {
    sm: { dot: 6, line: { width: 16, height: 2 } },
    md: { dot: 8, line: { width: 24, height: 3 } },
    lg: { dot: 10, line: { width: 32, height: 4 } },
  };

  const currentSize = sizes[size] || sizes.md;

  /**
   * Fraction 타입 렌더링 (예: "2 / 5")
   */
  if (type === 'fraction') {
    return (
      <Box
        sx={ {
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
          color: 'text.secondary',
          ...sx,
        } }
        { ...props }
      >
        <Box component="span" sx={ { color: activeColor, fontWeight: 700 } }>
          { current + 1 }
        </Box>
        <Box component="span" sx={ { mx: 0.5, opacity: 0.5 } }>/</Box>
        <Box component="span">{ total }</Box>
      </Box>
    );
  }

  /**
   * Progress 타입 렌더링 (진행 바)
   */
  if (type === 'progress') {
    const progressPercent = ((current + 1) / total) * 100;

    return (
      <Box
        sx={ {
          width: '100%',
          maxWidth: 200,
          height: currentSize.line.height,
          backgroundColor: inactiveColor,
          borderRadius: 1,
          overflow: 'hidden',
          ...sx,
        } }
        { ...props }
      >
        <Box
          sx={ {
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: activeColor,
            transition: 'width 0.3s ease-out',
          } }
        />
      </Box>
    );
  }

  /**
   * Dot / Line 타입 렌더링
   */
  const items = Array.from({ length: total }, (_, index) => index);
  const isVertical = direction === 'vertical';

  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        gap: gap,
        ...sx,
      } }
      { ...props }
    >
      { items.map((index) => {
        const isActive = index === current;

        if (type === 'line') {
          return (
            <Box
              key={ index }
              onClick={ onClick ? () => onClick(index) : undefined }
              sx={ {
                width: isVertical ? currentSize.line.height : currentSize.line.width,
                height: isVertical ? currentSize.line.width : currentSize.line.height,
                backgroundColor: isActive ? activeColor : inactiveColor,
                borderRadius: 0.5,
                cursor: onClick ? 'pointer' : 'default',
                transition: 'all 0.2s ease-out',
                transform: isActive ? 'scaleX(1.2)' : 'scaleX(1)',
                transformOrigin: 'center',
                '&:hover': onClick ? {
                  backgroundColor: isActive ? activeColor : 'grey.500',
                } : {},
              } }
            />
          );
        }

        // Dot type (default)
        return (
          <Box
            key={ index }
            onClick={ onClick ? () => onClick(index) : undefined }
            sx={ {
              width: currentSize.dot,
              height: currentSize.dot,
              borderRadius: '50%',
              backgroundColor: isActive ? activeColor : inactiveColor,
              cursor: onClick ? 'pointer' : 'default',
              transition: 'all 0.2s ease-out',
              transform: isActive ? 'scale(1.2)' : 'scale(1)',
              '&:hover': onClick ? {
                backgroundColor: isActive ? activeColor : 'grey.500',
                transform: 'scale(1.3)',
              } : {},
            } }
          />
        );
      }) }
    </Box>
  );
}
