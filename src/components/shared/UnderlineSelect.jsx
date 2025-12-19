import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * UnderlineSelect 컴포넌트
 *
 * 하단 underline만 있는 미니멀한 셀렉트 필드.
 * 드롭다운 메뉴로 옵션 선택.
 *
 * 동작 방식:
 * 1. 라벨: 필드 상단에 작은 텍스트로 표시
 * 2. 선택 영역: 하단 border만 있는 깔끔한 스타일
 * 3. 클릭 시 드롭다운 메뉴 열림
 * 4. 옵션 선택 시 onChange 호출
 *
 * Props:
 * @param {string} label - 필드 라벨 [Required]
 * @param {string} value - 현재 선택된 값 [Required]
 * @param {function} onChange - 변경 핸들러 (event) => void [Required]
 * @param {Array} options - 옵션 배열 [{ value, label, disabled? }] [Required]
 * @param {string} placeholder - 플레이스홀더 텍스트 [Optional]
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 * @param {string} size - 크기 'small' | 'medium' | 'large' [Optional, 기본값: 'medium']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <UnderlineSelect
 *   label="Glass Finish"
 *   value={finish}
 *   onChange={(e) => setFinish(e.target.value)}
 *   options={[
 *     { value: 'opaline', label: 'Opaline' },
 *     { value: 'clear', label: 'Clear Glass' },
 *   ]}
 * />
 */
const UnderlineSelect = forwardRef(function UnderlineSelect(
  {
    label,
    value,
    onChange,
    options = [],
    placeholder = '',
    isDisabled = false,
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
      menuItemSize: '0.8125rem',
      py: 0.375,
      menuPy: 1,
    },
    medium: {
      labelSize: '0.75rem',
      inputSize: '0.9375rem',
      menuItemSize: '0.9375rem',
      py: 0.5,
      menuPy: 1.25,
    },
    large: {
      labelSize: '0.75rem',
      inputSize: '0.9375rem',
      menuItemSize: '0.9375rem',
      py: 1.5,
      menuPy: 2,
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

      {/* 셀렉트 필드 */}
      <Select
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        displayEmpty={!!placeholder}
        IconComponent={KeyboardArrowDownIcon}
        variant="standard"
        disableUnderline
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: 0,
              boxShadow: '0 4px 20px rgba(18, 16, 14, 0.12)',
              mt: 1,
              '& .MuiMenuItem-root': {
                fontSize: currentSize.menuItemSize,
                py: currentSize.menuPy,
                px: 2,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                },
              },
            },
          },
        }}
        sx={{
          fontSize: currentSize.inputSize,
          fontWeight: 400,
          color: 'text.primary',
          py: currentSize.py,
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: 'border-color 200ms ease',
          '&:hover': {
            borderColor: 'text.secondary',
          },
          '&.Mui-focused': {
            borderColor: 'text.primary',
          },
          '&.Mui-disabled': {
            color: 'text.disabled',
          },
          '& .MuiSelect-select': {
            padding: 0,
            paddingRight: '24px !important',
            minHeight: 'auto',
            '&:focus': {
              backgroundColor: 'transparent',
            },
          },
          '& .MuiSelect-icon': {
            color: 'text.secondary',
            right: 0,
            transition: 'transform 200ms ease',
          },
          '& .MuiSelect-iconOpen': {
            transform: 'rotate(180deg)',
          },
        }}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <Typography sx={{ opacity: 0.6, fontStyle: 'italic' }}>
              {placeholder}
            </Typography>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
});

export default UnderlineSelect;
