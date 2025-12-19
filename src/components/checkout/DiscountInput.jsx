import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UnderlineInput from '../shared/UnderlineInput';

/**
 * DiscountInput 컴포넌트
 *
 * 할인코드 입력. UnderlineInput + 적용 버튼.
 *
 * Props:
 * @param {string} value - 할인코드 값 [Optional]
 * @param {function} onChange - 값 변경 핸들러 (value) => void [Optional]
 * @param {function} onApply - 적용 버튼 클릭 핸들러 [Optional]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 * @param {boolean} isApplied - 적용 완료 상태 [Optional, 기본값: false]
 * @param {string} error - 에러 메시지 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <DiscountInput
 *   value={discountCode}
 *   onChange={setDiscountCode}
 *   onApply={handleApplyDiscount}
 * />
 */
const DiscountInput = forwardRef(function DiscountInput(
  {
    value = '',
    onChange,
    onApply,
    isLoading = false,
    isApplied = false,
    error,
    sx = {},
    ...props
  },
  ref
) {
  return (
    <Box ref={ref} sx={{ ...sx }} {...props}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-end',
        }}
      >
        <UnderlineInput
          label="할인코드"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="코드 또는 기프트카드 입력"
          isDisabled={isApplied}
          size="small"
          sx={{ flex: 1 }}
        />
        <Button
          variant="text"
          onClick={onApply}
          disabled={!value || isLoading || isApplied}
          sx={{
            flexShrink: 0,
            color: 'text.secondary',
            textTransform: 'none',
            px: 2,
            pb: 0.75,
            minWidth: 'auto',
            '&:hover': {
              color: 'text.primary',
              backgroundColor: 'transparent',
            },
          }}
        >
          {isLoading ? '...' : isApplied ? '적용됨' : '적용'}
        </Button>
      </Box>
      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 0.5, display: 'block' }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
});

export { DiscountInput };
export default DiscountInput;
