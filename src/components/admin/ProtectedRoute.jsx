import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute
 * 인증된 어드민 사용자만 접근 가능한 라우트를 보호하는 컴포넌트
 *
 * Props:
 * @param {ReactNode} children - 보호할 자식 컴포넌트 [Required]
 * @param {boolean} requireStrict - admin 역할만 허용 (editor 제외) [Optional, 기본값: false]
 *
 * 동작 방식:
 * 1. 로딩 중이면 로딩 스피너 표시
 * 2. 인증되지 않았으면 /admin/login으로 리다이렉트
 * 3. 인증되었으면 자식 컴포넌트 렌더링
 */
function ProtectedRoute({ children, requireStrict = false }) {
  const { isAdmin, isAdminStrict, isLoading } = useAuth();
  const location = useLocation();

  // 로딩 중
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 인증되지 않음
  const hasPermission = requireStrict ? isAdminStrict : isAdmin;

  if (!hasPermission) {
    // 현재 위치를 state로 전달하여 로그인 후 돌아올 수 있도록 함
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
