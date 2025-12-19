import Box from '@mui/material/Box';

import { TopSection } from './TopSection';

export default {
  title: 'Section/TopSection',
  component: TopSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## TopSection

HeroSection과 BrandValueSection을 합친 상단 섹션.

### 구조
- 하나의 LineGrid로 2행 구성
- **Row 1**: 랜드스케이프 비디오 (8) + 제품 비디오 (4)
- **Row 2**: BrandValueCard 3개 (4:4:4)

### 동작
- 스크롤 시 비디오 프레임 시킹
- 타임라인 슬라이더로 시간 변화 표시
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
      <TopSection />
      <Box sx={{ height: '100vh' }} />
    </Box>
  ),
};
