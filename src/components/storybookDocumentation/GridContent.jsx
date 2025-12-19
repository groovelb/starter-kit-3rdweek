import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * GridContent 컴포넌트
 *
 * Storybook에서 그리드/레이아웃 데모 시 사용하는 통일된 콘텐츠 셀입니다.
 * 일관된 색상 토큰을 사용하여 시각적 통일성을 제공합니다.
 *
 * Props:
 * @param {ReactNode} children - 셀 내부에 표시할 콘텐츠 [Optional]
 * @param {string} label - 셀에 표시할 텍스트 레이블 (children이 없을 때 사용) [Optional]
 * @param {'default' | 'primary' | 'secondary'} variant - 색상 변형 [Optional, 기본값: 'default']
 *   - default: 회색 배경 (grey.100), 보조 텍스트 색상 - 일반 콘텐츠
 *   - primary: Primary 색상 배경 - 강조/중요한 영역
 *   - secondary: Secondary 색상 배경 - 대비/구분 영역
 * @param {string | number} height - 셀 높이 [Optional, 기본값: 'auto']
 * @param {string | number} minHeight - 최소 높이 [Optional, 기본값: 60]
 * @param {object} sx - 추가 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <GridContent label="xs=6" variant="primary" />
 * <GridContent variant="secondary" height={100}>Custom Content</GridContent>
 */
function GridContent({
  children,
  label,
  variant = 'default',
  height = 'auto',
  minHeight = 60,
  sx = {},
}) {
  const variants = {
    default: {
      backgroundColor: 'grey.100',
      color: 'text.secondary',
      borderColor: 'grey.300',
    },
    primary: {
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
      borderColor: 'primary.dark',
    },
    secondary: {
      backgroundColor: 'secondary.main',
      color: 'secondary.contrastText',
      borderColor: 'secondary.dark',
    },
  };

  const style = variants[variant] || variants.default;

  return (
    <Box
      sx={ {
        height,
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        ...style,
        ...sx,
      } }
    >
      { children || (
        <Typography
          variant="body2"
          sx={ {
            fontWeight: 600,
            fontFamily: 'monospace',
            fontSize: 13,
          } }
        >
          { label }
        </Typography>
      ) }
    </Box>
  );
}

export { GridContent };
