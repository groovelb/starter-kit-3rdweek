import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * CartHeader 컴포넌트
 *
 * 장바구니 헤더. "Cart" 타이틀 + Close 버튼.
 *
 * 동작 방식:
 * 1. 좌측: "Cart" 타이틀
 * 2. 우측: X 닫기 버튼
 * 3. 닫기 버튼 클릭 시 onClose 호출
 *
 * Props:
 * @param {string} title - 헤더 타이틀 [Optional, 기본값: 'Cart']
 * @param {function} onClose - 닫기 핸들러 () => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CartHeader onClose={() => setOpen(false)} />
 */
const CartHeader = forwardRef(function CartHeader(
  {
    title = 'Cart',
    onClose,
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
        borderBottom: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
      {...props}
    >
      {/* 타이틀 */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: '1.125rem',
        }}
      >
        {title}
      </Typography>

      {/* 닫기 버튼 */}
      <IconButton
        onClick={onClose}
        edge="end"
        aria-label="Close cart"
        sx={{
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
});

export default CartHeader;
