import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CenteredAsideLayout } from './CenteredAsideLayout';
import { GridContent } from '../storybookDocumentation/GridContent';

export default {
  title: 'Custom Component/CenteredAsideLayout',
  component: CenteredAsideLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CenteredAsideLayout

대칭 그리드(2:8:2) 레이아웃으로 사이드바와 메인 콘텐츠를 배치하는 레이아웃 컴포넌트입니다.

### 레이아웃 구조
- 좌측 (2/12): aside - sticky 사이드바
- 중앙 (8/12): children - 메인 콘텐츠 (시각적 정중앙)
- 우측 (2/12): 빈 영역 (시각 균형용)

### 용도
- 필터 + 콘텐츠 그리드 레이아웃
- 네비게이션 + 메인 콘텐츠 레이아웃
- TOC(목차) + 문서 콘텐츠 레이아웃
        `,
      },
    },
  },
  argTypes: {
    aside: {
      control: false,
      description: '좌측 사이드바 콘텐츠',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    children: {
      control: false,
      description: '중앙 메인 콘텐츠',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    centerSize: {
      control: { type: 'number', min: 2, max: 10 },
      description: '중앙 콘텐츠 그리드 크기 (1-12). aside는 (12 - centerSize) / 2로 자동 계산',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
    },
    stickyTop: {
      control: { type: 'number', min: 0, max: 200 },
      description: 'aside sticky 위치 (px). GNB 높이(64px) + 여백(24px) 기본 적용',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '88' },
      },
    },
    spacing: {
      control: { type: 'number', min: 0, max: 8 },
      description: '그리드 간격',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    asideSx: {
      control: 'object',
      description: 'aside 영역 추가 스타일',
    },
    contentSx: {
      control: 'object',
      description: '콘텐츠 영역 추가 스타일',
    },
    sx: {
      control: 'object',
      description: '컨테이너 추가 스타일',
    },
  },
};

/** 샘플 타이틀 (Sticky) */
const SampleTitle = ({ title = 'Article Title', date = '2024.12.12' }) => (
  <Box>
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        lineHeight: 1.2,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {date}
    </Typography>
  </Box>
);

/** 샘플 문단 텍스트 */
const loremParagraph = 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow.';

/** 샘플 콘텐츠 */
const SampleContent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>

    <GridContent label="Content Block" height={200} />

    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>

    <GridContent label="Content Block" variant="primary" height={300} />

    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>

    <GridContent label="Content Block" variant="secondary" height={250} />

    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {loremParagraph}
    </Typography>
  </Box>
);

/** 기본 */
export const Default = {
  args: {
    stickyTop: 24,
    spacing: 2,
  },
  render: (args) => (
    <CenteredAsideLayout aside={<SampleTitle />} {...args}>
      <SampleContent />
    </CenteredAsideLayout>
  ),
};

/** 연속 레이아웃 (Sticky 해제 테스트) */
export const SerialLayout = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <Box sx={{ p: 3 }}>
      {/* Section 1 */}
      <CenteredAsideLayout
        aside={<SampleTitle title="Section 1" date="Introduction" />}
        stickyTop={24}
        sx={{ mb: 6 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1">{loremParagraph}</Typography>
          <Typography variant="body1">{loremParagraph}</Typography>
          <GridContent label="Section 1 Content" height={300} />
          <Typography variant="body1">{loremParagraph}</Typography>
          <Typography variant="body1">{loremParagraph}</Typography>
          <GridContent label="Section 1 Content" variant="primary" height={400} />
          <Typography variant="body1">{loremParagraph}</Typography>
        </Box>
      </CenteredAsideLayout>

      {/* Section 2 */}
      <CenteredAsideLayout
        aside={<SampleTitle title="Section 2" date="Main Content" />}
        stickyTop={24}
        sx={{ mb: 6 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1">{loremParagraph}</Typography>
          <GridContent label="Section 2 Content" variant="secondary" height={350} />
          <Typography variant="body1">{loremParagraph}</Typography>
          <Typography variant="body1">{loremParagraph}</Typography>
          <GridContent label="Section 2 Content" height={250} />
          <Typography variant="body1">{loremParagraph}</Typography>
          <Typography variant="body1">{loremParagraph}</Typography>
          <Typography variant="body1">{loremParagraph}</Typography>
        </Box>
      </CenteredAsideLayout>

      {/* Section 3 */}
      <CenteredAsideLayout
        aside={<SampleTitle title="Section 3" date="Conclusion" />}
        stickyTop={24}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1">{loremParagraph}</Typography>
          <Typography variant="body1">{loremParagraph}</Typography>
          <GridContent label="Section 3 Content" variant="primary" height={300} />
          <Typography variant="body1">{loremParagraph}</Typography>
          <GridContent label="Section 3 Content" variant="secondary" height={400} />
          <Typography variant="body1">{loremParagraph}</Typography>
          <Typography variant="body1">{loremParagraph}</Typography>
        </Box>
      </CenteredAsideLayout>
    </Box>
  ),
};
