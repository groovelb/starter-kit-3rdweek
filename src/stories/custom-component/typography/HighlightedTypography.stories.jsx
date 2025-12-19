import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HighlightedTypography, Highlight } from '../../../components/typography';

export default {
  title: 'Custom Component/Typography/HighlightedTypography',
  component: HighlightedTypography,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## HighlightedTypography

텍스트 내 특정 단어나 구문을 다양한 스타일로 강조할 수 있는 컴포넌트.

### 용도
- 중요한 단어나 구문 강조
- 밑줄, 배경, 형광펜, 원 효과 적용
- 스크롤 트리거 애니메이션
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: '타이포그래피 variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body1' },
      },
    },
    component: {
      control: 'text',
      description: 'HTML 요소 태그',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'p' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'viewport 진입 시 애니메이션 활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    threshold: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      description: 'Intersection Observer threshold',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
  },
};

/** 기본 사용 - HighlightedTypography props 조절 */
export const Default = {
  args: {
    variant: 'h4',
    component: 'p',
    animated: false,
    threshold: 0.5,
  },
  render: (args) => (
    <HighlightedTypography
      variant={args.variant}
      component={args.component}
      animated={args.animated}
      threshold={args.threshold}
    >
      This is a <Highlight type="background">highlighted</Highlight> text example.
    </HighlightedTypography>
  ),
};

/** Highlight 유형 비교 */
export const HighlightTypes = {
  render: () => (
    <Box sx={ { width: 600 } }>
      <Stack spacing={ 4 }>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            underline
          </Typography>
          <HighlightedTypography variant="h5">
            We believe in <Highlight type="underline">innovation</Highlight>.
          </HighlightedTypography>
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            background
          </Typography>
          <HighlightedTypography variant="h5">
            Our <Highlight type="background">mission</Highlight> is important.
          </HighlightedTypography>
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            marker
          </Typography>
          <HighlightedTypography variant="h5">
            This is <Highlight type="marker">essential</Highlight>.
          </HighlightedTypography>
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            circle
          </Typography>
          <HighlightedTypography variant="h5">
            The <Highlight type="circle">key insight</Highlight>.
          </HighlightedTypography>
        </Box>
      </Stack>
    </Box>
  ),
};
