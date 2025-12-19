import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * ArrowLink 컴포넌트
 *
 * 화살표 아이콘 + 텍스트 형태의 링크.
 * 레퍼런스 이미지의 "→ Add Sidemark", "→ Download a Tear Sheet" 스타일.
 *
 * 동작 방식:
 * 1. 호버 시 화살표가 오른쪽으로 이동하는 마이크로 인터랙션
 * 2. 클릭 시 href로 이동 또는 onClick 실행
 *
 * Props:
 * @param {string} children - 링크 텍스트 [Required]
 * @param {string} href - 링크 URL [Optional]
 * @param {function} onClick - 클릭 핸들러 [Optional]
 * @param {string} target - 링크 타겟 (_blank 등) [Optional]
 * @param {string} size - 크기 'small' | 'medium' [Optional, 기본값: 'medium']
 * @param {string} color - 색상 'primary' | 'secondary' | 'inherit' [Optional, 기본값: 'inherit']
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ArrowLink href="/add-sidemark">Add Sidemark</ArrowLink>
 * <ArrowLink onClick={() => download()}>Download a Tear Sheet</ArrowLink>
 */
const ArrowLink = forwardRef(function ArrowLink(
  {
    children,
    href,
    onClick,
    target,
    size = 'medium',
    color = 'inherit',
    isDisabled = false,
    sx = {},
    ...props
  },
  ref
) {
  // 크기별 스타일
  const sizeConfig = {
    small: {
      fontSize: '0.8125rem',
      iconSize: 14,
      gap: 0.5,
    },
    medium: {
      fontSize: '0.875rem',
      iconSize: 16,
      gap: 0.75,
    },
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  // 색상 매핑
  const colorMap = {
    primary: 'text.primary',
    secondary: 'text.secondary',
    inherit: 'inherit',
  };

  const textColor = colorMap[color] || colorMap.inherit;

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      underline="none"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: config.gap,
        color: isDisabled ? 'text.disabled' : textColor,
        fontSize: config.fontSize,
        fontWeight: 400,
        cursor: isDisabled ? 'default' : 'pointer',
        pointerEvents: isDisabled ? 'none' : 'auto',
        transition: 'color 200ms',
        '&:hover': {
          color: isDisabled ? undefined : 'text.primary',
          '& .arrow-icon': {
            transform: 'translateX(4px)',
          },
        },
        ...sx,
      }}
      {...props}
    >
      <Box
        component="span"
        className="arrow-icon"
        sx={{
          display: 'flex',
          alignItems: 'center',
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <ArrowForwardIcon
          sx={{
            fontSize: config.iconSize,
          }}
        />
      </Box>
      <span>{children}</span>
    </Link>
  );
});

export default ArrowLink;
