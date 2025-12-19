import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import QuantitySelector from '../shared/QuantitySelector';
import { DEFAULT_PRODUCT_OPTIONS } from '../product/ProductOptions';

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
 * 옵션 값을 라벨로 변환
 */
const getOptionLabel = (optionKey, optionValue) => {
  const optionList = DEFAULT_PRODUCT_OPTIONS[optionKey];
  if (!optionList) return optionValue;

  const option = optionList.find((opt) => opt.value === optionValue);
  return option ? option.label : optionValue;
};

/**
 * 옵션 키를 표시 라벨로 변환
 */
const getOptionKeyLabel = (key) => {
  const keyLabels = {
    glassFinish: 'Glass Finish',
    hardware: 'Hardware',
    height: 'OAH',
  };
  return keyLabels[key] || key;
};

/**
 * CartItem 컴포넌트
 *
 * 장바구니 아이템. 썸네일 + 제품명 + 옵션 + 가격 + 수량 + Remove.
 *
 * 동작 방식:
 * 1. 좌측: 제품 썸네일 (정사각형)
 * 2. 우측: 제품명, 옵션 목록, 가격
 * 3. 하단: 수량 조절 + Remove 버튼
 * 4. 수량 변경 시 onQuantityChange 호출
 * 5. Remove 클릭 시 onRemove 호출
 *
 * Props:
 * @param {object} item - 장바구니 아이템 데이터 [Required]
 *   - { id, product, options, quantity }
 * @param {function} onQuantityChange - 수량 변경 핸들러 (quantity) => void [Optional]
 * @param {function} onRemove - 제거 핸들러 () => void [Optional]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'USD']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CartItem
 *   item={cartItem}
 *   onQuantityChange={(qty) => updateQuantity(item.id, qty)}
 *   onRemove={() => removeItem(item.id)}
 * />
 */
const CartItem = forwardRef(function CartItem(
  {
    item,
    onQuantityChange,
    onRemove,
    currency = 'USD',
    sx = {},
    ...props
  },
  ref
) {
  if (!item || !item.product) {
    return null;
  }

  const { product, options = {}, quantity = 1 } = item;
  const thumbnail = product.images?.[0] || '';
  const totalPrice = (product.price || 0) * quantity;

  /**
   * 수량 변경 핸들러
   */
  const handleQuantityChange = (newQuantity) => {
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  /**
   * Remove 클릭 핸들러
   */
  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

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
      {/* 썸네일 */}
      <Box
        sx={{
          width: 100,
          height: 100,
          flexShrink: 0,
          backgroundColor: 'grey.100',
          overflow: 'hidden',
        }}
      >
        {thumbnail && (
          <Box
            component="img"
            src={thumbnail}
            alt={product.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>

      {/* 제품 정보 */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* 제품명 */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            fontSize: '0.9375rem',
            lineHeight: 1.3,
          }}
        >
          {product.title}
        </Typography>

        {/* 옵션 목록 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          {Object.entries(options).map(([key, value]) => (
            <Typography
              key={key}
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.8125rem',
              }}
            >
              {getOptionKeyLabel(key)}: {getOptionLabel(key, value)}
            </Typography>
          ))}
        </Box>

        {/* 가격 */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.9375rem',
            fontWeight: 500,
            mt: 0.5,
          }}
        >
          {formatPrice(totalPrice, currency)}
        </Typography>

        {/* 수량 + Remove */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
            pt: 1,
          }}
        >
          <QuantitySelector
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={99}
            size="small"
          />

          <ButtonBase
            onClick={handleRemove}
            sx={{
              color: 'text.secondary',
              fontSize: '0.8125rem',
              textDecoration: 'underline',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            Remove
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
});

export default CartItem;
