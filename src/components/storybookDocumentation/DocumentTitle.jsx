import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

/**
 * Section 컴포넌트
 *
 * Props:
 * @param {ReactNode} children - 섹션 내부 콘텐츠 [Required]
 * @param {boolean} isEnd - 마지막 섹션 여부 (우측 border 제거) [Optional, 기본값: false]
 *
 * Example usage:
 * <Section isEnd={ false }>
 *   <Typography>Label</Typography>
 *   <Typography>Value</Typography>
 * </Section>
 */
function Section({ children, isEnd = false }) {
  const theme = useTheme();

  return (
    <Box
      sx={ {
        px: 1.5,
        py: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        borderRight: isEnd ? 'none' : `1px solid ${ theme.palette.divider }`,
        color: theme.palette.text.primary,
      } }
    >
      { children }
    </Box>
  );
}

/**
 * DocumentTitle 컴포넌트
 *
 * 스토리북 문서 상단에 표시되는 타이틀 바
 * 문서 제목, 상태, 노트, 브랜드 정보, 버전을 표시
 *
 * Props:
 * @param {string} title - 문서 제목 (예: Color System) [Required]
 * @param {string} status - 컴포넌트 상태 (예: Available, Disabled, Pending) [Optional, 기본값: 'Available']
 * @param {string} note - 문서 관련 노트 [Optional, 기본값: 'N/A']
 * @param {string} brandName - 브랜드명 라벨 [Optional]
 * @param {string} systemName - 디자인 시스템명 [Optional]
 * @param {string} version - 버전 정보 [Optional, 기본값: '1.0']
 *
 * Example usage:
 * <DocumentTitle
 *   title="Color System"
 *   status="Available"
 *   note="Primary colors updated"
 *   brandName="Brand"
 *   systemName="Starter Kit"
 *   version="1.0"
 * />
 */
export function DocumentTitle({
  title,
  status = 'Available',
  note = 'N/A',
  brandName,
  systemName,
  version = '1.0',
}) {
  const theme = useTheme();

  const renderLabel = (label) =>
    label ? (
      <Typography variant="caption" sx={ { color: theme.palette.text.secondary, fontFamily: '"Pretendard Variable", Pretendard, sans-serif' } }>
        { label }
      </Typography>
    ) : null;

  const renderValue = (value) => (
    <Typography variant="body2" sx={ { fontWeight: 600, wordBreak: 'keep-all', fontFamily: '"Pretendard Variable", Pretendard, sans-serif' } }>
      { value ?? '' }
    </Typography>
  );

  return (
    <>
      <Container
        disableGutters
        maxWidth={ false }
        sx={ {
          borderBottom: `1px solid ${ theme.palette.divider }`,
          pt: { xs: 1, md: 2 },
          pb: { xs: 1, md: 2 },
          px: { xs: 1, md: 4 },
          position: 'fixed',
          width: '100%',
          left: 0,
          top: 0,
          backgroundColor: theme.palette.background.paper,
          zIndex: 999,
        } }
      >
        <Grid container columns={ { xs: 24 } } spacing={ 0 }>
          <Grid size={ { xs: 24, md: 3 } }>
            <Section isEnd={ false }>
              { renderLabel('Title') }
              { renderValue(title) }
            </Section>
          </Grid>
          <Grid size={ { xs: 24, md: 2 } }>
            <Section isEnd={ false }>
              { renderLabel('Status') }
              { renderValue(status) }
            </Section>
          </Grid>
          <Grid size={ { xs: 24, md: 12 } }>
            <Section isEnd={ false }>
              { renderLabel('Note') }
              { renderValue(note) }
            </Section>
          </Grid>
          <Grid size={ { xs: 24, md: 6 } }>
            <Section isEnd={ false }>
              { renderLabel(brandName) }
              { renderValue(systemName) }
            </Section>
          </Grid>
          <Grid size={ { xs: 24, md: 1 } }>
            <Section isEnd>
              { renderLabel('Version') }
              { renderValue(version) }
            </Section>
          </Grid>
        </Grid>
      </Container>
      <Box sx={ { height: '56px' } } />
    </>
  );
}
