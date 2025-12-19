import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

import { ProductGrid } from './ProductGrid';
import { products } from '../data/products';

export default {
  title: 'Template/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ProductGrid

ProductCard들을 반응형 그리드로 배치하는 템플릿.

### 기능
- 반응형 그리드 레이아웃 (2/3/4/6열)
- timeline 값으로 모든 카드 동기화
- 제품 선택 상태 관리
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
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: '시간대 값 (0=낮, 1=밤)',
    },
    columns: {
      control: 'select',
      options: [2, 3, 4, 6],
      description: '그리드 열 수',
    },
    spacing: {
      control: { type: 'number', min: 0, max: 4 },
      description: '그리드 간격',
    },
    onProductClick: {
      action: 'productClicked',
      description: '제품 클릭 핸들러',
    },
  },
};

/**
 * 기본 사용법 - 전체 제품
 */
export const Default = {
  args: {
    products: products,
    timeline: 0,
    columns: 3,
    spacing: 2,
  },
};

/**
 * 타임라인 연동
 */
export const WithTimeline = {
  render: function WithTimelineDemo() {
    const [timeline, setTimeline] = useState(0);

    return (
      <Box>
        <Box sx={{ mb: 3, maxWidth: 400 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption">Day (0)</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {timeline.toFixed(2)}
            </Typography>
            <Typography variant="caption">Night (1)</Typography>
          </Box>
          <Slider
            value={timeline}
            onChange={(e, v) => setTimeline(v)}
            min={0}
            max={1}
            step={0.01}
          />
        </Box>
        <ProductGrid
          products={products}
          timeline={timeline}
          columns={3}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '슬라이더로 timeline 값을 조절하면 모든 카드의 이미지가 동기화됩니다.',
      },
    },
  },
};

/**
 * 열 수 비교
 */
export const ColumnVariants = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          2 Columns
        </Typography>
        <ProductGrid products={products.slice(0, 4)} columns={2} />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          3 Columns
        </Typography>
        <ProductGrid products={products.slice(0, 6)} columns={3} />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          4 Columns
        </Typography>
        <ProductGrid products={products.slice(0, 8)} columns={4} />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 열 수 설정을 비교합니다.',
      },
    },
  },
};
