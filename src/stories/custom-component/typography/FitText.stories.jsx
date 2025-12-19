import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FitText } from '../../../components/typography';

export default {
  title: 'Custom Component/Typography/FitText',
  component: FitText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FitText

컨테이너 너비에 맞춰 텍스트 크기를 자동으로 조절하는 반응형 타이포그래피 컴포넌트입니다.

### 핵심 기능
- **자동 크기 조절**: ResizeObserver로 컨테이너 크기 변화 감지
- **Variant 지원**: body (Inter) / headline (Chillax) 폰트 자동 적용
- **Min/Max 제한**: 최소/최대 폰트 크기 설정 가능
- **간격 조절**: letterSpacing, wordSpacing 배율 조정

### 용도
- 히어로 섹션 헤드라인
- 반응형 배너 텍스트
- 카드 타이틀
        `,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'radio',
      options: ['body', 'headline', 'h1'],
      description: '타이포그래피 변형',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body' },
      },
    },
    minFontSize: {
      control: { type: 'number', min: 0, max: 100 },
      description: '최소 폰트 크기 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    maxFontSize: {
      control: { type: 'number', min: 10, max: 500 },
      description: '최대 폰트 크기 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '9999' },
      },
    },
    letterSpacing: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '자간 배율',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    wordSpacing: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '단어 간격 배율',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    fontWeight: {
      control: { type: 'number', min: 100, max: 900, step: 100 },
      description: '폰트 굵기',
      table: {
        type: { summary: 'number' },
      },
    },
  },
};

/** 기본 사용 - Controls에서 모든 Props 조작 가능 */
export const Default = {
  args: {
    text: 'Hello World',
    variant: 'body',
    minFontSize: 16,
    maxFontSize: 200,
    letterSpacing: 1,
    wordSpacing: 1,
  },
  render: (args) => (
    <Box sx={ { width: 500, border: '1px dashed grey', p: 2 } }>
      <FitText { ...args } />
    </Box>
  ),
};

/** Variant 비교 */
export const VariantComparison = {
  render: () => (
    <Stack spacing={ 4 } sx={ { width: 500 } }>
      <Box>
        <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
          variant: body
        </Typography>
        <Box sx={ { border: '1px dashed grey', p: 2 } }>
          <FitText text="Body Text Style" variant="body" />
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
          variant: headline
        </Typography>
        <Box sx={ { border: '1px dashed grey', p: 2 } }>
          <FitText text="Headline Style" variant="headline" />
        </Box>
      </Box>
    </Stack>
  ),
};
