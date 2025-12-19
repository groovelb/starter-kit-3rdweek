import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * NavMenu 컴포넌트
 *
 * 헤더, 사이드바, 드로어에서 사용되는 네비게이션 메뉴 컴포넌트.
 * 아이콘과 텍스트 조합을 지원하며 다양한 레이아웃에 적응한다.
 *
 * 동작 방식:
 * 1. items 배열로 메뉴 아이템 정의
 * 2. orientation에 따라 가로/세로 배치
 * 3. activeId로 현재 활성 메뉴 표시
 * 4. onItemClick으로 메뉴 선택 처리
 *
 * Props:
 * @param {Array} items - 메뉴 아이템 배열 [{ id, label, icon, href, disabled }] [Required]
 * @param {string} activeId - 현재 활성 아이템 ID [Optional]
 * @param {string} orientation - 배치 방향 ('horizontal' | 'vertical') [Optional, 기본값: 'horizontal']
 * @param {string} variant - 스타일 변형 ('default' | 'pills' | 'underline') [Optional, 기본값: 'default']
 * @param {string} size - 크기 ('sm' | 'md' | 'lg') [Optional, 기본값: 'md']
 * @param {boolean} isIconOnly - 아이콘만 표시 [Optional, 기본값: false]
 * @param {boolean} hasIconStart - 아이콘을 텍스트 앞에 배치 [Optional, 기본값: true]
 * @param {function} onItemClick - 아이템 클릭 핸들러 (item) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <NavMenu
 *   items={[
 *     { id: 'home', label: 'Home', icon: <HomeIcon /> },
 *     { id: 'about', label: 'About', icon: <InfoIcon /> },
 *   ]}
 *   activeId="home"
 *   onItemClick={(item) => navigate(item.href)}
 * />
 */
const NavMenu = forwardRef(function NavMenu({
  items = [],
  activeId,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  isIconOnly = false,
  hasIconStart = true,
  onItemClick,
  sx,
  ...props
}, ref) {
  /**
   * 사이즈별 스타일 맵
   */
  const sizeMap = {
    sm: {
      padding: '6px 12px',
      fontSize: 13,
      iconSize: 18,
      gap: 0.75,
    },
    md: {
      padding: '8px 16px',
      fontSize: 14,
      iconSize: 20,
      gap: 1,
    },
    lg: {
      padding: '12px 20px',
      fontSize: 15,
      iconSize: 22,
      gap: 1.25,
    },
  };

  const sizeStyle = sizeMap[size] || sizeMap.md;
  const isVertical = orientation === 'vertical';

  /**
   * 컨테이너 스타일
   */
  const getContainerStyles = () => ({
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: isVertical ? 'stretch' : 'center',
    gap: isVertical ? 0.5 : 1,
  });

  /**
   * 아이템 기본 스타일
   */
  const getItemBaseStyles = (isActive, isDisabled) => {
    const base = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isIconOnly ? 'center' : 'flex-start',
      gap: sizeStyle.gap,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontWeight: isActive ? 600 : 400,
      textDecoration: 'none',
      borderRadius: variant === 'pills' ? 99 : 1,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      whiteSpace: 'nowrap',
      userSelect: 'none',
    };

    return base;
  };

  /**
   * variant별 스타일
   */
  const getVariantStyles = (isActive) => {
    switch (variant) {
      case 'pills':
        return {
          backgroundColor: isActive ? 'primary.main' : 'transparent',
          color: isActive ? 'primary.contrastText' : 'text.primary',
          '&:hover': {
            backgroundColor: isActive ? 'primary.dark' : 'action.hover',
          },
        };

      case 'underline':
        return {
          backgroundColor: 'transparent',
          color: isActive ? 'primary.main' : 'text.secondary',
          borderBottom: '2px solid',
          borderColor: isActive ? 'primary.main' : 'transparent',
          borderRadius: 0,
          '&:hover': {
            color: 'primary.main',
            borderColor: isActive ? 'primary.main' : 'grey.300',
          },
        };

      case 'default':
      default:
        return {
          backgroundColor: isActive ? 'action.selected' : 'transparent',
          color: isActive ? 'primary.main' : 'text.primary',
          '&:hover': {
            backgroundColor: isActive ? 'action.selected' : 'action.hover',
          },
        };
    }
  };

  /**
   * 아이템 클릭 핸들러
   */
  const handleItemClick = (item) => {
    if (item.disabled) return;
    onItemClick?.(item);
  };

  if (items.length === 0) return null;

  return (
    <Box
      ref={ref}
      component="nav"
      role="navigation"
      sx={{
        ...getContainerStyles(),
        ...sx,
      }}
      {...props}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        const isDisabled = item.disabled || false;

        return (
          <Box
            key={item.id}
            component={item.href ? 'a' : 'button'}
            href={item.href}
            onClick={() => handleItemClick(item)}
            role="menuitem"
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={isDisabled}
            sx={{
              ...getItemBaseStyles(isActive, isDisabled),
              ...getVariantStyles(isActive),
              // Reset button styles
              border: 'none',
              background: 'none',
              font: 'inherit',
            }}
          >
            {/* Icon (start) */}
            {item.icon && hasIconStart && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: sizeStyle.iconSize,
                  height: sizeStyle.iconSize,
                  '& > svg': {
                    width: '100%',
                    height: '100%',
                  },
                }}
              >
                {item.icon}
              </Box>
            )}

            {/* Label */}
            {!isIconOnly && (
              <Typography
                component="span"
                sx={{
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </Typography>
            )}

            {/* Icon (end) */}
            {item.icon && !hasIconStart && !isIconOnly && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: sizeStyle.iconSize,
                  height: sizeStyle.iconSize,
                  '& > svg': {
                    width: '100%',
                    height: '100%',
                  },
                }}
              >
                {item.icon}
              </Box>
            )}

            {/* Icon only mode */}
            {item.icon && isIconOnly && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: sizeStyle.iconSize,
                  height: sizeStyle.iconSize,
                  '& > svg': {
                    width: '100%',
                    height: '100%',
                  },
                }}
              >
                {item.icon}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
});

export { NavMenu };
