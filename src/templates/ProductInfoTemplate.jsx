import { forwardRef, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import ProductMeta from '../components/product/ProductMeta';
import ProductOptions from '../components/product/ProductOptions';
import ProductActions from '../components/product/ProductActions';

/**
 * ProductInfoTemplate 컴포넌트
 *
 * 제품 상세 페이지의 하단 정보 영역 템플릿.
 * 메타 정보, 옵션 선택, 장바구니 추가 액션을 포함.
 * Controlled/Uncontrolled 모드 모두 지원.
 *
 * 동작 방식:
 * 1. 상단: 제품 메타 정보 (품번, 리드타임, 배송일)
 * 2. 중단: 제품 옵션 선택 (유리 마감, 하드웨어, 높이)
 * 3. 하단: 가격 표시 + 수량 선택 + 장바구니 추가 버튼
 *
 * Props:
 * @param {object} meta - 제품 메타 정보 [Optional]
 *   - { itemNumber, leadTime, shipDate }
 * @param {number} price - 제품 가격 [Required]
 * @param {string} currency - 통화 [Optional, 기본값: 'USD']
 * @param {object} options - 현재 옵션 값 (controlled mode) [Optional]
 * @param {function} onOptionChange - 옵션 변경 핸들러 (key, value) => void [Optional]
 * @param {number} quantity - 현재 수량 (controlled mode) [Optional]
 * @param {function} onQuantityChange - 수량 변경 핸들러 [Optional]
 * @param {object} defaultOptions - 초기 옵션 값 (uncontrolled mode) [Optional]
 * @param {string} size - 입력 필드 크기 'small' | 'medium' | 'large' [Optional, 기본값: 'medium']
 * @param {function} onAddToCart - 장바구니 추가 핸들러 (quantity, options) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage (Uncontrolled):
 * <ProductInfoTemplate
 *   meta={{ itemNumber: 'LM-001', leadTime: '4 Weeks' }}
 *   price={1250}
 *   onAddToCart={(qty, opts) => console.log(qty, opts)}
 * />
 *
 * Example usage (Controlled):
 * <ProductInfoTemplate
 *   meta={{ itemNumber: 'LM-001' }}
 *   price={1250}
 *   options={options}
 *   onOptionChange={handleOptionChange}
 *   quantity={quantity}
 *   onQuantityChange={setQuantity}
 *   onAddToCart={handleAddToCart}
 * />
 */
const ProductInfoTemplate = forwardRef(function ProductInfoTemplate(
  {
    meta = {},
    price = 0,
    currency = 'USD',
    // Controlled mode props
    options: controlledOptions,
    onOptionChange,
    quantity: controlledQuantity,
    onQuantityChange,
    // Uncontrolled mode props
    defaultOptions = {
      glassFinish: 'opaline',
      hardware: 'patina-brass',
      height: '61-72',
    },
    size = 'medium',
    onAddToCart,
    sx = {},
    ...props
  },
  ref
) {
  // Uncontrolled state (used when controlled props not provided)
  const [internalQuantity, setInternalQuantity] = useState(1);
  const [internalOptions, setInternalOptions] = useState(defaultOptions);

  // Determine if controlled or uncontrolled
  const isControlled = controlledOptions !== undefined;
  const quantity = isControlled ? controlledQuantity : internalQuantity;
  const options = isControlled ? controlledOptions : internalOptions;

  /**
   * 옵션 변경 핸들러
   */
  const handleOptionChange = useCallback((key, value) => {
    if (isControlled && onOptionChange) {
      onOptionChange(key, value);
    } else {
      setInternalOptions((prev) => ({ ...prev, [key]: value }));
    }
  }, [isControlled, onOptionChange]);

  /**
   * 수량 변경 핸들러
   */
  const handleQuantityChange = useCallback((value) => {
    if (isControlled && onQuantityChange) {
      onQuantityChange(value);
    } else {
      setInternalQuantity(value);
    }
  }, [isControlled, onQuantityChange]);

  /**
   * 장바구니 추가 핸들러
   */
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(quantity, options);
    }
  };

  const hasMeta = meta.itemNumber || meta.leadTime || meta.shipDate;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        ...sx,
      }}
      {...props}
    >
      {/* 제품 메타 정보 */}
      {hasMeta && (
        <ProductMeta
          itemNumber={meta.itemNumber}
          leadTime={meta.leadTime}
          shipDate={meta.shipDate}
          showDivider={false}
        />
      )}

      {/* 제품 옵션 선택 */}
      <ProductOptions
        values={options}
        onChange={handleOptionChange}
        size={size}
      />

      {/* 액션 영역 */}
      <ProductActions
        price={price}
        currency={currency}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
      />
    </Box>
  );
});

export { ProductInfoTemplate };
export default ProductInfoTemplate;
