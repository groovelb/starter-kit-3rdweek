/**
 * Admin Building Guide Data
 *
 * Source: docs/admin-building-guide-scenario.md
 * Storybook에서 학습 가이드를 시각화하기 위한 데이터 구조
 */

// Phase 개요 (전체 학습 순서)
export const phases = [
  {
    id: 'phase-0',
    phase: 'Phase 0',
    title: '환경 설정',
    description: 'Supabase 프로젝트 생성 및 MCP 연결',
    difficulty: '★☆☆',
    time: '30분-1시간',
    achievement: '환경 설정 완료',
    steps: ['0-1', '0-2', '0-3', '0-4', '0-5', '0-6'],
  },
  {
    id: 'phase-1',
    phase: 'Phase 1',
    title: '제품 등록하기',
    description: '제품 테이블 생성, 데이터 입력, Admin 목록 페이지 동작',
    difficulty: '★☆☆',
    time: '1-2시간',
    achievement: '"내 데이터가 화면에!"',
    steps: ['1', '2', '3', '4'],
  },
  {
    id: 'phase-2',
    phase: 'Phase 2',
    title: '제품 CRUD 완성',
    description: '제품 생성, 수정, 이미지 업로드 동작',
    difficulty: '★★☆',
    time: '2-3시간',
    achievement: 'CRUD 완성',
    steps: ['5', '6', '7'],
  },
  {
    id: 'phase-3',
    phase: 'Phase 3',
    title: '주문 관리',
    description: '주문 목록 조회, 상세 보기, 상태 변경 동작',
    difficulty: '★★☆',
    time: '2-3시간',
    achievement: '주문 관리 완성',
    steps: ['8', '9', '10'],
  },
  {
    id: 'phase-4',
    phase: 'Phase 4',
    title: '인증 & 보안',
    description: '로그인 필요, 권한에 따른 접근 제한 동작',
    difficulty: '★★★',
    time: '3-4시간',
    achievement: '인증/보안 완성',
    steps: ['11', '12', '13', '14'],
  },
];

// 학습 구조 트리 (상세 설명 포함)
export const learningTree = {
  'Phase 0: 환경 설정': {
    'Step 0-1: Supabase 가입': {
      목표: 'Supabase 계정 생성',
      체크포인트: ['Dashboard 로그인 성공', 'Organization 화면 표시'],
    },
    'Step 0-2: 프로젝트 생성': {
      목표: 'Lumenstate용 Supabase 프로젝트 생성',
      체크포인트: ['프로젝트 Dashboard 표시', 'Table Editor, Auth 메뉴 확인'],
    },
    'Step 0-3: API 키 확인': {
      목표: '프론트엔드와 MCP에서 사용할 키 확인',
      체크포인트: ['Project URL 메모', 'anon key 메모', 'Project Ref ID 메모'],
    },
    'Step 0-4: 환경변수 설정': {
      목표: 'React 앱에서 Supabase 연결 설정',
      체크포인트: ['.env.local 생성', 'VITE_SUPABASE_URL 설정', 'VITE_SUPABASE_ANON_KEY 설정'],
    },
    'Step 0-5: MCP 설정': {
      목표: 'Claude Code에서 Supabase DB 직접 조작',
      체크포인트: ['claude mcp add 실행', 'OAuth 인증 완료'],
    },
    'Step 0-6: MCP 연결 확인': {
      목표: 'MCP 정상 연결 테스트',
      체크포인트: ['/mcp에서 connected 표시', 'list_tables 정상 실행'],
    },
  },
  'Phase 1: 제품 등록하기': {
    'Step 1: 제품 테이블 생성': {
      목표: 'products 테이블 생성 (apply_migration)',
      타입: 'DB 작업',
      체크포인트: ['마이그레이션 성공', 'create_products_simple 확인'],
      참조: 'UX Architecture/Data Model → Schema',
    },
    'Step 2: 테스트 데이터 입력': {
      목표: '샘플 제품 데이터 삽입 및 환경변수 활성화',
      타입: 'DB + 프론트엔드',
      체크포인트: ['3개 행 삽입', '브라우저에서 제품 카드 표시'],
      참조: 'Section/ProductShowcase',
    },
    'Step 3: 서비스 & 컨텍스트': {
      목표: 'Supabase 연동 서비스 및 React Context 생성',
      타입: '프론트엔드',
      체크포인트: ['supabase.js 생성', 'productService.js 생성', 'ProductContext.jsx 생성'],
    },
    'Step 4: 제품 목록 페이지': {
      목표: 'Admin 라우트 및 제품 목록 페이지 구현',
      타입: '프론트엔드',
      체크포인트: ['/admin/products 접근', '테이블에 제품 표시'],
      참조: 'UX Architecture/Admin Pages → Product List',
    },
  },
  'Phase 2: 제품 CRUD 완성': {
    'Step 5: 제품 상세/수정': {
      목표: '제품 편집 폼 구현 및 필드 확장',
      타입: 'DB + 프론트엔드',
      체크포인트: ['/admin/products/:id 동작', '수정 후 저장 성공'],
      참조: 'UX Architecture/Admin Pages → Product Edit',
    },
    'Step 6: 이미지 업로드': {
      목표: 'Supabase Storage 버킷 생성 및 업로드 기능',
      타입: 'DB + 프론트엔드',
      체크포인트: ['product-images 버킷', 'product-videos 버킷', '업로드 테스트'],
      참조: 'UX Architecture/Data Model → Storage',
    },
    'Step 7: 관련 테이블': {
      목표: 'product_types, product_options 테이블 생성',
      타입: 'DB 작업',
      체크포인트: ['product_types 생성', 'product_options 생성', 'FK 연결'],
      참조: 'UX Architecture/Data Model → Docs',
    },
  },
  'Phase 3: 주문 관리': {
    'Step 8: 주문 테이블 설계': {
      목표: 'orders, order_items, order_statuses 테이블 생성',
      타입: 'DB 작업',
      체크포인트: ['3개 테이블 생성', '5개 상태 삽입', 'FK 관계 설정'],
      참조: 'UX Architecture/Data Model → Schema',
    },
    'Step 9: 주문 목록 & 상세': {
      목표: '주문 View 생성 및 페이지 구현',
      타입: 'DB + 프론트엔드',
      체크포인트: ['View 생성', '/admin/orders 목록', '/admin/orders/:id 상세'],
      참조: 'UX Architecture/Admin Pages → Order List',
    },
    'Step 10: 상태 변경': {
      목표: '주문 상태 전환 규칙 구현',
      타입: '프론트엔드',
      체크포인트: ['상태 드롭다운', '상태 변경 버튼', '타임스탬프 기록'],
      참조: 'UX Architecture/Admin Pages → OrderStatus',
    },
  },
  'Phase 4: 인증 & 보안': {
    'Step 11: Supabase Auth': {
      목표: 'admin_profiles 테이블 및 사용자 생성',
      타입: 'DB 작업',
      체크포인트: ['auth.users 사용자', 'admin_profiles 레코드'],
      참조: 'UX Architecture/Admin Site Map',
    },
    'Step 12: 로그인 페이지': {
      목표: 'Auth Context 및 로그인 UI 구현',
      타입: '프론트엔드',
      체크포인트: ['/admin/login 표시', '로그인 성공 시 리다이렉트'],
      참조: 'UX Architecture/Admin Pages → Login',
    },
    'Step 13: RLS 정책': {
      목표: '행 수준 보안 정책 활성화',
      타입: 'DB 작업',
      체크포인트: ['비로그인 시 활성 제품만', 'Admin 로그인 시 전체 접근'],
    },
    'Step 14: Protected Route': {
      목표: '인증 상태 확인 및 라우트 보호',
      타입: '프론트엔드',
      체크포인트: ['미로그인 시 접근 불가', '세션 만료 시 로그아웃'],
      참조: 'UX Architecture/Admin Site Map',
    },
  },
};

// 상세 스텝 정보
export const steps = [
  // Phase 0
  {
    step: 'Step 0-1',
    phase: 'Phase 0',
    title: 'Supabase 가입',
    goal: 'Supabase 계정 생성',
    type: 'setup',
    checkpoints: [
      'Supabase Dashboard에 로그인 성공',
      'Organization(조직) 화면이 보임',
    ],
  },
  {
    step: 'Step 0-2',
    phase: 'Phase 0',
    title: '프로젝트 생성',
    goal: 'Lumenstate용 Supabase 프로젝트 생성',
    type: 'setup',
    checkpoints: [
      '프로젝트 Dashboard가 표시됨',
      '좌측 메뉴에 Table Editor, Authentication 등이 보임',
    ],
  },
  {
    step: 'Step 0-3',
    phase: 'Phase 0',
    title: 'API 키 확인',
    goal: '프론트엔드와 MCP에서 사용할 키 확인',
    type: 'setup',
    checkpoints: [
      'Project URL 메모 완료',
      'anon key 메모 완료',
      'Project Reference ID 메모 완료',
    ],
  },
  {
    step: 'Step 0-4',
    phase: 'Phase 0',
    title: '프론트엔드 환경변수 설정',
    goal: 'React 앱에서 Supabase에 연결할 수 있도록 설정',
    type: 'frontend',
    checkpoints: [
      '.env.local 파일 생성됨',
      'VITE_SUPABASE_URL에 실제 URL 입력됨',
      'VITE_SUPABASE_ANON_KEY에 실제 키 입력됨',
      '.gitignore에 환경변수 파일 제외됨',
    ],
  },
  {
    step: 'Step 0-5',
    phase: 'Phase 0',
    title: 'Claude Code MCP 설정',
    goal: 'Claude Code에서 Supabase DB를 직접 조작할 수 있도록 MCP 연결',
    type: 'setup',
    checkpoints: [
      'claude mcp add 명령 실행 완료',
      'Claude Code 재시작 완료',
      '브라우저에서 OAuth 인증 완료',
    ],
  },
  {
    step: 'Step 0-6',
    phase: 'Phase 0',
    title: 'MCP 연결 확인',
    goal: 'MCP가 정상 연결되었는지 테스트',
    type: 'setup',
    checkpoints: [
      '/mcp에서 supabase가 connected 표시',
      'list_tables 실행 시 에러 없이 결과 반환',
    ],
  },
  // Phase 1
  {
    step: 'Step 1',
    phase: 'Phase 1',
    title: '제품 테이블 생성',
    goal: 'products 테이블 생성 (MCP apply_migration)',
    type: 'database',
    checkpoints: [
      'apply_migration 성공',
      '마이그레이션 목록에 create_products_simple 표시',
    ],
    storybook: 'UX Architecture/Data Model → Schema 탭',
  },
  {
    step: 'Step 2',
    phase: 'Phase 1',
    title: '테스트 데이터 입력',
    goal: '샘플 제품 데이터 삽입 및 환경변수 활성화',
    type: 'database',
    checkpoints: [
      '데이터 삽입 성공 (3개 행)',
      '조회 시 3개 제품 데이터 반환',
      '브라우저에서 제품 카드 표시',
    ],
    storybook: 'Section/ProductShowcase',
  },
  {
    step: 'Step 3',
    phase: 'Phase 1',
    title: '제품 데이터 서비스 & 컨텍스트',
    goal: 'Supabase 연동 서비스 및 React Context 생성',
    type: 'frontend',
    checkpoints: [
      'src/lib/supabase.js 생성 완료',
      'src/services/productService.js 생성 완료',
      'src/contexts/ProductContext.jsx 생성 완료',
      'App.jsx에서 ProductProvider로 감싸기 완료',
      '브라우저에서 제품 데이터 표시 확인',
    ],
  },
  {
    step: 'Step 4',
    phase: 'Phase 1',
    title: '제품 목록 페이지',
    goal: 'Admin 라우트 및 제품 목록 페이지 구현',
    type: 'frontend',
    checkpoints: [
      '/admin/products 페이지 접근 가능',
      '3개 제품이 테이블에 표시',
      '사이드바 메뉴 표시',
    ],
    storybook: 'UX Architecture/Admin Pages → Product List 탭',
  },
  // Phase 2
  {
    step: 'Step 5',
    phase: 'Phase 2',
    title: '제품 상세/수정 페이지',
    goal: '제품 편집 폼 구현 및 필드 확장',
    type: 'mixed',
    checkpoints: [
      '/admin/products/:id 페이지 동작',
      '폼에 기존 데이터 표시',
      '수정 후 저장 성공',
      '목록에서 변경 내용 확인',
    ],
    storybook: 'UX Architecture/Admin Pages → Product Edit 탭',
  },
  {
    step: 'Step 6',
    phase: 'Phase 2',
    title: '이미지 업로드 (Storage)',
    goal: 'Supabase Storage 버킷 생성 및 업로드 기능',
    type: 'mixed',
    checkpoints: [
      'product-images 버킷 생성',
      'product-videos 버킷 생성',
      '정책 적용 완료',
      '이미지 업로드 테스트 성공',
    ],
    storybook: 'UX Architecture/Data Model → Docs (Storage 버킷)',
  },
  {
    step: 'Step 7',
    phase: 'Phase 2',
    title: '관련 테이블 (types, options)',
    goal: 'product_types, product_options 테이블 생성',
    type: 'database',
    checkpoints: [
      'product_types 테이블 생성',
      'product_options 테이블 생성',
      '초기 데이터 삽입 확인',
      '제품 편집 시 타입 선택 가능',
    ],
    storybook: 'UX Architecture/Data Model → Docs (테이블 관계)',
  },
  // Phase 3
  {
    step: 'Step 8',
    phase: 'Phase 3',
    title: '주문 테이블 설계',
    goal: 'orders, order_items, order_statuses 테이블 생성',
    type: 'database',
    checkpoints: [
      '3개 테이블 생성 완료',
      'order_statuses에 5개 상태 삽입됨',
      'FK 관계 정상 동작',
    ],
    storybook: 'UX Architecture/Data Model → Schema (orders)',
  },
  {
    step: 'Step 9',
    phase: 'Phase 3',
    title: '주문 목록 & 상세',
    goal: '주문 View 생성 및 페이지 구현',
    type: 'mixed',
    checkpoints: [
      'View 생성 완료',
      '/admin/orders 페이지에서 주문 목록 표시',
      '상태별 색상 Chip 표시',
      '/admin/orders/:id에서 상세 정보 표시',
    ],
    storybook: 'UX Architecture/Admin Pages → Order List 탭',
  },
  {
    step: 'Step 10',
    phase: 'Phase 3',
    title: '상태 변경 워크플로우',
    goal: '주문 상태 전환 규칙 구현',
    type: 'frontend',
    checkpoints: [
      '상태 드롭다운에서 선택 가능',
      '"상태 변경" 버튼 클릭 시 업데이트',
      '상태별 타임스탬프 기록',
    ],
    storybook: 'UX Architecture/Admin Pages → OrderStatus',
  },
  // Phase 4
  {
    step: 'Step 11',
    phase: 'Phase 4',
    title: 'Supabase Auth 설정',
    goal: 'admin_profiles 테이블 및 사용자 생성',
    type: 'database',
    checkpoints: [
      'auth.users에 사용자 생성됨',
      'admin_profiles에 레코드 추가됨',
    ],
    storybook: 'UX Architecture/Admin Site Map (사용자 역할)',
  },
  {
    step: 'Step 12',
    phase: 'Phase 4',
    title: '로그인 페이지',
    goal: 'Auth Context 및 로그인 UI 구현',
    type: 'frontend',
    checkpoints: [
      '/admin/login 페이지 표시',
      '로그인 성공 시 /admin/products로 이동',
      '실패 시 에러 메시지 표시',
    ],
    storybook: 'UX Architecture/Admin Pages → Login 탭',
  },
  {
    step: 'Step 13',
    phase: 'Phase 4',
    title: 'RLS 정책 적용',
    goal: '행 수준 보안 정책 활성화',
    type: 'database',
    checkpoints: [
      '비로그인 상태에서 활성 제품만 조회',
      'Admin 로그인 시 모든 제품 조회/수정 가능',
      '비로그인 상태에서 INSERT 시 에러',
    ],
  },
  {
    step: 'Step 14',
    phase: 'Phase 4',
    title: 'Protected Route',
    goal: '인증 상태 확인 및 라우트 보호',
    type: 'frontend',
    checkpoints: [
      '미로그인 시 /admin/* 접근 불가',
      '로그인 후 Admin 페이지 접근 가능',
      '세션 만료 시 자동 로그아웃',
    ],
    storybook: 'UX Architecture/Admin Site Map (사용자 역할)',
  },
];

// MCP 도구 설명
export const mcpTools = [
  { tool: 'list_tables', description: '테이블 목록 조회' },
  { tool: 'apply_migration', description: 'DDL 실행 (CREATE, ALTER, DROP)' },
  { tool: 'execute_sql', description: 'DML 실행 (SELECT, INSERT, UPDATE, DELETE)' },
  { tool: 'list_migrations', description: '마이그레이션 이력 조회' },
  { tool: 'get_logs', description: '로그 조회' },
  { tool: 'get_advisors', description: '보안/성능 권고사항 확인' },
];

// API 키 정보
export const apiKeyInfo = [
  { item: 'Project URL', location: 'API Settings 상단', usage: '모든 API 호출에 사용', public: true },
  { item: 'anon / public key', location: 'Project API keys', usage: '프론트엔드 클라이언트', public: true },
  { item: 'service_role key', location: 'Project API keys', usage: '서버/MCP (RLS 우회)', public: false },
  { item: 'Project Reference ID', location: 'General > Reference ID', usage: 'MCP 연결에 사용', public: true },
];

// 주의사항 (자주 발생하는 문제)
export const commonIssues = {
  auth: [
    {
      symptom: '제품 CRUD 시 403 Forbidden',
      cause: 'is_admin() 함수의 role 값 불일치',
      solution: 'admin_profiles.role을 "admin"으로 수정하거나, 함수에 "super_admin" 추가',
    },
    {
      symptom: '로그인 페이지 무한 로딩',
      cause: '로컬 스토리지의 sb-* 토큰 손상',
      solution: '개발자 도구 > Local Storage에서 sb- 키 삭제',
    },
    {
      symptom: '환경변수 미인식',
      cause: '.env 파일 미설정',
      solution: 'VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 확인',
    },
  ],
  data: [
    {
      symptom: '메인 페이지만 무한 로딩 (어드민은 정상)',
      cause: 'Supabase 컬럼명과 컴포넌트 props 불일치',
      solution: 'ProductContext에서 데이터 변환 로직 적용',
    },
    {
      symptom: '간헐적 무한 로딩 (새로고침하면 됨)',
      cause: 'Vite HMR로 Supabase 클라이언트 중복 생성',
      solution: 'supabase.js에 싱글톤 패턴 적용',
    },
  ],
  react: [
    {
      symptom: 'Executing query... 후 응답 없음',
      cause: 'Auth/API 동시 초기화 충돌',
      solution: 'AuthProvider를 Admin 라우트에만 적용',
    },
    {
      symptom: 'Strict Mode에서 AbortError',
      cause: 'useEffect 두 번 실행으로 첫 요청 abort',
      solution: 'Context 레벨에서 fetchingRef + 데이터 체크 사용',
    },
  ],
};

// Storybook 참조 맵
export const storybookReferences = [
  { story: 'Admin Site Map', phases: 'Phase 0-4', usage: 'URL 구조, 메뉴 구성, 역할 정의' },
  { story: 'Admin Pages → Login', phases: 'Phase 4', usage: '로그인 UI/플로우' },
  { story: 'Admin Pages → Product List', phases: 'Phase 1-2', usage: '테이블 컬럼, 필터' },
  { story: 'Admin Pages → Product Edit', phases: 'Phase 2', usage: '폼 필드, 유효성 검사' },
  { story: 'Admin Pages → Order List', phases: 'Phase 3', usage: '주문 테이블, 상태 정의' },
  { story: 'Admin Pages → Order Detail', phases: 'Phase 3', usage: '섹션 구성, 상태 변경' },
  { story: 'Admin Pages → OrderStatus', phases: 'Phase 3', usage: '상태 전환 규칙' },
  { story: 'Admin Pages → ErrorStates', phases: 'Phase 1-4', usage: '에러/빈 상태 메시지' },
  { story: 'Data Model → Docs', phases: 'Phase 1-3', usage: '테이블 구조, 관계, Storage' },
  { story: 'Data Model → Schema', phases: 'Phase 1-3', usage: '필드별 상세 정의' },
  { story: 'Data Model → API', phases: 'Phase 2-3', usage: 'REST API 엔드포인트' },
];

// 스텝 타입별 색상
export const stepTypeColors = {
  setup: 'default',
  database: 'primary',
  frontend: 'success',
  mixed: 'secondary',
};

// 환경 변수 예시
export const envVariables = [
  { key: 'VITE_SUPABASE_URL', value: 'https://your-project-ref.supabase.co', description: 'Supabase 프로젝트 URL' },
  { key: 'VITE_SUPABASE_ANON_KEY', value: 'eyJhbGciOiJIUzI1NiIs...', description: '익명 공개 키' },
  { key: 'VITE_USE_SUPABASE', value: 'true', description: 'Supabase 활성화 플래그' },
];

// MCP 명령어 Quick Reference
export const mcpCommands = [
  {
    command: 'claude mcp add supabase --transport http "https://mcp.supabase.com/mcp?project_ref=YOUR_REF"',
    description: 'MCP 서버 추가',
  },
  {
    command: 'claude mcp remove supabase',
    description: 'MCP 서버 제거',
  },
  {
    command: '/mcp',
    description: '현재 MCP 상태 확인',
  },
];

// ============================================================
// 튜토리얼 데이터 - 디자이너용 UX 레벨 프롬프트
// ============================================================

/**
 * Step별 Claude Code 프롬프트 및 터미널 명령어
 *
 * 원칙:
 * - SQL/코드 직접 작성 금지 → UX 문서 참조로 대체
 * - 개발 용어 최소화 → 디자이너가 이해하는 단어 사용
 * - @docs 참조로 Claude가 알아서 구현하도록 유도
 */
export const stepTutorials = {
  // ==================== Phase 0: 환경 설정 ====================
  'Step 0-4': {
    title: '프론트엔드 환경변수 설정',
    terminal: [
      {
        description: '.env.local 파일 생성',
        command: `cat > .env.local << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Feature flag (나중에 true로 변경)
VITE_USE_SUPABASE=false
EOF`,
      },
    ],
    note: 'YOUR_PROJECT_REF와 YOUR_ANON_KEY를 Step 0-3에서 메모한 값으로 교체하세요.',
  },

  'Step 0-5': {
    title: 'Claude Code MCP 설정',
    terminal: [
      {
        description: 'MCP 서버 추가',
        command: 'claude mcp add supabase --transport http -s project "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF"',
      },
    ],
    note: 'Claude Code 재시작 후 /mcp 입력 → supabase 선택 → 브라우저에서 OAuth 인증 완료',
  },

  'Step 0-6': {
    title: 'MCP 연결 확인',
    prompt: [
      {
        description: '연결 테스트',
        text: '현재 Supabase에 어떤 테이블이 있는지 확인해줘.',
      },
    ],
    expectedResult: '빈 배열 [] 또는 기존 테이블 목록이 표시됩니다.',
  },

  // ==================== Phase 1: 제품 등록하기 ====================
  'Step 1': {
    title: '제품 테이블 생성',
    prompt: [
      {
        description: '제품 데이터 모델 기반 테이블 생성',
        text: '@docs/supabase/data-model.md 의 products 테이블 정의를 참고해서 Supabase MCP로 제품 테이블을 생성해줘. 일단 기본 필드(제품명, lux, kelvin, 가격, 활성 상태)만 포함해줘.',
      },
    ],
    expectedResult: '마이그레이션 목록에 products 테이블 생성이 표시됩니다.',
  },

  'Step 2': {
    title: '테스트 데이터 입력',
    prompt: [
      {
        description: '샘플 제품 데이터 추가',
        text: '방금 만든 products 테이블에 테스트용 조명 제품 3개를 추가해줘. 제품명은 Aurora Pendant, Ember Floor Lamp, Zenith Desk Light로 해줘.',
      },
    ],
    terminal: [
      {
        description: '환경변수 활성화 후 개발 서버 재시작',
        command: 'sed -i "" "s/VITE_USE_SUPABASE=false/VITE_USE_SUPABASE=true/" .env.local && pnpm dev',
      },
    ],
    expectedResult: '브라우저에서 제품 카드가 표시됩니다.',
  },

  'Step 3': {
    title: '프론트엔드 연동',
    prompt: [
      {
        description: 'Supabase 연동 파일 생성',
        text: 'Supabase 클라이언트 파일(src/lib/supabase.js)과 제품 데이터를 가져오는 서비스(src/services/productService.js)를 만들어줘. ProductContext도 만들어서 앱 전체에서 제품 데이터를 사용할 수 있게 해줘. App.jsx에서 ProductProvider로 전체 앱을 감싸줘.',
      },
    ],
    expectedResult: '브라우저에서 Supabase 제품 데이터가 표시됩니다.',
  },

  'Step 4': {
    title: '제품 목록 페이지',
    prompt: [
      {
        description: 'Admin 라우트 및 목록 페이지',
        text: '@docs/supabase/information-architecture.md 의 Admin Site Map을 참고해서 Admin 레이아웃(사이드바, 헤더)과 제품 목록 페이지를 만들어줘. /admin/products 경로로 접근 가능하도록 라우트 설정도 해줘. Phase 4 전까지는 인증 없이 접근 가능하도록 해줘.',
      },
    ],
    expectedResult: '/admin/products에서 제품 목록이 테이블로 표시됩니다.',
  },

  // ==================== Phase 2: 제품 CRUD 완성 ====================
  'Step 5': {
    title: '제품 상세/수정 페이지',
    prompt: [
      {
        description: '제품 필드 확장 (DB)',
        text: '@docs/supabase/data-model.md 의 products 테이블 전체 필드를 참고해서 부족한 필드(설명, 이미지 URL 등)를 추가해줘.',
      },
      {
        description: '제품 수정 페이지 (UI)',
        text: '@docs/supabase/information-architecture.md 의 Product Edit Page 스펙을 참고해서 /admin/products/:id 페이지를 만들어줘. 제품 정보를 수정하고 저장할 수 있는 폼을 구현해줘.',
      },
    ],
    expectedResult: '제품 수정 폼이 동작하고, 저장 시 목록에 반영됩니다.',
  },

  'Step 6': {
    title: '이미지 업로드',
    prompt: [
      {
        description: 'Storage 버킷 설정 (DB)',
        text: '@docs/supabase/data-model.md 의 Storage Buckets 섹션을 참고해서 제품 이미지와 비디오를 저장할 버킷을 설정해줘. 누구나 읽을 수 있도록 해줘.',
      },
      {
        description: '이미지 업로드 기능 (UI)',
        text: '제품 수정 페이지에 이미지 업로드 기능을 추가해줘. product-images 버킷에 파일을 업로드하고, 업로드된 URL을 제품의 day_image_url, night_image_url 필드에 저장해줘.',
      },
    ],
    note: 'Supabase Dashboard > Storage에서 버킷을 먼저 생성해야 합니다.',
  },

  'Step 7': {
    title: '제품 타입 & 옵션 테이블',
    prompt: [
      {
        description: '제품 타입과 옵션 테이블 생성',
        text: '@docs/supabase/data-model.md 의 product_types와 product_options 테이블 정의를 참고해서 테이블을 생성하고 초기 데이터를 넣어줘. products 테이블과 연결도 해줘.',
      },
    ],
    expectedResult: '제품 편집 시 타입을 선택할 수 있습니다.',
  },

  // ==================== Phase 3: 주문 관리 ====================
  'Step 8': {
    title: '주문 테이블 설계',
    prompt: [
      {
        description: '주문 관련 테이블 생성',
        text: '@docs/supabase/data-model.md 의 orders, order_items, order_statuses 테이블 정의를 참고해서 주문 관련 테이블들을 모두 생성해줘. 주문 상태 초기 데이터(대기, 확인, 배송중, 완료, 취소)도 넣어줘.',
      },
    ],
    expectedResult: '3개의 주문 관련 테이블이 생성됩니다.',
  },

  'Step 9': {
    title: '주문 목록 & 상세 페이지',
    prompt: [
      {
        description: '주문 조회용 View (DB)',
        text: '@docs/supabase/data-model.md 의 orders_with_status View 정의를 참고해서 주문 목록 조회용 View를 만들어줘. 주문 정보에 상태 라벨, 색상, 주문 항목 수가 함께 조회되도록 해줘.',
      },
      {
        description: '주문 목록/상세 페이지 (UI)',
        text: '@docs/supabase/information-architecture.md 의 Admin Site Map을 참고해서 주문 목록 페이지(/admin/orders)와 상세 페이지(/admin/orders/:id)를 만들어줘. 목록은 테이블로 보여주고, 상태별로 색상 Chip을 표시해줘. 상세 페이지에서는 주문 정보, 주문 항목, 상태 타임라인을 보여줘.',
      },
    ],
    expectedResult: '주문 목록과 상세 페이지가 동작합니다.',
  },

  'Step 10': {
    title: '주문 상태 변경',
    prompt: [
      {
        description: '상태 변경 로직',
        text: '주문 상태를 변경하는 기능을 구현해줘. orderService.js에 updateOrderStatus 함수를 만들어서: 현재 상태에서 가능한 다음 상태만 선택 가능하도록 검증하고, 상태 변경 시 해당 타임스탬프를 자동 기록해줘 (confirmed_at, shipped_at 등).',
      },
      {
        description: '상태 변경 UI',
        text: '주문 상세 페이지에 상태 변경 UI를 추가해줘. 현재 상태에서 가능한 다음 상태만 드롭다운에 표시하고, "상태 변경" 버튼 클릭 시 업데이트되도록 해줘. 상태 변경 이력은 Stepper로 타임라인 형태로 보여줘.',
      },
    ],
    expectedResult: '주문 상세에서 상태 변경이 가능합니다.',
  },

  // ==================== Phase 4: 인증 & 보안 ====================
  'Step 11': {
    title: '어드민 사용자 설정',
    prompt: [
      {
        description: '어드민 프로필 테이블 생성',
        text: '@docs/supabase/data-model.md 의 admin_profiles 테이블 정의를 참고해서 어드민 프로필 테이블을 생성해줘.',
      },
    ],
    note: '먼저 Supabase Dashboard > Authentication > Users에서 어드민 사용자를 생성하세요.',
  },

  'Step 12': {
    title: '로그인 페이지',
    prompt: [
      {
        description: 'Auth Context (로직)',
        text: 'Supabase Auth를 사용하는 AuthContext를 만들어줘. 로그인, 로그아웃, 세션 관리 기능을 포함해줘. 로그인 성공 시 admin_profiles 테이블에서 관리자 정보를 확인해줘.',
      },
      {
        description: '로그인 페이지 (UI)',
        text: '@docs/supabase/information-architecture.md 의 Admin Site Map을 참고해서 /admin/login 로그인 페이지를 만들어줘. 이메일과 비밀번호 입력 필드, 로그인 버튼을 포함하고, 로그인 성공 시 /admin/products로 이동해줘. 에러 발생 시 메시지를 표시해줘.',
      },
    ],
    expectedResult: '이메일/비밀번호로 로그인이 가능합니다.',
  },

  'Step 13': {
    title: '접근 권한 설정',
    prompt: [
      {
        description: 'RLS 정책 적용',
        text: '@docs/supabase/data-model.md 의 Row Level Security 섹션을 참고해서 products 테이블에 보안 정책을 적용해줘. 일반 사용자는 활성 제품만, 어드민은 모든 제품을 볼 수 있도록 해줘.',
      },
    ],
    note: '다른 테이블들에도 동일한 패턴으로 RLS를 적용하세요.',
  },

  'Step 14': {
    title: '페이지 보호',
    prompt: [
      {
        description: 'Protected Route (로직)',
        text: '인증이 필요한 Admin 페이지들을 보호하는 ProtectedRoute 컴포넌트를 만들어줘. AuthContext를 사용해서: 미로그인 시 /admin/login으로 리다이렉트, 로딩 중에는 스피너 표시, 세션 만료 시 자동 로그아웃 처리해줘.',
      },
    ],
    expectedResult: '비로그인 상태에서 /admin/products 접근 시 로그인 페이지로 이동합니다.',
  },
};
