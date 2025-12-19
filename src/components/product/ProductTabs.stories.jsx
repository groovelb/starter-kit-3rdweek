import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProductTabs, { DEFAULT_PRODUCT_TABS } from './ProductTabs';

export default {
  title: 'Custom Component/product/ProductTabs',
  component: ProductTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ProductTabs

제품 상세 정보 탭 메뉴 컴포넌트. 상품 상세 페이지에서 사용.

### 특징
- 세로/가로 탭 레이아웃 지원
- 활성 탭 시각적 구분 (볼드 + 언더라인)
- 탭 콘텐츠 동적 렌더링
- 키보드 접근성 지원
        `,
      },
    },
  },
  argTypes: {
    tabs: {
      control: 'object',
      description: '탭 목록 ({ id, label, content }[])',
      table: {
        type: { summary: 'array' },
      },
    },
    activeTab: {
      control: 'text',
      description: '현재 활성 탭 ID',
      table: {
        type: { summary: 'string' },
      },
    },
    onTabChange: {
      action: 'tabChanged',
      description: '탭 변경 핸들러',
      table: {
        type: { summary: '(tabId: string) => void' },
      },
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '탭 방향',
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: "'vertical'" },
      },
    },
  },
};

// 샘플 탭 콘텐츠
const createSampleContent = (title, description) => (
  <Box>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

const sampleTabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: createSampleContent(
      'Product Overview',
      'The Flora Chandelier features a sculptural design inspired by natural botanical forms. Each stem terminates in a hand-blown glass diffuser that softens the light output while creating a warm, inviting ambiance.'
    ),
  },
  {
    id: 'description',
    label: 'Description',
    content: createSampleContent(
      'Detailed Description',
      'Crafted from solid brass with a hand-applied patina finish, this chandelier brings timeless elegance to any space. The seven stems are individually adjustable, allowing for custom configurations.'
    ),
  },
  {
    id: 'specs',
    label: 'Tech Specs + Downloads',
    content: (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Technical Specifications
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 1,
            rowGap: 0.75,
          }}
        >
          <Typography variant="body2" color="text.secondary">Dimensions:</Typography>
          <Typography variant="body2">36" W × 24" H</Typography>
          <Typography variant="body2" color="text.secondary">Weight:</Typography>
          <Typography variant="body2">18 lbs</Typography>
          <Typography variant="body2" color="text.secondary">Bulb Type:</Typography>
          <Typography variant="body2">E26 LED, 7W each</Typography>
          <Typography variant="body2" color="text.secondary">Voltage:</Typography>
          <Typography variant="body2">120V / 60Hz</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 'collection',
    label: 'Explore the Collection',
    content: createSampleContent(
      'Flora Collection',
      'Discover other pieces in the Flora collection, including wall sconces, table lamps, and floor lamps that share the same botanical-inspired design language.'
    ),
  },
];

/** 기본 사용 (세로 탭) */
export const Default = {
  args: {
    tabs: sampleTabs,
    orientation: 'vertical',
  },
  render: (args) => (
    <Box sx={{ width: 700 }}>
      <ProductTabs {...args} />
    </Box>
  ),
};

/** 인터랙티브 데모 */
export const Interactive = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
      <Stack spacing={3} sx={{ width: 700 }}>
        <ProductTabs
          tabs={sampleTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <Typography variant="caption" color="text.secondary">
          현재 활성 탭: {activeTab}
        </Typography>
      </Stack>
    );
  },
};

/** 가로 탭 레이아웃 */
export const HorizontalOrientation = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
      <Box sx={{ width: 700 }}>
        <ProductTabs
          tabs={sampleTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          orientation="horizontal"
        />
      </Box>
    );
  },
};

/** 방향 비교 */
export const OrientationComparison = {
  render: () => {
    const [verticalTab, setVerticalTab] = useState('overview');
    const [horizontalTab, setHorizontalTab] = useState('overview');

    const simpleTabs = sampleTabs.slice(0, 3);

    return (
      <Stack spacing={6}>
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            세로 탭 (Vertical)
          </Typography>
          <Box sx={{ width: 600 }}>
            <ProductTabs
              tabs={simpleTabs}
              activeTab={verticalTab}
              onTabChange={setVerticalTab}
              orientation="vertical"
            />
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            가로 탭 (Horizontal)
          </Typography>
          <Box sx={{ width: 600 }}>
            <ProductTabs
              tabs={simpleTabs}
              activeTab={horizontalTab}
              onTabChange={setHorizontalTab}
              orientation="horizontal"
            />
          </Box>
        </Stack>
      </Stack>
    );
  },
};

/** 기본 탭 목록 사용 */
export const DefaultTabLabels = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');

    // DEFAULT_PRODUCT_TABS에 샘플 콘텐츠 추가
    const tabsWithContent = DEFAULT_PRODUCT_TABS.map((tab) => ({
      ...tab,
      content: createSampleContent(
        tab.label,
        `${tab.label} 섹션의 콘텐츠가 여기에 표시됩니다.`
      ),
    }));

    return (
      <Box sx={{ width: 700 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          DEFAULT_PRODUCT_TABS 사용 예시
        </Typography>
        <ProductTabs
          tabs={tabsWithContent}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Box>
    );
  },
};

/** 최소 탭 */
export const MinimalTabs = {
  render: () => {
    const [activeTab, setActiveTab] = useState('details');

    const minimalTabs = [
      {
        id: 'details',
        label: 'Details',
        content: createSampleContent('Details', '제품 상세 정보'),
      },
      {
        id: 'shipping',
        label: 'Shipping',
        content: createSampleContent('Shipping', '배송 안내'),
      },
    ];

    return (
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            2개 탭 (세로)
          </Typography>
          <Box sx={{ width: 500 }}>
            <ProductTabs
              tabs={minimalTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              orientation="vertical"
            />
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            2개 탭 (가로)
          </Typography>
          <Box sx={{ width: 500 }}>
            <ProductTabs
              tabs={minimalTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              orientation="horizontal"
            />
          </Box>
        </Stack>
      </Stack>
    );
  },
};
