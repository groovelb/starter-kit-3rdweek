import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowLink from './ArrowLink';

export default {
  title: 'Custom Component/shared/ArrowLink',
  component: ArrowLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ArrowLink

화살표 아이콘 + 텍스트 형태의 링크 컴포넌트.

### 특징
- → 화살표가 앞에 붙는 링크 스타일
- 호버 시 화살표 이동 마이크로 인터랙션
- Add Sidemark, Download a Tear Sheet 등 액션 링크용
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: '링크 텍스트',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    href: {
      control: 'text',
      description: '링크 URL',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    target: {
      control: 'select',
      options: ['_self', '_blank'],
      description: '링크 타겟',
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
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit'],
      description: '색상',
      table: {
        type: { summary: "'primary' | 'secondary' | 'inherit'" },
        defaultValue: { summary: "'inherit'" },
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
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    children: 'Add Sidemark',
    href: '#',
  },
};

/** 제품 상세 액션 링크 */
export const ProductActions = {
  render: () => (
    <Stack spacing={1.5} alignItems="flex-start">
      <ArrowLink href="#">Add Sidemark</ArrowLink>
      <ArrowLink href="#">Inquire About This Item</ArrowLink>
      <ArrowLink href="#">Download a Tear Sheet</ArrowLink>
    </Stack>
  ),
};

/** 크기 비교 */
export const Sizes = {
  render: () => (
    <Stack spacing={3} alignItems="flex-start">
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Small
        </Typography>
        <ArrowLink href="#" size="small">
          Add Sidemark
        </ArrowLink>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Medium (기본)
        </Typography>
        <ArrowLink href="#" size="medium">
          Add Sidemark
        </ArrowLink>
      </Stack>
    </Stack>
  ),
};

/** 색상 변형 */
export const Colors = {
  render: () => (
    <Stack spacing={3} alignItems="flex-start">
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Inherit (기본)
        </Typography>
        <ArrowLink href="#" color="inherit">
          Add Sidemark
        </ArrowLink>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Primary
        </Typography>
        <ArrowLink href="#" color="primary">
          Add Sidemark
        </ArrowLink>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Secondary
        </Typography>
        <ArrowLink href="#" color="secondary">
          Add Sidemark
        </ArrowLink>
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
          기본 상태 (호버해보세요)
        </Typography>
        <ArrowLink href="#">Add Sidemark</ArrowLink>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          비활성화
        </Typography>
        <ArrowLink href="#" isDisabled>
          Add Sidemark
        </ArrowLink>
      </Stack>
    </Stack>
  ),
};

/** 배경색 위에서 */
export const OnBackground = {
  render: () => (
    <Stack spacing={3}>
      <Box sx={{ p: 3, backgroundColor: 'background.paper' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          라이트 배경
        </Typography>
        <Stack spacing={1.5} alignItems="flex-start">
          <ArrowLink href="#">Add Sidemark</ArrowLink>
          <ArrowLink href="#">Download a Tear Sheet</ArrowLink>
        </Stack>
      </Box>
    </Stack>
  ),
};
