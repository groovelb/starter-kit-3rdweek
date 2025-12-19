import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

/**
 * ExpressCheckout 컴포넌트
 *
 * 빠른 결제 옵션. Shop Pay, Google Pay 버튼.
 *
 * Props:
 * @param {function} onShopPay - Shop Pay 클릭 핸들러 [Optional]
 * @param {function} onGooglePay - Google Pay 클릭 핸들러 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ExpressCheckout
 *   onShopPay={() => handleShopPay()}
 *   onGooglePay={() => handleGooglePay()}
 * />
 */
const ExpressCheckout = forwardRef(function ExpressCheckout(
  { onShopPay, onGooglePay, sx = {}, ...props },
  ref
) {
  return (
    <Box ref={ref} sx={{ mb: 4, ...sx }} {...props}>
      {/* Label */}
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        Express checkout
      </Typography>

      {/* Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
        }}
      >
        {/* Shop Pay Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={onShopPay}
          sx={{
            backgroundColor: '#5a31f4',
            color: 'white',
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 700,
            fontStyle: 'italic',
            '&:hover': {
              backgroundColor: '#4a28cc',
            },
          }}
        >
          shop
        </Button>

        {/* Google Pay Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={onGooglePay}
          sx={{
            backgroundColor: '#000',
            color: 'white',
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          <Box component="span" sx={{ fontWeight: 400, mr: 0.5 }}>G</Box>
          Pay
        </Button>
      </Box>

      {/* OR Divider */}
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>
    </Box>
  );
});

export { ExpressCheckout };
export default ExpressCheckout;
