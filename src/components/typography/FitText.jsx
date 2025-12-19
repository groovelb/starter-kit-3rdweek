import { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@mui/material';

/**
 * FitText 컴포넌트
 *
 * 컨테이너 너비에 꽉 차도록 텍스트 크기가 자동으로 조절되는 반응형 타이포그래피 컴포넌트.
 *
 * 시각적 동작:
 * 1. 텍스트가 컨테이너 너비에 맞춰 자동으로 크기가 커지거나 작아짐
 * 2. 브라우저 창 크기를 조절하면 텍스트 크기가 실시간으로 변함
 * 3. variant를 'headline'으로 설정하면 Chillax 폰트로 전환되며 더 타이트한 행간 적용
 * 4. letterSpacing, wordSpacing 값을 높이면 글자/단어 간격이 넓어짐
 * 5. minFontSize, maxFontSize로 텍스트 크기의 최소/최대 범위 제한 가능
 *
 * Props:
 * @param {string} text - 표시할 텍스트 [Required]
 * @param {string} variant - 타이포그래피 변형 ('body' | 'h1' | 'headline') [Optional, 기본값: 'body']
 * @param {number} minFontSize - 최소 폰트 크기 (px) [Optional, 기본값: 0]
 * @param {number} maxFontSize - 최대 폰트 크기 (px) [Optional, 기본값: 9999]
 * @param {number} letterSpacing - 자간 배율 [Optional, 기본값: 1]
 * @param {number} wordSpacing - 단어 간격 배율 [Optional, 기본값: 1]
 * @param {number} fontWeight - 폰트 굵기 [Optional]
 *
 * Example usage:
 * <FitText text="Hello World" variant="headline" />
 * <FitText text="Responsive Text" minFontSize={ 16 } maxFontSize={ 120 } />
 */
export function FitText({
  text,
  variant = 'body',
  minFontSize = 0,
  maxFontSize = 9999,
  letterSpacing = 1,
  wordSpacing = 1,
  fontWeight,
  ...props
}) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [fontSize, setFontSize] = useState(minFontSize);

  /**
   * variant에 따른 폰트 스타일 결정
   * - headline/h1: Chillax 폰트, 타이트한 행간(0.9), 기본 굵기 400
   * - body: Inter 폰트, 여유로운 행간(1.3), 기본 굵기 300
   */
  const isHeadline = variant === 'h1' || variant === 'headline';
  const fontFamily = isHeadline ? '"Chillax", sans-serif' : '"Inter", sans-serif';
  const lineHeight = isHeadline ? 0.9 : 1.3;
  const defaultFontWeight = isHeadline ? 400 : 300;
  const finalFontWeight = fontWeight !== undefined ? fontWeight : defaultFontWeight;

  /**
   * 자간/단어 간격 계산
   * - 기본값(1)일 때: 자간 0.02em, 단어 간격 0.2em
   * - 값을 2로 설정하면 간격이 2배로 넓어짐
   */
  const baseLetterSpacing = 0.02;
  const baseWordSpacing = 0.2;
  const finalLetterSpacing = `${ baseLetterSpacing * letterSpacing }em`;
  const finalWordSpacing = `${ baseWordSpacing * wordSpacing }em`;

  /**
   * 폰트 크기 계산 함수
   * - 숨겨진 측정 요소(100px 기준)와 컨테이너 너비를 비교하여 비율 계산
   * - 계산된 크기가 min/max 범위를 벗어나면 범위 내로 제한
   */
  const updateFontSize = useCallback(() => {
    if (!containerRef.current || !measureRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const measureWidth = measureRef.current.offsetWidth;

    if (measureWidth === 0) return;

    // 0.98 버퍼: 렌더링 차이로 인한 미세한 오버플로우 방지
    const ratio = (containerWidth * 0.98) / measureWidth;
    const calculatedFontSize = 100 * ratio;
    const finalSize = Math.min(Math.max(calculatedFontSize, minFontSize), maxFontSize);

    setFontSize(finalSize);
  }, [minFontSize, maxFontSize]);

  /**
   * 크기 변화 감지 및 자동 업데이트
   * - ResizeObserver로 컨테이너 크기 변화 감지
   * - text, letterSpacing, wordSpacing 변경 시에도 재계산
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      updateFontSize();
    });

    observer.observe(container);
    updateFontSize();

    return () => observer.disconnect();
  }, [text, letterSpacing, wordSpacing, updateFontSize]);

  return (
    <Box
      ref={ containerRef }
      className="text-fit"
      sx={ {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.sx
      } }
      { ...props }
    >
      {/* 실제 표시되는 텍스트 */}
      <Box
        component="span"
        sx={ {
          display: 'block',
          fontFamily,
          lineHeight,
          fontWeight: finalFontWeight,
          fontSize: `${ fontSize }px`,
          letterSpacing: finalLetterSpacing,
          wordSpacing: finalWordSpacing,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          transition: 'font-size 0.1s ease-out',
        } }
      >
        { text }
      </Box>

      {/* 숨겨진 측정용 요소 - 100px 기준으로 텍스트 너비 측정 */}
      <Box
        ref={ measureRef }
        component="span"
        aria-hidden="true"
        sx={ {
          position: 'absolute',
          left: '-9999px',
          top: 0,
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          fontFamily,
          fontWeight: finalFontWeight,
          fontSize: '100px',
          letterSpacing: finalLetterSpacing,
          wordSpacing: finalWordSpacing,
          pointerEvents: 'none',
        } }
      >
        { text }
      </Box>
    </Box>
  );
}
