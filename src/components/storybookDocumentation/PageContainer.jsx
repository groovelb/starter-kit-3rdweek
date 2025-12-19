import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/**
 * PageContainer 컴포넌트
 *
 * 스토리북 문서 페이지의 최상위 컨테이너
 * xl(1536px) 이상에서는 maxWidth 적용, 이하에서는 100% 너비
 * DocumentTitle 고정 헤더를 고려한 상단 패딩 포함
 *
 * Props:
 * @param {ReactNode} children - 페이지 콘텐츠 [Required]
 * @param {string} maxWidth - 최대 너비 breakpoint [Optional, 기본값: 'xl']
 *
 * Example usage:
 * <PageContainer>
 *   <Typography variant="h4">Title</Typography>
 *   <Table>...</Table>
 * </PageContainer>
 */
export function PageContainer({ children, maxWidth = 'xl' }) {
  return (
    <Container
      maxWidth={ maxWidth }
      disableGutters
      sx={ {
        width: '100%',
        pt: { xs: 8, sm: 12, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 4, sm: 5, md: 6 },
      } }
    >
      { children }
    </Container>
  );
}
