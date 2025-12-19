import Box from '@mui/material/Box';

import LandingPage from './LandingPage';

export default {
  title: 'Page/LandingPage',
  component: LandingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## LandingPage

Lumenstate 브랜드의 메인 랜딩 페이지.

### 구성
- **TopSection**: 히어로 섹션 + 브랜드 가치 카드
- **ProductShowcase**: 타임라인 슬라이더 연동 제품 그리드

### 기능
- 스크롤 시 히어로 비디오 프레임 시킹
- 타임라인 슬라이더로 시간대별 제품 이미지 전환
- timeline >= 0.5 시 다크 모드 자동 전환
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
 * 기본 사용법 - 전체 랜딩 페이지
 */
export const Default = {
  render: (args) => (
    <Box sx={{ minHeight: '400vh', backgroundColor: 'background.default' }}>
      <LandingPage {...args} />
    </Box>
  ),
};
