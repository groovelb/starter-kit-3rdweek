import { forwardRef } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * SelectField 컴포넌트
 *
 * 드롭다운 선택 필드. 라벨 + 선택값 + 화살표 형태.
 * 레퍼런스 이미지의 Glass Finish, Hardware, OAH 드롭다운 스타일 적용.
 *
 * 동작 방식:
 * 1. 사용자가 필드 클릭 → 드롭다운 메뉴 열림
 * 2. 옵션 선택 → onChange 호출, 메뉴 닫힘
 * 3. 선택된 값이 필드에 표시됨
 *
 * Props:
 * @param {string} label - 필드 라벨 [Required]
 * @param {string} value - 현재 선택된 값 [Required]
 * @param {function} onChange - 변경 핸들러 (event) => void [Required]
 * @param {Array} options - 옵션 배열 [{ value, label, disabled? }] [Required]
 * @param {string} placeholder - 플레이스홀더 텍스트 [Optional]
 * @param {string} size - 크기 'small' | 'medium' [Optional, 기본값: 'medium']
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 * @param {boolean} isRequired - 필수 필드 여부 [Optional, 기본값: false]
 * @param {string} helperText - 도움말 텍스트 [Optional]
 * @param {boolean} hasError - 에러 상태 [Optional, 기본값: false]
 * @param {boolean} isFullWidth - 전체 너비 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SelectField
 *   label="Glass Finish"
 *   value={finish}
 *   onChange={(e) => setFinish(e.target.value)}
 *   options={[{ value: 'clear', label: 'Clear Glass' }]}
 * />
 */
const SelectField = forwardRef(function SelectField(
  {
    label,
    value,
    onChange,
    options = [],
    placeholder = '',
    size = 'medium',
    isDisabled = false,
    isRequired = false,
    helperText = '',
    hasError = false,
    isFullWidth = true,
    sx = {},
    ...props
  },
  ref
) {
  // 라벨 ID 생성
  const labelId = `select-label-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <FormControl
      ref={ref}
      fullWidth={isFullWidth}
      size={size}
      error={hasError}
      disabled={isDisabled}
      required={isRequired}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'divider',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'text.secondary',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'secondary.main',
          borderWidth: 1,
        },
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'text.primary',
        },
        ...sx,
      }}
      {...props}
    >
      {label && (
        <InputLabel id={labelId}>
          {label}
        </InputLabel>
      )}
      <Select
        labelId={labelId}
        value={value}
        onChange={onChange}
        label={label}
        displayEmpty={!!placeholder}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: 0,
              boxShadow: '0 0 16px rgba(18, 16, 14, 0.08)',
              '& .MuiMenuItem-root': {
                fontSize: size === 'small' ? '0.875rem' : '1rem',
                py: size === 'small' ? 1 : 1.5,
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
          '& .MuiSelect-icon': {
            color: 'text.secondary',
            transition: 'transform 200ms',
          },
          '& .MuiSelect-iconOpen': {
            transform: 'rotate(180deg)',
          },
        }}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <em style={{ opacity: 0.6 }}>{placeholder}</em>
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
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
});

export default SelectField;
