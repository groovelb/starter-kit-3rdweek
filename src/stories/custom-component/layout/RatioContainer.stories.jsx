import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { DocumentTitle, PageContainer, SectionTitle, GridContent } from '../../../components/storybookDocumentation';
import { RatioContainer, PHI } from '../../../components/layout/RatioContainer';

export default {
  title: 'Custom Component/Layout/RatioContainer',
  component: RatioContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## RatioContainer

고정된 종횡비를 유지하는 컨테이너 컴포넌트.

### 용도
- 16:9, 4:3 등 고정 비율 미디어 컨테이너
- 황금비율 기반 레이아웃 영역
- 일관된 카드/썸네일 비율 유지
        `,
      },
    },
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: ['16:9', '4:3', '1:1', '3:2', '21:9', 'phi', 'phi-vertical'],
      description: '종횡비',
    },
    isContained: {
      control: 'boolean',
      description: 'overflow hidden 적용',
    },
    align: {
      control: 'select',
      options: ['center', 'start', 'end', 'stretch'],
      description: '수직 정렬',
    },
    justify: {
      control: 'select',
      options: ['center', 'start', 'end', 'stretch'],
      description: '수평 정렬',
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    ratio: '16:9',
    isContained: true,
    align: 'center',
    justify: 'center',
    children: (
      <Typography variant="h5" sx={ { color: 'white' } }>
        16:9 Ratio
      </Typography>
    ),
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};

/** 문서 및 데모 */
export const Documentation = {
  render: () => (
    <>
      <DocumentTitle
        title="RatioContainer"
        status="Available"
        note="Fixed aspect ratio container component"
        brandName="Layout"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          RatioContainer
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          CSS aspect-ratio를 활용하여 고정된 종횡비를 유지하는 컨테이너입니다.
          16:9, 4:3, 황금비율 등 다양한 비율을 지원합니다.
        </Typography>

        <SectionTitle title="Props" description="RatioContainer 컴포넌트의 Props 목록입니다." />
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
                <TableCell sx={ { fontFamily: 'monospace' } }>ratio</TableCell>
                <TableCell>string | number</TableCell>
                <TableCell>&apos;16:9&apos;</TableCell>
                <TableCell>종횡비 (예: &apos;16:9&apos;, &apos;phi&apos;, 1.5)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>maxWidth</TableCell>
                <TableCell>string</TableCell>
                <TableCell>-</TableCell>
                <TableCell>최대 너비</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>minHeight</TableCell>
                <TableCell>string</TableCell>
                <TableCell>-</TableCell>
                <TableCell>최소 높이</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>isContained</TableCell>
                <TableCell>boolean</TableCell>
                <TableCell>true</TableCell>
                <TableCell>overflow hidden 적용 여부</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>align</TableCell>
                <TableCell>&apos;center&apos; | &apos;start&apos; | &apos;end&apos; | &apos;stretch&apos;</TableCell>
                <TableCell>&apos;center&apos;</TableCell>
                <TableCell>수직 정렬</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>justify</TableCell>
                <TableCell>&apos;center&apos; | &apos;start&apos; | &apos;end&apos; | &apos;stretch&apos;</TableCell>
                <TableCell>&apos;center&apos;</TableCell>
                <TableCell>수평 정렬</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>background</TableCell>
                <TableCell>string</TableCell>
                <TableCell>-</TableCell>
                <TableCell>배경색 또는 그라데이션</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Standard Ratios" description="자주 사용되는 표준 비율입니다." />
        <Grid container spacing={ 3 }>
          <Grid size={ { xs: 12, md: 6 } }>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              16:9 - 영상, 와이드스크린
            </Typography>
            <RatioContainer ratio="16:9">
              <GridContent label="16:9" variant="primary" height="100%" minHeight={ 0 } />
            </RatioContainer>
          </Grid>
          <Grid size={ { xs: 12, md: 6 } }>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              4:3 - 클래식, 문서
            </Typography>
            <RatioContainer ratio="4:3">
              <GridContent label="4:3" variant="secondary" height="100%" minHeight={ 0 } />
            </RatioContainer>
          </Grid>
          <Grid size={ { xs: 12, md: 6 } }>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              1:1 - 정사각형, 프로필
            </Typography>
            <RatioContainer ratio="1:1" maxWidth="300px">
              <GridContent label="1:1" variant="primary" height="100%" minHeight={ 0 } />
            </RatioContainer>
          </Grid>
          <Grid size={ { xs: 12, md: 6 } }>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              21:9 - 울트라와이드, 시네마
            </Typography>
            <RatioContainer ratio="21:9">
              <GridContent label="21:9" variant="secondary" height="100%" minHeight={ 0 } />
            </RatioContainer>
          </Grid>
        </Grid>

        <SectionTitle title="Golden Ratio (황금비율)" description={ `PHI = ${PHI.toFixed(6)} (약 1.618:1)` } />
        <Stack spacing={ 4 }>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              phi - 가로로 긴 황금비율 (1.618:1)
            </Typography>
            <RatioContainer ratio="phi">
              <GridContent label="φ (Golden Ratio)" variant="primary" height="100%" minHeight={ 0 } />
            </RatioContainer>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              phi-vertical - 세로로 긴 황금비율 (1:1.618)
            </Typography>
            <RatioContainer ratio="phi-vertical" maxWidth="400px">
              <GridContent label="1/φ (Vertical Golden)" variant="secondary" height="100%" minHeight={ 0 } />
            </RatioContainer>
          </Box>
        </Stack>

        <SectionTitle title="With Images" description="이미지와 함께 사용하면 일관된 비율을 유지합니다." />
        <Grid container spacing={ 3 }>
          <Grid size={ { xs: 12, md: 4 } }>
            <RatioContainer ratio="1:1">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
                alt="Mountain"
              />
            </RatioContainer>
          </Grid>
          <Grid size={ { xs: 12, md: 4 } }>
            <RatioContainer ratio="1:1">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop"
                alt="Forest"
              />
            </RatioContainer>
          </Grid>
          <Grid size={ { xs: 12, md: 4 } }>
            <RatioContainer ratio="1:1">
              <img
                src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop"
                alt="Nature"
              />
            </RatioContainer>
          </Grid>
        </Grid>

        <SectionTitle title="Alignment Options" description="내부 콘텐츠의 정렬 옵션입니다." />
        <Grid container spacing={ 3 }>
          <Grid size={ { xs: 12, md: 4 } }>
            <Typography variant="caption" sx={ { mb: 1, display: 'block', color: 'text.secondary' } }>
              align=&quot;start&quot;, justify=&quot;start&quot;
            </Typography>
            <RatioContainer
              ratio="16:9"
              align="start"
              justify="start"
              background="#f5f5f5"
              sx={ { border: '1px solid', borderColor: 'divider' } }
            >
              <Box sx={ { p: 2, backgroundColor: 'primary.main', color: 'white' } }>
                Top Left
              </Box>
            </RatioContainer>
          </Grid>
          <Grid size={ { xs: 12, md: 4 } }>
            <Typography variant="caption" sx={ { mb: 1, display: 'block', color: 'text.secondary' } }>
              align=&quot;center&quot;, justify=&quot;center&quot;
            </Typography>
            <RatioContainer
              ratio="16:9"
              align="center"
              justify="center"
              background="#f5f5f5"
              sx={ { border: '1px solid', borderColor: 'divider' } }
            >
              <Box sx={ { p: 2, backgroundColor: 'primary.main', color: 'white' } }>
                Center
              </Box>
            </RatioContainer>
          </Grid>
          <Grid size={ { xs: 12, md: 4 } }>
            <Typography variant="caption" sx={ { mb: 1, display: 'block', color: 'text.secondary' } }>
              align=&quot;end&quot;, justify=&quot;end&quot;
            </Typography>
            <RatioContainer
              ratio="16:9"
              align="end"
              justify="end"
              background="#f5f5f5"
              sx={ { border: '1px solid', borderColor: 'divider' } }
            >
              <Box sx={ { p: 2, backgroundColor: 'primary.main', color: 'white' } }>
                Bottom Right
              </Box>
            </RatioContainer>
          </Grid>
        </Grid>

        <SectionTitle title="Custom Numeric Ratio" description="숫자로 직접 비율을 지정할 수 있습니다." />
        <Box sx={ { maxWidth: 500 } }>
          <Typography variant="caption" sx={ { mb: 1, display: 'block', color: 'text.secondary' } }>
            ratio={ 2.35 } (Cinemascope 2.35:1)
          </Typography>
          <RatioContainer
            ratio={ 2.35 }
            background="linear-gradient(90deg, #000 0%, #333 50%, #000 100%)"
          >
            <Typography sx={ { color: 'white', letterSpacing: 4 } }>CINEMASCOPE</Typography>
          </RatioContainer>
        </Box>

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
          { `// 기본 16:9 비율
<RatioContainer ratio="16:9">
  <img src="hero.jpg" alt="Hero" />
</RatioContainer>

// 황금비율 컨테이너
<RatioContainer ratio="phi" background="#f0f0f0">
  <Typography>Golden Ratio Content</Typography>
</RatioContainer>

// 정렬과 최대 너비 지정
<RatioContainer
  ratio="1:1"
  maxWidth="300px"
  align="center"
  justify="center"
>
  <Avatar src="profile.jpg" />
</RatioContainer>

// 숫자로 커스텀 비율
<RatioContainer ratio={2.35}>
  <CinemaScopeContent />
</RatioContainer>` }
        </Box>
      </PageContainer>
    </>
  ),
};
