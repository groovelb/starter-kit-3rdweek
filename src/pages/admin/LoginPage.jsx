import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import UnderlineInput from '../../components/shared/UnderlineInput';
import { useAuth } from '../../contexts/AuthContext';

/**
 * LoginPage
 * 어드민 로그인 페이지
 *
 * 동작 방식:
 * 1. 이메일/비밀번호 입력
 * 2. 로그인 버튼 클릭
 * 3. Supabase Auth 인증 + 어드민 프로필 확인
 * 4. 성공 시 이전 페이지 또는 /admin/products로 리다이렉트
 * 5. 실패 시 에러 메시지 표시
 */
/** 로딩 상태가 이 시간(ms) 이상 지속되면 초기화 옵션 표시 */
const LOADING_TIMEOUT_MS = 5000;

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLoading, resetSession } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showResetOption, setShowResetOption] = useState(false);

  // 로그인 후 돌아갈 경로
  const from = location.state?.from?.pathname || '/admin/products';

  // 로딩이 일정 시간 이상 지속되면 초기화 옵션 표시
  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        setShowResetOption(true);
      }, LOADING_TIMEOUT_MS);
    } else {
      setShowResetOption(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const result = await signIn(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || '로그인에 실패했습니다.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: '-0.02em',
            }}
          >
            Lumenstate
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mt: 0.5,
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <UnderlineInput
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="email"
              autoFocus
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <UnderlineInput
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              autoComplete="current-password"
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{
              py: 1.5,
              fontWeight: 600,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              '로그인'
            )}
          </Button>

          {/* 로딩이 오래 지속될 때 세션 초기화 옵션 */}
          {showResetOption && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                로딩이 계속되나요?{' '}
                <Link
                  component="button"
                  type="button"
                  variant="caption"
                  onClick={resetSession}
                  sx={{ cursor: 'pointer' }}
                >
                  세션 초기화
                </Link>
              </Typography>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 3,
            color: 'text.disabled',
          }}
        >
          관리자 계정으로 로그인해주세요
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;
