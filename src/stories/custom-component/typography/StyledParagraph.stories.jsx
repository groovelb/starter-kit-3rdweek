import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  StyledParagraph,
  PullQuote,
} from '../../../components/typography';

export default {
  title: 'Custom Component/Typography/StyledParagraph',
  component: StyledParagraph,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## StyledParagraph

왼쪽 장식 라인과 Drop Cap을 지원하는 인용/강조 문단 컴포넌트.

### 용도
- 인용문 강조
- 섹션 도입부 텍스트
- 중요 정보 하이라이트
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: '문단 텍스트',
    },
    variant: {
      control: { type: 'select' },
      options: ['h4', 'h5', 'h6', 'body1', 'body2'],
      description: 'Typography variant',
    },
    dropCap: {
      control: { type: 'boolean' },
      description: '첫 글자 확대 (Drop Cap, 2줄 높이, 자동 float)',
    },
    styleColor: {
      control: { type: 'select' },
      options: ['primary.main', 'secondary.main', 'text.primary', 'text.secondary', 'error.main', 'warning.main', 'success.main'],
      description: 'Drop Cap 및 장식 라인 색상',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: '텍스트 정렬',
    },
    maxWidth: {
      control: { type: 'number' },
      description: '최대 너비 (ch 단위)',
    },
  },
};

const sampleText = {
  short: 'Design systems enable teams to build better products faster by making design reusable.',
  medium: 'A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. It serves as a single source of truth for product teams.',
  long: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters. The term typography is also applied to the style, arrangement, and appearance of the letters, numbers, and symbols created by the process.',
  korean: '디자인 시스템은 재사용 가능한 컴포넌트와 명확한 표준으로 구성된 집합으로, 어떤 수의 애플리케이션이든 구축할 수 있습니다. 제품 팀을 위한 단일 진실 공급원(Single Source of Truth) 역할을 합니다.',
};

/** 기본 사용 - Controls에서 모든 Props 조작 가능 */
export const Default = {
  args: {
    children: sampleText.medium,
    variant: 'h5',
    dropCap: false,
    styleColor: 'primary.main',
    align: 'left',
    maxWidth: 65,
  },
};

/** 색상별 Drop Cap 비교 */
export const StyleColorVariants = {
  render: () => (
    <Box sx={ { width: 600 } }>
      <Stack spacing={ 4 }>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            styleColor: primary.main
          </Typography>
          <StyledParagraph dropCap styleColor="primary.main">
            { sampleText.short }
          </StyledParagraph>
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            styleColor: secondary.main
          </Typography>
          <StyledParagraph dropCap styleColor="secondary.main">
            { sampleText.short }
          </StyledParagraph>
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            PullQuote with author
          </Typography>
          <PullQuote author="Steve Jobs">
            Design is not just what it looks like. Design is how it works.
          </PullQuote>
        </Box>
      </Stack>
    </Box>
  ),
};
