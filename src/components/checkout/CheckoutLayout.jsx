import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

/**
 * CheckoutLayout 컴포넌트
 *
 * 체크아웃 페이지 2컬럼 레이아웃.
 * 좌측: 폼 영역 (Contact, Shipping 등)
 * 우측: 주문 요약 영역 (OrderSummary)
 *
 * 동작 방식:
 * 1. 데스크탑: 좌측 7, 우측 5 비율
 * 2. 모바일: 주문 요약이 상단, 폼이 하단으로 스택
 * 3. 우측 영역은 배경색으로 구분
 *
 * Props:
 * @param {node} left - 좌측 폼 영역 콘텐츠 [Required]
 * @param {node} right - 우측 주문 요약 영역 콘텐츠 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutLayout
 *   left={<CheckoutForm />}
 *   right={<OrderSummary />}
 * />
 */
const CheckoutLayout = forwardRef(function CheckoutLayout(
  { left, right, sx = {}, ...props },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        minHeight: '100vh',
        ...sx,
      }}
      {...props}
    >
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left: Form Area */}
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            order: { xs: 2, md: 1 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 600,
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 6 },
            }}
          >
            {left}
          </Box>
        </Grid>

        {/* Right: Order Summary Area */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            backgroundColor: 'grey.50',
            borderLeft: { md: '1px solid' },
            borderBottom: { xs: '1px solid', md: 'none' },
            borderColor: 'divider',
            order: { xs: 1, md: 2 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 450,
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 6 },
            }}
          >
            {right}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

export { CheckoutLayout };
export default CheckoutLayout;
