import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CartItem from './CartItem';
import { products } from '../../data/products';

// 샘플 아이템
const sampleItem = {
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
};

export default {
  title: 'Custom Component/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CartItem

장바구니 아이템 컴포넌트. 썸네일 + 제품명 + 옵션 + 가격 + 수량 + Remove.

### 구조
- 좌측: 제품 썸네일 (100x100)
- 우측: 제품명, 옵션 목록, 가격, 수량 조절, Remove 버튼
        `,
      },
    },
  },
  argTypes: {
    item: {
      control: 'object',
      description: '장바구니 아이템 데이터',
    },
    currency: {
      control: 'text',
      description: '통화 코드',
    },
    onQuantityChange: {
      action: 'quantityChanged',
      description: '수량 변경 핸들러',
    },
    onRemove: {
      action: 'removed',
      description: '제거 핸들러',
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    item: sampleItem,
    currency: 'USD',
  },
};

/** 인터랙티브 예제 */
export const Interactive = {
  render: () => {
    const [item, setItem] = useState(sampleItem);

    const handleQuantityChange = (quantity) => {
      setItem((prev) => ({ ...prev, quantity }));
    };

    const handleRemove = () => {
      alert('Item removed!');
    };

    return (
      <Box sx={{ width: 350, border: '1px solid', borderColor: 'divider', p: 2 }}>
        <CartItem
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      </Box>
    );
  },
};

/** 여러 아이템 */
export const MultipleItems = {
  render: () => {
    const items = products.slice(0, 3).map((product, index) => ({
      id: `item-${index}`,
      product: {
        ...product,
        price: 1000 + index * 300,
      },
      options: {
        glassFinish: index === 0 ? 'opaline' : index === 1 ? 'clear' : 'frosted',
        hardware: index === 0 ? 'patina-brass' : index === 1 ? 'chrome' : 'matte-black',
        height: '61-72',
      },
      quantity: index + 1,
    }));

    return (
      <Box sx={{ width: 350, border: '1px solid', borderColor: 'divider' }}>
        {items.map((item, index) => (
          <Box key={item.id}>
            <CartItem item={item} />
            {index < items.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    );
  },
};
