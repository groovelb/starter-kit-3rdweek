import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import CartCheckoutButton from './CartCheckoutButton';

/**
 * CartDrawer 컴포넌트
 *
 * 장바구니 슬라이드 패널. MUI Drawer 기반, 오른쪽에서 슬라이드.
 * CartHeader + CartItem 리스트 + CartSummary + CartCheckoutButton 조합.
 *
 * 동작 방식:
 * 1. open prop에 따라 오른쪽에서 슬라이드 인/아웃
 * 2. 상단: CartHeader (타이틀 + 닫기)
 * 3. 중간: CartItem 리스트 (스크롤 가능)
 * 4. 하단: CartSummary + CartCheckoutButton
 * 5. 장바구니가 비어있으면 빈 상태 메시지 표시
 *
 * Props:
 * @param {boolean} open - 열림 상태 [Required]
 * @param {function} onClose - 닫기 핸들러 () => void [Required]
 * @param {Array} items - 장바구니 아이템 배열 [Required]
 * @param {number} subtotal - 소계 금액 [Required]
 * @param {function} onQuantityChange - 수량 변경 핸들러 (itemId, quantity) => void [Optional]
 * @param {function} onRemoveItem - 아이템 제거 핸들러 (itemId) => void [Optional]
 * @param {function} onCheckout - 체크아웃 핸들러 () => void [Optional]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'USD']
 * @param {number} width - 드로어 너비 [Optional, 기본값: 400]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CartDrawer
 *   open={cartOpen}
 *   onClose={() => setCartOpen(false)}
 *   items={cartItems}
 *   subtotal={2580}
 *   onQuantityChange={(id, qty) => updateQuantity(id, qty)}
 *   onRemoveItem={(id) => removeItem(id)}
 *   onCheckout={() => navigate('/checkout')}
 * />
 */
const CartDrawer = forwardRef(function CartDrawer(
  {
    open,
    onClose,
    items = [],
    subtotal = 0,
    onQuantityChange,
    onRemoveItem,
    onCheckout,
    currency = 'USD',
    width = 400,
    sx = {},
    ...props
  },
  ref
) {
  const isEmpty = items.length === 0;

  return (
    <Drawer
      ref={ref}
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: width },
          maxWidth: '100%',
          ...sx,
        },
      }}
      {...props}
    >
      {/* 헤더 */}
      <CartHeader onClose={onClose} />

      {/* 아이템 리스트 */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 3,
        }}
      >
        {isEmpty ? (
          /* 빈 장바구니 */
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 200,
              py: 4,
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Your cart is empty
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Add items to get started
            </Typography>
          </Box>
        ) : (
          /* 아이템 목록 */
          <Box>
            {items.map((item, index) => (
              <Box key={item.id}>
                <CartItem
                  item={item}
                  currency={currency}
                  onQuantityChange={(qty) => onQuantityChange?.(item.id, qty)}
                  onRemove={() => onRemoveItem?.(item.id)}
                />
                {index < items.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* 하단 영역 */}
      <Box sx={{ flexShrink: 0 }}>
        <CartSummary subtotal={subtotal} currency={currency} />
        <CartCheckoutButton
          onCheckout={onCheckout}
          isDisabled={isEmpty}
        />
      </Box>
    </Drawer>
  );
});

export default CartDrawer;
