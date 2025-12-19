/**
 * Semantic Spacing Tokens
 *
 * MUI sx prop에서 사용할 수 있는 시멘틱 스페이싱 상수입니다.
 * 값은 MUI spacing 단위 (1 = 8px)입니다.
 *
 * 사용법:
 * import { SPACING } from '@/styles/tokens';
 * <Box sx={{ p: SPACING.inset.md, gap: SPACING.gap.sm }} />
 */

// ============================================================
// Spacing Tokens (8px 기반)
// ============================================================

export const SPACING = {
  /**
   * Inset: 컴포넌트 내부 패딩
   * 카드, 컨테이너, 모달 등의 내부 여백
   */
  inset: {
    none: 0,    // 0px
    xs: 1,      // 8px
    sm: 2,      // 16px
    md: 3,      // 24px
    lg: 4,      // 32px
    xl: 5,      // 40px
  },

  /**
   * Gap: Flex/Grid 레이아웃 간격
   * 자식 요소들 사이의 간격
   */
  gap: {
    none: 0,    // 0px
    xs: 0.5,    // 4px
    sm: 1,      // 8px
    md: 2,      // 16px
    lg: 3,      // 24px
    xl: 4,      // 32px
  },

  /**
   * Stack: 수직 스택 간격
   * 리스트, 폼 필드, 카드 목록 등
   */
  stack: {
    xs: 1,      // 8px - 조밀한 리스트
    sm: 2,      // 16px - 기본 리스트
    md: 3,      // 24px - 여유로운 리스트
    lg: 4,      // 32px - 폼 필드 간격
  },

  /**
   * Inline: 수평 인라인 간격
   * 버튼 그룹, 아이콘-텍스트 등
   */
  inline: {
    xs: 0.5,    // 4px - 아이콘-텍스트
    sm: 1,      // 8px - 버튼 내 아이콘
    md: 2,      // 16px - 버튼 그룹
    lg: 3,      // 24px - 액션 바
  },

  /**
   * Section: 섹션 간 수직 간격
   * 페이지 내 콘텐츠 블록 구분
   */
  section: {
    sm: 3,      // 24px
    md: 4,      // 32px
    lg: 6,      // 48px
    xl: 8,      // 64px
  },

  /**
   * Page: 페이지 레벨 간격
   * 페이지 여백, 상하단 패딩
   */
  page: {
    gutter: {
      xs: 2,    // 16px - 모바일
      sm: 3,    // 24px - 태블릿
      md: 4,    // 32px - 데스크톱
      lg: 6,    // 48px - 대형 화면
    },
    top: {
      sm: 8,    // 64px
      md: 10,   // 80px
      lg: 12,   // 96px
    },
    bottom: {
      sm: 4,    // 32px
      md: 6,    // 48px
      lg: 8,    // 64px
    },
  },
};

/**
 * 픽셀 값 계산 헬퍼
 * @param {number} value - SPACING 토큰 값
 * @returns {number} 픽셀 값
 */
export const toPx = (value) => value * 8;

/**
 * 반응형 spacing 헬퍼
 * @param {Object} values - 브레이크포인트별 SPACING 값
 * @returns {Object} MUI sx용 반응형 객체
 *
 * 사용법:
 * <Box sx={{ px: responsive({ xs: SPACING.page.gutter.xs, md: SPACING.page.gutter.md }) }} />
 */
export const responsive = (values) => values;

export default SPACING;
