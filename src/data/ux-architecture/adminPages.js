/**
 * Admin Pages Data
 *
 * Source: docs/supabase/information-architecture.md
 * 페이지별 상세 스펙 데이터
 */

export const pages = {
  login: {
    url: '/admin/login',
    purpose: '어드민 인증',
    uiElements: [
      '로고',
      '이메일 입력 (UnderlineInput)',
      '비밀번호 입력 (UnderlineInput, type="password")',
      '로그인 버튼',
      '에러 메시지 영역',
    ],
    flow: [
      '이메일/비밀번호 입력',
      '로그인 버튼 클릭',
      'Supabase Auth 인증',
      '성공 시 /admin/products로 리다이렉트',
      '실패 시 에러 메시지 표시',
    ],
  },
  productList: {
    url: '/admin/products',
    purpose: '등록된 제품 목록 조회 및 관리',
    layoutComponents: [
      'AdminHeader',
      'AdminSidebar',
      'Content Area (제품 관리 제목, 새 제품 버튼, 필터, 테이블, 페이지네이션)',
    ],
    tableColumns: [
      { column: 'Checkbox', field: '-', width: '48px', sortable: false },
      { column: 'Image', field: 'day_image_url', width: '80px', sortable: false },
      { column: '제목', field: 'title', width: 'flex', sortable: true },
      { column: '타입', field: 'type.label', width: '100px', sortable: true },
      { column: 'Lux', field: 'lux', width: '80px', sortable: true },
      { column: 'Kelvin', field: 'kelvin', width: '80px', sortable: true },
      { column: '상태', field: 'is_active', width: '80px', sortable: true },
      { column: '액션', field: '-', width: '60px', sortable: false },
    ],
    filters: [
      { name: '타입', options: ['All', 'Ceiling', 'Stand', 'Wall', 'Desk'] },
      { name: '상태', options: ['All', 'Active', 'Inactive'] },
      { name: '검색', type: 'text', placeholder: '제목 기준 텍스트 검색' },
    ],
    actions: [
      { action: '새 제품', description: '/admin/products/new로 이동' },
      { action: '수정', description: '/admin/products/:id로 이동' },
      { action: '삭제', description: '확인 다이얼로그 후 soft delete (is_active = false)' },
      { action: '일괄 삭제', description: '체크박스 선택 후 삭제' },
    ],
  },
  productEdit: {
    url: '/admin/products/new 또는 /admin/products/:id',
    purpose: '제품 등록 및 수정',
    layoutComponents: [
      'AdminHeader',
      'AdminSidebar',
      'Content Area (목록으로 버튼, 페이지 제목, 폼 섹션들, 액션 버튼)',
    ],
    formSections: ['기본 정보', '기술 사양', '미디어'],
    formFields: [
      { section: '기본 정보', field: 'title', type: 'text', required: true, validation: 'max 100자' },
      { section: '기본 정보', field: 'description', type: 'textarea', required: false, validation: 'max 1000자' },
      { section: '기본 정보', field: 'type_id', type: 'select', required: true, validation: 'product_types에서 선택' },
      { section: '기술 사양', field: 'lux', type: 'number', required: true, validation: '0-1000' },
      { section: '기술 사양', field: 'kelvin', type: 'number', required: true, validation: '1000-10000' },
      { section: '기술 사양', field: 'price', type: 'number', required: false, validation: '0 이상' },
      { section: '미디어', field: 'day_image', type: 'file', required: 'Yes (new)', validation: 'image/*, max 5MB' },
      { section: '미디어', field: 'night_image', type: 'file', required: 'Yes (new)', validation: 'image/*, max 5MB' },
      { section: '미디어', field: 'video', type: 'file', required: false, validation: 'video/mp4, max 50MB' },
    ],
  },
  orderList: {
    url: '/admin/orders',
    purpose: '주문 목록 조회 및 상태 관리',
    layoutComponents: [
      'AdminHeader',
      'AdminSidebar',
      'Content Area (주문 관리 제목, 필터, 테이블, 페이지네이션)',
    ],
    tableColumns: [
      { column: '주문번호', field: 'order_number', width: '120px', sortable: true },
      { column: '날짜', field: 'created_at', width: '100px', sortable: true },
      { column: '고객', field: 'first_name + last_name', width: 'flex', sortable: true },
      { column: '이메일', field: 'email', width: '150px', sortable: false },
      { column: '항목 수', field: 'items.count', width: '60px', sortable: false },
      { column: '합계', field: 'total', width: '100px', sortable: true },
      { column: '상태', field: 'status.label_ko', width: '100px', sortable: true },
    ],
    filters: [
      { name: '상태', options: ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] },
      { name: '날짜', type: 'dateRange', placeholder: '시작일 ~ 종료일' },
      { name: '검색', type: 'text', placeholder: '주문번호 또는 이메일' },
    ],
  },
  orderDetail: {
    url: '/admin/orders/:id',
    purpose: '주문 상세 정보 조회 및 상태 변경',
    layoutComponents: [
      'AdminHeader',
      'AdminSidebar',
      'Content Area (목록으로 버튼, 주문번호, 섹션들)',
    ],
    sections: [
      {
        name: '상태 타임라인',
        items: ['시각적 워크플로우 표시 (Stepper)', '현재 상태 하이라이트', '상태 변경 드롭다운 + 적용 버튼'],
      },
      {
        name: '고객 정보',
        items: ['이름, 이메일, 전화번호', '배송 주소 (국가, 도시, 상세주소)', '회사명 (있는 경우)'],
      },
      {
        name: '주문 항목',
        items: ['제품 썸네일', '제품명', '선택 옵션 (glass, hardware, height)', '단가 x 수량 = 금액'],
      },
      {
        name: '주문 요약',
        items: ['소계', '배송비', '할인 (있는 경우)', '최종 합계'],
      },
    ],
  },
};

export const orderStatuses = [
  { value: 'pending', labelEn: 'Pending', labelKo: '주문 대기', color: 'warning' },
  { value: 'confirmed', labelEn: 'Confirmed', labelKo: '주문 확인', color: 'info' },
  { value: 'shipped', labelEn: 'Shipped', labelKo: '배송 중', color: 'primary' },
  { value: 'delivered', labelEn: 'Delivered', labelKo: '배송 완료', color: 'success' },
  { value: 'cancelled', labelEn: 'Cancelled', labelKo: '주문 취소', color: 'error' },
];

export const statusWorkflow = [
  { from: 'pending', to: ['confirmed', 'cancelled'] },
  { from: 'confirmed', to: ['shipped', 'cancelled'] },
  { from: 'shipped', to: ['delivered'] },
  { from: 'delivered', to: [] },
  { from: 'cancelled', to: [] },
];

export const errorStates = {
  empty: [
    { context: '제품 없음', message: '등록된 제품이 없습니다. [새 제품 등록]' },
    { context: '주문 없음', message: '조회된 주문이 없습니다.' },
    { context: '검색 결과 없음', message: '검색 결과가 없습니다.' },
  ],
  error: [
    { context: '인증 실패', message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
    { context: '저장 실패', message: '저장에 실패했습니다. 다시 시도해주세요.' },
    { context: '네트워크 오류', message: '네트워크 연결을 확인해주세요.' },
  ],
};
