import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Page3 컴포넌트
 *
 * 라우터 연동 예시용 페이지 컴포넌트.
 */
function Page3() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        p: 4,
      }}
    >
      <Typography variant="h2" fontWeight={700} color="text.primary" gutterBottom>
        Page 3
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is the third page content.
      </Typography>
    </Box>
  );
}

export default Page3;
