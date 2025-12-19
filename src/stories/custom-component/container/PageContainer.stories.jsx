import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PageContainer } from '../../../components/container/PageContainer';

export default {
  title: 'Custom Component/Container/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## PageContainer

페이지의 메인 콘텐츠를 감싸는 컨테이너 컴포넌트입니다.

### 특징
- MUI Container 기반의 중앙 정렬 및 반응형 패딩 제공
- maxWidth 옵션으로 최대 너비 설정 가능 (기본값: xl = 1536px)
- 콘텐츠 영역의 일관된 좌우 여백 적용
        `,
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: '최대 너비 설정',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | false" },
        defaultValue: { summary: "'xl'" },
      },
    },
    disableGutters: {
      control: 'boolean',
      description: '좌우 패딩 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    sx: {
      control: 'object',
      description: '추가 스타일',
      table: {
        type: { summary: 'object' },
      },
    },
    children: {
      description: '컨테이너 내부 콘텐츠',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

/**
 * 기본 사용 - Controls에서 모든 Props 조작 가능
 */
export const Default = {
  args: {
    maxWidth: 'xl',
    disableGutters: false,
    children: (
      <Box
        sx={ {
          p: 3,
          bgcolor: 'primary.50',
          border: '2px dashed',
          borderColor: 'primary.main',
        } }
      >
        <Typography variant="h6" gutterBottom color="primary">
          PageContainer (maxWidth="xl")
        </Typography>
        <Typography color="text.secondary">
          콘텐츠가 화면 중앙에 정렬되며, 최대 너비 1536px까지 확장됩니다.
          좌우에 반응형 패딩이 자동으로 적용됩니다.
        </Typography>
      </Box>
    ),
  },
};

/**
 * maxWidth 옵션 비교
 */
export const MaxWidthOptions = {
  render: () => (
    <Box sx={ { py: 4, bgcolor: 'grey.100' } }>
      { ['sm', 'md', 'lg', 'xl'].map((size) => (
        <Box key={ size } sx={ { mb: 2 } }>
          <Typography variant="caption" sx={ { px: 2 } }>
            maxWidth=&quot;{ size }&quot;
          </Typography>
          <PageContainer maxWidth={ size }>
            <Box
              sx={ {
                p: 2,
                bgcolor: 'background.paper',
                border: '1px dashed',
                borderColor: 'grey.400',
              } }
            >
              <Typography variant="body2">
                { size === 'sm' && '작은 폼이나 로그인 페이지에 적합 (600px)' }
                { size === 'md' && '블로그나 문서 페이지에 적합 (900px)' }
                { size === 'lg' && '대시보드나 테이블에 적합 (1200px)' }
                { size === 'xl' && '갤러리나 대형 그리드에 적합 (1536px)' }
              </Typography>
            </Box>
          </PageContainer>
        </Box>
      )) }
    </Box>
  ),
};

