import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import ProductGallery from './ProductGallery';
import { products } from '../../data/products';

// 샘플 제품
const sampleProduct = products[0];

export default {
  title: 'Custom Component/product/ProductGallery',
  component: ProductGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProductGallery

제품 이미지 갤러리 컴포넌트. 상품 상세 페이지의 우측 영역.

### 특징
- 메인 이미지 + 썸네일 스트립 레이아웃
- TimeBlendImage로 타임라인 기반 낮/밤 이미지 블렌딩
- 페이지네이션 인디케이터
- 썸네일 클릭으로 이미지 전환
        `,
      },
    },
  },
  argTypes: {
    product: {
      control: 'object',
      description: '제품 데이터 { images, title }',
      table: {
        type: { summary: 'object' },
      },
    },
    timeline: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: '타임라인 값 (0-1)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    selectedIndex: {
      control: { type: 'number', min: 0, max: 3 },
      description: '현재 선택된 이미지 인덱스',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    showThumbnails: {
      control: 'boolean',
      description: '썸네일 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showIndicator: {
      control: 'boolean',
      description: '페이지네이션 인디케이터 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    aspectRatio: {
      control: 'select',
      options: ['auto', '1/1', '4/5', '3/4', '16/9'],
      description: '메인 이미지 종횡비',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'auto'" },
      },
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    product: sampleProduct,
    timeline: 0,
    showThumbnails: true,
    showIndicator: true,
    aspectRatio: 'auto',
  },
  render: (args) => (
    <Box sx={{ width: 400 }}>
      <ProductGallery {...args} />
    </Box>
  ),
};

/** 타임라인 인터랙션 */
export const WithTimelineControl = {
  render: () => {
    const [timeline, setTimeline] = useState(0);

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <ProductGallery
          product={sampleProduct}
          timeline={timeline}
        />
        <Box sx={{ px: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Timeline: {timeline.toFixed(2)} ({timeline < 0.5 ? '낮' : '밤'})
          </Typography>
          <Slider
            value={timeline}
            onChange={(_, value) => setTimeline(value)}
            min={0}
            max={1}
            step={0.01}
            sx={{
              '& .MuiSlider-thumb': {
                borderRadius: 0,
              },
              '& .MuiSlider-track': {
                borderRadius: 0,
              },
              '& .MuiSlider-rail': {
                borderRadius: 0,
              },
            }}
          />
        </Box>
      </Stack>
    );
  },
};

/** 종횡비 변형 */
export const AspectRatios = {
  render: () => (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Auto (원본 비율)
        </Typography>
        <Box sx={{ width: 300 }}>
          <ProductGallery
            product={sampleProduct}
            aspectRatio="auto"
            showThumbnails={false}
          />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          1:1 (정사각형)
        </Typography>
        <Box sx={{ width: 300 }}>
          <ProductGallery
            product={sampleProduct}
            aspectRatio="1/1"
            showThumbnails={false}
          />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          4:5 (세로형)
        </Typography>
        <Box sx={{ width: 300 }}>
          <ProductGallery
            product={sampleProduct}
            aspectRatio="4/5"
            showThumbnails={false}
          />
        </Box>
      </Stack>
    </Stack>
  ),
};

/** 썸네일 옵션 */
export const ThumbnailOptions = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          썸네일 표시
        </Typography>
        <Box sx={{ width: 280 }}>
          <ProductGallery
            product={sampleProduct}
            showThumbnails={true}
          />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          썸네일 숨김
        </Typography>
        <Box sx={{ width: 280 }}>
          <ProductGallery
            product={sampleProduct}
            showThumbnails={false}
          />
        </Box>
      </Stack>
    </Stack>
  ),
};

/** 낮/밤 비교 */
export const DayNightComparison = {
  render: () => (
    <Stack direction="row" spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          12pm (정오)
        </Typography>
        <Box sx={{ width: 280 }}>
          <ProductGallery
            product={sampleProduct}
            timeline={0}
            showThumbnails={false}
          />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          12am (자정)
        </Typography>
        <Box sx={{ width: 280 }}>
          <ProductGallery
            product={sampleProduct}
            timeline={1}
            showThumbnails={false}
          />
        </Box>
      </Stack>
    </Stack>
  ),
};
