import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';

/**
 * Material Symbols 아이콘 컴포넌트
 * 프로젝트 디자인 시스템의 Icons.stories.jsx 패턴 사용
 */
function MaterialSymbol({ name, size = 24, fill = false, weight = 400, color = 'inherit', sx = {} }) {
  // size가 숫자면 px 단위 추가, 문자열이면 그대로 사용
  const fontSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <Box
      component="span"
      className="material-symbols-rounded"
      sx={{
        fontSize,
        color,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}`,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      {name}
    </Box>
  );
}

/**
 * 애니메이션 키프레임 정의
 */
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

/**
 * QuotedContainer 컴포넌트
 *
 * 인용 부호를 텍스트의 시작/끝 위치에 스마트하게 배치하는 컴포넌트.
 * 대형 장식적 인용 부호로 인용문을 시각적으로 강조한다.
 *
 * 동작 방식:
 * 1. 텍스트 주변에 장식적인 인용 부호가 배치됨
 * 2. quoteStyle에 따라 다양한 인용 부호 문자 사용
 * 3. position에 따라 인용 부호의 위치가 조정됨
 * 4. animated가 true면 viewport 진입 시 애니메이션 실행
 *
 * Props:
 * @param {string} children - 인용할 텍스트 [Required]
 * @param {string} quoteSize - 인용 부호 크기 ('sm' | 'md' | 'lg' | 'xl') [Optional, 기본값: 'lg']
 * @param {string} quoteColor - 인용 부호 색상 [Optional, 기본값: 'text.disabled']
 * @param {string} position - 인용 부호 위치 ('outside' | 'inside' | 'overlay') [Optional, 기본값: 'outside']
 * @param {boolean} animated - 등장 애니메이션 [Optional, 기본값: false]
 * @param {string} author - 인용 출처/저자 [Optional]
 * @param {string} variant - 타이포그래피 variant [Optional, 기본값: 'h4']
 * @param {string} align - 텍스트 정렬 ('left' | 'center' | 'right') [Optional, 기본값: 'left']
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <QuotedContainer>Design is how it works.</QuotedContainer>
 * <QuotedContainer author="Steve Jobs">
 *   Design is not just what it looks like.
 * </QuotedContainer>
 */
export function QuotedContainer({
  children,
  quoteSize = 'lg',
  quoteColor = 'text.disabled',
  position = 'outside',
  animated = false,
  author,
  variant = 'h4',
  align = 'left',
  sx,
  ...props
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!animated);

  // Viewport 진입 감지
  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  }, [animated]);

  // 아이콘 크기 매핑 (px)
  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
    xl: 48,
  };

  const iconSize = iconSizes[quoteSize];

  // 공통 아이콘 스타일
  const baseIconSx = {
    opacity: animated && !isVisible ? 0 : (position === 'overlay' ? 0.12 : 0.3),
    animation: animated && isVisible ? `${fadeInScale} 0.4s ease-out forwards` : 'none',
    flexShrink: 0,
  };

  // Position: outside (기본 - 인라인 배치로 첫 글자 좌상단, 마지막 글자 우하단)
  if (position === 'outside') {
    return (
      <Box
        ref={containerRef}
        sx={{
          textAlign: align,
          ...sx,
        }}
        {...props}
      >
        <Typography
          variant={variant}
          component="blockquote"
          sx={{
            fontWeight: 400,
            lineHeight: 1.6,
            textAlign: align,
            m: 0,
            position: 'relative',
          }}
        >
          {/* 여는 따옴표 - 첫 글자 좌상단 */}
          <MaterialSymbol
            name="format_quote"
            size={iconSize}
            fill
            color={quoteColor}
            sx={{
              ...baseIconSx,
              transform: 'scaleX(-1) translateY(-0.15em)',
              verticalAlign: 'top',
              mr: '0.1em',
              ml: '-0.1em',
            }}
          />
          {children}
          {/* 닫는 따옴표 - 마지막 글자 우하단 */}
          <MaterialSymbol
            name="format_quote"
            size={iconSize}
            fill
            color={quoteColor}
            sx={{
              ...baseIconSx,
              transform: 'translateY(0.15em)',
              verticalAlign: 'bottom',
              ml: '0.1em',
              mr: '-0.1em',
              animationDelay: '0.15s',
            }}
          />
        </Typography>

        {author && (
          <Typography
            variant="body2"
            component="cite"
            sx={{
              display: 'block',
              mt: 2,
              fontStyle: 'normal',
              color: 'text.secondary',
              textAlign: align,
              '&::before': {
                content: '"— "',
              },
            }}
          >
            {author}
          </Typography>
        )}
      </Box>
    );
  }

  // Position: inside (더 작은 아이콘, 텍스트와 밀착)
  if (position === 'inside') {
    return (
      <Box
        ref={containerRef}
        sx={{
          textAlign: align,
          ...sx,
        }}
        {...props}
      >
        <Typography
          variant={variant}
          component="blockquote"
          sx={{
            fontWeight: 400,
            lineHeight: 1.6,
            m: 0,
          }}
        >
          {/* 여는 따옴표 - 첫 글자 좌상단 */}
          <MaterialSymbol
            name="format_quote"
            size="0.8em"
            fill
            color={quoteColor}
            sx={{
              ...baseIconSx,
              transform: 'scaleX(-1) translateY(-0.2em)',
              verticalAlign: 'top',
              mr: '0.05em',
            }}
          />
          {children}
          {/* 닫는 따옴표 - 마지막 글자 우하단 */}
          <MaterialSymbol
            name="format_quote"
            size="0.8em"
            fill
            color={quoteColor}
            sx={{
              ...baseIconSx,
              transform: 'translateY(0.2em)',
              verticalAlign: 'bottom',
              ml: '0.05em',
              animationDelay: '0.15s',
            }}
          />
        </Typography>
        {author && (
          <Typography
            variant="body2"
            component="cite"
            sx={{
              display: 'block',
              mt: 2,
              fontStyle: 'normal',
              color: 'text.secondary',
              '&::before': {
                content: '"— "',
              },
            }}
          >
            {author}
          </Typography>
        )}
      </Box>
    );
  }

  // Position: overlay (큰 fill 아이콘이 텍스트 뒤에 배경으로)
  if (position === 'overlay') {
    return (
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          textAlign: align,
          py: 3,
          ...sx,
        }}
        {...props}
      >
        {/* 배경 인용 부호 아이콘 */}
        <MaterialSymbol
          name="format_quote"
          size={iconSize * 4}
          fill
          color={quoteColor}
          sx={{
            position: 'absolute',
            left: align === 'right' ? 'auto' : 0,
            right: align === 'right' ? 0 : 'auto',
            top: 0,
            transform: 'scaleX(-1)',
            opacity: animated && !isVisible ? 0 : 0.06,
            animation: animated && isVisible ? `${fadeInScale} 0.4s ease-out forwards` : 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* 텍스트 */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant={variant}
            component="blockquote"
            sx={{
              fontWeight: 400,
              lineHeight: 1.6,
              m: 0,
            }}
          >
            {children}
          </Typography>
          {author && (
            <Typography
              variant="body2"
              component="cite"
              sx={{
                display: 'block',
                mt: 2,
                fontStyle: 'normal',
                color: 'text.secondary',
                '&::before': {
                  content: '"— "',
                },
              }}
            >
              {author}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  return null;
}
