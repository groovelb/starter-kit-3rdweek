import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Title } from '../../../components/typography';

export default {
  title: 'Custom Component/Typography/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Title

섹션/아이템의 계층적 타이틀 시스템을 제공하는 컴포넌트.

### 용도
- 페이지 섹션의 제목 표시
- Overline + Title + Subtitle 조합으로 정보 계층 구성
- 다양한 레이아웃 옵션으로 유연한 배치
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '메인 타이틀 텍스트',
    },
    overline: {
      control: 'text',
      description: '상단 작은 레이블',
    },
    subtitle: {
      control: 'text',
      description: '하단 서브타이틀',
    },
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4'],
      description: '시맨틱 HTML 레벨',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '텍스트 정렬',
    },
    layout: {
      control: 'select',
      options: ['stack', 'inline', 'split'],
      description: '레이아웃 방식',
    },
    divider: {
      control: 'boolean',
      description: '하단 구분선 표시',
    },
    dividerStyle: {
      control: 'select',
      options: ['line', 'dot', 'gradient'],
      description: '구분선 스타일',
    },
  },
};

/** 기본 사용 - Controls에서 모든 Props 조작 가능 */
export const Default = {
  args: {
    title: 'Section Title',
    overline: 'Category',
    subtitle: 'A brief description of this section that provides context.',
    level: 'h2',
    align: 'left',
    layout: 'stack',
    divider: false,
  },
};

/** 레이아웃 옵션 비교 */
export const LayoutVariants = {
  render: () => (
    <Box sx={ { width: 600 } }>
      <Stack spacing={ 4 }>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            layout: stack
          </Typography>
          <Title
            title="Our Services"
            overline="What We Do"
            subtitle="We provide comprehensive solutions."
            layout="stack"
          />
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            layout: inline
          </Typography>
          <Title
            title="Our Services"
            overline="01"
            subtitle="We provide comprehensive solutions."
            layout="inline"
          />
        </Box>
        <Box>
          <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
            layout: split
          </Typography>
          <Title
            title="Our Services"
            overline="What We Do"
            subtitle="We provide comprehensive solutions."
            layout="split"
          />
        </Box>
      </Stack>
    </Box>
  ),
};
