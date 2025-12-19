import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  InlineTypography,
  InlineIcon,
  InlineImage,
} from '../../../components/typography';

export default {
  title: 'Custom Component/Typography/InlineTypography',
  component: InlineTypography,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## InlineTypography

텍스트 흐름 속에 이미지, 아이콘, 또는 다른 컴포넌트를 자연스럽게 삽입할 수 있는 컴포넌트.

### 용도
- Editorial 스타일의 텍스트-이미지 조합
- 아이콘과 텍스트의 인라인 배치
- 브랜드 로고나 이모지 삽입
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: '타이포그래피 variant',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: '텍스트 정렬',
    },
  },
};

// 샘플 이미지 URL
const sampleImages = {
  avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
};

/** 기본 사용 - Controls에서 모든 Props 조작 가능 */
export const Default = {
  args: {
    variant: 'h4',
    align: 'left',
  },
  render: (args) => (
    <InlineTypography { ...args }>
      We build <InlineIcon icon={ <StarIcon /> } color="primary.main" size={ 1 } /> amazing products.
    </InlineTypography>
  ),
};

/** 인라인 요소 유형 비교 */
export const InlineElementTypes = {
  render: () => (
    <Box sx={ { width: 600 } }>
      <Stack spacing={ 4 }>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            InlineIcon
          </Typography>
          <InlineTypography variant="h4">
            Launch your ideas <InlineIcon icon={ <RocketLaunchIcon /> } color="primary.main" size={ 1.2 } /> today.
          </InlineTypography>
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            InlineImage (circle, hover)
          </Typography>
          <InlineTypography variant="h4">
            Meet our team:
            <InlineImage src={ sampleImages.avatar1 } alt="Team member 1" size={ 1.5 } circle hover />
            <InlineImage src={ sampleImages.avatar2 } alt="Team member 2" size={ 1.5 } circle hover />
          </InlineTypography>
        </Box>
      </Stack>
    </Box>
  ),
};
