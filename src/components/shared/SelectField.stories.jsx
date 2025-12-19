import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectField from './SelectField';

// 옵션 데이터
const glassFinishOptions = [
  { value: 'opaline', label: 'Opaline' },
  { value: 'clear', label: 'Clear Glass' },
  { value: 'frosted', label: 'Frosted Glass' },
  { value: 'amber', label: 'Amber Glass' },
  { value: 'smoke', label: 'Smoke Glass' },
];

const hardwareOptions = [
  { value: 'patina-brass', label: 'Patina Brass' },
  { value: 'brass', label: 'Brass' },
  { value: 'chrome', label: 'Chrome' },
  { value: 'matte-black', label: 'Matte Black' },
  { value: 'nickel', label: 'Brushed Nickel' },
];

const heightOptions = [
  { value: '61-72', label: '61-72 inches' },
  { value: '36-48', label: '36-48 inches' },
  { value: '24-36', label: '24-36 inches' },
  { value: '12-24', label: '12-24 inches' },
];

export default {
  title: 'Custom Component/shared/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SelectField

드롭다운 선택 필드. 상품 상세의 옵션 선택에 사용.

### 특징
- 라벨 + 선택값 + 드롭다운 화살표 형태
- borderRadius: 0 (Lumenstate 디자인 시스템)
- 에러 상태 및 도움말 텍스트 지원
- Glass Finish, Hardware, OAH 등 제품 옵션용
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '필드 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: '현재 선택된 값',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: '변경 핸들러',
      table: {
        type: { summary: '(event) => void' },
      },
    },
    options: {
      control: 'object',
      description: '옵션 배열',
      table: {
        type: { summary: 'Array<{ value, label, disabled? }>' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: {
        type: { summary: 'string' },
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
    isDisabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isRequired: {
      control: 'boolean',
      description: '필수 필드 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    helperText: {
      control: 'text',
      description: '도움말 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    hasError: {
      control: 'boolean',
      description: '에러 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isFullWidth: {
      control: 'boolean',
      description: '전체 너비',
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
    label: 'Glass Finish',
    value: 'opaline',
    options: glassFinishOptions,
    isFullWidth: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <SelectField {...args} />
    </div>
  ),
};

/** 인터랙티브 데모 */
export const Interactive = {
  render: () => {
    const [finish, setFinish] = useState('opaline');
    const [hardware, setHardware] = useState('patina-brass');
    const [height, setHeight] = useState('61-72');

    return (
      <Stack spacing={3} sx={{ width: 280 }}>
        <SelectField
          label="Glass Finish"
          value={finish}
          onChange={(e) => setFinish(e.target.value)}
          options={glassFinishOptions}
        />
        <SelectField
          label="Hardware"
          value={hardware}
          onChange={(e) => setHardware(e.target.value)}
          options={hardwareOptions}
        />
        <SelectField
          label="OAH"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          options={heightOptions}
          helperText="Overall Height"
        />
      </Stack>
    );
  },
};

/** 크기 비교 */
export const Sizes = {
  render: () => (
    <Stack spacing={3} sx={{ width: 280 }}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Small
        </Typography>
        <SelectField
          label="Glass Finish"
          value="opaline"
          options={glassFinishOptions}
          size="small"
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Medium (기본)
        </Typography>
        <SelectField
          label="Glass Finish"
          value="opaline"
          options={glassFinishOptions}
          size="medium"
        />
      </Stack>
    </Stack>
  ),
};

/** 상태 */
export const States = {
  render: () => (
    <Stack spacing={3} sx={{ width: 280 }}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          기본 상태
        </Typography>
        <SelectField
          label="Hardware"
          value="brass"
          options={hardwareOptions}
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          플레이스홀더
        </Typography>
        <SelectField
          label="Hardware"
          value=""
          options={hardwareOptions}
          placeholder="Select hardware"
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          에러 상태
        </Typography>
        <SelectField
          label="Hardware"
          value=""
          options={hardwareOptions}
          hasError
          helperText="This field is required"
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          비활성화
        </Typography>
        <SelectField
          label="Hardware"
          value="brass"
          options={hardwareOptions}
          isDisabled
        />
      </Stack>
    </Stack>
  ),
};
