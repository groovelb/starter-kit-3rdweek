import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

/**
 * CategoryTab 컴포넌트
 *
 * 카테고리 필터링을 위한 탭 메뉴.
 *
 * Props:
 * @param {Array} categories - 카테고리 목록 [{ id, label }] [Required]
 * @param {string} selected - 현재 선택된 카테고리 ID [Required]
 * @param {function} onChange - 변경 핸들러 (id) => void [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 */
export function CategoryTab({ categories = [], selected, onChange, sx }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, ...sx }}>
      <Tabs
        value={selected}
        onChange={(e, newValue) => onChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="category tabs"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            minWidth: 'auto',
            mr: 2,
          },
        }}
      >
        {categories.map((cat) => (
          <Tab key={cat.id} label={cat.label} value={cat.id} />
        ))}
      </Tabs>
    </Box>
  );
}

