import { forwardRef } from 'react';
import { CheckoutSection } from '../sections/CheckoutSection';

/**
 * CheckoutPage 컴포넌트
 *
 * 체크아웃 페이지. CheckoutSection 사용.
 * GNB 없이 독립적인 체크아웃 플로우.
 *
 * Props:
 * @param {function} onCheckout - 체크아웃 완료 핸들러 (formData) => void [Optional]
 * @param {string} currency - 통화 코드 [Optional, 기본값: 'USD']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutPage onCheckout={(data) => processOrder(data)} />
 */
const CheckoutPage = forwardRef(function CheckoutPage(
  {
    onCheckout,
    currency = 'USD',
    sx = {},
    ...props
  },
  ref
) {
  return (
    <CheckoutSection
      ref={ref}
      onCheckout={onCheckout}
      currency={currency}
      sx={sx}
      {...props}
    />
  );
});

export { CheckoutPage };
export default CheckoutPage;
