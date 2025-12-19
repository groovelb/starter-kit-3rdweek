import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { TimelineSlider } from './TimelineSlider';
import { TimelineProvider } from '../../hooks/useTimeline';

export default {
  title: 'Custom Component/shared/TimelineSlider',
  component: TimelineSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## TimelineSlider

Lumenstate 4단계 시간대 슬라이더 컴포넌트.

### 기능
- 12pm → 4pm → 8pm → 12am 시간대 조절
- 1px 얇은 선 위주의 미니멀한 디자인
- lucide-react 아이콘 (Sun, Sunset, Moon)
- 전역 TimelineContext 연동 또는 로컬 상태 제어
- timeline >= 0.5 → 다크 모드 자동 전환
- TimelineContext는 Storybook 글로벌 decorator에서 제공

### 아이콘 매핑
| 시간대 | 아이콘 | timeline 값 |
|--------|--------|-------------|
| 12pm | Sun | 0.00 |
| 4pm | Sunset | 0.33 |
| 8pm | Moon | 0.67 |
| 12am | Moon | 1.00 |
        `,
      },
    },
  },
  argTypes: {
    showLabels: {
      control: 'boolean',
      description: '시간 라벨 표시 여부',
    },
    useGlobalState: {
      control: 'boolean',
      description: '전역 TimelineContext 사용 여부',
    },
    onChange: {
      action: 'changed',
      description: '값 변경 시 콜백 (value: 0-1)',
    },
  },
  decorators: [
    (Story, context) => (
      <Box
        sx={{
          minWidth: 320,
          p: 4,
          backgroundColor: 'background.default',
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
    showLabels: true,
    useGlobalState: true,
  },
};

/**
 * 라벨 없는 버전
 */
export const WithoutLabels = {
  args: {
    showLabels: false,
    useGlobalState: true,
  },
  parameters: {
    docs: {
      description: {
        story: '시간 라벨을 숨긴 컴팩트한 버전입니다.',
      },
    },
  },
};

/**
 * 로컬 상태 제어
 */
export const LocalState = {
  render: function LocalStateDemo() {
    const [timeline, setTimeline] = useState(0.25);

    return (
      <Box>
        <TimelineSlider
          useGlobalState={false}
          value={timeline}
          onChange={setTimeline}
          showLabels
        />
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 2,
            fontFamily: 'monospace',
            color: 'text.secondary',
          }}
        >
          value: {timeline.toFixed(2)}
        </Typography>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '전역 상태 대신 로컬 상태로 제어하는 예시입니다.',
      },
    },
  },
};

/**
 * 테마 전환 데모 - 배경색 자동 전환
 */
export const ThemeTransition = {
  render: function ThemeTransitionDemo() {
    return (
      <TimelineProvider initialTimeline={0}>
        <Box
          sx={{
            p: 4,
            minWidth: 360,
            backgroundColor: 'background.default',
            transition: 'background-color 600ms ease',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, transition: 'color 600ms ease' }}
          >
            슬라이더를 움직여 테마 전환을 확인하세요. timeline ≥ 0.5 → 다크 모드
          </Typography>
          <TimelineSlider />
        </Box>
      </TimelineProvider>
    );
  },
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: 'timeline 값이 0.5 이상일 때 자동으로 다크 모드로 전환되며 배경색도 함께 변경됩니다.',
      },
    },
  },
};

/**
 * 각 시간대별 상태
 */
export const TimeStates = {
  render: () => (
    <Stack spacing={4}>
      <TimelineProvider initialTimeline={0}>
        <Box sx={{ p: 3, backgroundColor: 'background.default', transition: 'background-color 600ms ease' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            12pm (timeline: 0) - Light Mode
          </Typography>
          <TimelineSlider />
        </Box>
      </TimelineProvider>
      <TimelineProvider initialTimeline={0.33}>
        <Box sx={{ p: 3, backgroundColor: 'background.default', transition: 'background-color 600ms ease' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            4pm (timeline: 0.33) - Light Mode
          </Typography>
          <TimelineSlider />
        </Box>
      </TimelineProvider>
      <TimelineProvider initialTimeline={0.67}>
        <Box sx={{ p: 3, backgroundColor: 'background.default', transition: 'background-color 600ms ease' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            8pm (timeline: 0.67) - Dark Mode
          </Typography>
          <TimelineSlider />
        </Box>
      </TimelineProvider>
      <TimelineProvider initialTimeline={1}>
        <Box sx={{ p: 3, backgroundColor: 'background.default', transition: 'background-color 600ms ease' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            12am (timeline: 1) - Dark Mode
          </Typography>
          <TimelineSlider />
        </Box>
      </TimelineProvider>
    </Stack>
  ),
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: '각 시간대별 상태와 테마를 보여줍니다. 8pm 이후는 다크 모드입니다.',
      },
    },
  },
};
