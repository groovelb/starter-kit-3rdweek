import { forwardRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutTemplate } from '../templates/CheckoutTemplate';
import { useCart } from '../context/CartContext';

/**
 * CheckoutSection 컴포넌트
 *
 * 체크아웃 섹션. CheckoutTemplate + 상태 관리.
 * CartContext에서 장바구니 데이터를 가져와 표시.
 *
 * 동작 방식:
 * 1. CartContext에서 items, subtotal 가져옴
 * 2. Contact, Shipping 폼 상태 관리
 * 3. 돌아가기 → 이전 페이지로 이동
 * 4. 계속 → 다음 단계로 이동 (또는 onCheckout 호출)
 *
 * Props:
 * @param {function} onCheckout - 체크아웃 완료 핸들러 (formData) => void [Optional]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'KRW']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutSection onCheckout={(data) => processOrder(data)} />
 */
const CheckoutSection = forwardRef(function CheckoutSection(
  {
    onCheckout,
    currency = 'KRW',
    sx = {},
    ...props
  },
  ref
) {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();

  // Form States
  const [contact, setContact] = useState({
    email: '',
    newsletter: false,
  });

  const [shipping, setShipping] = useState({
    country: 'KR',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  /**
   * Contact 변경 핸들러
   */
  const handleContactChange = useCallback((newContact) => {
    setContact(newContact);
  }, []);

  /**
   * Shipping 변경 핸들러
   */
  const handleShippingChange = useCallback((newShipping) => {
    setShipping(newShipping);
  }, []);

  /**
   * 돌아가기 핸들러
   */
  const handleReturn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  /**
   * 계속 핸들러
   */
  const handleContinue = useCallback(() => {
    const formData = {
      contact,
      shipping,
      items,
      subtotal,
    };

    if (onCheckout) {
      onCheckout(formData);
    } else {
      // 기본 동작: 콘솔에 출력
      console.log('Checkout data:', formData);
    }
  }, [contact, shipping, items, subtotal, onCheckout]);

  /**
   * 로그인 핸들러
   */
  const handleSignIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <CheckoutTemplate
      ref={ref}
      currentStep="information"
      contact={contact}
      shipping={shipping}
      items={items}
      subtotal={subtotal}
      currency={currency}
      onContactChange={handleContactChange}
      onShippingChange={handleShippingChange}
      onReturn={handleReturn}
      onContinue={handleContinue}
      onSignIn={handleSignIn}
      sx={sx}
      {...props}
    />
  );
});

export { CheckoutSection };
export default CheckoutSection;
