import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { QuotedContainer } from '../../../components/typography';

export default {
  title: 'Custom Component/Typography/QuotedContainer',
  component: QuotedContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## QuotedContainer

인용 부호를 텍스트의 시작/끝 위치에 스마트하게 배치하는 컴포넌트.

### 용도
- 인용문을 시각적으로 강조
- Editorial 스타일의 큰 인용 부호 장식
- 다양한 인용 부호 스타일 지원
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: '인용할 텍스트',
    },
    quoteSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '인용 부호 크기',
    },
    quoteColor: {
      control: { type: 'select' },
      options: ['text.disabled', 'text.secondary', 'primary.main', 'secondary.main', '#000000', '#666666'],
      description: '인용 부호 색상',
    },
    position: {
      control: { type: 'select' },
      options: ['outside', 'inside', 'overlay'],
      description: '인용 부호 위치',
    },
    animated: {
      control: { type: 'boolean' },
      description: '등장 애니메이션',
    },
    author: {
      control: { type: 'text' },
      description: '인용 출처/저자',
    },
    variant: {
      control: { type: 'select' },
      options: ['h3', 'h4', 'h5', 'h6', 'body1', 'body2'],
      description: '타이포그래피 variant',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: '텍스트 정렬',
    },
  },
};

const sampleQuotes = {
  short: 'Design is not just what it looks like. Design is how it works.',
  medium: 'The details are not the details. They make the design. A design is not complete until the user finds it obvious.',
  long: 'Good design is as little design as possible. Less, but better, because it concentrates on the essential aspects, and the products are not burdened with non-essentials. Back to purity, back to simplicity.',
  korean: '디자인은 단순히 어떻게 보이고 느껴지는가가 아닙니다. 디자인은 어떻게 작동하는가입니다.',
};

/** 기본 사용 - Controls에서 모든 Props 조작 가능 */
export const Default = {
  args: {
    children: sampleQuotes.short,
    quoteSize: 'lg',
    quoteColor: 'text.disabled',
    position: 'outside',
    animated: false,
    author: 'Steve Jobs',
    variant: 'h4',
    align: 'left',
  },
};

/** 위치 옵션 비교 */
export const PositionVariants = {
  render: () => (
    <Box sx={ { width: 600 } }>
      <Stack spacing={ 4 }>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            position: outside
          </Typography>
          <QuotedContainer position="outside" author="Steve Jobs">
            { sampleQuotes.short }
          </QuotedContainer>
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            position: inside
          </Typography>
          <QuotedContainer position="inside" author="Steve Jobs">
            { sampleQuotes.short }
          </QuotedContainer>
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            position: overlay
          </Typography>
          <QuotedContainer position="overlay" author="Steve Jobs">
            { sampleQuotes.short }
          </QuotedContainer>
        </Box>
      </Stack>
    </Box>
  ),
};
