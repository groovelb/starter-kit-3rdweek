import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { PageContainer } from '../../components/storybookDocumentation';

export default {
  title: 'Template/Introduction',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## 템플릿

여러 컴포넌트가 조합된 재사용 가능한 템플릿입니다.

### 예정된 템플릿
- Card Grid Template
- Form Template
- Dashboard Template
        `,
      },
    },
  },
};

export const Default = {
  render: () => (
    <PageContainer>
      <Paper sx={ { p: 3 } }>
        <Typography variant="h6" gutterBottom>
          템플릿 섹션
        </Typography>
        <Typography variant="body2" color="text.secondary">
          이 섹션에는 여러 컴포넌트가 조합된 템플릿이 추가될 예정입니다.
        </Typography>
      </Paper>
    </PageContainer>
  ),
};
