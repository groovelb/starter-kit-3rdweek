import { forwardRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionContainer } from '../components/container/SectionContainer';
import ProductDetailTemplate from '../templates/ProductDetailTemplate';
import CartDrawer from '../components/cart/CartDrawer';
import { useCart } from '../context/CartContext';

/**
 * ProductDetailSection 컴포넌트
 *
 * 제품 상세 섹션. ProductDetailTemplate + CartDrawer 조합.
 * 장바구니 상태를 관리하고 장바구니 추가 시 자동으로 CartDrawer를 열 수 있음.
 *
 * 동작 방식:
 * 1. ProductDetailTemplate으로 제품 상세 UI 렌더링
 * 2. CartDrawer로 장바구니 슬라이드 패널 렌더링
 * 3. useCart로 장바구니 상태 연동
 * 4. 장바구니 추가 시 autoOpenCart가 true면 CartDrawer 자동 열기
 * 5. CartDrawer에서 수량 변경, 아이템 제거 가능
 *
 * Props:
 * @param {object} product - 제품 데이터 (products.js 구조) [Required]
 *   - { id, title, type, lux, kelvin, images, video, price }
 * @param {object} meta - 제품 메타 정보 [Optional]
 *   - { itemNumber, leadTime, shipDate }
 * @param {boolean} autoOpenCart - 장바구니 추가 시 자동 열기 [Optional, 기본값: true]
 * @param {function} onCheckout - 체크아웃 핸들러 () => void [Optional]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'USD']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductDetailSection
 *   product={products[0]}
 *   meta={{ itemNumber: 'LM-001', leadTime: '4 Weeks' }}
 *   onCheckout={() => navigate('/checkout')}
 * />
 */
const ProductDetailSection = forwardRef(function ProductDetailSection(
  {
    product = {},
    meta = {},
    autoOpenCart = true,
    onCheckout,
    currency = 'USD',
    sx = {},
    ...props
  },
  ref
) {
  const navigate = useNavigate();
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  /**
   * 페이지 진입 시 스크롤 초기화
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product?.id]);

  /**
   * 장바구니 열기
   */
  const handleOpenCart = useCallback(() => {
    setCartOpen(true);
  }, []);

  /**
   * 장바구니 닫기
   */
  const handleCloseCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  /**
   * 장바구니 추가 후 콜백
   * autoOpenCart가 true면 CartDrawer 열기
   */
  const handleAddToCart = useCallback(() => {
    if (autoOpenCart) {
      handleOpenCart();
    }
  }, [autoOpenCart, handleOpenCart]);

  /**
   * 수량 변경 핸들러
   */
  const handleQuantityChange = useCallback((itemId, quantity) => {
    updateQuantity(itemId, quantity);
  }, [updateQuantity]);

  /**
   * 아이템 제거 핸들러
   */
  const handleRemoveItem = useCallback((itemId) => {
    removeItem(itemId);
  }, [removeItem]);

  /**
   * 체크아웃 핸들러
   * 기본 동작: /checkout 페이지로 이동
   */
  const handleCheckout = useCallback(() => {
    handleCloseCart();
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  }, [onCheckout, handleCloseCart, navigate]);

  return (
    <SectionContainer
      ref={ref}
      spacing={0}
      sx={{
        position: 'relative',
        py: 0,
        ...sx,
      }}
      {...props}
    >
      {/* 제품 상세 템플릿 */}
      <ProductDetailTemplate
        product={product}
        meta={meta}
        onAddToCart={handleAddToCart}
      />

      {/* 장바구니 드로어 */}
      <CartDrawer
        open={cartOpen}
        onClose={handleCloseCart}
        items={items}
        subtotal={subtotal}
        currency={currency}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </SectionContainer>
  );
});

export { ProductDetailSection };
export default ProductDetailSection;
