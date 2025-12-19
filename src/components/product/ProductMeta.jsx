import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import UnderlineInput from '../shared/UnderlineInput';

/**
 * ProductMeta 컴포넌트
 *
 * 제품 메타 정보 표시. Item Number, Lead Time, Est. Ship Date 등.
 * UnderlineInput readOnly를 사용한 미니멀한 정보 표시.
 *
 * 동작 방식:
 * 1. 라벨-값 쌍으로 메타 정보 표시
 * 2. UnderlineInput readOnly 스타일 적용
 * 3. 구분선으로 상단과 분리 (옵션)
 *
 * Props:
 * @param {string} itemNumber - 제품 번호 (예: FA-100318) [Optional]
 * @param {string} leadTime - 리드 타임 (예: 12 Weeks) [Optional]
 * @param {string} shipDate - 예상 배송일 (예: March 5, 2026) [Optional]
 * @param {boolean} showDivider - 상단 구분선 표시 여부 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductMeta
 *   itemNumber="FA-100318"
 *   leadTime="12 Weeks"
 *   shipDate="March 5, 2026"
 * />
 */
const ProductMeta = forwardRef(function ProductMeta(
  {
    itemNumber,
    leadTime,
    shipDate,
    showDivider = true,
    sx = {},
    ...props
  },
  ref
) {
  // 표시할 메타 정보가 없으면 렌더링하지 않음
  if (!itemNumber && !leadTime && !shipDate) {
    return null;
  }

  return (
    <Box
      ref={ref}
      sx={{
        ...sx,
      }}
      {...props}
    >
      {showDivider && (
        <Divider sx={{ mb: 3 }} />
      )}

      {/* 메타 정보 필드들 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        {/* Item Number */}
        {itemNumber && (
          <UnderlineInput
            label="Item Number"
            value={itemNumber}
            isReadOnly
          />
        )}

        {/* Lead Time */}
        {leadTime && (
          <UnderlineInput
            label="Lead Time"
            value={leadTime}
            isReadOnly
          />
        )}

        {/* Est. Ship Date */}
        {shipDate && (
          <UnderlineInput
            label="Est. Ship Date"
            value={shipDate}
            isReadOnly
          />
        )}
      </Box>
    </Box>
  );
});

export default ProductMeta;
