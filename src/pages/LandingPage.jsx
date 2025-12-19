import { PageContainer } from '../components/container/PageContainer';
import { TopSection } from '../sections/TopSection';
import { ProductShowcase } from '../sections/ProductShowcase';

/**
 * LandingPage 컴포넌트
 *
 * Lumenstate 브랜드의 랜딩 페이지.
 * TopSection(히어로 + 브랜드 가치)과 ProductShowcase(제품 그리드)로 구성.
 *
 * 레이아웃:
 * - TopSection: 히어로 섹션 + 브랜드 가치 카드
 * - ProductShowcase: 타임라인 슬라이더 + 제품 그리드
 *
 * 동작:
 * - TimelineContext는 상위(Storybook decorator 또는 App)에서 제공
 * - timeline >= 0.5 시 배경색 자동 전환 (다크 모드)
 *
 * @param {object} sx - 추가 스타일 [Optional]
 */
function LandingPage({ sx }) {
  return (
    <PageContainer
      sx={{
        backgroundColor: 'background.default',
        transition: 'background-color 600ms ease',
        minHeight: '100vh',
        ...sx,
      }}
    >
      <TopSection />
      <ProductShowcase />
    </PageContainer>
  );
}

export default LandingPage;
