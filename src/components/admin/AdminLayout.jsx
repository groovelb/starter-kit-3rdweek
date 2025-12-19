import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { DRAWER_WIDTH, COLLAPSED_WIDTH } from './constants';

/**
 * AdminLayout
 * 어드민 페이지 공통 레이아웃
 *
 * Props:
 * @param {string} title - 현재 페이지 제목 [Optional]
 *
 * 구조:
 * - AdminHeader (상단)
 * - AdminSidebar (좌측)
 * - Content Area (중앙, Outlet)
 *
 * 반응형:
 * - xs: 전체 너비, Drawer 메뉴
 * - sm: Collapsed Sidebar (64px)
 * - md+: Full Sidebar (240px)
 */
function AdminLayout({ title = 'Admin' }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminSidebar
        open={mobileOpen}
        onClose={handleDrawerClose}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            sm: `calc(100% - ${COLLAPSED_WIDTH}px)`,
            md: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
          ml: {
            xs: 0,
            sm: `${COLLAPSED_WIDTH}px`,
            md: `${DRAWER_WIDTH}px`,
          },
          transition: 'width 0.2s ease-in-out, margin 0.2s ease-in-out',
        }}
      >
        {/* Header */}
        <AdminHeader
          onMenuClick={handleDrawerToggle}
          title={title}
        />

        {/* Page Content */}
        <Box
          sx={{
            pt: 10, // AppBar height (64px) + 여백 (16px)
            px: { xs: 2, sm: 3 },
            pb: 3,
            bgcolor: 'grey.50',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
