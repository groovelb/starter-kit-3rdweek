import { forwardRef, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/**
 * CarouselContainer 컴포넌트
 *
 * 반응형 멀티 아이템 캐러셀 컨테이너.
 * 브레이크포인트별로 동시에 보이는 아이템 수를 조절하고,
 * 좌우 네비게이션으로 아이템을 탐색한다.
 *
 * 동작 방식:
 * 1. visible prop에 따라 브레이크포인트별 노출 개수 결정
 * 2. 컨테이너 너비를 자동 감지하여 아이템 너비 계산
 * 3. 좌우 화살표 클릭 시 step 단위로 슬라이드 이동
 * 4. transform translate로 부드러운 애니메이션 적용
 *
 * Props:
 * @param {Array} items - 렌더링할 아이템 배열 [Required]
 * @param {function} renderItem - 아이템 렌더러 (item, index) => ReactNode [Required]
 * @param {object} visible - 브레이크포인트별 노출 개수 {xs, sm, md, lg, xl} [Optional, 기본값: {xs:1, sm:2, md:3, lg:4}]
 * @param {number} gap - 아이템 간 간격 (px) [Optional, 기본값: 16]
 * @param {number} step - 한 번에 이동할 아이템 수 [Optional, 기본값: 1]
 * @param {boolean} hasNavigation - 네비게이션 버튼 표시 여부 [Optional, 기본값: true]
 * @param {boolean} hasDivider - 아이템 사이 구분선 표시 [Optional, 기본값: false]
 * @param {string} dividerColor - 구분선 색상 [Optional, 기본값: 'divider']
 * @param {string} navPosition - 네비게이션 위치 ('inside' | 'outside') [Optional, 기본값: 'inside']
 * @param {function} onIndexChange - 인덱스 변경 콜백 (index) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CarouselContainer
 *   items={products}
 *   renderItem={(item, idx) => <ProductCard {...item} />}
 *   visible={{ xs: 1, sm: 2, md: 3, lg: 4 }}
 *   gap={24}
 * />
 */
const CarouselContainer = forwardRef(function CarouselContainer({
  items = [],
  renderItem,
  visible = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 16,
  step = 1,
  hasNavigation = true,
  hasDivider = false,
  dividerColor = 'divider',
  navPosition = 'inside',
  onIndexChange,
  sx,
  ...props
}, ref) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * 현재 브레이크포인트에서 보이는 아이템 수 계산
   */
  const visibleCount = useMemo(() => {
    if (isLgUp) return visible.lg ?? visible.xl ?? 4;
    if (isMd) return visible.md ?? 3;
    if (isSm) return visible.sm ?? 2;
    return visible.xs ?? 1;
  }, [isSm, isMd, isLgUp, visible]);

  /**
   * 최대 이동 가능 인덱스
   */
  const maxIndex = Math.max(0, (items.length || 0) - visibleCount);

  /**
   * 브레이크포인트 변경 시 인덱스 범위 보정
   * maxIndex가 줄어들면 currentIndex를 자동 조정
   */
  const clampedIndex = Math.min(currentIndex, maxIndex);

  /**
   * 컨테이너 너비 감지 (ResizeObserver)
   */
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const updateWidth = () => setContainerWidth(el.clientWidth);
    updateWidth();

    let resizeObserver;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(el);
    } else {
      window.addEventListener('resize', updateWidth);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', updateWidth);
    };
  }, []);

  /**
   * 아이템 너비 계산
   * 컨테이너 너비에서 gap을 제외한 후 visibleCount로 나눔
   */
  const itemWidth = useMemo(() => {
    if (containerWidth <= 0 || visibleCount <= 0) return 0;

    const totalGap = gap * (visibleCount - 1);
    const availableWidth = containerWidth - totalGap;
    const calculatedWidth = Math.floor(availableWidth / visibleCount);

    return Math.max(50, calculatedWidth);
  }, [containerWidth, visibleCount, gap]);

  /**
   * 이전 슬라이드로 이동
   */
  const handlePrev = useCallback(() => {
    const newIndex = Math.max(0, clampedIndex - step);
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [clampedIndex, step, onIndexChange]);

  /**
   * 다음 슬라이드로 이동
   */
  const handleNext = useCallback(() => {
    const newIndex = Math.min(maxIndex, clampedIndex + step);
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [clampedIndex, maxIndex, step, onIndexChange]);

  /**
   * 트랙 이동 거리 계산
   */
  const translateX = -(clampedIndex * (itemWidth + gap));

  /**
   * 이전/다음 버튼 비활성화 상태
   */
  const isPrevDisabled = clampedIndex <= 0;
  const isNextDisabled = clampedIndex >= maxIndex;

  /**
   * 네비게이션 버튼 공통 스타일
   */
  const getNavButtonStyles = (isDisabled) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 0,
    p: { xs: 0.75, sm: 1 },
    minWidth: 'auto',
    color: isDisabled ? 'text.disabled' : 'text.primary',
    opacity: isDisabled ? 0.4 : 1,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 2,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: isDisabled ? 'background.paper' : 'action.hover',
      borderColor: isDisabled ? 'divider' : 'text.primary',
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      color: 'text.disabled',
      backgroundColor: 'background.paper',
    },
  });

  /**
   * 네비게이션 버튼 위치 (inside/outside)
   */
  const navOffset = navPosition === 'inside'
    ? { xs: 8, sm: 12, md: 16 }
    : { xs: -40, sm: -48, md: -56 };

  /**
   * 아이콘 크기 (반응형)
   */
  const iconSize = isXs ? 18 : isSm ? 20 : isMd ? 22 : 24;

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        overflow: navPosition === 'outside' ? 'visible' : 'hidden',
        ...sx,
      }}
      {...props}
    >
      {/* 슬라이드 트랙 영역 */}
      <Box
        ref={containerRef}
        sx={{
          overflow: 'hidden',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: `${gap}px`,
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
            width: `${(itemWidth + gap) * items.length - gap}px`,
            maxWidth: `${(itemWidth + gap) * items.length - gap}px`,
          }}
        >
          {items.map((item, idx) => {
            const isLastVisible = idx === Math.min(clampedIndex + visibleCount - 1, items.length - 1);

            return (
              <Box
                key={idx}
                sx={{
                  flex: '0 0 auto',
                  width: itemWidth,
                  maxWidth: itemWidth,
                  minWidth: itemWidth,
                  position: 'relative',
                  overflow: 'hidden',
                  // 구분선 (Divider)
                  '&::after': hasDivider && !isLastVisible ? {
                    content: '""',
                    position: 'absolute',
                    right: `-${gap / 2}px`,
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    backgroundColor: dividerColor,
                  } : {},
                }}
              >
                {renderItem(item, idx)}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* 네비게이션 버튼 */}
      {hasNavigation && items.length > visibleCount && (
        <>
          <IconButton
            onClick={handlePrev}
            disabled={isPrevDisabled}
            aria-label="Previous slide"
            sx={{
              ...getNavButtonStyles(isPrevDisabled),
              left: navOffset,
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: iconSize }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            disabled={isNextDisabled}
            aria-label="Next slide"
            sx={{
              ...getNavButtonStyles(isNextDisabled),
              right: navOffset,
            }}
          >
            <ChevronRightIcon sx={{ fontSize: iconSize }} />
          </IconButton>
        </>
      )}
    </Box>
  );
});

export { CarouselContainer };
