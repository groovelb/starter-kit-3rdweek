import ProductDetailPage from './ProductDetailPage';
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
  title: 'Page/ProductDetailPage',
  component: ProductDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ProductDetailPage

제품 상세 페이지. PageContainer + ProductDetailSection 조합.
GNB는 라우터 레벨에서 처리.

### 구조
- **PageContainer**: 페이지 컨테이너
- **ProductDetailSection**: 제품 상세 UI + CartDrawer
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
    currency: 'USD',
  },
};

/** 다른 제품 */
export const AnotherProduct = {
  args: {
    product: {
      ...products[1],
      price: 980,
    },
    meta: {
      itemNumber: 'LM-002',
      leadTime: '3 Weeks',
      shipDate: 'Jan 10, 2025',
    },
    currency: 'USD',
  },
};

/** 메타 정보 없음 */
export const NoMeta = {
  args: {
    product: sampleProduct,
    meta: {},
    currency: 'USD',
  },
};
