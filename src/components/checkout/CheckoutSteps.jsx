import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ChevronRight } from 'lucide-react';

/**
 * CheckoutSteps 컴포넌트
 *
 * 체크아웃 진행 단계 표시.
 * Cart > Information > Shipping > Payment 형태의 브레드크럼.
 *
 * Props:
 * @param {string} currentStep - 현재 단계 ID [Optional, 기본값: 'information']
 * @param {Array} steps - 단계 배열 [Optional]
 *   - [{ id: 'cart', label: 'Cart' }, ...]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutSteps currentStep="shipping" />
 */

const DEFAULT_STEPS = [
  { id: 'cart', label: 'Cart' },
  { id: 'information', label: 'Information' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
];

const CheckoutSteps = forwardRef(function CheckoutSteps(
  {
    currentStep = 'information',
    steps = DEFAULT_STEPS,
    sx = {},
    ...props
  },
  ref
) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 0.5,
        mb: 4,
        ...sx,
      }}
      {...props}
    >
      {steps.map((step, index) => {
        const isPast = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;

        return (
          <Box
            key={step.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isCurrent
                  ? 'text.primary'
                  : isPast
                    ? 'primary.main'
                    : 'text.disabled',
                fontWeight: isCurrent ? 600 : 400,
                cursor: isPast ? 'pointer' : 'default',
                '&:hover': isPast ? { textDecoration: 'underline' } : {},
              }}
            >
              {step.label}
            </Typography>
            {index < steps.length - 1 && (
              <ChevronRight
                size={14}
                style={{
                  color: isFuture ? '#9e9e9e' : '#666',
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
});

export { CheckoutSteps };
export default CheckoutSteps;
