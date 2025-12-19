/**
 * Admin Site Map Data
 *
 * Source: docs/supabase/information-architecture.md
 * Storybook에서 TreeNode로 시각화하기 위한 데이터 구조
 */

export const adminSiteMap = {
  '/admin': {
    '/login': '어드민 로그인',
    '/dashboard': '대시보드 (선택적) - 주요 지표 요약',
    '/products': {
      '(list)': '제품 목록 - 테이블 뷰, 필터 (타입, 상태), 검색 (제목)',
      '/new': '신규 제품 등록',
      '/:id': '제품 수정',
    },
    '/orders': {
      '(list)': '주문 목록 - 테이블 뷰, 필터 (상태, 날짜), 검색 (주문번호, 이메일)',
      '/:id': '주문 상세 - 고객 정보, 주문 항목, 상태 변경',
    },
    '/options': {
      '/glass-finish': '유리 마감 옵션',
      '/hardware': '하드웨어 옵션',
      '/heights': '높이 옵션',
    },
  },
};

export const siteMapTable = [
  { path: '/admin', description: 'Root' },
  { path: '/admin/login', description: '어드민 로그인' },
  { path: '/admin/dashboard', description: '대시보드 (선택적) - 주요 지표 요약' },
  { path: '/admin/products', description: '제품 관리 (목록)' },
  { path: '/admin/products/new', description: '신규 제품 등록' },
  { path: '/admin/products/:id', description: '제품 수정' },
  { path: '/admin/orders', description: '주문 관리 (목록)' },
  { path: '/admin/orders/:id', description: '주문 상세' },
  { path: '/admin/options', description: '제품 옵션 관리' },
  { path: '/admin/options/glass-finish', description: '유리 마감 옵션' },
  { path: '/admin/options/hardware', description: '하드웨어 옵션' },
  { path: '/admin/options/heights', description: '높이 옵션' },
];

export const userRoles = [
  {
    role: 'Admin',
    label: '관리자',
    permissions: ['모든 기능 접근 가능', '제품 CRUD', '주문 상태 변경', '옵션 관리'],
  },
  {
    role: 'Editor',
    label: '편집자 (선택적)',
    permissions: ['제품 조회/수정', '주문 조회/상태 변경', '옵션 조회만'],
  },
  {
    role: 'Viewer',
    label: '열람자 (선택적)',
    permissions: ['모든 데이터 조회만'],
  },
];

export const navigationMenu = [
  { label: '제품 관리', path: '/admin/products', icon: 'inventory' },
  { label: '주문 관리', path: '/admin/orders', icon: 'receipt_long' },
  { label: '옵션 설정', path: '/admin/options', icon: 'settings' },
];

export const responsiveBreakpoints = [
  { breakpoint: 'xs (0-599)', sidebar: '햄버거 메뉴 (Drawer)', layout: '단일 컬럼' },
  { breakpoint: 'sm (600-899)', sidebar: '접힌 아이콘', layout: '2 컬럼' },
  { breakpoint: 'md+ (900+)', sidebar: '전체 펼침', layout: '2 컬럼' },
];
