import Stack from '@mui/material/Stack';
import { ProductHeroTemplate } from './ProductHeroTemplate';

export default {
  title: 'Template/ProductHeroTemplate',
  component: ProductHeroTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ProductHeroTemplate

제품 상세 페이지의 Hero 영역 템플릿.

### 구성
- **제품명**: h2 타이포그래피
- **설명**: 제품 설명 텍스트 (옵션)
- **스펙 카드**: 타입, Lux, Kelvin 3열 그리드

### 특징
- 제품 타입별 아이콘 자동 매핑 (ceiling, stand, wall, desk)
- ProductSpecCard 컴포넌트 활용
- LineGrid로 균등 분할 레이아웃
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '제품명',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '제품 설명',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'select',
      options: ['ceiling', 'stand', 'wall', 'desk'],
      description: '제품 타입',
      table: {
        type: { summary: 'string' },
      },
    },
    lux: {
      control: 'number',
      description: '조도 값',
      table: {
        type: { summary: 'number' },
      },
    },
    kelvin: {
      control: 'number',
      description: '색온도 값',
      table: {
        type: { summary: 'number' },
      },
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    title: 'Aurora Pendant',
    description: 'A stunning ceiling lamp with ambient lighting that adapts to your daily rhythm.',
    type: 'ceiling',
    lux: 480,
    kelvin: 3800,
  },
};

/** 설명 없음 */
export const WithoutDescription = {
  args: {
    title: 'Lumen Desk Pro',
    type: 'desk',
    lux: 320,
    kelvin: 4200,
  },
};

/** 타입별 비교 */
export const TypeVariants = {
  render: () => (
    <Stack spacing={6}>
      <ProductHeroTemplate
        title="Ceiling Light"
        type="ceiling"
        lux={480}
        kelvin={3800}
      />
      <ProductHeroTemplate
        title="Stand Light"
        type="stand"
        lux={360}
        kelvin={3200}
      />
      <ProductHeroTemplate
        title="Wall Light"
        type="wall"
        lux={280}
        kelvin={4000}
      />
      <ProductHeroTemplate
        title="Desk Light"
        type="desk"
        lux={420}
        kelvin={4500}
      />
    </Stack>
  ),
};
