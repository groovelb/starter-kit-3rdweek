import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { useCart } from '../../context/CartContext';

/**
 * OrderItem 컴포넌트
 *
 * 주문 요약 아이템. 썸네일(수량 뱃지) + 제품명 + 옵션 + 가격.
 *
 * Props:
 * @param {object} item - 장바구니 아이템 데이터 [Required]
 *   - { id, product, options, quantity }
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'USD']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <OrderItem item={cartItem} currency="USD" />
 */
const OrderItem = forwardRef(function OrderItem(
  { item, currency = 'USD', sx = {}, ...props },
  ref
) {
  const { getOptionLabel } = useCart();
  const { product, options, quantity } = item;

  // 가격 포맷
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(price);
  };

  // 옵션 문자열 생성
  const optionsText = Object.entries(options || {})
    .map(([key, value]) => getOptionLabel(key, value))
    .join(' / ');

  // 썸네일 이미지
  const thumbnailSrc = product.images?.[0] || '/placeholder.jpg';

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        gap: 2,
        py: 2,
        ...sx,
      }}
      {...props}
    >
      {/* Thumbnail with Badge */}
      <Badge
        badgeContent={quantity}
        color="default"
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: 'grey.500',
            color: 'white',
            fontSize: '0.65rem',
            minWidth: 20,
            height: 20,
            borderRadius: '50%',
          },
        }}
      >
        <Box
          component="img"
          src={thumbnailSrc}
          alt={product.title}
          sx={{
            width: 64,
            height: 64,
            objectFit: 'cover',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'grey.100',
          }}
        />
      </Badge>

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {optionsText}
        </Typography>
      </Box>

      {/* Price */}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        {formatPrice(product.price * quantity)}
      </Typography>
    </Box>
  );
});

export { OrderItem };
export default OrderItem;
