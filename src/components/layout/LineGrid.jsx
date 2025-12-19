import React from 'react';
import { Grid, Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * LineGrid Component
 * MUI Grid with lines drawn between items (in spacing gaps)
 *
 * Usage 1 - Grid Container with items:
 * <LineGrid container gap={0}>
 *   <Grid item xs={7.5}>Content 1</Grid>
 *   <Grid item xs={4.5}>Content 2</Grid>
 * </LineGrid>
 *
 * Usage 2 - Stack Layout (vertical):
 * <LineGrid>
 *   <Section1 />
 *   <Section2 />
 * </LineGrid>
 *
 * Usage 3 - Equal Height Grid:
 * <LineGrid container gap={0} equalHeight>
 *   <Grid size={{ xs: 12 }}>Row 1</Grid>
 *   <Grid size={{ xs: 4 }}>Row 2 Col 1</Grid>
 *   <Grid size={{ xs: 4 }}>Row 2 Col 2</Grid>
 *   <Grid size={{ xs: 4 }}>Row 2 Col 3</Grid>
 * </LineGrid>
 *
 * Usage 4 - Custom Row Heights (ratio-based):
 * <LineGrid container gap={0} rowHeights={[1, 2]}>
 *   <Grid size={{ xs: 12 }}>Row 1 (1/3 height)</Grid>
 *   <Grid size={{ xs: 4 }}>Row 2 Col 1 (2/3 height)</Grid>
 *   <Grid size={{ xs: 4 }}>Row 2 Col 2</Grid>
 *   <Grid size={{ xs: 4 }}>Row 2 Col 3</Grid>
 * </LineGrid>
 *
 * Usage 5 - With border at start/end:
 * <LineGrid borderStart borderEnd>
 *   <Section1 />
 *   <Section2 />
 * </LineGrid>
 */
const LineGrid = React.forwardRef(({
  container,
  children,
  gap = 0,
  borderColor = 'text.primary',
  equalHeight = false,
  rowHeights = null, // [1, 2, 1] means row ratios
  borderStart = false, // 시작 부분 border 표시
  borderEnd = false, // 끝 부분 border 표시
  ...props
}, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Stack mode (no container prop)
  if (!container) {
    // 1px 높이 라인 (Grid 모드와 동일)
    const lineElement = (
      <Box
        sx={{
          width: '100%',
          height: '1px',
          bgcolor: borderColor,
          transition: 'background-color 1s ease',
        }}
      />
    );

    return (
      <Box ref={ref} {...props}>
        {borderStart && lineElement}
        <Stack spacing={gap / 8} divider={lineElement}>
          {children}
        </Stack>
        {borderEnd && lineElement}
      </Box>
    );
  }

  // Grid container mode
  const childrenArray = React.Children.toArray(children);

  // Calculate each item's span (size prop - MUI Grid v2)
  const spans = childrenArray.map((child) => {
    if (!React.isValidElement(child)) return 12;
    const sizeProps = child.props.size || {};
    let span;
    if (isMobile) {
      span = sizeProps.xs || sizeProps.sm || 12;
    } else {
      span = sizeProps.md || sizeProps.lg || sizeProps.xl || sizeProps.xs || 12;
    }
    return Math.max(1, Math.min(12, typeof span === 'number' ? span : 12));
  });

  // Calculate row and column positions
  const layout = [];
  let rowIndex = 0;
  let colCursor = 0;

  spans.forEach((span, i) => {
    if (span > 12 - colCursor) {
      rowIndex += 1;
      colCursor = 0;
    }

    layout[i] = { row: rowIndex, colStart: colCursor, span };
    colCursor += span;

    if (colCursor >= 12) {
      rowIndex += 1;
      colCursor = 0;
    }
  });

  // Calculate total number of rows for equalHeight
  const totalRows = layout.length > 0 ? Math.max(...layout.map(l => l.row)) + 1 : 1;

  // Calculate row height percentages from rowHeights
  const getRowHeight = (rowIndex) => {
    if (rowHeights && Array.isArray(rowHeights)) {
      const totalRatio = rowHeights.reduce((sum, ratio) => sum + ratio, 0);
      const rowRatio = rowHeights[rowIndex] || 1;
      return `${(rowRatio / totalRatio) * 100}%`;
    }
    if (equalHeight) {
      return `calc(100% / ${totalRows})`;
    }
    return 'auto';
  };

  // Determine if container should have fixed height
  const shouldFixHeight = equalHeight || (rowHeights && Array.isArray(rowHeights));

  return (
    <Grid container spacing={gap / 8} ref={ref} {...props} sx={{ width: '100%', height: shouldFixHeight ? '100%' : 'auto' }}>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;

        const meta = layout[index] || { row: 0, colStart: 0, span: 12 };
        const isFirstRow = meta.row === 0;
        const isFirstInRow = meta.colStart === 0;

        return React.cloneElement(child, {
          ...child.props,
          sx: {
            position: 'relative',
            // Set height based on equalHeight or rowHeights
            ...(shouldFixHeight && {
              height: getRowHeight(meta.row),
            }),
            // Vertical line (left border, skip first item in row)
            ...(!isFirstInRow && {
              '&::before': {
                content: '""',
                position: 'absolute',
                left: `-${gap / 2}px`,
                top: 0,
                bottom: 0,
                width: '1px',
                bgcolor: borderColor,
                transition: 'background-color 1s ease',
                zIndex: 10,
              },
            }),
            // Horizontal line (top border, skip first row)
            ...(!isFirstRow && {
              '&::after': {
                content: '""',
                position: 'absolute',
                top: `-${gap / 2}px`,
                left: 0,
                right: 0,
                height: '1px',
                bgcolor: borderColor,
                transition: 'background-color 1s ease',
                zIndex: 10,
              },
            }),
            ...child.props.sx,
          },
        });
      })}
    </Grid>
  );
});

LineGrid.displayName = 'LineGrid';

export default LineGrid;
