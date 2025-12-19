import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import LineGrid from '../components/layout/LineGrid';
import { BrandValueCard } from '../components/card/BrandValueCard';
import { content } from '../data/content';
import { SPACING } from '../styles/tokens';

/**
 * BrandValueSection 컴포넌트
 *
 * 브랜드 가치를 LineGrid 1x3 그리드 레이아웃으로 표시하는 섹션.
 * 섹션 제목 + 부제목 + 3개의 BrandValueCard로 구성.
 *
 * 레이아웃:
 * - Desktop: 1행 3열 (각 카드 4 columns)
 * - Mobile: 1열 (각 카드 12 columns)
 *
 * @param {object} sx - 추가 스타일 [Optional]
 */
const BrandValueSection = forwardRef(function BrandValueSection({ sx, ...props }, ref) {
  const { sectionTitle, sectionSubtitle, features } = content.brandValue;

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        py: 0,
        ...sx,
      }}
      {...props}
    >
      {/* 1x3 그리드 - LineGrid 사용 */}
      <LineGrid container gap={0}>
        {features.map((feature) => (
          <Grid key={feature.id} size={{ xs: 12, md: 4 }}>
            <BrandValueCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              detailedDescription={feature.detailedDescription}
            />
          </Grid>
        ))}
      </LineGrid>
    </Box>
  );
});

export { BrandValueSection };
export default BrandValueSection;
