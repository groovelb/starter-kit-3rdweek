import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  TreeNode,
} from '../../components/storybookDocumentation';
import {
  adminSiteMap,
  siteMapTable,
  userRoles,
  navigationMenu,
  responsiveBreakpoints,
} from '../../data/ux-architecture';

export default {
  title: 'UX Architecture/Admin Site Map',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Admin Site Map
 *
 * 어드민 시스템의 URL 구조와 네비게이션을 시각화합니다.
 * 소스: docs/supabase/information-architecture.md
 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Admin Site Map"
        status="Planned"
        note="Admin system URL structure and navigation"
        brandName="Lumenstate"
        systemName="Admin"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          어드민 사이트맵
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          어드민 시스템의 페이지 구조, 사용자 역할, 네비게이션 정의입니다.
        </Typography>

        {/* Site Structure */}
        <SectionTitle title="사이트 구조" description="클릭하여 펼치기/접기" />
        <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 4 } }>
          { Object.entries(adminSiteMap).map(([key, value]) => (
            <TreeNode
              key={ key }
              keyName={ key }
              value={ value }
              depth={ 0 }
              defaultOpen={ true }
            />
          )) }
        </Box>

        {/* URL Table */}
        <SectionTitle title="URL 목록" description="전체 경로 및 설명" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Path</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { siteMapTable.map((row) => (
                <TableRow key={ row.path }>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.path }</TableCell>
                  <TableCell>{ row.description }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* User Roles */}
        <SectionTitle title="사용자 역할" description="권한별 접근 범위" />
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2, mb: 4 } }>
          { userRoles.map((role) => (
            <Box
              key={ role.role }
              sx={ {
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              } }
            >
              <Typography variant="subtitle1" sx={ { fontWeight: 600, mb: 1 } }>
                { role.role } ({ role.label })
              </Typography>
              <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1 } }>
                { role.permissions.map((perm) => (
                  <Chip key={ perm } label={ perm } size="small" variant="outlined" />
                )) }
              </Box>
            </Box>
          )) }
        </Box>

        {/* Navigation Menu */}
        <SectionTitle title="네비게이션 메뉴" description="사이드바 메뉴 구성" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Label</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Path</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Icon</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { navigationMenu.map((item) => (
                <TableRow key={ item.path }>
                  <TableCell>{ item.label }</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ item.path }</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ item.icon }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Responsive Breakpoints */}
        <SectionTitle title="반응형 브레이크포인트" description="화면 크기별 레이아웃" />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Breakpoint</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Sidebar</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Layout</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { responsiveBreakpoints.map((row) => (
                <TableRow key={ row.breakpoint }>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.breakpoint }</TableCell>
                  <TableCell>{ row.sidebar }</TableCell>
                  <TableCell>{ row.layout }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};
