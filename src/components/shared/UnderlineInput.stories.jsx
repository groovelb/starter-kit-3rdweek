import { useState } from 'react';
import Stack from '@mui/material/Stack';
import UnderlineInput from './UnderlineInput';

export default {
  title: 'Custom Component/UnderlineInput',
  component: UnderlineInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## UnderlineInput

하단 underline만 있는 미니멀한 텍스트 입력 필드.

### 특징
- 상단 라벨 + 하단 underline 스타일
- readOnly 모드로 정보 표시 전용 사용 가능
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
      description: '입력 값',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    isReadOnly: {
      control: 'boolean',
      description: '읽기 전용 여부',
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: '입력 타입',
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
    label: 'Email',
    value: '',
    placeholder: 'Enter your email',
    size: 'medium',
  },
};

/** 읽기 전용 */
export const ReadOnly = {
  args: {
    label: 'Item Number',
    value: 'LM-001',
    isReadOnly: true,
    size: 'medium',
  },
};

/** 사이즈 비교 */
export const Sizes = {
  render: () => {
    const [values, setValues] = useState({ small: '', medium: '', large: '' });

    return (
      <Stack spacing={4} sx={{ width: 360 }}>
        <UnderlineInput
          label="Small Size"
          value={values.small}
          onChange={(e) => setValues({ ...values, small: e.target.value })}
          placeholder="Small input"
          size="small"
        />
        <UnderlineInput
          label="Medium Size"
          value={values.medium}
          onChange={(e) => setValues({ ...values, medium: e.target.value })}
          placeholder="Medium input"
          size="medium"
        />
        <UnderlineInput
          label="Large Size"
          value={values.large}
          onChange={(e) => setValues({ ...values, large: e.target.value })}
          placeholder="Large input"
          size="large"
        />
      </Stack>
    );
  },
};

/** 상태 변형 */
export const States = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <UnderlineInput
        label="Normal"
        value="Editable value"
      />
      <UnderlineInput
        label="Read Only"
        value="Read only value"
        isReadOnly
      />
      <UnderlineInput
        label="Disabled"
        value="Disabled value"
        isDisabled
      />
    </Stack>
  ),
};
