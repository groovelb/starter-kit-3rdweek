import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../contexts/AuthContext';
import { DRAWER_WIDTH, COLLAPSED_WIDTH } from './constants';

/**
 * AdminSidebar
 * 어드민 네비게이션 사이드바
 *
 * Props:
 * @param {boolean} open - 모바일에서 Drawer 열림 상태 [Required]
 * @param {function} onClose - Drawer 닫기 핸들러 [Required]
 * @param {number} drawerWidth - 사이드바 너비 [Optional, 기본값: 240]
 *
 * 반응형:
 * - xs: Drawer (임시)
 * - sm: 접힌 아이콘 (64px)
 * - md+: 전체 펼침 (240px)
 */

const menuItems = [
  {
    label: '제품 관리',
    path: '/admin/products',
    icon: 'inventory_2',
  },
  {
    label: '주문 관리',
    path: '/admin/orders',
    icon: 'receipt_long',
  },
  {
    label: '옵션 설정',
    path: '/admin/options',
    icon: 'tune',
  },
];

function AdminSidebar({ open, onClose, drawerWidth = DRAWER_WIDTH }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminProfile, signOut } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          minHeight: 64,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            display: { xs: 'block', sm: 'none', md: 'block' },
          }}
        >
          Lumenstate
        </Typography>
        <Typography
          variant="caption"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            px: 0.5,
            borderRadius: 0.5,
            display: { xs: 'block', sm: 'none', md: 'block' },
          }}
        >
          Admin
        </Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flex: 1, py: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={isActive}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <span className="material-symbols-outlined">
                    {item.icon}
                  </span>
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    display: { xs: 'block', sm: 'none', md: 'block' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Footer - User Info & Logout */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none', md: 'flex' },
            flexDirection: 'column',
            gap: 1,
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary" noWrap>
            {adminProfile?.display_name || 'Admin'}
          </Typography>
          <Typography variant="caption" color="text.disabled" noWrap>
            {adminProfile?.role || 'admin'}
          </Typography>
        </Box>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            color: 'error.main',
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
            <span className="material-symbols-outlined">logout</span>
          </ListItemIcon>
          <ListItemText
            primary="로그아웃"
            sx={{
              display: { xs: 'block', sm: 'none', md: 'block' },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: { sm: COLLAPSED_WIDTH, md: drawerWidth },
            boxSizing: 'border-box',
            transition: 'width 0.2s ease-in-out',
            overflowX: 'hidden',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default AdminSidebar;
