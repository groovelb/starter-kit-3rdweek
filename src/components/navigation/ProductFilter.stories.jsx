import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProductFilter } from './ProductFilter';
import { products, PRODUCT_TYPES } from '../../data/products';

export default {
  title: 'Custom Component/navigation/ProductFilter',
  component: ProductFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ProductFilter

제품 타입별 필터링을 위한 세로 탭 컴포넌트입니다.

### 사용 패턴
- \`selected\`: 현재 선택된 필터 값 (PRODUCT_TYPES 상수 또는 'all')
- \`onChange\`: 필터 변경 시 호출되는 콜백
- \`showAll\`: 'All' 옵션 표시 여부
        `,
      },
    },
  },
  argTypes: {
    selected: {
      control: 'select',
      options: ['all', PRODUCT_TYPES.CEILING, PRODUCT_TYPES.STAND, PRODUCT_TYPES.WALL, PRODUCT_TYPES.DESK],
      description: '현재 선택된 필터 타입',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'all' },
      },
    },
    onChange: {
      action: 'changed',
      description: '필터 변경 시 호출되는 콜백 함수',
    },
    showAll: {
      control: 'boolean',
      description: 'All 탭 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    sx: {
      control: 'object',
      description: '추가 스타일',
    },
  },
};

/** 기본 필터 */
export const Default = {
  args: {
    selected: 'all',
    showAll: true,
  },
};

/** 필터링 데모 */
export const WithFiltering = {
  render: () => {
    const [filter, setFilter] = useState('all');

    const filteredProducts = filter === 'all'
      ? products
      : products.filter((p) => p.type === filter);

    return (
      <Box sx={{ display: 'flex', gap: 4 }}>
        <ProductFilter selected={filter} onChange={setFilter} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {filteredProducts.length}개 제품
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filteredProducts.map((product) => (
              <Typography key={product.id} variant="body2">
                {product.title} ({product.type})
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    );
  },
};

/** All 탭 없이 */
export const WithoutAllOption = {
  args: {
    selected: PRODUCT_TYPES.CEILING,
    showAll: false,
  },
};
