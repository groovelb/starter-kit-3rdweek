import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { PageContainer } from '../../components/storybookDocumentation';

export default {
  title: 'Page/Introduction',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## 페이지

전체 페이지 레이아웃과 플로우를 보여줍니다.

### 용도
- 페이지 단위 레이아웃 확인
- 컴포넌트 조합 패턴 검토
- 전체 사용자 플로우 시뮬레이션
        `,
      },
    },
  },
};

export const Default = {
  render: () => (
    <PageContainer>
      <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
        페이지 섹션
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
        전체 페이지 레이아웃이 추가될 예정입니다.
      </Typography>

      <Divider sx={ { mb: 4 } } />

      <Typography variant="h5" sx={ { fontWeight: 600, mb: 3 } }>
        예정된 페이지
      </Typography>

      <TableContainer sx={ { mb: 4 } }>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={ { fontWeight: 600, width: '30%' } }>Main Page</TableCell>
              <TableCell>메인 랜딩 페이지</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={ { fontWeight: 600 } }>Detail Page</TableCell>
              <TableCell>상세 정보 페이지</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={ { fontWeight: 600 } }>Settings Page</TableCell>
              <TableCell>설정 페이지</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="body2" color="text.secondary">
        각 페이지는 Template 섹션의 컴포넌트 조합을 활용하여 구성됩니다.
      </Typography>
    </PageContainer>
  ),
};
