import { Box, Typography } from '@mui/material';

/**
 * InlineObject 컴포넌트 (하위 컴포넌트)
 *
 * 텍스트 흐름 속에 이미지, 아이콘, 또는 다른 컴포넌트를 삽입하기 위한 래퍼.
 * 인라인 요소의 수직 정렬과 크기를 제어한다.
 *
 * Props:
 * @param {ReactNode} children - 삽입할 요소 (img, icon, component) [Required]
 * @param {number|string} size - 요소 크기 (em 단위 숫자 또는 CSS 값) [Optional, 기본값: 1]
 * @param {string} align - 수직 정렬 ('baseline' | 'middle' | 'top' | 'bottom') [Optional, 기본값: 'middle']
 * @param {boolean} rounded - 둥근 모서리 적용 [Optional, 기본값: false]
 * @param {boolean} hover - hover 효과 활성화 [Optional, 기본값: false]
 * @param {number} spacing - 좌우 간격 (em 단위) [Optional, 기본값: 0.2]
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <InlineObject size={1.2} rounded>
 *   <img src="avatar.jpg" alt="avatar" />
 * </InlineObject>
 */
export function InlineObject({
  children,
  size = 1,
  align = 'middle',
  rounded = false,
  hover = false,
  spacing = 0.2,
  sx,
  ...props
}) {
  // 정렬 매핑
  const alignMap = {
    baseline: 'baseline',
    middle: 'middle',
    top: 'text-top',
    bottom: 'text-bottom',
  };

  // 크기 처리 (숫자면 em 단위, 문자열이면 그대로 사용)
  const sizeValue = typeof size === 'number' ? `${size}em` : size;

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: alignMap[align],
        width: sizeValue,
        height: sizeValue,
        mx: `${spacing}em`,
        borderRadius: rounded ? '50%' : 0,
        overflow: 'hidden',
        transition: hover ? 'transform 0.2s ease-out, box-shadow 0.2s ease-out' : 'none',
        cursor: hover ? 'pointer' : 'inherit',
        '&:hover': hover ? {
          transform: 'scale(1.1) rotate(3deg)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        } : {},
        '& > img, & > svg': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

/**
 * InlineTypography 컴포넌트
 *
 * 텍스트 흐름 속에 이미지, 아이콘, 또는 다른 컴포넌트를 자연스럽게 삽입할 수 있는 컴포넌트.
 * Compound component 패턴으로 InlineObject와 함께 사용한다.
 *
 * 동작 방식:
 * 1. children으로 일반 텍스트와 InlineObject 컴포넌트를 조합하여 전달
 * 2. 텍스트와 인라인 요소가 자연스럽게 한 줄에 배치됨
 * 3. InlineObject의 align prop으로 수직 정렬 제어
 * 4. variant에 따라 적절한 폰트 스타일 적용
 *
 * Props:
 * @param {ReactNode} children - 텍스트와 InlineObject 조합 [Required]
 * @param {string} variant - 타이포그래피 variant ('body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') [Optional, 기본값: 'body1']
 * @param {string} component - HTML 태그 [Optional, 기본값: 'p']
 * @param {string} align - 텍스트 정렬 ('left' | 'center' | 'right' | 'justify') [Optional, 기본값: 'left']
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <InlineTypography variant="h3">
 *   We build <InlineObject size={1.2} rounded><img src="icon.png" /></InlineObject> amazing products.
 * </InlineTypography>
 */
export function InlineTypography({
  children,
  variant = 'body1',
  component = 'p',
  align = 'left',
  sx,
  ...props
}) {
  return (
    <Typography
      variant={variant}
      component={component}
      sx={{
        textAlign: align,
        lineHeight: 1.6,
        '& > span': {
          // InlineObject의 기본 스타일 조정
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

/**
 * InlineIcon 컴포넌트 (편의 컴포넌트)
 *
 * MUI 아이콘을 인라인으로 삽입하기 위한 특화된 래퍼.
 *
 * Props:
 * @param {ReactNode} icon - MUI Icon 컴포넌트 [Required]
 * @param {string} color - 아이콘 색상 [Optional, 기본값: 'inherit']
 * @param {number} size - 아이콘 크기 (em 단위) [Optional, 기본값: 1]
 * @param {string} align - 수직 정렬 [Optional, 기본값: 'middle']
 *
 * Example usage:
 * <InlineIcon icon={<StarIcon />} color="primary.main" size={1.2} />
 */
export function InlineIcon({
  icon,
  color = 'inherit',
  size = 1,
  align = 'middle',
  sx,
  ...props
}) {
  const alignMap = {
    baseline: 'baseline',
    middle: 'middle',
    top: 'text-top',
    bottom: 'text-bottom',
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: alignMap[align],
        fontSize: `${size}em`,
        color,
        mx: '0.1em',
        '& > svg': {
          fontSize: 'inherit',
        },
        ...sx,
      }}
      {...props}
    >
      {icon}
    </Box>
  );
}

/**
 * InlineImage 컴포넌트 (편의 컴포넌트)
 *
 * 이미지를 인라인으로 삽입하기 위한 특화된 래퍼.
 *
 * Props:
 * @param {string} src - 이미지 URL [Required]
 * @param {string} alt - 이미지 alt 텍스트 [Required]
 * @param {number|string} size - 이미지 크기 [Optional, 기본값: 1.5]
 * @param {boolean} rounded - 둥근 모서리 [Optional, 기본값: false]
 * @param {boolean} circle - 원형 [Optional, 기본값: false]
 * @param {string} align - 수직 정렬 [Optional, 기본값: 'middle']
 * @param {boolean} hover - hover 효과 [Optional, 기본값: false]
 *
 * Example usage:
 * <InlineImage src="photo.jpg" alt="Photo" size={2} circle hover />
 */
export function InlineImage({
  src,
  alt,
  size = 1.5,
  rounded = false,
  circle = false,
  align = 'middle',
  hover = false,
  sx,
  ...props
}) {
  const sizeValue = typeof size === 'number' ? `${size}em` : size;
  const alignMap = {
    baseline: 'baseline',
    middle: 'middle',
    top: 'text-top',
    bottom: 'text-bottom',
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        verticalAlign: alignMap[align],
        width: sizeValue,
        height: sizeValue,
        mx: '0.2em',
        borderRadius: circle ? '50%' : rounded ? '4px' : 0,
        overflow: 'hidden',
        transition: hover ? 'transform 0.2s ease-out' : 'none',
        '&:hover': hover ? {
          transform: 'scale(1.1)',
        } : {},
        ...sx,
      }}
      {...props}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </Box>
  );
}

// Compound component 패턴을 위한 정적 할당
InlineTypography.Object = InlineObject;
InlineTypography.Icon = InlineIcon;
InlineTypography.Image = InlineImage;
