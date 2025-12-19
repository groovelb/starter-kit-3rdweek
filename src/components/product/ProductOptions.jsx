import { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import UnderlineSelect from '../shared/UnderlineSelect';

/**
 * 기본 제품 옵션 데이터
 */
export const DEFAULT_PRODUCT_OPTIONS = {
  glassFinish: [
    { value: 'opaline', label: 'Opaline' },
    { value: 'clear', label: 'Clear Glass' },
    { value: 'frosted', label: 'Frosted Glass' },
    { value: 'amber', label: 'Amber Glass' },
    { value: 'smoke', label: 'Smoke Glass' },
  ],
  hardware: [
    { value: 'patina-brass', label: 'Patina Brass' },
    { value: 'brass', label: 'Brass' },
    { value: 'chrome', label: 'Chrome' },
    { value: 'matte-black', label: 'Matte Black' },
    { value: 'nickel', label: 'Brushed Nickel' },
  ],
  height: [
    { value: '61-72', label: '61-72 inches' },
    { value: '48-60', label: '48-60 inches' },
    { value: '36-48', label: '36-48 inches' },
    { value: '24-36', label: '24-36 inches' },
  ],
};

/**
 * ProductOptions 컴포넌트
 *
 * 제품 옵션 선택 영역. Glass Finish, Hardware, OAH 등 드롭다운 그룹.
 * UnderlineSelect를 사용한 미니멀한 옵션 선택 UI.
 *
 * 동작 방식:
 * 1. 각 옵션별 UnderlineSelect 드롭다운 렌더링
 * 2. 사용자가 옵션 선택 시 onChange 호출
 * 3. 선택된 값이 필드에 표시됨
 *
 * Props:
 * @param {object} values - 현재 선택된 옵션 값 { glassFinish, hardware, height } [Required]
 * @param {function} onChange - 옵션 변경 핸들러 (optionKey, value) => void [Required]
 * @param {object} availableOptions - 사용 가능한 옵션 목록 [Optional, DEFAULT_PRODUCT_OPTIONS 사용]
 * @param {number} spacing - 필드 간 간격 [Optional, 기본값: 2.5]
 * @param {string} size - Select 크기 'small' | 'medium' | 'large' [Optional, 기본값: 'medium']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductOptions
 *   values={{ glassFinish: 'opaline', hardware: 'brass', height: '61-72' }}
 *   onChange={(key, value) => setOptions({ ...options, [key]: value })}
 * />
 */
const ProductOptions = forwardRef(function ProductOptions(
  {
    values = {},
    onChange,
    availableOptions = DEFAULT_PRODUCT_OPTIONS,
    spacing = 2.5,
    size = 'medium',
    sx = {},
    ...props
  },
  ref
) {
  /**
   * 옵션 변경 핸들러
   */
  const handleOptionChange = (optionKey) => (event) => {
    if (onChange) {
      onChange(optionKey, event.target.value);
    }
  };

  return (
    <Stack
      ref={ref}
      spacing={spacing}
      sx={sx}
      {...props}
    >
      {/* Glass Finish */}
      {availableOptions.glassFinish && (
        <UnderlineSelect
          label="Glass Finish"
          value={values.glassFinish || ''}
          onChange={handleOptionChange('glassFinish')}
          options={availableOptions.glassFinish}
          size={size}
        />
      )}

      {/* Hardware */}
      {availableOptions.hardware && (
        <UnderlineSelect
          label="Hardware"
          value={values.hardware || ''}
          onChange={handleOptionChange('hardware')}
          options={availableOptions.hardware}
          size={size}
        />
      )}

      {/* OAH (Overall Height) */}
      {availableOptions.height && (
        <UnderlineSelect
          label="OAH (Overall Height)"
          value={values.height || ''}
          onChange={handleOptionChange('height')}
          options={availableOptions.height}
          size={size}
        />
      )}
    </Stack>
  );
});

export default ProductOptions;
