import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

/**
 * StretchedHeadline 컴포넌트
 *
 * 단어 간격을 동적으로 늘려 컨테이너 전체 너비를 채우는 히어로 타이포그래피 컴포넌트.
 * 각 단어를 개별 span으로 분리하고 flexbox의 space-between으로 배치한다.
 *
 * 동작 방식:
 * 1. 텍스트를 공백 기준으로 단어 단위로 분리
 * 2. 각 단어를 개별 span 요소로 래핑
 * 3. flexbox justify-content: space-between으로 전체 너비에 균등 배치
 * 4. ResizeObserver로 컨테이너 크기 변화 감지하여 반응형 대응
 * 5. fillWidth가 false면 일반 word-spacing으로 간격 조절
 *
 * Props:
 * @param {string} text - 표시할 텍스트 [Required]
 * @param {string} variant - 'static' | 'animated' [Optional, 기본값: 'static']
 * @param {boolean} fillWidth - 전체 너비 채우기 [Optional, 기본값: true]
 * @param {number} minWordSpacing - fillWidth가 false일 때 최소 단어 간격 (em) [Optional, 기본값: 0.5]
 * @param {string} fontFamily - 폰트 패밀리 [Optional, 기본값: 'Outfit']
 * @param {number} fontSize - 폰트 크기 (px 또는 rem) [Optional, 기본값: 'clamp(2rem, 8vw, 6rem)']
 * @param {number} fontWeight - 폰트 굵기 [Optional, 기본값: 900]
 * @param {number} lineHeight - 줄 높이 [Optional, 기본값: 1]
 * @param {string} textTransform - 텍스트 변환 ('none' | 'uppercase' | 'lowercase') [Optional, 기본값: 'uppercase']
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <StretchedHeadline text="DESIGN SYSTEM" />
 * <StretchedHeadline text="Hello World" fillWidth={false} minWordSpacing={2} />
 */
export function StretchedHeadline({
  text,
  variant = 'static',
  fillWidth = true,
  minWordSpacing = 0.5,
  fontFamily = '"Outfit", "Pretendard Variable", sans-serif',
  fontSize = 'clamp(2rem, 8vw, 6rem)',
  fontWeight = 900,
  lineHeight = 1,
  textTransform = 'uppercase',
  sx,
  ...props
}) {
  const containerRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // 단어 분리
  const words = text.trim().split(/\s+/);

  // 애니메이션 트리거 (viewport 진입 시)
  useEffect(() => {
    if (variant !== 'animated') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
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
  }, [variant]);

  // fillWidth가 true일 때 - space-between 방식
  if (fillWidth) {
    return (
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          textTransform,
          letterSpacing: '-0.02em',
          ...sx,
        }}
        {...props}
      >
        {words.map((word, index) => (
          <Box
            component="span"
            key={index}
            sx={{
              display: 'inline-block',
              opacity: variant === 'animated' ? (isAnimated ? 1 : 0) : 1,
              transform: variant === 'animated'
                ? (isAnimated ? 'translateY(0)' : 'translateY(20px)')
                : 'none',
              transition: variant === 'animated'
                ? `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
                : 'none',
            }}
          >
            {word}
          </Box>
        ))}
      </Box>
    );
  }

  // fillWidth가 false일 때 - word-spacing 방식
  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'block',
        width: '100%',
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        textTransform,
        letterSpacing: '-0.02em',
        wordSpacing: `${minWordSpacing}em`,
        textAlign: 'center',
        ...sx,
      }}
      {...props}
    >
      {variant === 'animated' ? (
        words.map((word, index) => (
          <Box
            component="span"
            key={index}
            sx={{
              display: 'inline-block',
              opacity: isAnimated ? 1 : 0,
              transform: isAnimated ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
              mr: index < words.length - 1 ? `${minWordSpacing}em` : 0,
            }}
          >
            {word}
          </Box>
        ))
      ) : (
        text
      )}
    </Box>
  );
}

/**
 * StretchedHeadlineMultiline 컴포넌트
 *
 * 여러 줄의 StretchedHeadline을 세로로 배치하는 래퍼 컴포넌트.
 * 각 줄이 독립적으로 전체 너비를 채운다.
 *
 * Props:
 * @param {string[]} lines - 각 줄의 텍스트 배열 [Required]
 * @param {number} gap - 줄 간격 [Optional, 기본값: 0]
 * @param {object} headlineProps - 각 StretchedHeadline에 전달할 props [Optional]
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <StretchedHeadlineMultiline
 *   lines={['WE CREATE', 'DIGITAL', 'EXPERIENCES']}
 *   gap={1}
 * />
 */
export function StretchedHeadlineMultiline({
  lines,
  gap = 0,
  headlineProps = {},
  sx,
  ...props
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        width: '100%',
        ...sx,
      }}
      {...props}
    >
      {lines.map((line, index) => (
        <StretchedHeadline
          key={index}
          text={line}
          {...headlineProps}
          sx={{
            ...(headlineProps.variant === 'animated' && {
              '--animation-delay': `${index * 0.2}s`,
            }),
            ...headlineProps.sx,
          }}
        />
      ))}
    </Box>
  );
}
