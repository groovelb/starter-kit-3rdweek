import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProductOptions, { DEFAULT_PRODUCT_OPTIONS } from './ProductOptions';

export default {
  title: 'Custom Component/product/ProductOptions',
  component: ProductOptions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProductOptions

제품 옵션 선택 영역 컴포넌트. 상품 상세 페이지에서 사용.

### 특징
- Glass Finish, Hardware, OAH 등 드롭다운 그룹
- SelectField 컴포넌트 기반
- 커스텀 옵션 목록 지원
- 반응형 레이아웃
        `,
      },
    },
  },
  argTypes: {
    values: {
      control: 'object',
      description: '현재 선택된 옵션 값',
      table: {
        type: { summary: '{ glassFinish, hardware, height }' },
      },
    },
    onChange: {
      action: 'changed',
      description: '옵션 변경 핸들러',
      table: {
        type: { summary: '(optionKey, value) => void' },
      },
    },
    availableOptions: {
      control: 'object',
      description: '사용 가능한 옵션 목록',
      table: {
        type: { summary: 'object' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'SelectField 크기',
      table: {
        type: { summary: "'small' | 'medium'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    spacing: {
      control: { type: 'number', min: 1, max: 5 },
      description: '필드 간 간격',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2.5' },
      },
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    values: {
      glassFinish: 'opaline',
      hardware: 'patina-brass',
      height: '61-72',
    },
  },
  render: (args) => (
    <Box sx={{ width: 320 }}>
      <ProductOptions {...args} />
    </Box>
  ),
};

/** 인터랙티브 데모 */
export const Interactive = {
  render: () => {
    const [options, setOptions] = useState({
      glassFinish: 'opaline',
      hardware: 'patina-brass',
      height: '61-72',
    });

    const handleChange = (key, value) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <Stack spacing={3} sx={{ width: 320 }}>
        <ProductOptions
          values={options}
          onChange={handleChange}
        />
        <Box
          component="pre"
          sx={{
            p: 2,
            backgroundColor: 'grey.100',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            borderRadius: 0,
            overflow: 'auto',
          }}
        >
          {JSON.stringify(options, null, 2)}
        </Box>
      </Stack>
    );
  },
};

/** 크기 비교 */
export const Sizes = {
  render: () => {
    const values = {
      glassFinish: 'opaline',
      hardware: 'patina-brass',
      height: '61-72',
    };

    return (
      <Stack direction="row" spacing={4}>
        <Stack spacing={1} sx={{ width: 280 }}>
          <Typography variant="caption" color="text.secondary">
            Small
          </Typography>
          <ProductOptions values={values} size="small" />
        </Stack>

        <Stack spacing={1} sx={{ width: 280 }}>
          <Typography variant="caption" color="text.secondary">
            Medium (기본)
          </Typography>
          <ProductOptions values={values} size="medium" />
        </Stack>
      </Stack>
    );
  },
};

/** 부분 옵션 */
export const PartialOptions = {
  render: () => {
    const [options, setOptions] = useState({
      glassFinish: '',
      hardware: '',
    });

    // Glass Finish와 Hardware만 제공
    const limitedOptions = {
      glassFinish: DEFAULT_PRODUCT_OPTIONS.glassFinish,
      hardware: DEFAULT_PRODUCT_OPTIONS.hardware,
    };

    return (
      <Stack spacing={3} sx={{ width: 320 }}>
        <Typography variant="caption" color="text.secondary">
          Glass Finish와 Hardware만 표시 (OAH 제외)
        </Typography>
        <ProductOptions
          values={options}
          onChange={(key, value) => setOptions((prev) => ({ ...prev, [key]: value }))}
          availableOptions={limitedOptions}
        />
      </Stack>
    );
  },
};

/** 빈 선택 상태 */
export const EmptySelection = {
  render: () => (
    <Box sx={{ width: 320 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        선택하지 않은 상태
      </Typography>
      <ProductOptions
        values={{
          glassFinish: '',
          hardware: '',
          height: '',
        }}
      />
    </Box>
  ),
};
