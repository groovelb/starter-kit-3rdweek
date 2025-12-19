import { Box } from '@mui/material';

/**
 * BentoGrid 컴포넌트
 *
 * Apple 스타일의 벤토 박스 그리드 레이아웃.
 * CSS Grid를 활용하여 다양한 크기의 셀을 유연하게 배치한다.
 *
 * 동작 방식:
 * 1. columns prop에 따라 기본 그리드 열 개수가 설정됨
 * 2. BentoItem으로 각 셀의 span을 개별 지정
 * 3. rowHeight로 기본 행 높이를 설정하고 span에 따라 높이가 배수로 적용됨
 * 4. 반응형 브레이크포인트에서 열 개수가 자동 조정됨
 *
 * Props:
 * @param {ReactNode} children - BentoItem 컴포넌트들 [Required]
 * @param {number} columns - 기본 열 개수 [Optional, 기본값: 4]
 * @param {number|string} gap - 셀 간 간격 [Optional, 기본값: 2]
 * @param {number|string} rowHeight - 기본 행 높이 [Optional, 기본값: '200px']
 * @param {boolean} isAutoRows - 자동 행 높이 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <BentoGrid columns={4} gap={2}>
 *   <BentoItem colSpan={2} rowSpan={2}>
 *     <FeaturedCard />
 *   </BentoItem>
 *   <BentoItem>
 *     <SmallCard />
 *   </BentoItem>
 * </BentoGrid>
 */
export function BentoGrid({
  children,
  columns = 4,
  gap = 2,
  rowHeight = '200px',
  isAutoRows = false,
  sx,
  ...props
}) {
  /**
   * rowHeight를 CSS 값으로 변환
   */
  const getRowHeight = () => {
    if (typeof rowHeight === 'number') {
      return `${rowHeight}px`;
    }
    return rowHeight;
  };

  /**
   * 반응형 열 개수 설정
   * - xs: 1열
   * - sm: 2열
   * - md: columns / 2 (최소 2열)
   * - lg+: columns
   */
  const getResponsiveColumns = () => {
    const halfColumns = Math.max(2, Math.floor(columns / 2));
    return {
      xs: 1,
      sm: 2,
      md: halfColumns,
      lg: columns,
      xl: columns,
    };
  };

  const responsiveColumns = getResponsiveColumns();

  return (
    <Box
      sx={ {
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${responsiveColumns.xs}, 1fr)`,
          sm: `repeat(${responsiveColumns.sm}, 1fr)`,
          md: `repeat(${responsiveColumns.md}, 1fr)`,
          lg: `repeat(${responsiveColumns.lg}, 1fr)`,
        },
        gridAutoRows: isAutoRows ? 'auto' : `minmax(${getRowHeight()}, auto)`,
        gap: gap,
        width: '100%',
        ...sx,
      } }
      { ...props }
    >
      { children }
    </Box>
  );
}

/**
 * BentoItem 컴포넌트
 *
 * BentoGrid 내에서 개별 셀의 크기와 span을 지정하는 컴포넌트.
 *
 * 동작 방식:
 * 1. colSpan으로 가로 span 지정 (1-4)
 * 2. rowSpan으로 세로 span 지정 (1-3)
 * 3. 반응형 브레이크포인트에서 span이 자동 조정됨
 *
 * Props:
 * @param {ReactNode} children - 셀 콘텐츠 [Required]
 * @param {number|object} colSpan - 열 span (1-4) 또는 반응형 객체 [Optional, 기본값: 1]
 * @param {number|object} rowSpan - 행 span (1-3) 또는 반응형 객체 [Optional, 기본값: 1]
 * @param {string} background - 배경색 [Optional]
 * @param {boolean} isContained - overflow hidden 적용 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <BentoItem colSpan={2} rowSpan={2} background="primary.main">
 *   <FeaturedContent />
 * </BentoItem>
 * <BentoItem colSpan={{ xs: 1, md: 2 }}>
 *   <ResponsiveContent />
 * </BentoItem>
 */
export function BentoItem({
  children,
  colSpan = 1,
  rowSpan = 1,
  background,
  isContained = true,
  sx,
  ...props
}) {
  /**
   * span 값을 CSS grid-column/row 값으로 변환
   * - 숫자: span N
   * - 객체: 반응형 span
   */
  const getSpanValue = (span) => {
    if (typeof span === 'number') {
      return span > 1 ? `span ${span}` : undefined;
    }

    if (typeof span === 'object') {
      const result = {};
      Object.keys(span).forEach(breakpoint => {
        result[breakpoint] = span[breakpoint] > 1 ? `span ${span[breakpoint]}` : undefined;
      });
      return result;
    }

    return undefined;
  };

  return (
    <Box
      sx={ {
        gridColumn: getSpanValue(colSpan),
        gridRow: getSpanValue(rowSpan),
        backgroundColor: background,
        overflow: isContained ? 'hidden' : 'visible',
        borderRadius: 2,
        position: 'relative',
        ...sx,
      } }
      { ...props }
    >
      { children }
    </Box>
  );
}
