import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MinimalTimelineSlider } from './MinimalTimelineSlider';
import { TimelineProvider } from '../../hooks/useTimeline';

export default {
  title: 'Custom Component/shared/MinimalTimelineSlider',
  component: MinimalTimelineSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## MinimalTimelineSlider

헤더용 간소화된 타임라인 슬라이더.

### 기능
- 1px 얇은 선과 아이콘만으로 표현
- 4개 아이콘 클릭으로 시간대 이동
- 세로 마커 라인으로 각 시간대 위치 표시
- 전역 TimelineContext 연동
- TimelineContext는 Storybook 글로벌 decorator에서 제공

### 용도
- GNB(Global Navigation Bar) 헤더
- 컴팩트한 공간에서 빠른 시간대 전환
        `,
      },
    },
  },
  argTypes: {
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
    useGlobalState: true,
  },
};

/**
 * 헤더 시뮬레이션 - 테마 전환 포함
 */
export const InHeader = {
  render: function InHeaderDemo() {
    return (
      <TimelineProvider initialTimeline={0}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            minWidth: 400,
            backgroundColor: 'background.default',
            transition: 'all 600ms ease',
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ transition: 'color 600ms ease' }}
          >
            Lumenstate
          </Typography>
          <MinimalTimelineSlider />
        </Box>
      </TimelineProvider>
    );
  },
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: '헤더에 배치된 예시입니다. 슬라이더를 조작하면 테마가 전환됩니다.',
      },
    },
  },
};

/**
 * 로컬 상태 제어
 */
export const LocalState = {
  render: function LocalStateDemo() {
    const [timeline, setTimeline] = useState(0.33);

    return (
      <Stack spacing={2}>
        <MinimalTimelineSlider
          useGlobalState={false}
          value={timeline}
          onChange={setTimeline}
        />
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            color: 'text.secondary',
          }}
        >
          value: {timeline.toFixed(2)}
        </Typography>
      </Stack>
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
 * 각 시간대별 상태 - 테마 전환 포함
 */
export const TimeStates = {
  render: () => (
    <Stack spacing={3}>
      <TimelineProvider initialTimeline={0}>
        <Box sx={{ p: 2, backgroundColor: 'background.default', transition: 'background-color 600ms ease' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            12pm (Light Mode)
          </Typography>
          <MinimalTimelineSlider />
        </Box>
      </TimelineProvider>
      <TimelineProvider initialTimeline={0.33}>
        <Box sx={{ p: 2, backgroundColor: 'background.default', transition: 'background-color 600ms ease' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            4pm (Light Mode)
          </Typography>
          <MinimalTimelineSlider />
        </Box>
      </TimelineProvider>
      <TimelineProvider initialTimeline={0.67}>
        <Box sx={{ p: 2, backgroundColor: 'background.default', transition: 'background-color 600ms ease' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            8pm (Dark Mode)
          </Typography>
          <MinimalTimelineSlider />
        </Box>
      </TimelineProvider>
      <TimelineProvider initialTimeline={1}>
        <Box sx={{ p: 2, backgroundColor: 'background.default', transition: 'background-color 600ms ease' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            12am (Dark Mode)
          </Typography>
          <MinimalTimelineSlider />
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

/**
 * 테마 전환 데모
 */
export const ThemeTransition = {
  render: function ThemeTransitionDemo() {
    return (
      <TimelineProvider initialTimeline={0}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            minWidth: 400,
            backgroundColor: 'background.default',
            transition: 'all 600ms ease',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ transition: 'color 600ms ease' }}
          >
            아이콘을 클릭하세요
          </Typography>
          <MinimalTimelineSlider />
        </Box>
      </TimelineProvider>
    );
  },
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: '아이콘을 클릭하면 해당 시간대로 이동하며 테마가 자동 전환됩니다.',
      },
    },
  },
};
