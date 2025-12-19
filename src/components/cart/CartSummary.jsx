import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * 가격 포맷 함수
 */
const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
};

/**
 * CartSummary 컴포넌트
 *
 * 장바구니 요약. Subtotal 금액 표시.
 *
 * 동작 방식:
 * 1. "Subtotal" 라벨 표시
 * 2. 총 금액 표시 (통화 포맷 적용)
 *
 * Props:
 * @param {number} subtotal - 소계 금액 [Required]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'USD']
 * @param {string} label - 라벨 텍스트 [Optional, 기본값: 'Subtotal']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CartSummary subtotal={2580} />
 */
const CartSummary = forwardRef(function CartSummary(
  {
    subtotal = 0,
    currency = 'USD',
    label = 'Subtotal',
    sx = {},
    ...props
  },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
      {...props}
    >
      {/* 라벨 */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          fontSize: '0.9375rem',
        }}
      >
        {label}
      </Typography>

      {/* 금액 */}
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 600,
          fontSize: '1rem',
        }}
      >
        {formatPrice(subtotal, currency)}
      </Typography>
    </Box>
  );
});

export default CartSummary;
