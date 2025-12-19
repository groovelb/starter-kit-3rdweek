import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProductImageViewer from './ProductImageViewer';
import { products } from '../../data/products';

export default {
  title: 'Custom Component/product/ProductImageViewer',
  component: ProductImageViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ProductImageViewer

ScrollVideo와 동일한 레이아웃. 배경만 비디오 대신 TimeBlendImage 사용.

### 특징
- ScrollVideo와 동일한 하단 오버레이 스타일
- TimeBlendImage로 낮/밤 이미지 블렌딩 (원본 비율 유지)
- 기존 TimelineSlider 컴포넌트 그대로 사용
- 하단 좌측에 현재 시간 표시 (12:00pm ~ 12:00am)
- 우측 상단에 lux/kelvin 정보 표시 (선택적)
        `,
      },
    },
  },
  argTypes: {
    images: {
      control: 'object',
      description: '제품 이미지 배열 [dayImage, nightImage]',
      table: {
        type: { summary: 'array' },
      },
    },
    productName: {
      control: 'text',
      description: '제품명 (alt 텍스트용)',
      table: {
        type: { summary: 'string' },
      },
    },
    lux: {
      control: { type: 'number', min: 0 },
      description: '제품 조도 값',
      table: {
        type: { summary: 'number' },
      },
    },
    kelvin: {
      control: { type: 'number', min: 0 },
      description: '제품 색온도 값',
      table: {
        type: { summary: 'number' },
      },
    },
  },
};

// 선택된 제품: Lumen Desk Pro
const selectedProduct = products[0];

/** 기본 사용 - Lumen Desk Pro */
export const Default = {
  args: {
    images: selectedProduct.images,
    productName: selectedProduct.title,
    lux: selectedProduct.lux,
    kelvin: selectedProduct.kelvin,
  },
};

/** Lux/Kelvin 정보 없이 */
export const WithoutSpecs = {
  args: {
    images: selectedProduct.images,
    productName: selectedProduct.title,
  },
};

/** 다양한 제품 */
export const ProductVariants = {
  render: () => (
    <Stack spacing={4}>
      {products.slice(0, 3).map((product) => (
        <Box key={product.id}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {product.title}
          </Typography>
          <ProductImageViewer
            images={product.images}
            productName={product.title}
            lux={product.lux}
            kelvin={product.kelvin}
          />
        </Box>
      ))}
    </Stack>
  ),
};
