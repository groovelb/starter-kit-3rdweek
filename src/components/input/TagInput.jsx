import { useState, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

/**
 * TagInput 컴포넌트
 *
 * 태그를 입력하고 Chip으로 변환하는 입력 필드.
 * 키워드 관리 및 필터링에 사용되는 핵심 컴포넌트.
 *
 * 동작 방식:
 * 1. 텍스트 입력 후 Enter 또는 쉼표로 태그 추가
 * 2. 추가된 태그는 Chip 형태로 표시
 * 3. Chip의 X 버튼 또는 Backspace로 태그 삭제
 * 4. 중복 태그 자동 필터링
 *
 * Props:
 * @param {string[]} tags - 현재 태그 목록 [Required]
 * @param {function} onChange - 태그 변경 핸들러 (tags[]) => void [Required]
 * @param {string} placeholder - 입력 플레이스홀더 [Optional, 기본값: 'Add tags...']
 * @param {number} maxTags - 최대 태그 개수 [Optional, 기본값: 10]
 * @param {string[]} suggestions - 자동완성 제안 목록 [Optional]
 * @param {string} variant - 스타일 변형 ('outlined' | 'filled') [Optional, 기본값: 'outlined']
 * @param {string} size - 크기 ('sm' | 'md') [Optional, 기본값: 'md']
 * @param {string} chipColor - 칩 색상 테마 [Optional, 기본값: 'default']
 * @param {string} label - 필드 레이블 [Optional]
 * @param {boolean} isDisabled - 비활성화 상태 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <TagInput
 *   tags={selectedTags}
 *   onChange={setSelectedTags}
 *   placeholder="Add style keywords..."
 *   maxTags={5}
 * />
 */
export function TagInput({
  tags = [],
  onChange,
  placeholder = 'Add tags...',
  maxTags = 10,
  suggestions = [],
  variant = 'outlined',
  size = 'md',
  chipColor = 'default',
  label,
  isDisabled = false,
  sx,
}) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  /**
   * 크기별 스타일
   */
  const sizeStyles = {
    sm: { minHeight: 36, chipSize: 'small', fontSize: 13, gap: 0.5, px: 1 },
    md: { minHeight: 44, chipSize: 'medium', fontSize: 14, gap: 1, px: 1.5 },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  /**
   * 태그 추가
   */
  const addTag = useCallback(
    (tagText) => {
      const trimmed = tagText.trim().toLowerCase();
      if (!trimmed) return;
      if (tags.length >= maxTags) return;
      if (tags.includes(trimmed)) return;

      onChange([...tags, trimmed]);
      setInputValue('');
      setShowSuggestions(false);
    },
    [tags, maxTags, onChange]
  );

  /**
   * 태그 삭제
   */
  const removeTag = useCallback(
    (tagToRemove) => {
      onChange(tags.filter((tag) => tag !== tagToRemove));
    },
    [tags, onChange]
  );

  /**
   * 키보드 이벤트 핸들러
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        removeTag(tags[tags.length - 1]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        inputRef.current?.blur();
      }
    },
    [inputValue, tags, addTag, removeTag]
  );

  /**
   * 입력 변경 핸들러
   */
  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      // 쉼표가 포함되면 태그로 추가
      if (value.includes(',')) {
        const parts = value.split(',');
        parts.forEach((part) => addTag(part));
      } else {
        setInputValue(value);
        setShowSuggestions(value.length > 0 && suggestions.length > 0);
      }
    },
    [addTag, suggestions]
  );

  /**
   * 컨테이너 클릭 시 입력 포커스
   */
  const handleContainerClick = useCallback(() => {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  }, [isDisabled]);

  /**
   * 필터링된 제안 목록
   */
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion.toLowerCase())
  );

  /**
   * 컨테이너 스타일
   */
  const getContainerStyles = () => {
    const base = {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: currentSize.gap,
      minHeight: currentSize.minHeight,
      px: currentSize.px,
      py: 1,
      borderRadius: 1,
      cursor: isDisabled ? 'not-allowed' : 'text',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'all 0.2s ease',
    };

    if (variant === 'filled') {
      return {
        ...base,
        backgroundColor: isFocused ? 'action.selected' : 'action.hover',
        border: '2px solid transparent',
      };
    }

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
  };

  return (
    <Box sx={sx}>
      {/* 레이블 */}
      {label && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mb: 0.5,
            fontWeight: 600,
            color: 'text.secondary',
          }}
        >
          {label}
        </Typography>
      )}

      {/* 태그 입력 컨테이너 */}
      <Box
        onClick={handleContainerClick}
        sx={getContainerStyles()}
      >
        {/* 태그 Chip 목록 */}
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={`#${tag}`}
            size={currentSize.chipSize}
            color={chipColor}
            onDelete={isDisabled ? undefined : () => removeTag(tag)}
            sx={{
              fontWeight: 500,
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        ))}

        {/* 입력 필드 */}
        {tags.length < maxTags && (
          <InputBase
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(inputValue.length > 0 && suggestions.length > 0);
            }}
            onBlur={() => {
              setIsFocused(false);
              // 딜레이를 두어 제안 클릭이 가능하도록
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={isDisabled}
            sx={{
              flex: 1,
              minWidth: 80,
              fontSize: currentSize.fontSize,
              '& .MuiInputBase-input': {
                p: 0,
                '&::placeholder': {
                  color: 'text.disabled',
                  opacity: 1,
                },
              },
            }}
          />
        )}
      </Box>

      {/* 자동완성 제안 */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <Box
          sx={{
            mt: 0.5,
            p: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            boxShadow: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Suggestions
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {filteredSuggestions.slice(0, 8).map((suggestion) => (
              <Chip
                key={suggestion}
                label={suggestion}
                size="small"
                variant="outlined"
                onClick={() => addTag(suggestion)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* 태그 개수 카운터 */}
      {maxTags && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            textAlign: 'right',
            color: tags.length >= maxTags ? 'warning.main' : 'text.disabled',
          }}
        >
          {tags.length} / {maxTags}
        </Typography>
      )}
    </Box>
  );
}
