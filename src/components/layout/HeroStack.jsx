import { forwardRef } from 'react';
import Box from '@mui/material/Box';

/**
 * HeroStack 컴포넌트
 *
 * 상단 Hero 영역이 남은 공간을 채우고, 하단 Footer 영역은 자연스러운 높이를 유지하는
 * 수직 스택 레이아웃. 제품 상세, 랜딩 페이지 등에 활용.
 *
 * 동작 방식:
 * 1. 컨테이너: 지정된 높이(기본 100vh)로 flex column 설정
 * 2. Hero 영역: flex-grow: 1로 남은 공간 채움, 내부 콘텐츠 정렬 옵션 제공
 * 3. Footer 영역: 자연스러운 높이(auto)로 하단에 고정
 * 4. 반응형: md 미만에서 min-height로 전환하여 스크롤 가능
 *
 * 레이아웃 구조:
 * ┌─────────────────────────────────┐
 * │                                 │
 * │   Hero (flex-grow: 1)           │ ← 남은 공간 차지
 * │   콘텐츠 수직/수평 정렬 가능       │
 * │                                 │
 * ├─────────────────────────────────┤
 * │   Footer (auto height)          │ ← 자연스러운 높이
 * └─────────────────────────────────┘
 *
 * Props:
 * @param {ReactNode} hero - 상단 Hero 영역 콘텐츠 [Required]
 * @param {ReactNode} footer - 하단 Footer 영역 콘텐츠 [Required]
 * @param {string} height - 컨테이너 높이 [Optional, 기본값: '100vh']
 * @param {string} heroAlign - Hero 콘텐츠 수직 정렬 ('start' | 'center' | 'end') [Optional, 기본값: 'center']
 * @param {string} heroJustify - Hero 콘텐츠 수평 정렬 ('start' | 'center' | 'end') [Optional, 기본값: 'start']
 * @param {number} gap - Hero와 Footer 사이 간격 [Optional, 기본값: 0]
 * @param {number|object} heroPadding - Hero 영역 패딩 [Optional, 기본값: 0]
 * @param {number|object} footerPadding - Footer 영역 패딩 [Optional, 기본값: 0]
 * @param {object} heroSx - Hero 영역 추가 스타일 [Optional]
 * @param {object} footerSx - Footer 영역 추가 스타일 [Optional]
 * @param {object} sx - 컨테이너 추가 스타일 [Optional]
 *
 * Example usage:
 * <HeroStack
 *   hero={<Typography variant="h1">Product Title</Typography>}
 *   footer={<ProductActions />}
 *   heroAlign="center"
 *   height="100vh"
 * />
 */
const HeroStack = forwardRef(function HeroStack(
  {
    hero,
    footer,
    height = '100vh',
    heroAlign = 'center',
    heroJustify = 'start',
    gap = 0,
    heroPadding = 0,
    footerPadding = 0,
    heroSx = {},
    footerSx = {},
    sx = {},
    ...props
  },
  ref
) {
  // 정렬 값 매핑
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // 반응형 높이: md 이상에서 height, 미만에서 min-height
        height: { xs: 'auto', md: height },
        minHeight: { xs: height, md: 'auto' },
        ...sx,
      }}
      {...props}
    >
      {/* Hero 영역 - 남은 공간 채움 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignMap[heroJustify] || 'flex-start',
          justifyContent: alignMap[heroAlign] || 'center',
          p: heroPadding,
          mb: gap,
          minHeight: 0, // flex item shrink 허용
          ...heroSx,
        }}
      >
        {hero}
      </Box>

      {/* Footer 영역 - 자연스러운 높이 */}
      <Box
        sx={{
          flexShrink: 0,
          p: footerPadding,
          ...footerSx,
        }}
      >
        {footer}
      </Box>
    </Box>
  );
});

export { HeroStack };
export default HeroStack;
