import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { HeroStack } from './HeroStack';

export default {
  title: 'Custom Component/HeroStack',
  component: HeroStack,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## HeroStack

상단 Hero 영역이 남은 공간을 채우고, 하단 Footer 영역은 자연스러운 높이를 유지하는 수직 스택 레이아웃.

### 구조
\`\`\`
┌─────────────────────────────────┐
│                                 │
│   Hero (flex-grow: 1)           │ ← 남은 공간 차지
│   콘텐츠 수직/수평 정렬 가능       │
│                                 │
├─────────────────────────────────┤
│   Footer (auto height)          │ ← 자연스러운 높이
└─────────────────────────────────┘
\`\`\`

### 사용 사례
- 제품 상세 페이지: 큰 제목 + 하단 옵션/액션
- 랜딩 페이지: 히어로 섹션 + 하단 CTA
- 대시보드: 주요 지표 + 하단 컨트롤

### 반응형
- md 이상: height 적용 (100vh)
- md 미만: min-height로 전환하여 스크롤 가능
        `,
      },
    },
  },
  argTypes: {
    hero: {
      control: false,
      description: '상단 Hero 영역 콘텐츠',
    },
    footer: {
      control: false,
      description: '하단 Footer 영역 콘텐츠',
    },
    height: {
      control: 'text',
      description: '컨테이너 높이',
      table: {
        defaultValue: { summary: '100vh' },
      },
    },
    heroAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Hero 콘텐츠 수직 정렬',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    heroJustify: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Hero 콘텐츠 수평 정렬',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    gap: {
      control: 'number',
      description: 'Hero와 Footer 사이 간격',
      table: {
        defaultValue: { summary: 0 },
      },
    },
    heroPadding: {
      control: 'number',
      description: 'Hero 영역 패딩',
    },
    footerPadding: {
      control: 'number',
      description: 'Footer 영역 패딩',
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    height: '500px',
    heroAlign: 'center',
    heroJustify: 'start',
    heroPadding: 4,
    footerPadding: 4,
  },
  render: (args) => (
    <HeroStack
      {...args}
      hero={
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 1 }}>
            Product Title
          </Typography>
          <Typography variant="body1" color="text.secondary">
            260 lx · 3200 K
          </Typography>
        </Box>
      }
      footer={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Item Number: LM-001
          </Typography>
          <Button variant="contained" size="large">
            Add to Cart
          </Button>
        </Box>
      }
      sx={{ border: '1px solid', borderColor: 'divider' }}
    />
  ),
};

/** 정렬 옵션 */
export const Alignments = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {['start', 'center', 'end'].map((align) => (
        <HeroStack
          key={align}
          height="400px"
          heroAlign={align}
          heroJustify="center"
          heroPadding={3}
          footerPadding={3}
          hero={
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {align}
            </Typography>
          }
          footer={
            <Typography variant="body2" color="text.secondary">
              Footer Content
            </Typography>
          }
          sx={{ flex: 1, border: '1px solid', borderColor: 'divider' }}
        />
      ))}
    </Box>
  ),
};

/** 제품 상세 예시 */
export const ProductDetail = {
  render: () => (
    <HeroStack
      height="100vh"
      heroAlign="center"
      heroJustify="start"
      heroPadding={{ xs: 3, md: 5 }}
      footerPadding={{ xs: 3, md: 5 }}
      footerSx={{ pt: 0 }}
      hero={
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.1,
              mb: 1,
            }}
          >
            Lumen Desk Pro
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontFamily: 'monospace',
            }}
          >
            260 lx · 3200 K
          </Typography>
        </Box>
      }
      footer={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Item Number
            </Typography>
            <Typography>LM-001</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Lead Time
            </Typography>
            <Typography>4-6 Weeks</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              $1,290
            </Typography>
            <Button variant="contained" size="large" sx={{ flex: 1 }}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      }
      sx={{ maxWidth: 500, border: '1px solid', borderColor: 'divider' }}
    />
  ),
};

/** 랜딩 페이지 예시 */
export const LandingPage = {
  render: () => (
    <HeroStack
      height="100vh"
      heroAlign="center"
      heroJustify="center"
      heroPadding={4}
      footerPadding={4}
      hero={
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 2,
            }}
          >
            Light is the state of space
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            하루의 곡선을 따라 조도·색온도를 부드럽게 조율합니다.
          </Typography>
        </Box>
      }
      footer={
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" size="large">
            제품 보기
          </Button>
          <Button variant="outlined" size="large">
            하루 리듬 시연
          </Button>
        </Box>
      }
      sx={{ bgcolor: 'background.default' }}
    />
  ),
};
