import { useState, forwardRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QuantitySelector from '../shared/QuantitySelector';

/**
 * 가격 포맷 함수
 *
 * @param {number} price - 가격
 * @param {string} currency - 통화 코드
 * @returns {string} 포맷된 가격 문자열
 */
const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
};

/**
 * ProductActions 컴포넌트
 *
 * 제품 액션 영역. 수량 선택 + 가격 + Add to Cart 버튼.
 * 레퍼런스 이미지의 상품 상세 하단 액션 영역 스타일 적용.
 *
 * 동작 방식:
 * 1. QuantitySelector로 수량 선택
 * 2. 가격 표시 (수량 × 단가)
 * 3. Add to Cart 버튼 클릭 시 onAddToCart 호출
 *
 * Props:
 * @param {number} price - 제품 단가 [Required]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'USD']
 * @param {number} quantity - 현재 수량 [Optional]
 * @param {function} onQuantityChange - 수량 변경 핸들러 [Optional]
 * @param {function} onAddToCart - 장바구니 추가 핸들러 [Optional]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductActions
 *   price={22900}
 *   quantity={1}
 *   onQuantityChange={setQuantity}
 *   onAddToCart={handleAddToCart}
 * />
 */
const ProductActions = forwardRef(function ProductActions(
  {
    price = 0,
    currency = 'USD',
    quantity: controlledQuantity,
    onQuantityChange,
    onAddToCart,
    isLoading = false,
    isDisabled = false,
    sx = {},
    ...props
  },
  ref
) {
  const [internalQuantity, setInternalQuantity] = useState(1);

  // 외부/내부 수량 관리
  const quantity = controlledQuantity !== undefined ? controlledQuantity : internalQuantity;
  const handleQuantityChange = (newQuantity) => {
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    } else {
      setInternalQuantity(newQuantity);
    }
  };

  // 총 가격 계산
  const totalPrice = price * quantity;

  /**
   * Add to Cart 클릭 핸들러
   */
  const handleAddToCart = () => {
    if (onAddToCart && !isDisabled && !isLoading) {
      onAddToCart(quantity);
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        pt: 8,
        mt: 4,
        borderTop: '3px solid',
        borderColor: 'primary.main',
        ...sx,
      }}
      {...props}
    >

      {/* Quantity + Price + Button Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Quantity 라벨 + Selector */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            Quantity
          </Typography>
          <QuantitySelector
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={99}
            size="small"
            isDisabled={isDisabled}
          />
        </Box>

        {/* 가격 */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'monospace',
            fontSize: '1rem',
            fontWeight: 500,
            color: 'text.primary',
            flex: 1,
          }}
        >
          {formatPrice(totalPrice, currency)}
        </Typography>

        {/* Add to Cart 버튼 */}
        <Button
          variant="contained"
          onClick={handleAddToCart}
          disabled={isDisabled || isLoading}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 0,
            px: 5,
            py: 1.75,
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: 'none',
            },
            '&:disabled': {
              backgroundColor: 'action.disabledBackground',
              color: 'action.disabled',
            },
          }}
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </Box>
    </Box>
  );
});

export default ProductActions;
