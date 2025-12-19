import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProductActions from './ProductActions';

export default {
  title: 'Custom Component/product/ProductActions',
  component: ProductActions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProductActions

제품 액션 영역 컴포넌트. 상품 상세 페이지에서 사용.

### 특징
- 수량 선택 + 가격 + Add to Cart 버튼
- 수량에 따른 총 가격 자동 계산
- 로딩/비활성화 상태 지원
- Lumenstate 액센트 컬러 (#FFC66E) 버튼
        `,
      },
    },
  },
  argTypes: {
    price: {
      control: { type: 'number', min: 0 },
      description: '제품 단가',
      table: {
        type: { summary: 'number' },
      },
    },
    currency: {
      control: 'text',
      description: '통화 코드',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'USD'" },
      },
    },
    quantity: {
      control: { type: 'number', min: 1, max: 99 },
      description: '현재 수량',
      table: {
        type: { summary: 'number' },
      },
    },
    onQuantityChange: {
      action: 'quantityChanged',
      description: '수량 변경 핸들러',
      table: {
        type: { summary: '(quantity: number) => void' },
      },
    },
    onAddToCart: {
      action: 'addedToCart',
      description: '장바구니 추가 핸들러',
      table: {
        type: { summary: '(quantity: number) => void' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showDivider: {
      control: 'boolean',
      description: '상단 구분선 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    price: 22900,
    currency: 'USD',
    showDivider: true,
  },
  render: (args) => (
    <Box sx={{ width: 480 }}>
      <ProductActions {...args} />
    </Box>
  ),
};

/** 인터랙티브 데모 */
export const Interactive = {
  render: () => {
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = (qty) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert(`${qty}개 장바구니에 추가되었습니다!`);
      }, 1000);
    };

    return (
      <Stack spacing={3} sx={{ width: 480 }}>
        <ProductActions
          price={22900}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          isLoading={isLoading}
        />
        <Typography variant="caption" color="text.secondary">
          현재 수량: {quantity} | 총 가격: ${(22900 * quantity).toLocaleString()}
        </Typography>
      </Stack>
    );
  },
};

/** 다양한 가격대 */
export const PriceVariations = {
  render: () => (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          고가 제품 ($22,900)
        </Typography>
        <Box sx={{ width: 480 }}>
          <ProductActions price={22900} />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          중가 제품 ($1,200)
        </Typography>
        <Box sx={{ width: 480 }}>
          <ProductActions price={1200} />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          저가 제품 ($299)
        </Typography>
        <Box sx={{ width: 480 }}>
          <ProductActions price={299} />
        </Box>
      </Stack>
    </Stack>
  ),
};

/** 상태 */
export const States = {
  render: () => (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          기본 상태
        </Typography>
        <Box sx={{ width: 480 }}>
          <ProductActions price={22900} />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          로딩 상태
        </Typography>
        <Box sx={{ width: 480 }}>
          <ProductActions price={22900} isLoading />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          비활성화 상태
        </Typography>
        <Box sx={{ width: 480 }}>
          <ProductActions price={22900} isDisabled />
        </Box>
      </Stack>
    </Stack>
  ),
};

/** 구분선 옵션 */
export const DividerOptions = {
  render: () => (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          구분선 표시 (기본)
        </Typography>
        <Box sx={{ width: 480, p: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            제품 옵션 영역
          </Typography>
          <ProductActions price={22900} showDivider={true} />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          구분선 숨김
        </Typography>
        <Box sx={{ width: 480, p: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            제품 옵션 영역
          </Typography>
          <ProductActions price={22900} showDivider={false} />
        </Box>
      </Stack>
    </Stack>
  ),
};
