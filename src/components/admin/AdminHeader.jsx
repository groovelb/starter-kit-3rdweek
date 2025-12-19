import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { DRAWER_WIDTH, COLLAPSED_WIDTH } from './constants';

/**
 * AdminHeader
 * 어드민 페이지 상단 헤더
 *
 * Props:
 * @param {function} onMenuClick - 햄버거 메뉴 클릭 핸들러 (모바일) [Required]
 * @param {string} title - 현재 페이지 제목 [Optional]
 *
 * 구성:
 * - 햄버거 메뉴 (모바일)
 * - 페이지 제목
 * - 알림 아이콘
 * - 프로필 아이콘
 */
function AdminHeader({ onMenuClick, title }) {
  const { adminProfile } = useAuth();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
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
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        transition: 'width 0.2s ease-in-out, margin 0.2s ease-in-out',
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            display: { xs: 'flex', sm: 'none' },
            color: 'text.primary',
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </IconButton>

        {/* Page Title */}
        <Typography
          variant="h6"
          component="h1"
          sx={{
            flexGrow: 1,
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notifications */}
          <IconButton sx={{ color: 'text.secondary' }}>
            <span className="material-symbols-outlined">notifications</span>
          </IconButton>

          {/* Profile */}
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: 14,
            }}
          >
            {adminProfile?.display_name?.[0]?.toUpperCase() || 'A'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;
