import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StretchedHeadline, StretchedHeadlineMultiline } from '../../../components/typography';

export default {
  title: 'Custom Component/Typography/StretchedHeadline',
  component: StretchedHeadline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## StretchedHeadline

단어 간격을 동적으로 늘려 컨테이너 전체 너비를 채우는 히어로 타이포그래피 컴포넌트.

### 용도
- 히어로 섹션의 임팩트 있는 헤드라인
- 풀 너비 타이포그래피 디자인
- 스크롤 트리거 애니메이션
        `,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트',
    },
    fillWidth: {
      control: 'boolean',
      description: '전체 너비 채우기',
    },
    variant: {
      control: 'select',
      options: ['static', 'animated'],
      description: '애니메이션 variant',
    },
    textTransform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase'],
      description: '텍스트 변환',
    },
  },
};

/** 기본 사용 - Controls에서 모든 Props 조작 가능 */
export const Default = {
  args: {
    text: 'DESIGN SYSTEM',
    fillWidth: true,
    variant: 'static',
    textTransform: 'uppercase',
  },
};

/** 멀티라인 사용 예시 */
export const MultilineUsage = {
  render: () => (
    <Box sx={ { width: 600 } }>
      <Stack spacing={ 4 }>
        <Box sx={ { p: 4, backgroundColor: 'grey.50' } }>
          <StretchedHeadlineMultiline
            lines={ ['WE CREATE', 'DIGITAL', 'EXPERIENCES'] }
            gap={ 0 }
          />
        </Box>
        <Box sx={ { p: 4, backgroundColor: 'grey.900' } }>
          <StretchedHeadlineMultiline
            lines={ ['INNOVATION', 'MEETS', 'DESIGN'] }
            gap={ 1 }
            headlineProps={ { sx: { color: 'white' } } }
          />
        </Box>
      </Stack>
    </Box>
  ),
};
