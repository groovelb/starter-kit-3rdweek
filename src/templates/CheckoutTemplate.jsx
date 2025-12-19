import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import {
  CheckoutLayout,
  CheckoutLogo,
  CheckoutSteps,
  ExpressCheckout,
  ContactForm,
  ShippingForm,
  CheckoutActions,
  PolicyLinks,
  OrderSummary,
} from '../components/checkout';

/**
 * CheckoutTemplate 컴포넌트
 *
 * 체크아웃 페이지 템플릿. 모든 체크아웃 컴포넌트를 조합.
 * 좌측: 폼 영역 (Logo, Steps, Express, Contact, Shipping, Actions, Policy)
 * 우측: 주문 요약 영역 (OrderSummary)
 *
 * Props:
 * @param {string} currentStep - 현재 단계 [Optional, 기본값: 'information']
 * @param {object} contact - Contact 폼 값 { email, newsletter } [Optional]
 * @param {object} shipping - Shipping 폼 값 [Optional]
 * @param {Array} items - 장바구니 아이템 배열 [Required]
 * @param {number} subtotal - 소계 금액 [Required]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'KRW']
 * @param {function} onContactChange - Contact 변경 핸들러 [Optional]
 * @param {function} onShippingChange - Shipping 변경 핸들러 [Optional]
 * @param {function} onReturn - 돌아가기 클릭 핸들러 [Optional]
 * @param {function} onContinue - 계속 버튼 클릭 핸들러 [Optional]
 * @param {function} onSignIn - 로그인 클릭 핸들러 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutTemplate
 *   items={cartItems}
 *   subtotal={1000}
 *   contact={{ email: '', newsletter: false }}
 *   shipping={{}}
 *   onContinue={handleContinue}
 * />
 */
const CheckoutTemplate = forwardRef(function CheckoutTemplate(
  {
    currentStep = 'information',
    contact = { email: '', newsletter: false },
    shipping = {},
    items = [],
    subtotal = 0,
    currency = 'KRW',
    onContactChange,
    onShippingChange,
    onReturn,
    onContinue,
    onSignIn,
    sx = {},
    ...props
  },
  ref
) {
  // Left: Form Area
  const leftContent = (
    <Box>
      <CheckoutLogo />
      <CheckoutSteps currentStep={currentStep} />
      <ExpressCheckout />
      <ContactForm
        email={contact.email}
        newsletter={contact.newsletter}
        onEmailChange={(email) => onContactChange?.({ ...contact, email })}
        onNewsletterChange={(newsletter) => onContactChange?.({ ...contact, newsletter })}
        onSignIn={onSignIn}
      />
      <ShippingForm
        values={shipping}
        onChange={(field, value) => onShippingChange?.({ ...shipping, [field]: value })}
      />
      <CheckoutActions
        onReturn={onReturn}
        onContinue={onContinue}
      />
      <PolicyLinks />
    </Box>
  );

  // Right: Order Summary Area
  const rightContent = (
    <OrderSummary
      items={items}
      subtotal={subtotal}
      currency={currency}
    />
  );

  return (
    <CheckoutLayout
      ref={ref}
      left={leftContent}
      right={rightContent}
      sx={sx}
      {...props}
    />
  );
});

export { CheckoutTemplate };
export default CheckoutTemplate;
