import { Box } from '@mui/material';

/**
 * FullPageContainer 컴포넌트
 *
 * 100vh 또는 100svh 높이의 전체 화면 섹션 컨테이너.
 * Hero 섹션, 풀스크린 갤러리, 스크롤 스냅 레이아웃에 사용된다.
 *
 * 동작 방식:
 * 1. heightMode에 따라 vh, svh, dvh 중 선택하여 높이 설정
 * 2. 콘텐츠는 align, justify prop에 따라 정렬됨
 * 3. background로 배경 이미지, 그라데이션 적용 가능
 * 4. overlay로 어두운 오버레이 추가 가능
 *
 * Props:
 * @param {ReactNode} children - 섹션 콘텐츠 [Required]
 * @param {string} heightMode - 높이 모드 ('vh' | 'svh' | 'dvh') [Optional, 기본값: 'svh']
 * @param {number} heightRatio - 높이 비율 (0.5 = 50vh) [Optional, 기본값: 1]
 * @param {string} minHeight - 최소 높이 [Optional]
 * @param {string} maxHeight - 최대 높이 [Optional]
 * @param {string} align - 수직 정렬 ('start' | 'center' | 'end' | 'stretch') [Optional, 기본값: 'center']
 * @param {string} justify - 수평 정렬 ('start' | 'center' | 'end' | 'between' | 'around') [Optional, 기본값: 'center']
 * @param {string} background - 배경 이미지 URL 또는 CSS 값 [Optional]
 * @param {string|number} overlay - 오버레이 색상 또는 불투명도 [Optional]
 * @param {boolean} isContained - overflow hidden 적용 [Optional, 기본값: true]
 * @param {string} snap - 스크롤 스냅 정렬 ('start' | 'center' | 'end') [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FullPageContainer background="hero.jpg" overlay={0.5}>
 *   <HeroContent />
 * </FullPageContainer>
 * <FullPageContainer heightRatio={0.5} align="end">
 *   <CtaSection />
 * </FullPageContainer>
 */
export function FullPageContainer({
  children,
  heightMode = 'svh',
  heightRatio = 1,
  minHeight,
  maxHeight,
  align = 'center',
  justify = 'center',
  background,
  overlay,
  isContained = true,
  snap,
  sx,
  ...props
}) {
  /**
   * heightMode에 따른 높이 CSS 값 생성
   * - vh: viewport height (주소바 포함)
   * - svh: small viewport height (주소바 표시 시)
   * - dvh: dynamic viewport height (주소바 동적)
   */
  const getHeight = () => {
    const value = heightRatio * 100;
    return `${value}${heightMode}`;
  };

  /**
   * align 값을 CSS align-items 값으로 변환
   */
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };

  /**
   * justify 값을 CSS justify-content 값으로 변환
   */
  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
  };

  /**
   * 배경 스타일 생성
   * - URL: background-image로 처리
   * - 기타: background로 처리 (색상, 그라데이션)
   */
  const getBackgroundStyle = () => {
    if (!background) return {};

    // URL 패턴 감지
    if (background.startsWith('http') || background.startsWith('/') || background.startsWith('data:')) {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }

    return { background };
  };

  /**
   * 오버레이 스타일 생성
   * - 숫자: 검정색 불투명도
   * - 문자열: CSS 색상
   */
  const getOverlayStyle = () => {
    if (!overlay) return null;

    let overlayColor;
    if (typeof overlay === 'number') {
      overlayColor = `rgba(0, 0, 0, ${overlay})`;
    } else {
      overlayColor = overlay;
    }

    return {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: overlayColor,
      pointerEvents: 'none',
    };
  };

  return (
    <Box
      sx={ {
        position: 'relative',
        width: '100%',
        height: getHeight(),
        minHeight: minHeight,
        maxHeight: maxHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignMap[align] || 'center',
        justifyContent: justifyMap[justify] || 'center',
        overflow: isContained ? 'hidden' : 'visible',
        scrollSnapAlign: snap,
        ...getBackgroundStyle(),
        // 오버레이 pseudo element
        ...(overlay && {
          '&::before': getOverlayStyle(),
        }),
        ...sx,
      } }
      { ...props }
    >
      { /* 콘텐츠를 오버레이 위에 배치 */ }
      <Box sx={ { position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'contents' } }>
        { children }
      </Box>
    </Box>
  );
}

/**
 * FullPageSection 컴포넌트
 *
 * 스크롤 스냅 컨테이너 내에서 사용되는 개별 섹션.
 * FullPageContainer를 확장하여 스크롤 스냅 기능을 기본으로 포함.
 *
 * Props:
 * 모든 FullPageContainer props를 상속
 *
 * Example usage:
 * <FullPageSnap>
 *   <FullPageSection background="section1.jpg">
 *     <Section1Content />
 *   </FullPageSection>
 *   <FullPageSection background="section2.jpg">
 *     <Section2Content />
 *   </FullPageSection>
 * </FullPageSnap>
 */
export function FullPageSection(props) {
  return <FullPageContainer snap="start" { ...props } />;
}

/**
 * FullPageSnap 컴포넌트
 *
 * 스크롤 스냅이 적용된 전체 화면 섹션 컨테이너.
 * 내부에 FullPageSection들을 배치하여 풀페이지 스크롤 효과를 구현.
 *
 * Props:
 * @param {ReactNode} children - FullPageSection 컴포넌트들 [Required]
 * @param {string} snapType - 스냅 타입 ('mandatory' | 'proximity') [Optional, 기본값: 'mandatory']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FullPageSnap>
 *   <FullPageSection>Section 1</FullPageSection>
 *   <FullPageSection>Section 2</FullPageSection>
 * </FullPageSnap>
 */
export function FullPageSnap({
  children,
  snapType = 'mandatory',
  sx,
  ...props
}) {
  return (
    <Box
      sx={ {
        height: '100svh',
        overflowY: 'scroll',
        scrollSnapType: `y ${snapType}`,
        ...sx,
      } }
      { ...props }
    >
      { children }
    </Box>
  );
}
