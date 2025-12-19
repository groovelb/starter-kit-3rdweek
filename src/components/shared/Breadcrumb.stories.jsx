import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumb from './Breadcrumb';

export default {
  title: 'Custom Component/shared/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Breadcrumb

네비게이션 경로 표시 컴포넌트.

### 특징
- 링크 클릭으로 상위 경로 이동
- 마지막 항목은 현재 페이지 (링크 없음)
- 밑줄 스타일 링크
- 커스텀 구분자 지원
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: '경로 배열',
      table: {
        type: { summary: 'Array<{ label, href?, onClick? }>' },
      },
    },
    separator: {
      control: 'text',
      description: '구분자',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "' '" },
      },
    },
  },
};

/** 기본 사용 */
export const Default = {
  args: {
    items: [
      { label: 'Lighting', href: '#lighting' },
      { label: 'Chandeliers', href: '#chandeliers' },
      { label: 'Flora Chandelier, 7 Stem' },
    ],
  },
};

/** 다양한 경로 */
export const Variants = {
  render: () => (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          2단계 경로
        </Typography>
        <Breadcrumb
          items={[
            { label: 'Lighting', href: '#' },
            { label: 'Chandeliers' },
          ]}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          3단계 경로 (제품 상세)
        </Typography>
        <Breadcrumb
          items={[
            { label: 'Lighting', href: '#' },
            { label: 'Chandeliers', href: '#' },
            { label: 'Flora Chandelier, 7 Stem' },
          ]}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          4단계 경로
        </Typography>
        <Breadcrumb
          items={[
            { label: 'Shop', href: '#' },
            { label: 'Lighting', href: '#' },
            { label: 'Ceiling', href: '#' },
            { label: 'Flora Chandelier' },
          ]}
        />
      </Stack>
    </Stack>
  ),
};

/** 구분자 스타일 */
export const Separators = {
  render: () => (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          공백 (기본)
        </Typography>
        <Breadcrumb
          items={[
            { label: 'Lighting', href: '#' },
            { label: 'Chandeliers', href: '#' },
            { label: 'Flora Chandelier' },
          ]}
          separator=" "
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          슬래시
        </Typography>
        <Breadcrumb
          items={[
            { label: 'Lighting', href: '#' },
            { label: 'Chandeliers', href: '#' },
            { label: 'Flora Chandelier' },
          ]}
          separator="/"
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          꺾쇠
        </Typography>
        <Breadcrumb
          items={[
            { label: 'Lighting', href: '#' },
            { label: 'Chandeliers', href: '#' },
            { label: 'Flora Chandelier' },
          ]}
          separator="›"
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          화살표
        </Typography>
        <Breadcrumb
          items={[
            { label: 'Lighting', href: '#' },
            { label: 'Chandeliers', href: '#' },
            { label: 'Flora Chandelier' },
          ]}
          separator="→"
        />
      </Stack>
    </Stack>
  ),
};

/** 클릭 핸들러 */
export const WithClickHandler = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Lighting', onClick: () => alert('Lighting 클릭') },
        { label: 'Chandeliers', onClick: () => alert('Chandeliers 클릭') },
        { label: 'Flora Chandelier' },
      ]}
    />
  ),
};
