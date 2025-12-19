import Box from '@mui/material/Box';

import { HeroSection } from './HeroSection';
import { TimelineProvider } from '../hooks/useTimeline';

export default {
  title: 'Section/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## HeroSection

스크롤 기반 비디오 스크러빙과 타이틀 오버레이를 포함한 히어로 섹션.

### 구조
- LineGrid 2컬럼 레이아웃 (7.5 : 4.5)
- 첫 번째 컬럼: 랜드스케이프 비디오 + 타이틀 오버레이
- 두 번째 컬럼: 제품 비디오
- 두 비디오가 동일한 스크롤 진행도로 동기화

### 동작
1. 스크롤 시작 → 비디오 0% (첫 프레임)
2. 스크롤 중 → 비디오 프레임 시킹
3. 스크롤 끝 → 비디오 100% (마지막 프레임)
- TimelineContext는 Storybook 글로벌 decorator에서 제공
        `,
      },
    },
  },
  argTypes: {
    sx: {
      control: 'object',
      description: '추가 스타일 객체',
    },
  },
};

/**
 * 기본 사용법 - 스크롤하여 비디오 재생 확인
 */
export const Default = {
  render: () => (
    <Box sx={{ minHeight: '400vh', backgroundColor: 'background.default' }}>
      <HeroSection />
      {/* 하단 여백 - 스크롤 테스트용 */}
      <Box sx={{ height: '100vh' }} />
    </Box>
  ),
};

/**
 * 다크 모드 (저녁 시간대)
 */
export const DarkMode = {
  render: () => (
    <Box sx={{ minHeight: '400vh', backgroundColor: 'background.default' }}>
      <HeroSection />
      <Box sx={{ height: '100vh' }} />
    </Box>
  ),
  decorators: [
    (Story) => (
      <TimelineProvider initialTimeline={0.75}>
        <Story />
      </TimelineProvider>
    ),
  ],
};
