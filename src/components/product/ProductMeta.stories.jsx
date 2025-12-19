import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProductMeta from './ProductMeta';

export default {
  title: 'Custom Component/product/ProductMeta',
  component: ProductMeta,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProductMeta

제품 메타 정보 표시 컴포넌트. 상품 상세 페이지에서 사용.

### 특징
- Item Number, Lead Time, Est. Ship Date 정보 표시
- 라벨-값 그리드 레이아웃
- 선택적 상단 구분선
        `,
      },
    },
  },
  argTypes: {
    itemNumber: {
      control: 'text',
      description: '제품 번호',
      table: {
        type: { summary: 'string' },
      },
    },
    leadTime: {
      control: 'text',
      description: '리드 타임',
      table: {
        type: { summary: 'string' },
      },
    },
    shipDate: {
      control: 'text',
      description: '예상 배송일',
      table: {
        type: { summary: 'string' },
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
    itemNumber: 'FA-100318',
    leadTime: '12 Weeks',
    shipDate: 'March 5, 2026',
    showDivider: true,
  },
  render: (args) => (
    <Box sx={{ width: 320 }}>
      <ProductMeta {...args} />
    </Box>
  ),
};

/** 전체 정보 */
export const FullInfo = {
  render: () => (
    <Box sx={{ width: 320 }}>
      <ProductMeta
        itemNumber="FA-100318"
        leadTime="12 Weeks"
        shipDate="March 5, 2026"
      />
    </Box>
  ),
};

/** 부분 정보 */
export const PartialInfo = {
  render: () => (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Item Number만
        </Typography>
        <Box sx={{ width: 320 }}>
          <ProductMeta itemNumber="FA-100318" />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Item Number + Lead Time
        </Typography>
        <Box sx={{ width: 320 }}>
          <ProductMeta
            itemNumber="FA-100318"
            leadTime="12 Weeks"
          />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Lead Time + Ship Date
        </Typography>
        <Box sx={{ width: 320 }}>
          <ProductMeta
            leadTime="8-10 Weeks"
            shipDate="February 15, 2026"
          />
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
        <Box sx={{ width: 320, p: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            이전 콘텐츠
          </Typography>
          <ProductMeta
            itemNumber="FA-100318"
            leadTime="12 Weeks"
            showDivider={true}
          />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          구분선 숨김
        </Typography>
        <Box sx={{ width: 320, p: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            이전 콘텐츠
          </Typography>
          <ProductMeta
            itemNumber="FA-100318"
            leadTime="12 Weeks"
            showDivider={false}
          />
        </Box>
      </Stack>
    </Stack>
  ),
};

/** 다양한 제품 예시 */
export const ProductExamples = {
  render: () => (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Flora Chandelier
        </Typography>
        <Box sx={{ width: 320 }}>
          <ProductMeta
            itemNumber="FA-100318"
            leadTime="12 Weeks"
            shipDate="March 5, 2026"
          />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Lumen Desk Pro
        </Typography>
        <Box sx={{ width: 320 }}>
          <ProductMeta
            itemNumber="LM-DSK-001"
            leadTime="4-6 Weeks"
            shipDate="January 20, 2026"
          />
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          재고 있는 제품
        </Typography>
        <Box sx={{ width: 320 }}>
          <ProductMeta
            itemNumber="LM-WLL-042"
            leadTime="In Stock"
            shipDate="Ships within 3-5 days"
          />
        </Box>
      </Stack>
    </Stack>
  ),
};
