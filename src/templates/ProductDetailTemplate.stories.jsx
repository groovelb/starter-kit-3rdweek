import Box from '@mui/material/Box';
import { ProductDetailTemplate } from './ProductDetailTemplate';
import { products } from '../data/products';

export default {
  title: 'Template/ProductDetailTemplate',
  component: ProductDetailTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ProductDetailTemplate

제품 상세 페이지 템플릿. SplitScreen 50:50 분할 레이아웃.

### 레이아웃
- **좌측 (50%)**: HeroStack으로 구성
  - Hero: ProductHeroTemplate (제품명, 설명, 스펙 카드)
  - Footer: ProductInfoTemplate (메타, 옵션, CTA)
- **우측 (50%)**: ProductImageViewer (이미지 + 타임라인 슬라이더)

### 모듈화 구조
- \`ProductHeroTemplate\`: 상단 타이틀 영역 (독립 사용 가능)
- \`ProductInfoTemplate\`: 하단 정보 영역 (독립 사용 가능)

### 특징
- products.js의 실제 제품 데이터 사용
- 제품 옵션 선택 (Glass Finish, Hardware, OAH)
- 우측 이미지에 통합된 타임라인 슬라이더로 낮/밤 블렌딩 체험
- 반응형 레이아웃 (모바일 세로 스택)
        `,
      },
    },
  },
  argTypes: {
    product: {
      control: 'object',
      description: '제품 데이터 (products.js 구조)',
      table: {
        type: { summary: 'object' },
      },
    },
    meta: {
      control: 'object',
      description: '제품 메타 정보 ({ itemNumber, leadTime, shipDate })',
      table: {
        type: { summary: 'object' },
      },
    },
    onAddToCart: {
      action: 'addedToCart',
      description: '장바구니 추가 핸들러',
      table: {
        type: { summary: '(quantity) => void' },
      },
    },
  },
};

// 제품에 price 추가
const productWithPrice = {
  ...products[0],
  price: 1290,
};

// 메타 정보
const productMeta = {
  itemNumber: 'LM-001',
  leadTime: '4-6 Weeks',
  shipDate: 'February 15, 2026',
};

/** 기본 사용 - Lumen Desk Pro */
export const Default = {
  args: {
    product: productWithPrice,
    meta: productMeta,
  },
};

/** 다른 제품들 */
export const ProductVariants = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {products.slice(0, 3).map((product, index) => (
        <ProductDetailTemplate
          key={product.id}
          product={{ ...product, price: 1000 + index * 500 }}
          meta={{
            itemNumber: `LM-${String(product.id).padStart(3, '0')}`,
            leadTime: '4-6 Weeks',
          }}
        />
      ))}
    </Box>
  ),
};
