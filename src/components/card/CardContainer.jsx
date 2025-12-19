import { forwardRef } from 'react';
import Card from '@mui/material/Card';
import { SPACING } from '../../styles/tokens';

/**
 * CardContainer 컴포넌트
 *
 * MUI Card를 확장한 래퍼 컴포넌트.
 * SPACING 시멘틱 토큰을 사용하여 일관된 패딩을 적용하고,
 * ghost/filled 등 추가 variant와 인터랙티브 상태를 지원합니다.
 *
 * 동작 방식:
 * 1. MUI Card를 base로 사용 (outlined, elevation 지원)
 * 2. ghost, filled는 커스텀 스타일로 구현
 * 3. SPACING.inset 토큰으로 패딩 적용
 * 4. isInteractive, isSelected로 상태 표현
 *
 * Props:
 * @param {string} variant - 카드 스타일 ('outlined' | 'elevation' | 'ghost' | 'filled') [Optional, 기본값: 'outlined']
 * @param {string} padding - 내부 패딩 ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl') [Optional, 기본값: 'md']
 * @param {number} elevation - 그림자 깊이, variant="elevation"일 때 적용 (0-24) [Optional, 기본값: 1]
 * @param {boolean} isInteractive - 호버 효과 활성화 [Optional, 기본값: false]
 * @param {function} onClick - 클릭 핸들러 [Optional]
 * @param {node} children - 카드 내용 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CardContainer variant="elevation" padding="lg" isInteractive>
 *   <Typography>Card Content</Typography>
 * </CardContainer>
 */
const CardContainer = forwardRef(function CardContainer({
  variant = 'outlined',
  padding = 'md',
  elevation = 1,
  isInteractive = false,
  onClick,
  children,
  sx,
  ...props
}, ref) {
  /**
   * MUI Card variant 결정
   * - outlined, elevation → MUI Card 기본 variant
   * - ghost, filled → elevation variant + 커스텀 스타일
   */
  const getCardVariant = () => {
    if (variant === 'outlined') return 'outlined';
    return 'elevation';
  };

  /**
   * MUI Card elevation 결정
   * - ghost, filled는 elevation 0
   */
  const getElevation = () => {
    if (variant === 'ghost' || variant === 'filled') return 0;
    if (variant === 'outlined') return 0;
    return elevation;
  };

  /**
   * variant별 커스텀 스타일 (ghost, filled용)
   */
  const getVariantStyles = () => {
    switch (variant) {
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
        };
      case 'filled':
        return {
          backgroundColor: 'grey.100',
          border: 'none',
          boxShadow: 'none',
        };
      default:
        return {};
    }
  };

  /**
   * 인터랙티브 스타일 (호버, 클릭)
   */
  const getInteractiveStyles = () => {
    if (!isInteractive && !onClick) return {};

    const hoverStyles = {
      outlined: {
        borderColor: 'primary.main',
        boxShadow: '0 0 0 1px rgba(0, 0, 255, 0.2)',
      },
      elevation: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
        transform: 'translateY(-2px)',
      },
      ghost: {
        backgroundColor: 'action.hover',
      },
      filled: {
        backgroundColor: 'grey.200',
      },
    };

    return {
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': hoverStyles[variant] || hoverStyles.outlined,
      '&:active': {
        transform: 'scale(0.98)',
      },
    };
  };

  return (
    <Card
      ref={ref}
      variant={getCardVariant()}
      elevation={getElevation()}
      onClick={onClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: SPACING.inset[padding] ?? SPACING.inset.md,
        ...getVariantStyles(),
        ...getInteractiveStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
});

export { CardContainer };
