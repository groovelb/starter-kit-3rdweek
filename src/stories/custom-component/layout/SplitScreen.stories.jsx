import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DocumentTitle, PageContainer, SectionTitle, GridContent } from '../../../components/storybookDocumentation';
import {
  SplitScreen,
  StickySection,
  SplitOverlay,
} from '../../../components/layout/SplitScreen';

export default {
  title: 'Custom Component/Layout/SplitScreen',
  component: SplitScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## SplitScreen

화면을 두 영역으로 분할하는 레이아웃 컴포넌트.

### 용도
- 로그인/회원가입 페이지
- 비교 레이아웃
- 이미지/콘텐츠 분할 섹션
        `,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: '분할 방향',
    },
    ratio: {
      control: 'select',
      options: ['50:50', '60:40', '40:60', '70:30', '30:70'],
      description: '분할 비율',
    },
    stackAt: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'none'],
      description: '스택 전환 브레이크포인트',
    },
    isFullHeight: {
      control: 'boolean',
      description: '100vh 높이 적용',
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    direction: 'row',
    ratio: '50:50',
    stackAt: 'sm',
    isFullHeight: false,
    gap: 0,
  },
  render: (args) => (
    <SplitScreen
      { ...args }
      left={ <GridContent label="Left" variant="primary" height={ 300 } /> }
      right={ <GridContent label="Right" variant="secondary" height={ 300 } /> }
    />
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
        title="SplitScreen"
        status="Available"
        note="Screen split layout component"
        brandName="Layout"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          SplitScreen
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          화면을 두 영역으로 분할하는 레이아웃 컴포넌트입니다.
          다양한 비율과 반응형 전환을 지원합니다.
        </Typography>

        <SectionTitle title="Props" description="SplitScreen 컴포넌트의 Props입니다." />
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
                <TableCell sx={ { fontFamily: 'monospace' } }>left</TableCell>
                <TableCell>ReactNode</TableCell>
                <TableCell>-</TableCell>
                <TableCell>왼쪽(상단) 영역 콘텐츠</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>right</TableCell>
                <TableCell>ReactNode</TableCell>
                <TableCell>-</TableCell>
                <TableCell>오른쪽(하단) 영역 콘텐츠</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>ratio</TableCell>
                <TableCell>string | number[]</TableCell>
                <TableCell>&apos;50:50&apos;</TableCell>
                <TableCell>분할 비율</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>direction</TableCell>
                <TableCell>&apos;row&apos; | &apos;column&apos;</TableCell>
                <TableCell>&apos;row&apos;</TableCell>
                <TableCell>분할 방향</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>stackAt</TableCell>
                <TableCell>&apos;xs&apos; | &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;none&apos;</TableCell>
                <TableCell>&apos;sm&apos;</TableCell>
                <TableCell>스택 전환 브레이크포인트</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>stackOrder</TableCell>
                <TableCell>&apos;normal&apos; | &apos;reverse&apos;</TableCell>
                <TableCell>&apos;normal&apos;</TableCell>
                <TableCell>스택 시 순서</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>isFullHeight</TableCell>
                <TableCell>boolean</TableCell>
                <TableCell>false</TableCell>
                <TableCell>100vh 높이 적용</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Ratio Presets" description="자주 사용되는 분할 비율입니다." />
        <Stack spacing={ 3 }>
          { ['50:50', '60:40', '70:30'].map((r) => (
            <Box key={ r }>
              <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
                ratio=&quot;{ r }&quot;
              </Typography>
              <SplitScreen
                ratio={ r }
                stackAt="none"
                left={ <GridContent label={ r.split(':')[0] + '%' } variant="primary" height={ 80 } /> }
                right={ <GridContent label={ r.split(':')[1] + '%' } variant="secondary" height={ 80 } /> }
              />
            </Box>
          )) }
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
                <TableCell sx={ { fontFamily: 'monospace' } }>StickySection</TableCell>
                <TableCell>스크롤 시 고정되는 섹션</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>SplitOverlay</TableCell>
                <TableCell>배경 이미지 + 오버레이가 적용된 영역</TableCell>
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
          { `// 기본 50:50 분할
<SplitScreen
  left={<ImageSection />}
  right={<ContentSection />}
/>

// 60:40 비율
<SplitScreen
  ratio="60:40"
  left={<LargeSection />}
  right={<SmallSection />}
/>

// 배경 이미지 + 폼
<SplitScreen
  isFullHeight
  ratio="60:40"
  stackAt="md"
  left={
    <SplitOverlay
      background="https://example.com/bg.jpg"
      overlay={0.4}
    >
      <Typography variant="h2" sx={{ color: 'white' }}>
        Welcome
      </Typography>
    </SplitOverlay>
  }
  right={
    <Box sx={{ p: 4 }}>
      <LoginForm />
    </Box>
  }
/>

// Sticky 섹션
<SplitScreen
  left={
    <StickySection>
      <FixedImage />
    </StickySection>
  }
  right={<ScrollingContent />}
/>` }
        </Box>
      </PageContainer>
    </>
  ),
};

/** 로그인 페이지 예시 */
export const LoginPageExample = {
  render: () => (
    <SplitScreen
      isFullHeight
      ratio="55:45"
      stackAt="md"
      left={
        <SplitOverlay
          background="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
          overlay={ 0.4 }
        >
          <Stack spacing={ 2 } sx={ { textAlign: 'center', px: 4 } }>
            <Typography variant="h3" sx={ { color: 'white', fontWeight: 700 } }>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={ { color: 'rgba(255,255,255,0.9)' } }>
              Sign in to continue your journey
            </Typography>
          </Stack>
        </SplitOverlay>
      }
      right={
        <Box
          sx={ {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 4, md: 8 },
            backgroundColor: 'background.paper',
          } }
        >
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            Enter your credentials to access your account
          </Typography>
          <Stack spacing={ 3 }>
            <TextField label="Email" fullWidth />
            <TextField label="Password" type="password" fullWidth />
            <Button variant="contained" size="large" fullWidth>
              Sign In
            </Button>
            <Typography variant="body2" color="text.secondary" sx={ { textAlign: 'center' } }>
              Don&apos;t have an account? Sign up
            </Typography>
          </Stack>
        </Box>
      }
    />
  ),
};

/** 비교 레이아웃 예시 */
export const ComparisonExample = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <SplitScreen
      ratio="50:50"
      gap={ 2 }
      stackAt="md"
      minHeight="400px"
      left={
        <Box sx={ { p: 4, backgroundColor: 'grey.50', height: '100%' } }>
          <Typography variant="h5" sx={ { fontWeight: 700, mb: 2 } }>
            Free Plan
          </Typography>
          <Stack spacing={ 1 }>
            <Typography variant="body2">✓ 5 projects</Typography>
            <Typography variant="body2">✓ Basic analytics</Typography>
            <Typography variant="body2">✓ Email support</Typography>
            <Typography variant="body2" color="text.disabled">✗ Custom domain</Typography>
            <Typography variant="body2" color="text.disabled">✗ Priority support</Typography>
          </Stack>
          <Button variant="outlined" fullWidth sx={ { mt: 4 } }>
            Get Started
          </Button>
        </Box>
      }
      right={
        <Box sx={ { p: 4, backgroundColor: 'primary.main', color: 'white', height: '100%' } }>
          <Typography variant="h5" sx={ { fontWeight: 700, mb: 2 } }>
            Pro Plan
          </Typography>
          <Stack spacing={ 1 }>
            <Typography variant="body2">✓ Unlimited projects</Typography>
            <Typography variant="body2">✓ Advanced analytics</Typography>
            <Typography variant="body2">✓ Priority support</Typography>
            <Typography variant="body2">✓ Custom domain</Typography>
            <Typography variant="body2">✓ API access</Typography>
          </Stack>
          <Button
            variant="contained"
            fullWidth
            sx={ { mt: 4, backgroundColor: 'white', color: 'primary.main' } }
          >
            Upgrade Now
          </Button>
        </Box>
      }
    />
  ),
};

/** Sticky 섹션 예시 */
export const StickySectionExample = {
  render: () => (
    <Box sx={ { height: '200vh' } }>
      <SplitScreen
        ratio="50:50"
        stackAt="md"
        left={
          <StickySection height="100vh">
            <Box
              sx={ {
                height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              } }
            />
          </StickySection>
        }
        right={
          <Box sx={ { p: 6 } }>
            <Stack spacing={ 8 }>
              { [1, 2, 3, 4].map((section) => (
                <Box key={ section }>
                  <Typography variant="h4" sx={ { fontWeight: 700, mb: 2 } }>
                    Section { section }
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    This is the content for section { section }. The left side image stays fixed
                    while this content scrolls. This creates an engaging storytelling experience
                    that keeps the visual context while progressing through content.
                  </Typography>
                </Box>
              )) }
            </Stack>
          </Box>
        }
      />
    </Box>
  ),
};
