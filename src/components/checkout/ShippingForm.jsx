import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UnderlineInput from '../shared/UnderlineInput';
import UnderlineSelect from '../shared/UnderlineSelect';

/**
 * ShippingForm 컴포넌트
 *
 * 배송지 입력 폼. 국가, 이름, 회사, 주소, 도시, 우편번호, 전화번호.
 * UnderlineInput, UnderlineSelect 사용.
 *
 * Props:
 * @param {object} values - 폼 값 객체 [Optional]
 *   - { country, firstName, lastName, company, address, apartment, city, zipCode, phone }
 * @param {function} onChange - 값 변경 핸들러 (field, value) => void [Optional]
 * @param {Array} countries - 국가 목록 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ShippingForm
 *   values={shippingValues}
 *   onChange={(field, value) => setShippingValues({...values, [field]: value})}
 * />
 */

const DEFAULT_COUNTRIES = [
  { value: 'KR', label: '대한민국' },
  { value: 'US', label: '미국' },
  { value: 'CA', label: '캐나다' },
  { value: 'GB', label: '영국' },
  { value: 'AU', label: '호주' },
];

const ShippingForm = forwardRef(function ShippingForm(
  {
    values = {},
    onChange,
    countries = DEFAULT_COUNTRIES,
    sx = {},
    ...props
  },
  ref
) {
  const handleInputChange = (field) => (e) => {
    onChange?.(field, e.target.value);
  };

  const handleSelectChange = (field) => (e) => {
    onChange?.(field, e.target.value);
  };

  return (
    <Box ref={ref} sx={{ ...sx }} {...props}>
      {/* 헤더 */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        배송지
      </Typography>

      {/* 국가/지역 */}
      <UnderlineSelect
        label="국가/지역"
        value={values.country || 'KR'}
        onChange={handleSelectChange('country')}
        options={countries}
        sx={{ mb: 3 }}
      />

      {/* 이름 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <UnderlineInput
          label="성"
          value={values.lastName || ''}
          onChange={handleInputChange('lastName')}
          sx={{ flex: 1 }}
        />
        <UnderlineInput
          label="이름"
          value={values.firstName || ''}
          onChange={handleInputChange('firstName')}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* 회사 */}
      <UnderlineInput
        label="회사 (선택사항)"
        value={values.company || ''}
        onChange={handleInputChange('company')}
        sx={{ mb: 3 }}
      />

      {/* 주소 */}
      <UnderlineInput
        label="주소"
        value={values.address || ''}
        onChange={handleInputChange('address')}
        sx={{ mb: 3 }}
      />

      {/* 상세주소 */}
      <UnderlineInput
        label="상세주소 (선택사항)"
        value={values.apartment || ''}
        onChange={handleInputChange('apartment')}
        sx={{ mb: 3 }}
      />

      {/* 도시 / 우편번호 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <UnderlineInput
          label="도시"
          value={values.city || ''}
          onChange={handleInputChange('city')}
          sx={{ flex: 2 }}
        />
        <UnderlineInput
          label="우편번호"
          value={values.zipCode || ''}
          onChange={handleInputChange('zipCode')}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* 전화번호 */}
      <UnderlineInput
        label="전화번호"
        value={values.phone || ''}
        onChange={handleInputChange('phone')}
      />
    </Box>
  );
});

export { ShippingForm };
export default ShippingForm;
