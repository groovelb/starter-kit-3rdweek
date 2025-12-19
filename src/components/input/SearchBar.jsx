import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';

/**
 * SearchBar 컴포넌트
 *
 * 키워드 검색을 위한 세련된 검색 입력 필드.
 * 실시간 검색, 클리어 버튼, 필터 토글 기능을 제공한다.
 *
 * 동작 방식:
 * 1. 사용자가 텍스트를 입력하면 onChange 콜백 호출
 * 2. 입력값이 있으면 클리어(X) 버튼 표시
 * 3. Enter 키 또는 검색 아이콘 클릭 시 onSearch 콜백 호출
 * 4. 필터 아이콘 클릭 시 onFilterToggle 콜백 호출
 *
 * Props:
 * @param {string} value - 현재 검색어 값 [Optional, 기본값: '']
 * @param {string} placeholder - 플레이스홀더 텍스트 [Optional, 기본값: 'Search...']
 * @param {function} onChange - 입력 변경 핸들러 (value) => void [Optional]
 * @param {function} onSearch - 검색 실행 핸들러 (value) => void [Optional]
 * @param {function} onClear - 클리어 버튼 클릭 핸들러 [Optional]
 * @param {boolean} hasFilter - 필터 버튼 표시 여부 [Optional, 기본값: false]
 * @param {boolean} isFilterActive - 필터 활성화 상태 [Optional, 기본값: false]
 * @param {function} onFilterToggle - 필터 토글 핸들러 [Optional]
 * @param {string} variant - 스타일 변형 ('outlined' | 'filled' | 'minimal') [Optional, 기본값: 'outlined']
 * @param {string} size - 크기 ('sm' | 'md' | 'lg') [Optional, 기본값: 'md']
 * @param {boolean} isFullWidth - 전체 너비 사용 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SearchBar
 *   value={searchTerm}
 *   placeholder="Search references..."
 *   onChange={setSearchTerm}
 *   onSearch={handleSearch}
 *   hasFilter
 * />
 */
export function SearchBar({
  value = '',
  placeholder = 'Search...',
  onChange,
  onSearch,
  onClear,
  hasFilter = false,
  isFilterActive = false,
  onFilterToggle,
  variant = 'outlined',
  size = 'md',
  isFullWidth = false,
  sx,
}) {
  const [isFocused, setIsFocused] = useState(false);

  /**
   * 크기별 스타일 매핑
   */
  const sizeStyles = {
    sm: { height: 36, fontSize: 13, px: 1.5, iconSize: 'small' },
    md: { height: 44, fontSize: 14, px: 2, iconSize: 'medium' },
    lg: { height: 52, fontSize: 15, px: 2.5, iconSize: 'medium' },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  /**
   * 변형별 컨테이너 스타일
   */
  const getVariantStyles = () => {
    const base = {
      display: 'flex',
      alignItems: 'center',
      height: currentSize.height,
      borderRadius: 2,
      transition: 'all 0.2s ease',
    };

    switch (variant) {
      case 'filled':
        return {
          ...base,
          backgroundColor: isFocused ? 'action.selected' : 'action.hover',
          border: '2px solid transparent',
          '&:hover': {
            backgroundColor: 'action.selected',
          },
        };

      case 'minimal':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderBottom: '2px solid',
          borderColor: isFocused ? 'primary.main' : 'divider',
          borderRadius: 0,
          '&:hover': {
            borderColor: 'text.secondary',
          },
        };

      case 'outlined':
      default:
        return {
          ...base,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: isFocused ? 'primary.main' : 'divider',
          boxShadow: isFocused ? '0 0 0 3px rgba(0, 0, 255, 0.1)' : 'none',
          '&:hover': {
            borderColor: isFocused ? 'primary.main' : 'text.secondary',
          },
        };
    }
  };

  /**
   * 키보드 이벤트 핸들러
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(value);
      }
      if (e.key === 'Escape') {
        e.target.blur();
      }
    },
    [onSearch, value]
  );

  /**
   * 클리어 버튼 핸들러
   */
  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
  }, [onClear, onChange]);

  /**
   * 검색 버튼 핸들러
   */
  const handleSearchClick = useCallback(() => {
    if (onSearch) {
      onSearch(value);
    }
  }, [onSearch, value]);

  return (
    <Box
      sx={{
        width: isFullWidth ? '100%' : 'auto',
        minWidth: isFullWidth ? 'auto' : 280,
        ...getVariantStyles(),
        ...sx,
      }}
    >
      {/* 검색 아이콘 */}
      <IconButton
        size={currentSize.iconSize}
        onClick={handleSearchClick}
        sx={{
          ml: 0.5,
          color: isFocused ? 'primary.main' : 'text.secondary',
        }}
        aria-label="search"
      >
        <SearchIcon fontSize={currentSize.iconSize} />
      </IconButton>

      {/* 검색 입력 필드 */}
      <InputBase
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        sx={{
          flex: 1,
          fontSize: currentSize.fontSize,
          '& .MuiInputBase-input': {
            py: 1,
            '&::placeholder': {
              color: 'text.disabled',
              opacity: 1,
            },
          },
        }}
        inputProps={{
          'aria-label': placeholder,
        }}
      />

      {/* 클리어 버튼 (값이 있을 때만 표시) */}
      {value && (
        <IconButton
          size={currentSize.iconSize}
          onClick={handleClear}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
            },
          }}
          aria-label="clear search"
        >
          <ClearIcon fontSize={currentSize.iconSize} />
        </IconButton>
      )}

      {/* 필터 버튼 (hasFilter가 true일 때만 표시) */}
      {hasFilter && (
        <IconButton
          size={currentSize.iconSize}
          onClick={onFilterToggle}
          sx={{
            mr: 0.5,
            color: isFilterActive ? 'primary.main' : 'text.secondary',
            backgroundColor: isFilterActive ? 'primary.lighter' : 'transparent',
            '&:hover': {
              backgroundColor: isFilterActive ? 'primary.light' : 'action.hover',
            },
          }}
          aria-label="toggle filter"
          aria-pressed={isFilterActive}
        >
          <TuneIcon fontSize={currentSize.iconSize} />
        </IconButton>
      )}
    </Box>
  );
}
