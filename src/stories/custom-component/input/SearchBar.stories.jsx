import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SearchBar } from '../../../components/input/SearchBar';

export default {
  title: 'Custom Component/Input/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## SearchBar

키워드 검색 입력 필드 컴포넌트.

### 기능
- outlined, filled, minimal 변형 지원
- 필터 토글 버튼 옵션
- 전체 너비 모드 지원
        `,
      },
    },
  },
};

/**
 * SearchBar 기본 사용 예시
 */
export const Default = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Box sx={{ maxWidth: 400 }}>
        <SearchBar
          value={value}
          onChange={setValue}
          placeholder="Search references..."
          onSearch={(v) => console.log('Search:', v)}
        />
      </Box>
    );
  },
};

/**
 * SearchBar 변형 비교
 */
export const Variants = {
  render: () => {
    const [values, setValues] = useState({ outlined: '', filled: '', minimal: '' });

    const handleChange = (variant, value) => {
      setValues((prev) => ({ ...prev, [variant]: value }));
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Outlined (Default)
          </Typography>
          <SearchBar
            value={values.outlined}
            onChange={(v) => handleChange('outlined', v)}
            variant="outlined"
            placeholder="Outlined variant..."
          />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Filled
          </Typography>
          <SearchBar
            value={values.filled}
            onChange={(v) => handleChange('filled', v)}
            variant="filled"
            placeholder="Filled variant..."
          />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Minimal
          </Typography>
          <SearchBar
            value={values.minimal}
            onChange={(v) => handleChange('minimal', v)}
            variant="minimal"
            placeholder="Minimal variant..."
          />
        </Box>
      </Box>
    );
  },
};

/**
 * SearchBar with Filter
 */
export const WithFilter = {
  render: () => {
    const [value, setValue] = useState('');
    const [filterActive, setFilterActive] = useState(false);

    return (
      <Box sx={{ maxWidth: 500 }}>
        <SearchBar
          value={value}
          onChange={setValue}
          placeholder="Search with filter..."
          hasFilter
          isFilterActive={filterActive}
          onFilterToggle={() => setFilterActive(!filterActive)}
          isFullWidth
        />
        {filterActive && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: '1px dashed',
              borderColor: 'primary.main',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Filter panel is active
            </Typography>
          </Box>
        )}
      </Box>
    );
  },
};
