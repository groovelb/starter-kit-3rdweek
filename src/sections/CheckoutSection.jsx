import { forwardRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Check } from 'lucide-react';
import { CheckoutTemplate } from '../templates/CheckoutTemplate';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';

/**
 * CheckoutSection 컴포넌트
 *
 * 체크아웃 섹션. CheckoutTemplate + 상태 관리 + Supabase 주문 API 연동.
 * CartContext에서 장바구니 데이터를 가져와 표시.
 *
 * 동작 방식:
 * 1. CartContext에서 items, subtotal 가져옴
 * 2. Contact, Shipping 폼 상태 관리
 * 3. 돌아가기 → 이전 페이지로 이동
 * 4. Checkout 클릭 → Supabase API로 주문 생성 → 완료 모달 표시
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
  const { items, subtotal, clearCart } = useCart();

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

  // Loading & Modal States
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState(null);

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
   * 체크아웃 핸들러 (Supabase API 연동)
   * 1. 폼 데이터 유효성 검사
   * 2. Supabase에 주문 생성 (orders + order_items)
   * 3. 성공 시 완료 모달 표시
   * 4. 장바구니 비우기
   */
  const handleCheckout = useCallback(async () => {
    // 필수 필드 검사
    if (!contact.email || !shipping.firstName || !shipping.lastName || !shipping.address || !shipping.city || !shipping.zipCode) {
      setError('Please fill in all required fields.');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 주문 데이터 구성
      const orderData = {
        email: contact.email,
        newsletter: contact.newsletter,
        country: shipping.country,
        first_name: shipping.firstName,
        last_name: shipping.lastName,
        company: shipping.company || null,
        address: shipping.address,
        apartment: shipping.apartment || null,
        city: shipping.city,
        zip_code: shipping.zipCode,
        phone: shipping.phone || null,
        subtotal: subtotal,
        shipping_cost: 0,
        discount: 0,
        total: subtotal,
        currency: currency,
      };

      // 주문 항목 변환 (CartContext 구조: { id, product, options, quantity })
      const orderItems = items.map(item => ({
        productId: item.product.id,
        title: item.product.title,
        lux: item.product.lux,
        kelvin: item.product.kelvin,
        imageUrl: item.product.images?.[0] || null,
        options: item.options || {},
        quantity: item.quantity,
        unitPrice: item.product.price,
      }));

      // Supabase API 호출
      const { data: order, error: orderError } = await createOrder(orderData, orderItems);

      if (orderError) {
        console.error('[Checkout] Order creation failed:', orderError);
        setError(orderError.message || 'Failed to create order. Please try again.');
        return;
      }

      console.log('[Checkout] Order created successfully:', order);

      // 성공 처리
      setOrderNumber(order.order_number);
      setShowSuccessModal(true);

      // 장바구니 비우기
      if (clearCart) {
        clearCart();
      }

      // 외부 콜백 호출 (있는 경우)
      if (onCheckout) {
        onCheckout({
          contact,
          shipping,
          items,
          subtotal,
          order,
        });
      }
    } catch (err) {
      console.error('[Checkout] Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [contact, shipping, items, subtotal, currency, clearCart, onCheckout]);

  /**
   * 로그인 핸들러
   */
  const handleSignIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  /**
   * 모달 닫기 핸들러
   */
  const handleCloseModal = useCallback(() => {
    setShowSuccessModal(false);
    navigate('/');
  }, [navigate]);

  return (
    <>
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
        onContinue={handleCheckout}
        onSignIn={handleSignIn}
        continueLabel="Checkout"
        isLoading={isLoading}
        sx={sx}
        {...props}
      />

      {/* Error Display */}
      {error && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'error.main',
            color: 'white',
            px: 3,
            py: 1.5,
            borderRadius: 1,
            zIndex: 1300,
          }}
        >
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      {/* Success Modal */}
      <Dialog
        open={showSuccessModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 0,
              p: 4,
            },
          },
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          {/* Success Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'success.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <Check size={32} color="white" />
          </Box>

          {/* Title */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Order Confirmed
          </Typography>

          {/* Order Number */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            Thank you for your order!
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 3 }}>
            Order Number: {orderNumber}
          </Typography>

          {/* Message */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            We&apos;ll send you a confirmation email with your order details shortly.
          </Typography>

          {/* Continue Shopping Button */}
          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{
              backgroundColor: 'text.primary',
              color: 'background.paper',
              px: 4,
              py: 1.5,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'grey.800',
              },
            }}
          >
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
});

export { CheckoutSection };
export default CheckoutSection;
