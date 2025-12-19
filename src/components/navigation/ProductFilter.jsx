import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { PRODUCT_TYPES } from '../../data/products';

/**
 * ProductFilter 컴포넌트
 *
 * 제품 타입별 필터링을 위한 세로 탭 메뉴.
 *
 * Props:
 * @param {string} selected - 현재 선택된 타입 (PRODUCT_TYPES 값 또는 'all') [Optional, 기본값: 'all']
 * @param {function} onChange - 변경 핸들러 (type) => void [Required]
 * @param {boolean} showAll - 'All' 탭 표시 여부 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductFilter selected="ceiling" onChange={handleFilter} />
 */
export function ProductFilter({ selected = 'all', onChange, showAll = true, sx }) {
  // 필터 옵션 정의
  const filterOptions = [
    ...(showAll ? [{ id: 'all', label: 'All' }] : []),
    { id: PRODUCT_TYPES.CEILING, label: 'Ceiling' },
    { id: PRODUCT_TYPES.STAND, label: 'Stand' },
    { id: PRODUCT_TYPES.WALL, label: 'Wall' },
    { id: PRODUCT_TYPES.DESK, label: 'Desk' },
  ];

  return (
    <Box sx={sx}>
      <Tabs
        orientation="vertical"
        value={selected}
        onChange={(e, newValue) => onChange(newValue)}
        aria-label="product type filter"
        sx={{
          '& .MuiTabs-indicator': {
            left: 0,
            right: 'auto',
            height: '25%',
            top: '37.5%',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 60,
            minHeight: 32,
            alignItems: 'flex-start',
            pl: 2,
            pr: 1,
            py: 0.75,
            fontSize: '0.8125rem',
          },
          '& .Mui-selected': {
            fontWeight: 600,
          },
        }}
      >
        {filterOptions.map((option) => (
          <Tab key={option.id} label={option.label} value={option.id} />
        ))}
      </Tabs>
    </Box>
  );
}

export default ProductFilter;
