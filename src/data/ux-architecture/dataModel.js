/**
 * Data Model
 *
 * Source: docs/supabase/data-model.md
 * DB 스키마 및 관계 데이터
 */

export const tables = {
  product_types: {
    description: '제품 유형 정의',
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK', description: 'Auto-generated' },
      { name: 'value', type: 'TEXT', constraint: 'UNIQUE, NOT NULL', description: 'ceiling, stand, wall, desk' },
      { name: 'label', type: 'TEXT', constraint: 'NOT NULL', description: 'Ceiling, Stand, Wall, Desk' },
      { name: 'sort_order', type: 'INTEGER', constraint: 'DEFAULT 0', description: '정렬 순서' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '생성 시간' },
    ],
  },
  product_options: {
    description: '제품 옵션 (glass_finish, hardware, height)',
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK', description: 'Auto-generated' },
      { name: 'category', type: 'TEXT', constraint: 'NOT NULL', description: 'glass_finish, hardware, height' },
      { name: 'value', type: 'TEXT', constraint: 'NOT NULL', description: 'clear, patina-brass, 36-48' },
      { name: 'label', type: 'TEXT', constraint: 'NOT NULL', description: 'Clear, Patina Brass, 36" - 48"' },
      { name: 'sort_order', type: 'INTEGER', constraint: 'DEFAULT 0', description: '정렬 순서' },
      { name: 'is_active', type: 'BOOLEAN', constraint: 'DEFAULT true', description: '활성화 여부' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '생성 시간' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '수정 시간' },
    ],
  },
  products: {
    description: '제품 정보',
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK', description: 'Auto-generated' },
      { name: 'title', type: 'TEXT', constraint: 'NOT NULL', description: '제품명' },
      { name: 'description', type: 'TEXT', constraint: '', description: '제품 설명' },
      { name: 'type_id', type: 'UUID', constraint: 'FK -> product_types.id', description: '제품 유형' },
      { name: 'lux', type: 'INTEGER', constraint: 'NOT NULL, DEFAULT 0', description: '조도' },
      { name: 'kelvin', type: 'INTEGER', constraint: 'NOT NULL, DEFAULT 0', description: '색온도' },
      { name: 'price', type: 'DECIMAL(10,2)', constraint: 'DEFAULT 0', description: '가격' },
      { name: 'day_image_url', type: 'TEXT', constraint: '', description: '낮 이미지 URL' },
      { name: 'night_image_url', type: 'TEXT', constraint: '', description: '밤 이미지 URL' },
      { name: 'video_url', type: 'TEXT', constraint: '', description: '비디오 URL' },
      { name: 'is_active', type: 'BOOLEAN', constraint: 'DEFAULT true', description: '활성화 여부' },
      { name: 'sort_order', type: 'INTEGER', constraint: 'DEFAULT 0', description: '정렬 순서' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '생성 시간' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '수정 시간' },
    ],
  },
  order_statuses: {
    description: '주문 상태 정의',
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK', description: 'Auto-generated' },
      { name: 'value', type: 'TEXT', constraint: 'UNIQUE, NOT NULL', description: 'pending, confirmed, shipped...' },
      { name: 'label', type: 'TEXT', constraint: 'NOT NULL', description: 'Pending, Confirmed...' },
      { name: 'label_ko', type: 'TEXT', constraint: 'NOT NULL', description: '주문 대기, 주문 확인...' },
      { name: 'color', type: 'TEXT', constraint: 'NOT NULL', description: 'warning, info, primary...' },
      { name: 'sort_order', type: 'INTEGER', constraint: 'DEFAULT 0', description: '정렬 순서' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '생성 시간' },
    ],
  },
  orders: {
    description: '주문 정보',
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK', description: 'Auto-generated' },
      { name: 'order_number', type: 'TEXT', constraint: 'UNIQUE, NOT NULL', description: 'LUM-YYYYMMDD-NNN' },
      { name: 'status_id', type: 'UUID', constraint: 'FK -> order_statuses.id', description: '주문 상태' },
      { name: 'email', type: 'TEXT', constraint: 'NOT NULL', description: '이메일' },
      { name: 'newsletter', type: 'BOOLEAN', constraint: 'DEFAULT false', description: '뉴스레터 구독' },
      { name: 'country', type: 'TEXT', constraint: 'NOT NULL, DEFAULT KR', description: '국가' },
      { name: 'first_name', type: 'TEXT', constraint: 'NOT NULL', description: '이름' },
      { name: 'last_name', type: 'TEXT', constraint: 'NOT NULL', description: '성' },
      { name: 'company', type: 'TEXT', constraint: '', description: '회사명' },
      { name: 'address', type: 'TEXT', constraint: 'NOT NULL', description: '주소' },
      { name: 'apartment', type: 'TEXT', constraint: '', description: '상세주소' },
      { name: 'city', type: 'TEXT', constraint: 'NOT NULL', description: '도시' },
      { name: 'zip_code', type: 'TEXT', constraint: 'NOT NULL', description: '우편번호' },
      { name: 'phone', type: 'TEXT', constraint: '', description: '전화번호' },
      { name: 'subtotal', type: 'DECIMAL(10,2)', constraint: 'NOT NULL, DEFAULT 0', description: '소계' },
      { name: 'shipping_cost', type: 'DECIMAL(10,2)', constraint: 'DEFAULT 0', description: '배송비' },
      { name: 'discount', type: 'DECIMAL(10,2)', constraint: 'DEFAULT 0', description: '할인' },
      { name: 'total', type: 'DECIMAL(10,2)', constraint: 'NOT NULL, DEFAULT 0', description: '합계' },
      { name: 'currency', type: 'TEXT', constraint: 'DEFAULT KRW', description: '통화' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '생성 시간' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '수정 시간' },
    ],
  },
  order_items: {
    description: '주문 항목',
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK', description: 'Auto-generated' },
      { name: 'order_id', type: 'UUID', constraint: 'FK -> orders.id, NOT NULL', description: '주문 ID' },
      { name: 'product_id', type: 'UUID', constraint: 'FK -> products.id', description: '제품 ID' },
      { name: 'product_title', type: 'TEXT', constraint: 'NOT NULL', description: '제품명 (스냅샷)' },
      { name: 'product_lux', type: 'INTEGER', constraint: '', description: '조도 (스냅샷)' },
      { name: 'product_kelvin', type: 'INTEGER', constraint: '', description: '색온도 (스냅샷)' },
      { name: 'product_image_url', type: 'TEXT', constraint: '', description: '이미지 URL (스냅샷)' },
      { name: 'options', type: 'JSONB', constraint: 'DEFAULT {}', description: '선택 옵션' },
      { name: 'quantity', type: 'INTEGER', constraint: 'NOT NULL, DEFAULT 1', description: '수량' },
      { name: 'unit_price', type: 'DECIMAL(10,2)', constraint: 'NOT NULL, DEFAULT 0', description: '단가' },
      { name: 'line_total', type: 'DECIMAL(10,2)', constraint: 'NOT NULL, DEFAULT 0', description: '합계' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '생성 시간' },
    ],
  },
  admin_profiles: {
    description: '어드민 프로필',
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK, FK -> auth.users.id', description: 'Supabase Auth 연동' },
      { name: 'display_name', type: 'TEXT', constraint: '', description: '표시 이름' },
      { name: 'role', type: 'TEXT', constraint: 'DEFAULT admin', description: 'admin, editor, viewer' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '생성 시간' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', constraint: 'DEFAULT now()', description: '수정 시간' },
    ],
  },
};

export const relationships = [
  { relationship: 'products.type_id -> product_types.id', type: 'N:1', description: '제품은 하나의 타입을 가짐' },
  { relationship: 'orders.status_id -> order_statuses.id', type: 'N:1', description: '주문은 하나의 상태를 가짐' },
  { relationship: 'order_items.order_id -> orders.id', type: 'N:1', description: '주문 항목은 하나의 주문에 속함' },
  { relationship: 'order_items.product_id -> products.id', type: 'N:1', description: '주문 항목은 하나의 제품을 참조' },
  { relationship: 'admin_profiles.id -> auth.users.id', type: '1:1', description: '어드민 프로필은 Supabase Auth 사용자와 연결' },
];

export const tablesOverview = [
  { table: 'product_types', description: '제품 유형 정의', pk: 'id (UUID)' },
  { table: 'product_options', description: '제품 옵션 (glass_finish, hardware, height)', pk: 'id (UUID)' },
  { table: 'products', description: '제품 정보', pk: 'id (UUID)' },
  { table: 'order_statuses', description: '주문 상태 정의', pk: 'id (UUID)' },
  { table: 'orders', description: '주문 정보', pk: 'id (UUID)' },
  { table: 'order_items', description: '주문 항목', pk: 'id (UUID)' },
  { table: 'admin_profiles', description: '어드민 프로필', pk: 'id (UUID, FK to auth.users)' },
];

export const apiEndpoints = [
  { method: 'GET', endpoint: '/products', description: '제품 목록', auth: 'Public' },
  { method: 'GET', endpoint: '/products/:id', description: '제품 상세', auth: 'Public' },
  { method: 'POST', endpoint: '/products', description: '제품 생성', auth: 'Admin' },
  { method: 'PATCH', endpoint: '/products/:id', description: '제품 수정', auth: 'Admin' },
  { method: 'DELETE', endpoint: '/products/:id', description: '제품 삭제', auth: 'Admin' },
  { method: 'GET', endpoint: '/orders', description: '주문 목록', auth: 'Admin' },
  { method: 'GET', endpoint: '/orders/:id', description: '주문 상세', auth: 'Admin' },
  { method: 'POST', endpoint: '/orders', description: '주문 생성', auth: 'Public' },
  { method: 'PATCH', endpoint: '/orders/:id/status', description: '상태 변경', auth: 'Admin' },
  { method: 'GET', endpoint: '/product-options', description: '옵션 목록', auth: 'Public' },
  { method: 'POST', endpoint: '/product-options', description: '옵션 생성', auth: 'Admin' },
  { method: 'PATCH', endpoint: '/product-options/:id', description: '옵션 수정', auth: 'Admin' },
  { method: 'DELETE', endpoint: '/product-options/:id', description: '옵션 삭제', auth: 'Admin' },
];

export const storageBuckets = [
  {
    bucket: 'product-images',
    public: true,
    structure: [
      { path: 'product-images/day/{product_id}.png', description: '낮 이미지' },
      { path: 'product-images/night/{product_id}.png', description: '밤 이미지' },
    ],
  },
  {
    bucket: 'product-videos',
    public: true,
    structure: [
      { path: 'product-videos/{product_id}.mp4', description: '제품 비디오' },
    ],
  },
];

// TreeNode용 계층 구조
export const dataModelTree = {
  'product_types': {
    id: 'UUID (PK)',
    value: 'TEXT (UNIQUE)',
    label: 'TEXT',
    sort_order: 'INTEGER',
  },
  'products': {
    id: 'UUID (PK)',
    title: 'TEXT (NOT NULL)',
    type_id: 'UUID (FK -> product_types.id)',
    lux: 'INTEGER',
    kelvin: 'INTEGER',
    price: 'DECIMAL',
    day_image_url: 'TEXT',
    night_image_url: 'TEXT',
    is_active: 'BOOLEAN',
  },
  'orders': {
    id: 'UUID (PK)',
    order_number: 'TEXT (UNIQUE)',
    status_id: 'UUID (FK -> order_statuses.id)',
    email: 'TEXT (NOT NULL)',
    shipping: '배송 정보...',
    totals: '금액 정보...',
  },
  'order_items': {
    id: 'UUID (PK)',
    order_id: 'UUID (FK -> orders.id)',
    product_id: 'UUID (FK -> products.id)',
    product_snapshot: '제품 스냅샷...',
    options: 'JSONB',
    quantity: 'INTEGER',
    line_total: 'DECIMAL',
  },
};
