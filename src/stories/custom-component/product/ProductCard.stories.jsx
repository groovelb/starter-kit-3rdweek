import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { ProductCard } from '../../../components/product/ProductCard';
import { products } from '../../../data/products';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../../components/storybookDocumentation';

export default {
  title: 'Custom Component/card/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProductCard

Lumenstate 제품 카드 컴포넌트.

### 특징
- timeline 값(0-1)에 따라 낮/밤 이미지 크로스페이드
- 조도(lux)·색온도(K) 상태 라벨
- 타입 태그 (Ceiling, Stand, Wall, Desk)
        `,
      },
    },
  },
  argTypes: {
    product: {
      control: 'object',
      description: '제품 데이터 객체',
    },
    timeline: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: '시간대 값 (0=낮, 1=밤)',
    },
    isSelected: {
      control: 'boolean',
      description: '선택 상태',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트',
    },
  },
};

/** Default - Controls에서 조작 가능 */
export const Default = {
  args: {
    product: products[0],
    timeline: 0,
    isSelected: false,
  },
  render: (args) => (
    <Box sx={ { width: 280 } }>
      <ProductCard { ...args } />
    </Box>
  ),
};

/** 타임라인 인터랙션 데모 */
function TimelineDemo() {
  const [timeline, setTimeline] = useState(0);

  return (
    <>
      <DocumentTitle
        title="Timeline Demo"
        status="Available"
        note="Day/Night crossfade with timeline"
        brandName="Lumenstate"
        systemName="Design System"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Timeline Interaction
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          슬라이더를 움직여 낮/밤 이미지 전환을 확인하세요.
        </Typography>

        <SectionTitle title="Timeline Slider" />
        <Box sx={ { mb: 4, maxWidth: 400 } }>
          <Box sx={ { display: 'flex', justifyContent: 'space-between', mb: 1 } }>
            <Typography variant="caption">Day (0)</Typography>
            <Typography variant="caption" sx={ { fontFamily: 'monospace' } }>
              { timeline.toFixed(2) }
            </Typography>
            <Typography variant="caption">Night (1)</Typography>
          </Box>
          <Slider
            value={ timeline }
            onChange={ (e, v) => setTimeline(v) }
            min={ 0 }
            max={ 1 }
            step={ 0.01 }
            sx={ { color: 'primary.main' } }
          />
        </Box>

        <SectionTitle title="Product Cards" />
        <Grid container spacing={ 2 }>
          { products.slice(0, 6).map((product) => (
            <Grid key={ product.id } size={ { xs: 6, sm: 4, md: 3 } }>
              <ProductCard product={ product } timeline={ timeline } />
            </Grid>
          )) }
        </Grid>
      </PageContainer>
    </>
  );
}

export const WithTimeline = {
  parameters: {
    layout: 'padded',
  },
  render: () => <TimelineDemo />,
};

/** 2x2 그리드 */
export const Grid2x2 = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <>
      <DocumentTitle
        title="2x2 Grid"
        status="Available"
        note="Compact 2x2 product grid"
        brandName="Lumenstate"
        systemName="Design System"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          2x2 Grid
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          4개의 제품을 2x2 그리드로 표시합니다.
        </Typography>

        <Grid container spacing={ 2 } sx={ { maxWidth: 600 } }>
          { products.slice(0, 4).map((product) => (
            <Grid key={ product.id } size={ { xs: 6 } }>
              <ProductCard product={ product } timeline={ 0 } />
            </Grid>
          )) }
        </Grid>
      </PageContainer>
    </>
  ),
};

/** 제품 그리드 */
export const ProductGrid = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <>
      <DocumentTitle
        title="Product Grid"
        status="Available"
        note="All products display"
        brandName="Lumenstate"
        systemName="Design System"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Product Grid
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          전체 제품 카드 그리드 뷰입니다.
        </Typography>

        <Grid container spacing={ 2 }>
          { products.map((product) => (
            <Grid key={ product.id } size={ { xs: 6, sm: 4, md: 3, lg: 2 } }>
              <ProductCard product={ product } timeline={ 0 } />
            </Grid>
          )) }
        </Grid>
      </PageContainer>
    </>
  ),
};
