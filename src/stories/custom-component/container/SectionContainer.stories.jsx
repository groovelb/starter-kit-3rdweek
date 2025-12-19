import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PageContainer } from '../../../components/container/PageContainer';
import { SectionContainer } from '../../../components/container/SectionContainer';

export default {
  title: 'Custom Component/Container/SectionContainer',
  component: SectionContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## SectionContainer

페이지 내의 각 섹션을 구분하는 컨테이너 컴포넌트입니다.

### 특징
- 100% 너비로 확장되며 상하 여백(py) 제공
- section 태그로 시맨틱 마크업 적용
- 반응형 여백: 모바일(xs) py:4, 데스크탑(md) py:6
- PageContainer와 함께 사용하여 전체 너비 배경 + 콘텐츠 너비 제한
        `,
      },
    },
  },
  argTypes: {
    sx: {
      control: 'object',
      description: '추가 스타일 (bgcolor, border 등)',
      table: {
        type: { summary: 'object' },
      },
    },
    children: {
      description: '섹션 내부 콘텐츠',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

/**
 * 기본 사용 - Controls에서 sx Props 조작 가능
 */
export const Default = {
  args: {
    sx: { bgcolor: 'secondary.50', border: '2px dashed', borderColor: 'secondary.main' },
    children: (
      <PageContainer>
        <Typography variant="h6" gutterBottom color="secondary">
          SectionContainer
        </Typography>
        <Typography color="text.secondary">
          섹션 컨테이너는 100% 너비로 확장되며, 상하 여백이 자동으로 적용됩니다.
          내부에 PageContainer를 사용하여 콘텐츠 너비를 제한할 수 있습니다.
        </Typography>
      </PageContainer>
    ),
  },
};

/**
 * PageContainer와 조합 사용 - 일반적인 페이지 구조 패턴
 */
export const CombinedUsage = {
  render: () => (
    <Box>
      <SectionContainer sx={ { bgcolor: 'primary.main', color: 'white' } }>
        <PageContainer>
          <Typography variant="h3" gutterBottom>Hero Section</Typography>
          <Typography variant="h6" sx={ { opacity: 0.8 } }>
            SectionContainer가 전체 너비 배경색을 제공하고,
            PageContainer가 내부 콘텐츠 너비를 제한합니다.
          </Typography>
        </PageContainer>
      </SectionContainer>

      <SectionContainer sx={ { bgcolor: 'grey.100' } }>
        <PageContainer>
          <Typography variant="h4" gutterBottom>Features</Typography>
          <Box sx={ { display: 'flex', gap: 3, flexWrap: 'wrap' } }>
            { [1, 2, 3].map((i) => (
              <Box
                key={ i }
                sx={ {
                  p: 3,
                  flex: '1 1 200px',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                } }
              >
                <Typography variant="h6">Feature { i }</Typography>
                <Typography variant="body2" color="text.secondary">
                  기능 설명 텍스트가 여기에 들어갑니다.
                </Typography>
              </Box>
            )) }
          </Box>
        </PageContainer>
      </SectionContainer>

      <SectionContainer sx={ { bgcolor: 'grey.900', color: 'white' } }>
        <PageContainer>
          <Typography variant="body2" align="center">
            © 2024 Footer Section - 전체 너비 배경에 중앙 정렬 콘텐츠
          </Typography>
        </PageContainer>
      </SectionContainer>
    </Box>
  ),
};

