import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

/**
 * UnderlineInput 컴포넌트
 *
 * 하단 underline만 있는 미니멀한 텍스트 입력 필드.
 * readOnly 모드를 지원하여 정보 표시용으로도 사용 가능.
 *
 * 동작 방식:
 * 1. 라벨: 필드 상단에 작은 텍스트로 표시
 * 2. 입력 영역: 하단 border만 있는 깔끔한 스타일
 * 3. readOnly: 편집 불가, 정보 표시 전용
 * 4. focus 시 underline 색상 변경
 *
 * Props:
 * @param {string} label - 필드 라벨 [Required]
 * @param {string} value - 입력 값 [Required]
 * @param {function} onChange - 변경 핸들러 (event) => void [Optional]
 * @param {string} placeholder - 플레이스홀더 텍스트 [Optional]
 * @param {boolean} isReadOnly - 읽기 전용 여부 [Optional, 기본값: false]
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 * @param {string} type - 입력 타입 [Optional, 기본값: 'text']
 * @param {string} size - 크기 'small' | 'medium' | 'large' [Optional, 기본값: 'medium']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <UnderlineInput
 *   label="Item Number"
 *   value="LM-001"
 *   isReadOnly
 * />
 * <UnderlineInput
 *   label="Email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   size="small"
 * />
 */
const UnderlineInput = forwardRef(function UnderlineInput(
  {
    label,
    value,
    onChange,
    placeholder = '',
    isReadOnly = false,
    isDisabled = false,
    type = 'text',
    size = 'medium',
    sx = {},
    ...props
  },
  ref
) {
  // 사이즈별 스타일
  const sizeStyles = {
    small: {
      labelSize: '0.6875rem',
      inputSize: '0.8125rem',
      py: 0.375,
    },
    medium: {
      labelSize: '0.75rem',
      inputSize: '0.9375rem',
      py: 0.5,
    },
    large: {
      labelSize: '0.75rem',
      inputSize: '0.9375rem',
      py: 1.5,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        ...sx,
      }}
      {...props}
    >
      {/* 라벨 */}
      {label && (
        <Typography
          component="label"
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: currentSize.labelSize,
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </Typography>
      )}

      {/* 입력 필드 */}
      <InputBase
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={isReadOnly}
        disabled={isDisabled}
        type={type}
        size={size}
        sx={{
          fontSize: currentSize.inputSize,
          fontWeight: 400,
          color: 'text.primary',
          py: currentSize.py,
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: 'border-color 200ms ease',
          '&:hover': {
            borderColor: isReadOnly ? 'divider' : 'text.secondary',
          },
          '&.Mui-focused': {
            borderColor: isReadOnly ? 'divider' : 'text.primary',
          },
          '&.Mui-disabled': {
            color: 'text.disabled',
          },
          '& .MuiInputBase-input': {
            padding: 0,
            height: 'auto',
            cursor: isReadOnly ? 'default' : 'text',
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 0.6,
            },
          },
        }}
      />
    </Box>
  );
});

export default UnderlineInput;
