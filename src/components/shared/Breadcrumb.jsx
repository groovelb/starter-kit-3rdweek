import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

/**
 * Breadcrumb 컴포넌트
 *
 * 네비게이션 경로 표시. Lighting > Chandeliers 형태.
 * 레퍼런스 이미지의 심플한 밑줄 링크 스타일 적용.
 *
 * 동작 방식:
 * 1. items 배열의 각 항목을 순서대로 렌더링
 * 2. 마지막 항목은 현재 페이지로 링크 없이 표시
 * 3. 구분자(separator)로 항목 구분
 *
 * Props:
 * @param {Array} items - 경로 배열 [{ label, href?, onClick? }] [Required]
 * @param {string} separator - 구분자 [Optional, 기본값: ' ']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <Breadcrumb
 *   items={[
 *     { label: 'Lighting', href: '/lighting' },
 *     { label: 'Chandeliers', href: '/chandeliers' },
 *     { label: 'Flora Chandelier' }
 *   ]}
 * />
 */
const Breadcrumb = forwardRef(function Breadcrumb(
  {
    items = [],
    separator = ' ',
    sx = {},
    ...props
  },
  ref
) {
  if (!items.length) return null;

  return (
    <Box
      ref={ref}
      component="nav"
      aria-label="breadcrumb"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 0.5,
        ...sx,
      }}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isClickable = !isLast && (item.href || item.onClick);

        return (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {isClickable ? (
              <Link
                href={item.href}
                onClick={item.onClick}
                underline="always"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  textDecorationColor: 'inherit',
                  cursor: 'pointer',
                  transition: 'color 200ms',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                {item.label}
              </Link>
            ) : (
              <Typography
                component="span"
                sx={{
                  color: isLast ? 'text.primary' : 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: isLast ? 500 : 400,
                }}
              >
                {item.label}
              </Typography>
            )}

            {/* 구분자 */}
            {!isLast && (
              <Typography
                component="span"
                sx={{
                  color: 'text.disabled',
                  fontSize: '0.875rem',
                  mx: 0.5,
                  userSelect: 'none',
                }}
              >
                {separator}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
});

export default Breadcrumb;
