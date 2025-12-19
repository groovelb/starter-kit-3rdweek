import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

/**
 * CartCheckoutButton 컴포넌트
 *
 * 체크아웃 버튼. 전체 너비 Checkout 버튼.
 *
 * 동작 방식:
 * 1. 전체 너비의 강조 버튼 렌더링
 * 2. 클릭 시 onCheckout 호출
 * 3. 비활성화 상태 지원 (장바구니 비어있을 때)
 *
 * Props:
 * @param {function} onCheckout - 체크아웃 핸들러 () => void [Optional]
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 * @param {string} label - 버튼 텍스트 [Optional, 기본값: 'Checkout']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CartCheckoutButton
 *   onCheckout={() => navigate('/checkout')}
 *   isDisabled={items.length === 0}
 * />
 */
const CartCheckoutButton = forwardRef(function CartCheckoutButton(
  {
    onCheckout,
    isDisabled = false,
    isLoading = false,
    label = 'Checkout',
    sx = {},
    ...props
  },
  ref
) {
  /**
   * 클릭 핸들러
   */
  const handleClick = () => {
    if (onCheckout && !isDisabled && !isLoading) {
      onCheckout();
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        px: 3,
        pb: 3,
        ...sx,
      }}
      {...props}
    >
      <Button
        variant="contained"
        fullWidth
        onClick={handleClick}
        disabled={isDisabled || isLoading}
        sx={{
          backgroundColor: 'secondary.main',
          color: 'primary.main',
          borderRadius: 0,
          py: 1.5,
          fontWeight: 600,
          fontSize: '0.9375rem',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'secondary.dark',
            boxShadow: 'none',
          },
          '&:disabled': {
            backgroundColor: 'action.disabledBackground',
            color: 'action.disabled',
          },
        }}
      >
        {isLoading ? 'Processing...' : label}
      </Button>
    </Box>
  );
});

export default CartCheckoutButton;
