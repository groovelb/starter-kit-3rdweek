import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import QuantitySelector from './QuantitySelector';

export default {
  title: 'Custom Component/shared/QuantitySelector',
  component: QuantitySelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## QuantitySelector

수량 선택을 위한 - / 숫자 / + 형태의 입력 컴포넌트.

### 특징
- 최소/최대 수량 제한
- small/medium 크기 지원
- 비활성화 상태 지원
- borderRadius: 0 (Lumenstate 디자인 시스템)
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 99 },
      description: '현재 수량',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    onChange: {
      action: 'changed',
      description: '수량 변경 핸들러',
      table: {
        type: { summary: '(value: number) => void' },
      },
    },
    min: {
      control: { type: 'number', min: 0, max: 10 },
      description: '최소 수량',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    max: {
      control: { type: 'number', min: 1, max: 999 },
      description: '최대 수량',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' },
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
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: '크기',
      table: {
        type: { summary: "'small' | 'medium'" },
        defaultValue: { summary: "'medium'" },
      },
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    value: 1,
    min: 1,
    max: 99,
    isDisabled: false,
    size: 'medium',
  },
};

/** 인터랙티브 데모 */
export const Interactive = {
  render: () => {
    const [quantity, setQuantity] = useState(1);

    return (
      <Stack spacing={2} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          현재 수량: {quantity}
        </Typography>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={10}
        />
      </Stack>
    );
  },
};

/** 크기 비교 */
export const Sizes = {
  render: () => (
    <Stack spacing={3} alignItems="flex-start">
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Small
        </Typography>
        <QuantitySelector value={1} size="small" />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Medium (기본)
        </Typography>
        <QuantitySelector value={1} size="medium" />
      </Stack>
    </Stack>
  ),
};

/** 상태 */
export const States = {
  render: () => (
    <Stack spacing={3} alignItems="flex-start">
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          기본 상태
        </Typography>
        <QuantitySelector value={5} />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          최소값 (감소 불가)
        </Typography>
        <QuantitySelector value={1} min={1} />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          최대값 (증가 불가)
        </Typography>
        <QuantitySelector value={10} max={10} />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          비활성화
        </Typography>
        <QuantitySelector value={3} isDisabled />
      </Stack>
    </Stack>
  ),
};
