/**
 * 벤토 그리드 프리셋 레이아웃
 * 자주 사용되는 레이아웃 패턴 정의
 */
export const BENTO_PRESETS = {
  /**
   * 2x2 + 1 레이아웃
   * [2x2] [1x1]
   *       [1x1]
   */
  featured: [
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
  ],

  /**
   * 균등 분할 레이아웃
   * [1x1] [1x1] [1x1] [1x1]
   */
  equal: [
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
  ],

  /**
   * 히어로 레이아웃
   * [4x1]
   * [1x1] [1x1] [2x1]
   */
  hero: [
    { colSpan: 4, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
  ],

  /**
   * 모자이크 레이아웃
   * [2x2] [1x1] [1x1]
   *       [2x1]
   */
  mosaic: [
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
  ],
};
