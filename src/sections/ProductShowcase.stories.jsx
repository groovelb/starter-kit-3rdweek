import Box from '@mui/material/Box';

import { ProductShowcase } from './ProductShowcase';
import { TimelineProvider } from '../hooks/useTimeline';

export default {
  title: 'Section/ProductShowcase',
  component: ProductShowcase,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ProductShowcase

TimelineSlider와 ProductGrid를 연동한 제품 쇼케이스 섹션.

### 기능
- TimelineSlider로 4단계 시간대 조절 (12pm, 4pm, 8pm, 12am)
- 시간대에 따른 모든 제품 이미지 동기화
- timeline >= 0.5 시 다크 모드 자동 전환
- 전역 TimelineContext 사용 (Storybook 글로벌 decorator)
- 제품 데이터와 섹션 타이틀은 내부에서 자동 로드
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4, 6],
      description: '그리드 열 수',
    },
    onProductClick: {
      action: 'productClicked',
      description: '제품 클릭 핸들러',
    },
  },
  decorators: [
    (Story, context) => (
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100vh',
          transition: 'background-color 600ms ease',
        }}
      >
        <Story {...context} />
      </Box>
    ),
  ],
};

/**
 * 기본 사용법
 */
export const Default = {
  args: {
    columns: 6,
  },
  render: (args) => (
    <Box sx={{ px: 4 }}>
      <ProductShowcase {...args} />
    </Box>
  ),
};

/**
 * 4열 그리드
 */
export const FourColumns = {
  args: {
    columns: 4,
  },
  render: (args) => (
    <Box sx={{ px: 4 }}>
      <ProductShowcase {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: '4열 그리드로 표시합니다.',
      },
    },
  },
};

/**
 * 다크 모드 시작
 */
export const DarkModeStart = {
  args: {
    columns: 6,
  },
  decorators: [
    (Story, context) => (
      <TimelineProvider initialTimeline={0.67}>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100vh',
            transition: 'background-color 600ms ease',
          }}
        >
          <Story {...context} />
        </Box>
      </TimelineProvider>
    ),
  ],
  render: (args) => (
    <Box sx={{ px: 4 }}>
      <ProductShowcase {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: '8pm 시간대(다크 모드)로 시작합니다.',
      },
    },
  },
};
