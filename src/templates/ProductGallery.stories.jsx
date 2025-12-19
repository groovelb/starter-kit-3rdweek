import { ProductGallery } from './ProductGallery';
import { products, PRODUCT_TYPES } from '../data/products';

export default {
  title: 'Template/ProductGallery',
  component: ProductGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ProductGallery

대칭 그리드(2:8:2) 레이아웃으로 ProductFilter와 ProductGrid를 배치하는 갤러리 템플릿입니다.

### 레이아웃 (2:8:2)
- 좌측 (2): ProductFilter (세로 탭, sticky)
- 중앙 (8): ProductGrid (제품 카드 그리드, 시각적 정중앙)
- 우측 (2): 빈 영역 (시각 균형용)

### 동작
1. 필터 선택 시 해당 타입의 제품만 표시
2. 스크롤 시 필터가 sticky로 고정
3. 'All' 선택 시 전체 제품 표시
- TimelineContext는 Storybook 글로벌 decorator에서 제공
        `,
      },
    },
  },
  argTypes: {
    products: {
      control: 'object',
      description: '제품 데이터 배열',
    },
    timeline: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '시간대 값 (0-1)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    columns: {
      control: { type: 'number', min: 2, max: 6 },
      description: '그리드 열 수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    spacing: {
      control: { type: 'number', min: 0, max: 4 },
      description: '그리드 간격',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    defaultFilter: {
      control: 'select',
      options: ['all', PRODUCT_TYPES.CEILING, PRODUCT_TYPES.STAND, PRODUCT_TYPES.WALL, PRODUCT_TYPES.DESK],
      description: '초기 필터 값',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'all' },
      },
    },
    showAllOption: {
      control: 'boolean',
      description: 'All 탭 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    stickyTop: {
      control: { type: 'number', min: 0, max: 200 },
      description: 'Filter sticky 위치 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '24' },
      },
    },
    onProductClick: {
      action: 'productClicked',
      description: '제품 클릭 핸들러',
    },
    selectedProductId: {
      control: 'number',
      description: '선택된 제품 ID',
    },
    sx: {
      control: 'object',
      description: '추가 스타일',
    },
  },
};

/** 기본 갤러리 */
export const Default = {
  args: {
    products,
    timeline: 0,
    columns: 3,
    spacing: 2,
    defaultFilter: 'all',
    showAllOption: true,
    stickyTop: 24,
  },
};

/** 특정 타입 필터 */
export const FilteredByType = {
  args: {
    products,
    timeline: 0.5,
    columns: 3,
    defaultFilter: PRODUCT_TYPES.WALL,
    showAllOption: true,
  },
};

/** 2열 레이아웃 */
export const TwoColumns = {
  args: {
    products,
    timeline: 0,
    columns: 2,
    spacing: 2,
    defaultFilter: 'all',
  },
};
