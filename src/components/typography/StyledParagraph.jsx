import { Box, Typography } from '@mui/material';

/**
 * StyledParagraph 컴포넌트
 *
 * 왼쪽 장식 라인과 Drop Cap을 지원하는 인용/강조 문단 컴포넌트.
 *
 * 동작 방식:
 * 1. 왼쪽에 세로 장식 라인(3px)이 표시됨
 * 2. dropCap이 true면 첫 글자가 정확히 2줄 높이로 확대되고 float됨
 * 3. styleColor로 Drop Cap과 장식 라인 색상을 동시에 지정
 * 4. variant로 Typography 스타일을 지정
 * 5. maxWidth로 최적의 줄 길이를 제어
 *
 * Props:
 * @param {string} children - 문단 텍스트 [Required]
 * @param {string} variant - Typography variant ('h4' | 'h5' | 'h6' | 'body1' | 'body2') [Optional, 기본값: 'h5']
 * @param {boolean} dropCap - 첫 글자 확대 (Drop Cap, 2줄 높이, 자동 float) [Optional, 기본값: false]
 * @param {string} styleColor - Drop Cap 및 장식 라인 색상 (MUI 색상 경로 또는 HEX) [Optional, 기본값: 'primary.main']
 * @param {string} align - 텍스트 정렬 ('left' | 'center' | 'right' | 'justify') [Optional, 기본값: 'left']
 * @param {number|string} maxWidth - 최대 너비 (ch 단위 숫자 또는 CSS 값) [Optional, 기본값: 65]
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <StyledParagraph>
 *   This is a styled paragraph with left border.
 * </StyledParagraph>
 * <StyledParagraph variant="h4" dropCap styleColor="secondary.main">
 *   Lorem ipsum dolor sit amet...
 * </StyledParagraph>
 */
export function StyledParagraph({
  children,
  variant = 'h5',
  dropCap = false,
  styleColor = 'primary.main',
  align = 'left',
  maxWidth = 65,
  sx,
  ...props
}) {
  // 최대 너비 처리
  const maxWidthValue = typeof maxWidth === 'number' ? `${maxWidth}ch` : maxWidth;

  // 장식 스타일 (왼쪽 border)
  const decorationStyle = {
    pl: 4,
    borderLeft: '3px solid',
    borderColor: styleColor,
    color: 'text.secondary',
  };

  // Drop Cap 스타일 (항상 float, 2줄 높이)
  // 첫 글자가 정확히 2줄 높이를 차지하며 2번째 줄 베이스라인과 맞춤
  const dropCapStyle = {
    '&::first-letter': {
      float: 'left',
      fontSize: '300%',
      fontWeight: 700,
      lineHeight: 0.8,
      mr: 1,
      mt: 1,
      fontFamily: '"Outfit", "Pretendard Variable", sans-serif',
      color: styleColor,
    },
  };

  return (
    <Typography
      variant={variant}
      component="p"
      sx={{
        maxWidth: maxWidthValue,
        textAlign: align,
        ...decorationStyle,
        ...(dropCap && dropCapStyle),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

/**
 * PullQuote 컴포넌트 (편의 컴포넌트)
 *
 * 인용문과 저자를 함께 표시하는 컴포넌트.
 *
 * Props:
 * @param {string} children - 인용 텍스트 [Required]
 * @param {string} author - 인용 출처/저자 [Optional]
 * @param {boolean} dropCap - 첫 글자 확대 (Drop Cap, 2줄 높이) [Optional, 기본값: false]
 * @param {string} styleColor - Drop Cap 및 장식 라인 색상 [Optional, 기본값: 'primary.main']
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <PullQuote author="Steve Jobs">
 *   Design is not just what it looks like.
 * </PullQuote>
 */
export function PullQuote({ children, author, dropCap = false, styleColor = 'primary.main', sx, ...props }) {
  return (
    <Box sx={{ ...sx }} {...props}>
      <StyledParagraph maxWidth="none" dropCap={dropCap} styleColor={styleColor}>
        {children}
      </StyledParagraph>
      {author && (
        <Typography
          variant="caption"
          component="cite"
          sx={{
            display: 'block',
            mt: 2,
            pl: 4,
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
