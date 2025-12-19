import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CarouselContainer } from '../../../components/container/CarouselContainer';
import { GridContent } from '../../../components/storybookDocumentation';

/**
 * 데모용 샘플 아이템 생성
 */
const createSampleItems = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    label: `Item ${i + 1}`,
  }));

const sampleItems = createSampleItems(8);

/**
 * GridContent 기반 아이템 렌더러
 */
const DefaultItemRenderer = (item) => (
  <GridContent
    label={ item.label }
    variant="default"
    height={ 180 }
  />
);

/**
 * Story 컴포넌트: IndexChangeDemo
 */
function IndexChangeDemo() {
  const [index, setIndex] = useState(0);

  return (
    <Box sx={ { width: '100%', maxWidth: 1000 } }>
      <Stack direction="row" spacing={ 2 } alignItems="center" sx={ { mb: 2 } }>
        <Typography variant="body2" color="text.secondary">
          현재 인덱스:
        </Typography>
        <Typography variant="h6" sx={ { fontWeight: 600, color: 'primary.main' } }>
          { index }
        </Typography>
      </Stack>
      <CarouselContainer
        items={ sampleItems }
        renderItem={ DefaultItemRenderer }
        visible={ { xs: 1, sm: 2, md: 3 } }
        gap={ 20 }
        onIndexChange={ setIndex }
      />
    </Box>
  );
}

export default {
  title: 'Custom Component/Common/CarouselContainer',
  component: CarouselContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CarouselContainer

반응형 멀티 아이템 캐러셀 컨테이너 컴포넌트입니다.

### 특징
- 브레이크포인트별 노출 개수 설정
- 부드러운 슬라이드 애니메이션
- 아이템 간 구분선 지원
- 네비게이션 버튼 위치 커스터마이징
- 인덱스 변경 콜백 지원
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: '렌더링할 아이템 배열',
      table: {
        type: { summary: 'Array' },
      },
    },
    renderItem: {
      description: '아이템 렌더러 함수 (item, index) => ReactNode',
      table: {
        type: { summary: 'function' },
      },
    },
    visible: {
      description: '브레이크포인트별 노출 개수 {xs, sm, md, lg, xl}',
      control: 'object',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{xs:1, sm:2, md:3, lg:4}' },
      },
    },
    gap: {
      description: '아이템 간 간격 (px)',
      control: { type: 'number', min: 0, max: 48 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 16 },
      },
    },
    step: {
      description: '한 번에 이동할 아이템 수',
      control: { type: 'number', min: 1, max: 5 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    hasNavigation: {
      description: '네비게이션 버튼 표시 여부',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    hasDivider: {
      description: '아이템 사이 구분선 표시 여부',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dividerColor: {
      description: '구분선 색상',
      control: 'color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'divider' },
      },
    },
    navPosition: {
      description: '네비게이션 버튼 위치',
      control: 'radio',
      options: ['inside', 'outside'],
      table: {
        type: { summary: "'inside' | 'outside'" },
        defaultValue: { summary: 'inside' },
      },
    },
    onIndexChange: {
      description: '인덱스 변경 콜백 함수',
      table: {
        type: { summary: '(index: number) => void' },
      },
    },
  },
};

/**
 * 기본 캐러셀 - Controls에서 모든 Props 조작 가능
 */
export const Default = {
  args: {
    items: sampleItems,
    renderItem: DefaultItemRenderer,
    visible: { xs: 1, sm: 2, md: 3, lg: 4 },
    gap: 16,
    step: 1,
    hasNavigation: true,
    hasDivider: false,
    navPosition: 'inside',
  },
};

/**
 * 인덱스 변경 콜백 - 상태 연동 예시
 */
export const WithIndexChange = {
  render: () => <IndexChangeDemo />,
};
