import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { DocumentTitle, PageContainer, SectionTitle } from '../../../components/storybookDocumentation';
import {
  FullPageContainer,
  FullPageSection,
  FullPageSnap,
} from '../../../components/layout/FullPageContainer';

export default {
  title: 'Custom Component/Layout/FullPageContainer',
  component: FullPageContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## FullPageContainer

100vh/svh 높이의 전체 화면 섹션 컨테이너.

### 용도
- Hero 섹션
- 풀스크린 갤러리
- 스크롤 스냅 레이아웃
        `,
      },
    },
  },
  argTypes: {
    heightMode: {
      control: 'select',
      options: ['vh', 'svh', 'dvh'],
      description: '높이 단위',
    },
    heightRatio: {
      control: { type: 'range', min: 0.3, max: 1, step: 0.1 },
      description: '높이 비율',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: '수직 정렬',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around'],
      description: '수평 정렬',
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    heightMode: 'svh',
    heightRatio: 1,
    align: 'center',
    justify: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  render: (args) => (
    <FullPageContainer { ...args }>
      <Typography variant="h2" sx={ { color: 'white', fontWeight: 700 } }>
        Full Page Container
      </Typography>
    </FullPageContainer>
  ),
};

/** 문서 및 데모 */
export const Documentation = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <>
      <DocumentTitle
        title="FullPageContainer"
        status="Available"
        note="Full screen section container"
        brandName="Layout"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          FullPageContainer
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          100vh, 100svh, 100dvh 높이의 전체 화면 섹션 컨테이너입니다.
          Hero 섹션, 풀스크린 갤러리, 스크롤 스냅 레이아웃에 사용됩니다.
        </Typography>

        <SectionTitle title="Height Modes" description="다양한 뷰포트 높이 단위를 지원합니다." />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Mode</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>CSS Unit</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>vh</TableCell>
                <TableCell>100vh</TableCell>
                <TableCell>기본 뷰포트 높이 (주소바 포함)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>svh</TableCell>
                <TableCell>100svh</TableCell>
                <TableCell>Small viewport height (주소바 표시 시 높이)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>dvh</TableCell>
                <TableCell>100dvh</TableCell>
                <TableCell>Dynamic viewport height (주소바에 따라 동적 변화)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Props" description="FullPageContainer 컴포넌트의 Props입니다." />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Prop</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Type</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Default</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>heightMode</TableCell>
                <TableCell>&apos;vh&apos; | &apos;svh&apos; | &apos;dvh&apos;</TableCell>
                <TableCell>&apos;svh&apos;</TableCell>
                <TableCell>높이 단위</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>heightRatio</TableCell>
                <TableCell>number</TableCell>
                <TableCell>1</TableCell>
                <TableCell>높이 비율 (0.5 = 50vh)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>align</TableCell>
                <TableCell>&apos;start&apos; | &apos;center&apos; | &apos;end&apos; | &apos;stretch&apos;</TableCell>
                <TableCell>&apos;center&apos;</TableCell>
                <TableCell>수직 정렬</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>justify</TableCell>
                <TableCell>&apos;start&apos; | &apos;center&apos; | &apos;end&apos; | &apos;between&apos; | &apos;around&apos;</TableCell>
                <TableCell>&apos;center&apos;</TableCell>
                <TableCell>수평 정렬</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>background</TableCell>
                <TableCell>string</TableCell>
                <TableCell>-</TableCell>
                <TableCell>배경 이미지 URL 또는 CSS 값</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>overlay</TableCell>
                <TableCell>number | string</TableCell>
                <TableCell>-</TableCell>
                <TableCell>오버레이 (숫자: 불투명도, 문자열: 색상)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>snap</TableCell>
                <TableCell>&apos;start&apos; | &apos;center&apos; | &apos;end&apos;</TableCell>
                <TableCell>-</TableCell>
                <TableCell>스크롤 스냅 정렬</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Height Ratio Examples" description="다양한 높이 비율입니다." />
        <Stack spacing={ 2 }>
          <Box sx={ { border: '1px solid', borderColor: 'divider', overflow: 'hidden' } }>
            <Typography variant="caption" sx={ { p: 1, display: 'block', backgroundColor: 'grey.100' } }>
              heightRatio=0.3 (30vh)
            </Typography>
            <FullPageContainer
              heightRatio={ 0.3 }
              background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            >
              <Typography variant="h5" sx={ { color: 'white' } }>30% Height</Typography>
            </FullPageContainer>
          </Box>

          <Box sx={ { border: '1px solid', borderColor: 'divider', overflow: 'hidden' } }>
            <Typography variant="caption" sx={ { p: 1, display: 'block', backgroundColor: 'grey.100' } }>
              heightRatio=0.5 (50vh)
            </Typography>
            <FullPageContainer
              heightRatio={ 0.5 }
              background="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            >
              <Typography variant="h5" sx={ { color: 'white' } }>50% Height</Typography>
            </FullPageContainer>
          </Box>
        </Stack>

        <SectionTitle title="Sub Components" description="함께 사용하는 컴포넌트들입니다." />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Component</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>FullPageSection</TableCell>
                <TableCell>스크롤 스냅이 기본 적용된 섹션 (snap=&quot;start&quot;)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>FullPageSnap</TableCell>
                <TableCell>스크롤 스냅 컨테이너</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Usage Example" description="코드 사용 예시입니다." />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 3,
            fontSize: 13,
            fontFamily: 'monospace',
            overflow: 'auto',
            lineHeight: 1.6,
          } }
        >
          { `// Hero 섹션
<FullPageContainer
  background="https://example.com/hero.jpg"
  overlay={0.4}
  align="center"
  justify="center"
>
  <Typography variant="h1" sx={{ color: 'white' }}>
    Welcome
  </Typography>
  <Button variant="contained">Get Started</Button>
</FullPageContainer>

// 절반 높이 섹션
<FullPageContainer heightRatio={0.5} align="end">
  <CtaSection />
</FullPageContainer>

// 스크롤 스냅 페이지
<FullPageSnap>
  <FullPageSection background="section1.jpg">
    <Section1 />
  </FullPageSection>
  <FullPageSection background="section2.jpg">
    <Section2 />
  </FullPageSection>
  <FullPageSection background="section3.jpg">
    <Section3 />
  </FullPageSection>
</FullPageSnap>` }
        </Box>
      </PageContainer>
    </>
  ),
};

/** Hero 섹션 예시 */
export const HeroExample = {
  render: () => (
    <FullPageContainer
      background="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
      overlay={ 0.4 }
    >
      <Stack spacing={ 3 } alignItems="center" sx={ { textAlign: 'center', px: 4 } }>
        <Typography
          variant="overline"
          sx={ { color: 'rgba(255,255,255,0.8)', letterSpacing: 4 } }
        >
          Welcome to
        </Typography>
        <Typography
          variant="h1"
          sx={ {
            color: 'white',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '4rem' },
          } }
        >
          Explore the Mountains
        </Typography>
        <Typography
          variant="h6"
          sx={ {
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 600,
            fontWeight: 400,
          } }
        >
          Discover breathtaking landscapes and embark on adventures that will stay with you forever.
        </Typography>
        <Stack direction="row" spacing={ 2 } sx={ { mt: 2 } }>
          <Button variant="contained" size="large">
            Get Started
          </Button>
          <Button variant="outlined" size="large" sx={ { color: 'white', borderColor: 'white' } }>
            Learn More
          </Button>
        </Stack>
      </Stack>
    </FullPageContainer>
  ),
};

/** 스크롤 스냅 예시 */
export const ScrollSnapExample = {
  render: () => (
    <FullPageSnap>
      <FullPageSection
        background="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
        overlay={ 0.3 }
      >
        <Stack alignItems="center" spacing={ 2 }>
          <Typography variant="h2" sx={ { color: 'white', fontWeight: 700 } }>
            Section 1
          </Typography>
          <Typography variant="body1" sx={ { color: 'white' } }>
            Scroll down to see more
          </Typography>
        </Stack>
      </FullPageSection>

      <FullPageSection
        background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      >
        <Stack alignItems="center" spacing={ 2 }>
          <Typography variant="h2" sx={ { color: 'white', fontWeight: 700 } }>
            Section 2
          </Typography>
          <Typography variant="body1" sx={ { color: 'white' } }>
            Gradient background
          </Typography>
        </Stack>
      </FullPageSection>

      <FullPageSection
        background="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920"
        overlay={ 0.4 }
      >
        <Stack alignItems="center" spacing={ 2 }>
          <Typography variant="h2" sx={ { color: 'white', fontWeight: 700 } }>
            Section 3
          </Typography>
          <Typography variant="body1" sx={ { color: 'white' } }>
            Another image background
          </Typography>
        </Stack>
      </FullPageSection>
    </FullPageSnap>
  ),
};
