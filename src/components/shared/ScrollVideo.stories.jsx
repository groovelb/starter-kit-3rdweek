import { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ScrollVideo } from './ScrollVideo';

import landscapeVideo from '../../assets/landscape/landscape-motion.mp4';
import productVideo from '../../assets/product/1-motion.mp4';

export default {
  title: 'Custom Component/media/ScrollVideo',
  component: ScrollVideo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ScrollVideo

스크롤 위치 기반 비디오 프레임 시킹 컴포넌트.

### 기능
- 스크롤 위치에 따라 비디오가 프레임 단위로 시킹
- 우측 하단에 시간 오버레이 표시 (12:00pm ~ 12:00am)
- 타임라인 퍼센트 오버레이 옵션
- VideoScrubbing 컴포넌트 기반

### 시간 매핑
| Progress | 시간 |
|----------|------|
| 0 | 12:00pm |
| 0.25 | 3:00pm |
| 0.5 | 6:00pm |
| 0.75 | 9:00pm |
| 1 | 12:00am |
        `,
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: '비디오 소스 경로',
    },
    startInView: {
      control: 'boolean',
      description: '뷰포트 상단에서 시작하는 경우 true (Hero 섹션 등)',
    },
    ratio: {
      control: 'select',
      options: ['auto', '16/9', '4/3', '21/9', '1/1'],
      description: '비디오 비율',
    },
    showTimeOverlay: {
      control: 'boolean',
      description: '시간 오버레이 표시 여부',
    },
    showTimeline: {
      control: 'boolean',
      description: '타임라인 % 표시 여부',
    },
    scrollRange: {
      control: 'object',
      description: '스크롤 범위 매핑 { start, end }',
    },
    onProgressChange: {
      action: 'progressChanged',
      description: '진행도 변경 콜백',
    },
  },
};

/**
 * 기본 사용법 - 스크롤하여 시간 변화 확인
 */
export const Default = {
  args: {
    src: landscapeVideo,
    showTimeOverlay: true,
    showTimeline: false,
  },
  render: (args) => (
    <Box sx={{ minHeight: '300vh', backgroundColor: 'background.default' }}>
      {/* 스크롤 시작 영역 */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Scroll down to see video
        </Typography>
      </Box>

      {/* 비디오 영역 - 화면에 등장하면 스크러빙 시작 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <ScrollVideo {...args} sx={{ maxWidth: 800 }} />
      </Box>

      {/* 하단 여백 */}
      <Box sx={{ height: '100vh' }} />
    </Box>
  ),
};

/**
 * 시간 + 타임라인 퍼센트 모두 표시
 */
export const WithTimeline = {
  args: {
    src: landscapeVideo,
    showTimeOverlay: true,
    showTimeline: true,
  },
  render: (args) => (
    <Box sx={{ minHeight: '300vh', backgroundColor: 'background.default' }}>
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Scroll down to see video
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <ScrollVideo {...args} sx={{ maxWidth: 800 }} />
      </Box>
      <Box sx={{ height: '100vh' }} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: '우측 하단에 시간, 좌측 하단에 타임라인 퍼센트를 함께 표시합니다.',
      },
    },
  },
};

/**
 * 오버레이 없이 비디오만
 */
export const NoOverlay = {
  args: {
    src: productVideo,
    showTimeOverlay: false,
    showTimeline: false,
  },
  render: (args) => (
    <Box sx={{ minHeight: '300vh', backgroundColor: '#12100E' }}>
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F2E9DA' }}>
          Scroll down to see video
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <ScrollVideo {...args} sx={{ maxWidth: 600 }} />
      </Box>
      <Box sx={{ height: '100vh' }} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: '오버레이 없이 순수 비디오 스크러빙만 사용하는 예시입니다.',
      },
    },
  },
};

/**
 * startInView 모드 - Hero 섹션용
 */
export const StartInView = {
  args: {
    src: landscapeVideo,
    startInView: true,
    showTimeOverlay: true,
    showTimeline: false,
  },
  render: (args) => (
    <Box sx={{ minHeight: '200vh', backgroundColor: 'background.default' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ScrollVideo {...args} sx={{ maxWidth: 800 }} />
      </Box>
      <Box sx={{ height: '100vh' }} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'startInView=true일 때, 뷰포트 상단에서 progress=0부터 시작합니다. Hero 섹션에 적합합니다.',
      },
    },
  },
};

/**
 * 비율 지정
 */
export const WithRatio = {
  args: {
    src: productVideo,
    ratio: '16/9',
    showTimeOverlay: true,
  },
  render: (args) => (
    <Box sx={{ minHeight: '300vh', backgroundColor: 'background.default' }}>
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Scroll down to see video (16:9)
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <ScrollVideo {...args} sx={{ maxWidth: 800 }} />
      </Box>
      <Box sx={{ height: '100vh' }} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ratio prop으로 비디오 비율을 강제 지정할 수 있습니다.',
      },
    },
  },
};
