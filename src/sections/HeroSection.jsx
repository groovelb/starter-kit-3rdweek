import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import LineGrid from '../components/layout/LineGrid';
import { ScrollVideo } from '../components/shared/ScrollVideo';
import { content } from '../data/content';

/**
 * HeroSection 컴포넌트
 *
 * 스크롤 기반 비디오 스크러빙과 타이틀 오버레이를 포함한 히어로 섹션.
 * LineGrid를 사용한 2컬럼 레이아웃 (2:1 비율).
 *
 * 사이즈 규칙:
 * - 전체 컨테이너: 100% 너비
 * - 컬럼 비율: 2:1 (8:4)
 * - 비디오: 원본 비율 유지 (width: 100%, height: auto)
 *
 * @param {object} sx - 추가 스타일 [Optional]
 */
const HeroSection = forwardRef(function HeroSection({ sx, ...props }, ref) {
  const { title, subtitle, videos } = content.hero;

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        ...sx,
      }}
      {...props}
    >
      <LineGrid container gap={0} sx={{ width: '100%' }}>
        {/* 첫 번째 컬럼 - 랜드스케이프 비디오 + 타이틀 오버레이 (2:1 비율 중 2) */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ position: 'relative' }}>
          <ScrollVideo src={videos.row1Col1} ratio={1.58999} startInView isTimeline />
          {/* 타이틀 오버레이 - 좌측 상단 */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: 'text.secondary',
                fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
                fontWeight: 100,
                pl: 0.5,
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Grid>

        {/* 두 번째 컬럼 - 제품 비디오 (2:1 비율 중 1) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ScrollVideo src={videos.row1Col2} startInView />
        </Grid>
      </LineGrid>
    </Box>
  );
});

export { HeroSection };
export default HeroSection;
