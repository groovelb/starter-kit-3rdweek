import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { ShoppingBag } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { content } from '../../data/content';
import { useCart } from '../../context/CartContext';

/**
 * GNB 컴포넌트
 *
 * 단순화된 GNB (Global Navigation Bar).
 * 좌측에 로고, 우측에 장바구니 아이콘.
 *
 * 동작 방식:
 * 1. content.js에서 brand.name을 자동으로 불러옴
 * 2. 우측 Cart 아이콘 클릭 시 onCartClick 호출
 * 3. 장바구니 아이템 수 뱃지 표시
 *
 * Props:
 * @param {function} onCartClick - Cart 아이콘 클릭 핸들러 () => void [Optional]
 * @param {number} height - 헤더 높이 (px) [Optional, 기본값: 64]
 * @param {boolean} hasBorder - 헤더 하단 보더 [Optional, 기본값: true]
 * @param {boolean} isSticky - 헤더 고정 [Optional, 기본값: true]
 * @param {boolean} isTransparent - 헤더 투명 배경 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <GNB onCartClick={() => setCartOpen(true)} />
 */
const GNB = forwardRef(function GNB({
  onCartClick,
  height = 64,
  hasBorder = true,
  isSticky = true,
  isTransparent = false,
  sx,
  ...props
}, ref) {
  const theme = useTheme();
  const { totalItems } = useCart();

  // content.js에서 데이터 불러오기
  const brandName = content.brand.name;

  /**
   * 헤더 스타일
   */
  const headerStyles = {
    position: isSticky ? 'sticky' : 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height,
    px: { xs: 2, sm: 3, md: 4 },
    backgroundColor: isTransparent ? 'transparent' : 'background.paper',
    borderBottom: hasBorder ? '1px solid' : 'none',
    borderColor: 'divider',
    backdropFilter: isTransparent ? 'blur(12px)' : 'none',
    ...sx,
  };

  return (
    <Box ref={ref} component="header" sx={headerStyles} {...props}>
      {/* Left: Logo */}
      <Typography variant="h6" fontWeight={700}>
        {brandName}
      </Typography>

      {/* Right: Cart */}
      <IconButton
        onClick={onCartClick}
        size="medium"
        aria-label="Open cart"
      >
        <Badge
          badgeContent={totalItems}
          color="primary"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.65rem',
              minWidth: 16,
              height: 16,
            },
          }}
        >
          <ShoppingBag size={22} strokeWidth={1.5} />
        </Badge>
      </IconButton>
    </Box>
  );
});

export { GNB };
