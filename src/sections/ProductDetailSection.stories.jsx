import ProductDetailSection from './ProductDetailSection';
import { products } from '../data/products';

// 샘플 제품 데이터 (가격 추가)
const sampleProduct = {
  ...products[0],
  price: 1290,
};

// 샘플 메타 정보
const sampleMeta = {
  itemNumber: 'LM-001',
  leadTime: '4 Weeks',
  shipDate: 'Jan 15, 2025',
};

export default {
  title: 'Section/ProductDetailSection',
  component: ProductDetailSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ProductDetailSection

제품 상세 섹션. ProductDetailTemplate + CartDrawer 조합.

### 구조
- **ProductDetailTemplate**: 제품 상세 UI (SplitScreen 레이아웃)
- **CartDrawer**: 장바구니 슬라이드 패널

### 동작 방식
1. ProductDetailTemplate으로 제품 상세 UI 렌더링
2. CartDrawer로 장바구니 슬라이드 패널 렌더링
3. useCart로 장바구니 상태 연동
4. 장바구니 추가 시 autoOpenCart가 true면 CartDrawer 자동 열기
5. CartDrawer에서 수량 변경, 아이템 제거 가능
        `,
      },
    },
  },
  argTypes: {
    product: {
      control: 'object',
      description: '제품 데이터 (products.js 구조)',
    },
    meta: {
      control: 'object',
      description: '제품 메타 정보 (itemNumber, leadTime, shipDate)',
    },
    autoOpenCart: {
      control: 'boolean',
      description: '장바구니 추가 시 자동 열기 여부',
    },
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'KRW'],
      description: '통화 코드',
    },
    onCheckout: {
      action: 'checkout',
      description: '체크아웃 핸들러',
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    product: sampleProduct,
    meta: sampleMeta,
    autoOpenCart: true,
    currency: 'USD',
  },
};

/** 자동 열기 비활성화 */
export const NoAutoOpen = {
  args: {
    product: sampleProduct,
    meta: sampleMeta,
    autoOpenCart: false,
    currency: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story: 'autoOpenCart를 false로 설정하면 장바구니 추가 시 CartDrawer가 자동으로 열리지 않습니다.',
      },
    },
  },
};

/** 메타 정보 없음 */
export const NoMeta = {
  args: {
    product: sampleProduct,
    meta: {},
    autoOpenCart: true,
    currency: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story: 'meta prop이 비어있으면 ProductMeta 영역이 표시되지 않습니다.',
      },
    },
  },
};
