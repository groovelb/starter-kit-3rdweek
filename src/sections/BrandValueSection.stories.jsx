import Box from '@mui/material/Box';

import { BrandValueSection } from './BrandValueSection';

export default {
  title: 'Section/BrandValueSection',
  component: BrandValueSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## BrandValueSection

브랜드 가치를 LineGrid 1x3 그리드 레이아웃으로 표시하는 섹션.

### 구조
- 섹션 헤더 (제목 + 부제목)
- 3개의 BrandValueCard (LineGrid로 배치)

### 레이아웃
- **Desktop**: 1행 3열 (각 카드 4 columns)
- **Mobile**: 1열 (각 카드 12 columns, 수직 스택)

### 데이터 소스
\`content.brandValue\`에서 데이터를 가져옵니다.
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
 * 기본 사용법
 */
export const Default = {
  render: () => (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <BrandValueSection />
    </Box>
  ),
};
