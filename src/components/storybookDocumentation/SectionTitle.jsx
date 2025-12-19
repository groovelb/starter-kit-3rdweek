import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * SectionTitle 컴포넌트
 *
 * 스토리북 문서 내 섹션 제목과 설명을 표시
 * 제목 하단에 구분선 포함
 *
 * Props:
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 섹션 설명 (줄바꿈 지원) [Optional]
 * @param {ReactNode} children - 섹션 내용 [Optional]
 *
 * Example usage:
 * <SectionTitle
 *   title="Color Palette"
 *   description="Primary and secondary colors used in the design system."
 * />
 *
 * <SectionTitle title="Color Palette">
 *   <Table>...</Table>
 * </SectionTitle>
 */
export function SectionTitle({ title, description, children }) {
  return (
    <Box sx={ { mt: 4, mb: 3 } }>
      <Typography
        variant="h5"
        sx={ {
          fontWeight: 600,
          pb: 1,
          mb: 1.5,
          borderBottom: '2px solid',
          borderColor: 'text.primary',
          fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
        } }
      >
        { title }
      </Typography>
      { description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={ { whiteSpace: 'pre-line', mb: children ? 3 : 0, fontFamily: '"Pretendard Variable", Pretendard, sans-serif' } }
        >
          { description }
        </Typography>
      ) }
      { children }
    </Box>
  );
}
