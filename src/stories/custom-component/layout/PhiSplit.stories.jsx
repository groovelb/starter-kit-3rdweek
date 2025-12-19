import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DocumentTitle, PageContainer, SectionTitle, GridContent } from '../../../components/storybookDocumentation';
import { PhiSplit, PHI } from '../../../components/layout/PhiSplit';

export default {
  title: 'Custom Component/Layout/PhiSplit',
  component: PhiSplit,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## PhiSplit

황금비율(φ = 1.618)을 기반으로 두 영역을 분할하는 레이아웃 컴포넌트.

### 용도
- Hero 섹션의 이미지/텍스트 분할
- 사이드바와 메인 콘텐츠 레이아웃
- 시각적으로 균형 잡힌 2분할 레이아웃
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
    isReversed: {
      control: 'boolean',
      description: '비율 반전',
    },
    gap: {
      control: { type: 'range', min: 0, max: 8 },
      description: '영역 간 간격',
    },
    stackAt: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'none'],
      description: '스택 전환 브레이크포인트',
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    direction: 'row',
    isReversed: false,
    gap: 2,
    stackAt: 'sm',
  },
  render: (args) => (
    <PhiSplit
      { ...args }
      primary={
        <GridContent label="Primary (61.8%)" variant="primary" height={ 200 } />
      }
      secondary={
        <GridContent label="Secondary (38.2%)" variant="secondary" height={ 200 } />
      }
    />
  ),
};

/** 문서 및 데모 */
export const Documentation = {
  render: () => (
    <>
      <DocumentTitle
        title="PhiSplit"
        status="Available"
        note="Golden ratio based two-column layout"
        brandName="Layout"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          PhiSplit
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          황금비율(φ = 1.618)을 기반으로 두 영역을 분할하는 레이아웃 컴포넌트입니다.
          약 61.8% : 38.2% 비율로 시각적 균형을 제공합니다.
        </Typography>

        <SectionTitle title="Golden Ratio" description={ `PHI = ${PHI.toFixed(6)}` } />
        <Box sx={ { p: 3, backgroundColor: 'grey.50', mb: 4 } }>
          <Typography variant="body2" sx={ { mb: 2 } }>
            황금비율은 자연과 예술에서 발견되는 수학적 비율입니다:
          </Typography>
          <Stack direction="row" spacing={ 4 }>
            <Box>
              <Typography variant="caption" color="text.secondary">Primary 영역</Typography>
              <Typography variant="h6">
                { ((PHI / (PHI + 1)) * 100).toFixed(1) }%
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Secondary 영역</Typography>
              <Typography variant="h6">
                { ((1 / (PHI + 1)) * 100).toFixed(1) }%
              </Typography>
            </Box>
          </Stack>
        </Box>

        <SectionTitle title="Props" description="PhiSplit 컴포넌트의 Props 목록입니다." />
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
                <TableCell sx={ { fontFamily: 'monospace' } }>primary</TableCell>
                <TableCell>ReactNode</TableCell>
                <TableCell>-</TableCell>
                <TableCell>큰 영역 (61.8%) 콘텐츠</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>secondary</TableCell>
                <TableCell>ReactNode</TableCell>
                <TableCell>-</TableCell>
                <TableCell>작은 영역 (38.2%) 콘텐츠</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>direction</TableCell>
                <TableCell>&apos;row&apos; | &apos;column&apos;</TableCell>
                <TableCell>&apos;row&apos;</TableCell>
                <TableCell>분할 방향</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>isReversed</TableCell>
                <TableCell>boolean</TableCell>
                <TableCell>false</TableCell>
                <TableCell>비율 반전 (작은 영역 먼저)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>gap</TableCell>
                <TableCell>number</TableCell>
                <TableCell>0</TableCell>
                <TableCell>영역 간 간격 (spacing 단위)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>stackAt</TableCell>
                <TableCell>&apos;xs&apos; | &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;none&apos;</TableCell>
                <TableCell>&apos;sm&apos;</TableCell>
                <TableCell>스택 전환 브레이크포인트</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>primarySx</TableCell>
                <TableCell>object</TableCell>
                <TableCell>-</TableCell>
                <TableCell>Primary 영역 추가 스타일</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>secondarySx</TableCell>
                <TableCell>object</TableCell>
                <TableCell>-</TableCell>
                <TableCell>Secondary 영역 추가 스타일</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Horizontal Split" description="가로 방향 분할 (기본)" />
        <Stack spacing={ 4 }>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              기본 - Primary가 왼쪽
            </Typography>
            <PhiSplit
              gap={ 2 }
              stackAt="none"
              primary={
                <GridContent label="Primary (61.8%)" variant="primary" height={ 150 } />
              }
              secondary={
                <GridContent label="Secondary (38.2%)" variant="secondary" height={ 150 } />
              }
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              isReversed - Secondary가 왼쪽
            </Typography>
            <PhiSplit
              gap={ 2 }
              isReversed
              stackAt="none"
              primary={
                <GridContent label="Primary (61.8%)" variant="primary" height={ 150 } />
              }
              secondary={
                <GridContent label="Secondary (38.2%)" variant="secondary" height={ 150 } />
              }
            />
          </Box>
        </Stack>

        <SectionTitle title="Vertical Split" description="세로 방향 분할" />
        <Box sx={ { maxWidth: 400 } }>
          <PhiSplit
            direction="column"
            gap={ 2 }
            stackAt="none"
            primary={
              <GridContent label="Primary (61.8%)" variant="primary" height={ 180 } />
            }
            secondary={
              <GridContent label="Secondary (38.2%)" variant="secondary" height={ 110 } />
            }
          />
        </Box>

        <SectionTitle title="Real-World Examples" description="실제 사용 예시입니다." />
        <Stack spacing={ 5 }>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              Hero Section - 이미지와 텍스트
            </Typography>
            <PhiSplit
              gap={ 4 }
              stackAt="md"
              primary={
                <Box
                  sx={ {
                    height: 300,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } }
                />
              }
              secondary={
                <Box sx={ { p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' } }>
                  <Typography variant="overline" color="primary">Featured</Typography>
                  <Typography variant="h4" sx={ { fontWeight: 700, mb: 2 } }>
                    Explore the Mountains
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Discover breathtaking landscapes and embark on adventures that will stay with you forever.
                  </Typography>
                </Box>
              }
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              Sidebar Layout - 콘텐츠와 사이드바
            </Typography>
            <PhiSplit
              gap={ 3 }
              stackAt="md"
              primary={
                <Box sx={ { p: 3, border: '1px solid', borderColor: 'divider', minHeight: 200 } }>
                  <Typography variant="h6" sx={ { mb: 2 } }>Main Content</Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is the main content area that takes up the larger portion of the layout.
                    It uses the golden ratio for optimal visual balance.
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={ { p: 3, backgroundColor: 'grey.50', minHeight: 200 } }>
                  <Typography variant="h6" sx={ { mb: 2 } }>Sidebar</Typography>
                  <Stack spacing={ 1 }>
                    <Typography variant="body2">• Navigation</Typography>
                    <Typography variant="body2">• Quick Links</Typography>
                    <Typography variant="body2">• Related Items</Typography>
                  </Stack>
                </Box>
              }
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              Reversed - 사이드바가 왼쪽
            </Typography>
            <PhiSplit
              gap={ 3 }
              isReversed
              stackAt="md"
              primary={
                <Box sx={ { p: 3, border: '1px solid', borderColor: 'divider', minHeight: 200 } }>
                  <Typography variant="h6" sx={ { mb: 2 } }>Main Content</Typography>
                  <Typography variant="body2" color="text.secondary">
                    With isReversed, the sidebar (smaller area) appears on the left side.
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={ { p: 3, backgroundColor: 'primary.main', color: 'white', minHeight: 200 } }>
                  <Typography variant="h6" sx={ { mb: 2 } }>Sidebar</Typography>
                  <Typography variant="body2">Left-side navigation</Typography>
                </Box>
              }
            />
          </Box>
        </Stack>

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
          { `// 기본 가로 분할
<PhiSplit
  primary={<HeroImage />}
  secondary={<HeroText />}
  gap={4}
/>

// 반전된 레이아웃 (사이드바 왼쪽)
<PhiSplit
  isReversed
  primary={<MainContent />}
  secondary={<Sidebar />}
  gap={3}
  stackAt="md"
/>

// 세로 분할
<PhiSplit
  direction="column"
  primary={<MainSection />}
  secondary={<Footer />}
/>` }
        </Box>
      </PageContainer>
    </>
  ),
};
