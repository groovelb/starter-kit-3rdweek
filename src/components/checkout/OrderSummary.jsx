import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { OrderItem } from './OrderItem';

/**
 * OrderSummary 컴포넌트
 *
 * 주문 요약 패널. 상품 목록 + 소계 + 배송비 + 총액.
 *
 * Props:
 * @param {Array} items - 장바구니 아이템 배열 [Required]
 * @param {number} subtotal - 소계 금액 [Required]
 * @param {number|string} shipping - 배송비 (숫자 또는 텍스트) [Optional]
 * @param {number} discount - 할인 금액 [Optional, 기본값: 0]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'KRW']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <OrderSummary
 *   items={cartItems}
 *   subtotal={1000}
 *   shipping="다음 단계에서 계산"
 * />
 */
const OrderSummary = forwardRef(function OrderSummary(
  {
    items = [],
    subtotal = 0,
    shipping,
    discount = 0,
    currency = 'KRW',
    sx = {},
    ...props
  },
  ref
) {
  // 가격 포맷
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Total 계산
  const shippingCost = typeof shipping === 'number' ? shipping : 0;
  const total = subtotal - discount + shippingCost;

  // 아이템 개수
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box ref={ref} sx={{ ...sx }} {...props}>
      {/* 주문 상품 */}
      <Box sx={{ mb: 3 }}>
        {items.map((item) => (
          <OrderItem key={item.id} item={item} currency={currency} />
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* 소계 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          소계 · {itemCount}개
        </Typography>
        <Typography variant="body2">
          {formatPrice(subtotal)}
        </Typography>
      </Box>

      {/* 배송비 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          배송비
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {typeof shipping === 'number'
            ? formatPrice(shipping)
            : shipping || '다음 단계에서 계산'}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* 총액 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          총액
        </Typography>
        <Typography
          variant="h5"
          component="span"
          sx={{ fontWeight: 600 }}
        >
          {formatPrice(total)}
        </Typography>
      </Box>
    </Box>
  );
});

export { OrderSummary };
export default OrderSummary;
