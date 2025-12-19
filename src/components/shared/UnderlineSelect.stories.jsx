import { useState } from 'react';
import Stack from '@mui/material/Stack';
import UnderlineSelect from './UnderlineSelect';

const sampleOptions = [
  { value: 'opaline', label: 'Opaline' },
  { value: 'clear', label: 'Clear Glass' },
  { value: 'frosted', label: 'Frosted Glass' },
  { value: 'amber', label: 'Amber Glass' },
  { value: 'smoke', label: 'Smoke Glass' },
];

export default {
  title: 'Custom Component/UnderlineSelect',
  component: UnderlineSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## UnderlineSelect

하단 underline만 있는 미니멀한 셀렉트 필드.

### 특징
- 상단 라벨 + 하단 underline 스타일
- 드롭다운 메뉴로 옵션 선택
- 화살표 아이콘 회전 애니메이션
- small / medium / large 사이즈 지원
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '필드 라벨',
    },
    value: {
      control: 'text',
      description: '현재 선택된 값',
    },
    options: {
      control: 'object',
      description: '옵션 배열 [{ value, label }]',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    isDisabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '크기',
    },
    onChange: {
      action: 'changed',
      description: '변경 핸들러',
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    label: 'Glass Finish',
    value: 'opaline',
    options: sampleOptions,
    size: 'medium',
  },
};

/** 플레이스홀더 */
export const WithPlaceholder = {
  args: {
    label: 'Glass Finish',
    value: '',
    options: sampleOptions,
    placeholder: 'Select an option',
  },
};

/** 인터랙티브 예제 */
export const Interactive = {
  render: () => {
    const [value, setValue] = useState('opaline');

    return (
      <UnderlineSelect
        label="Glass Finish"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={sampleOptions}
        sx={{ width: 300 }}
      />
    );
  },
};

/** 사이즈 비교 */
export const Sizes = {
  render: () => {
    const [values, setValues] = useState({ small: 'opaline', medium: 'clear', large: 'frosted' });

    return (
      <Stack spacing={4} sx={{ width: 360 }}>
        <UnderlineSelect
          label="Small Size"
          value={values.small}
          onChange={(e) => setValues({ ...values, small: e.target.value })}
          options={sampleOptions}
          size="small"
        />
        <UnderlineSelect
          label="Medium Size"
          value={values.medium}
          onChange={(e) => setValues({ ...values, medium: e.target.value })}
          options={sampleOptions}
          size="medium"
        />
        <UnderlineSelect
          label="Large Size"
          value={values.large}
          onChange={(e) => setValues({ ...values, large: e.target.value })}
          options={sampleOptions}
          size="large"
        />
      </Stack>
    );
  },
};

/** 여러 셀렉트 */
export const MultipleSelects = {
  render: () => {
    const [values, setValues] = useState({
      glass: 'opaline',
      hardware: 'brass',
      height: '61-72',
    });

    const hardwareOptions = [
      { value: 'patina-brass', label: 'Patina Brass' },
      { value: 'brass', label: 'Brass' },
      { value: 'chrome', label: 'Chrome' },
      { value: 'matte-black', label: 'Matte Black' },
    ];

    const heightOptions = [
      { value: '61-72', label: '61-72 inches' },
      { value: '48-60', label: '48-60 inches' },
      { value: '36-48', label: '36-48 inches' },
    ];

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <UnderlineSelect
          label="Glass Finish"
          value={values.glass}
          onChange={(e) => setValues({ ...values, glass: e.target.value })}
          options={sampleOptions}
        />
        <UnderlineSelect
          label="Hardware"
          value={values.hardware}
          onChange={(e) => setValues({ ...values, hardware: e.target.value })}
          options={hardwareOptions}
        />
        <UnderlineSelect
          label="OAH (Overall Height)"
          value={values.height}
          onChange={(e) => setValues({ ...values, height: e.target.value })}
          options={heightOptions}
        />
      </Stack>
    );
  },
};
