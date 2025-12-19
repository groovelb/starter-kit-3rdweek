import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { ChevronLeft } from 'lucide-react';

/**
 * CheckoutActions 컴포넌트
 *
 * 체크아웃 폼 하단 액션. Return to cart 링크 + Continue 버튼.
 *
 * Props:
 * @param {function} onReturn - Return to cart 클릭 핸들러 [Optional]
 * @param {function} onContinue - Continue 버튼 클릭 핸들러 [Optional]
 * @param {string} continueLabel - Continue 버튼 텍스트 [Optional, 기본값: 'Continue to shipping']
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 * @param {boolean} disabled - 비활성화 상태 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutActions
 *   onReturn={() => navigate('/cart')}
 *   onContinue={handleContinue}
 *   continueLabel="Continue to shipping"
 * />
 */
const CheckoutActions = forwardRef(function CheckoutActions(
  {
    onReturn,
    onContinue,
    continueLabel = 'Continue to shipping',
    isLoading = false,
    disabled = false,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 4,
        ...sx,
      }}
      {...props}
    >
      {/* Return Link */}
      <Link
        component="button"
        variant="body2"
        onClick={onReturn}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          textDecoration: 'none',
          color: 'text.primary',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <ChevronLeft size={16} />
        Return to cart
      </Link>

      {/* Continue Button */}
      <Button
        variant="contained"
        onClick={onContinue}
        disabled={disabled || isLoading}
        sx={{
          backgroundColor: 'text.primary',
          color: 'background.paper',
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontSize: '0.9375rem',
          '&:hover': {
            backgroundColor: 'grey.800',
          },
        }}
      >
        {isLoading ? 'Processing...' : continueLabel}
      </Button>
    </Box>
  );
});

export { CheckoutActions };
export default CheckoutActions;
