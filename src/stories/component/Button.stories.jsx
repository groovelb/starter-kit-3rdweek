import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default {
  title: 'MUI Component/Input/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Button

MUI Button 컴포넌트의 다양한 변형을 보여줍니다.

variant, color, size 등의 props를 조합하여 원하는 스타일을 만들 수 있습니다.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
      description: '버튼의 시각적 스타일을 결정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: '버튼의 색상 테마를 지정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기를 지정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼의 비활성화 상태를 지정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼을 부모 요소의 전체 너비로 확장합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: '버튼 내부에 표시될 텍스트 또는 요소입니다.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

/** 기본 버튼 */
export const Default = {
  args: {
    variant: 'contained',
    children: 'Button',
  },
};

/** Contained 버튼 - 강조가 필요한 주요 액션에 사용 */
export const Contained = {
  args: {
    variant: 'contained',
    children: 'Contained Button',
  },
};

/** Outlined 버튼 - 보조 액션에 사용 */
export const Outlined = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

/** Text 버튼 - 가장 낮은 강조 수준의 액션에 사용 */
export const Text = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

/** 모든 Variant 비교 */
export const AllVariants = {
  render: () => (
    <Stack spacing={ 2 } direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  ),
};

/** 색상 변형 - Primary, Secondary, Success, Error, Info, Warning */
export const Colors = {
  render: () => (
    <Stack spacing={ 2 } direction="row" flexWrap="wrap" useFlexGap>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
      <Button variant="contained" color="success">Success</Button>
      <Button variant="contained" color="error">Error</Button>
      <Button variant="contained" color="info">Info</Button>
      <Button variant="contained" color="warning">Warning</Button>
    </Stack>
  ),
};

/** 크기 변형 - Small, Medium, Large */
export const Sizes = {
  render: () => (
    <Stack spacing={ 2 } direction="row" alignItems="center">
      <Button variant="contained" size="small">Small</Button>
      <Button variant="contained" size="medium">Medium</Button>
      <Button variant="contained" size="large">Large</Button>
    </Stack>
  ),
};

/** 비활성화 상태 */
export const Disabled = {
  render: () => (
    <Stack spacing={ 2 } direction="row">
      <Button variant="text" disabled>Text</Button>
      <Button variant="contained" disabled>Contained</Button>
      <Button variant="outlined" disabled>Outlined</Button>
    </Stack>
  ),
};
