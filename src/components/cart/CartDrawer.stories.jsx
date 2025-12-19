import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CartDrawer from './CartDrawer';
import { products } from '../../data/products';

// 샘플 장바구니 아이템 생성
const createSampleItems = () => [
  {
    id: 'product-1-opaline-patina-brass-61-72',
    product: {
      ...products[0],
      price: 1290,
    },
    options: {
      glassFinish: 'opaline',
      hardware: 'patina-brass',
      height: '61-72',
    },
    quantity: 1,
  },
  {
    id: 'product-2-clear-chrome-48-60',
    product: {
      ...products[1],
      price: 980,
    },
    options: {
      glassFinish: 'clear',
      hardware: 'chrome',
      height: '48-60',
    },
    quantity: 2,
  },
];

export default {
  title: 'Custom Component/CartDrawer',
  component: CartDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## CartDrawer

장바구니 슬라이드 패널. MUI Drawer 기반, 오른쪽에서 슬라이드.

### 구조
- **CartHeader**: "Cart" 타이틀 + 닫기 버튼
- **CartItem 리스트**: 썸네일 + 제품명 + 옵션 + 가격 + 수량 + Remove
- **CartSummary**: Subtotal 금액
- **CartCheckoutButton**: Checkout 버튼

### 기능
- 수량 변경
- 아이템 제거
- 체크아웃 버튼
- 빈 장바구니 상태 표시
        `,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '열림 상태',
    },
    items: {
      control: 'object',
      description: '장바구니 아이템 배열',
    },
    subtotal: {
      control: 'number',
      description: '소계 금액',
    },
    width: {
      control: 'number',
      description: '드로어 너비',
    },
    onClose: {
      action: 'closed',
      description: '닫기 핸들러',
    },
    onQuantityChange: {
      action: 'quantityChanged',
      description: '수량 변경 핸들러',
    },
    onRemoveItem: {
      action: 'itemRemoved',
      description: '아이템 제거 핸들러',
    },
    onCheckout: {
      action: 'checkout',
      description: '체크아웃 핸들러',
    },
  },
};

/** 인터랙티브 예제 */
export const Default = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(createSampleItems());

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const handleQuantityChange = (itemId, quantity) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    };

    const handleRemoveItem = (itemId) => {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          CartDrawer Demo
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Cart ({items.length} items)
        </Button>

        <CartDrawer
          open={open}
          onClose={() => setOpen(false)}
          items={items}
          subtotal={subtotal}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
          onCheckout={() => alert('Checkout clicked!')}
        />
      </Box>
    );
  },
};

/** 빈 장바구니 */
export const Empty = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Empty Cart Demo
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Empty Cart
        </Button>

        <CartDrawer
          open={open}
          onClose={() => setOpen(false)}
          items={[]}
          subtotal={0}
        />
      </Box>
    );
  },
};

/** 아이템이 많은 장바구니 */
export const ManyItems = {
  render: () => {
    const [open, setOpen] = useState(false);

    const manyItems = products.slice(0, 5).map((product, index) => ({
      id: `product-${product.id}-option-${index}`,
      product: {
        ...product,
        price: 800 + index * 200,
      },
      options: {
        glassFinish: index % 2 === 0 ? 'opaline' : 'clear',
        hardware: index % 2 === 0 ? 'patina-brass' : 'chrome',
        height: '61-72',
      },
      quantity: 1 + (index % 3),
    }));

    const subtotal = manyItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Many Items Demo
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Cart ({manyItems.length} items)
        </Button>

        <CartDrawer
          open={open}
          onClose={() => setOpen(false)}
          items={manyItems}
          subtotal={subtotal}
        />
      </Box>
    );
  },
};
