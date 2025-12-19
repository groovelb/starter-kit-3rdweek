import { ProductInfoTemplate } from './ProductInfoTemplate';

export default {
  title: 'Template/ProductInfoTemplate',
  component: ProductInfoTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ProductInfoTemplate

제품 상세 페이지의 하단 정보 영역 템플릿.

### 구성
- **메타 정보**: 품번, 리드타임, 배송일
- **옵션 선택**: Glass Finish, Hardware, OAH
- **액션 영역**: 가격, 수량, 장바구니 추가 버튼

### 특징
- Controlled/Uncontrolled 모드 모두 지원
- ProductMeta, ProductOptions, ProductActions 조합
- 장바구니 추가 시 quantity와 options 전달
        `,
      },
    },
  },
  argTypes: {
    meta: {
      control: 'object',
      description: '제품 메타 정보 ({ itemNumber, leadTime, shipDate })',
      table: {
        type: { summary: 'object' },
      },
    },
    price: {
      control: 'number',
      description: '제품 가격',
      table: {
        type: { summary: 'number' },
      },
    },
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'KRW'],
      description: '통화',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'USD' },
      },
    },
    onAddToCart: {
      action: 'addedToCart',
      description: '장바구니 추가 핸들러 (quantity, options) => void',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

/** 기본 사용 (Uncontrolled) */
export const Default = {
  args: {
    meta: {
      itemNumber: 'LM-001',
      leadTime: '4-6 Weeks',
      shipDate: 'February 15, 2026',
    },
    price: 1290,
    currency: 'USD',
  },
};

/** 메타 정보 없음 */
export const WithoutMeta = {
  args: {
    price: 890,
    currency: 'USD',
  },
};

/** 다른 통화 */
export const EuroCurrency = {
  args: {
    meta: {
      itemNumber: 'LM-002',
      leadTime: '6-8 Weeks',
    },
    price: 1150,
    currency: 'EUR',
  },
};
