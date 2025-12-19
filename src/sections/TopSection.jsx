import LineGrid from '../components/layout/LineGrid';
import { HeroSection } from './HeroSection';
import { BrandValueSection } from './BrandValueSection';

/**
 * TopSection 컴포넌트
 *
 * HeroSection과 BrandValueSection을 LineGrid로 합친 상단 섹션.
 *
 * 레이아웃:
 * - Row 1: HeroSection (8:4 비디오 레이아웃)
 * - Row 2: BrandValueSection (4:4:4 카드 레이아웃)
 *
 * @param {object} sx - 추가 스타일 [Optional]
 */
const TopSection = () => {
  return (
    <LineGrid borderEnd>
      <HeroSection />
      <BrandValueSection />
    </LineGrid>
  );
};

export { TopSection };
export default TopSection;
