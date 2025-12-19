import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Page2 컴포넌트
 *
 * 라우터 연동 예시용 페이지 컴포넌트.
 */
function Page2() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'secondary.50',
        p: 4,
      }}
    >
      <Typography variant="h2" fontWeight={700} color="secondary.main" gutterBottom>
        Page 2
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is the second page content.
      </Typography>
    </Box>
  );
}

export default Page2;
