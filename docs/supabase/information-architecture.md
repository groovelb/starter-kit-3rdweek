# Lumenstate Admin Information Architecture

## Overview

Supabase MCP를 통한 자동 DB 설정을 위한 UX 레벨 정보구조 문서입니다.
이 문서는 어드민 시스템의 페이지 구조, 사용자 흐름, UI 컴포넌트를 정의합니다.

---

## 1. Site Map

| Path | Description |
|------|-------------|
| /admin | Root |
| /admin/login | 어드민 로그인 |
| /admin/dashboard | 대시보드 (선택적) - 주요 지표 요약 |
| /admin/products | 제품 관리 (목록) |
| /admin/products/new | 신규 제품 등록 |
| /admin/products/:id | 제품 수정 |
| /admin/orders | 주문 관리 (목록) |
| /admin/orders/:id | 주문 상세 |
| /admin/options | 제품 옵션 관리 |
| /admin/options/glass-finish | 유리 마감 옵션 |
| /admin/options/hardware | 하드웨어 옵션 |
| /admin/options/heights | 높이 옵션 |

### Site Structure

- /admin
  - /login
  - /dashboard
  - /products
    - (list) - 테이블 뷰, 필터 (타입, 상태), 검색 (제목)
    - /new
    - /:id
  - /orders
    - (list) - 테이블 뷰, 필터 (상태, 날짜), 검색 (주문번호, 이메일)
    - /:id - 고객 정보, 주문 항목, 상태 변경
  - /options
    - /glass-finish
    - /hardware
    - /heights

---

## 2. User Roles

### 2.1 Admin (관리자)
- 모든 기능 접근 가능
- 제품 CRUD
- 주문 상태 변경
- 옵션 관리

### 2.2 Editor (편집자) - 선택적
- 제품 조회/수정
- 주문 조회/상태 변경
- 옵션 조회만

### 2.3 Viewer (열람자) - 선택적
- 모든 데이터 조회만

---

## 3. Page Specifications

### 3.1 Admin Login Page

| Property | Value |
|----------|-------|
| URL | /admin/login |
| Purpose | 어드민 인증 |

**UI Elements**:
- 로고
- 이메일 입력 (UnderlineInput)
- 비밀번호 입력 (UnderlineInput, type="password")
- 로그인 버튼
- 에러 메시지 영역

**Flow**:
1. 이메일/비밀번호 입력
2. 로그인 버튼 클릭
3. Supabase Auth 인증
4. 성공 시 /admin/products로 리다이렉트
5. 실패 시 에러 메시지 표시

---

### 3.2 Product List Page

| Property | Value |
|----------|-------|
| URL | /admin/products |
| Purpose | 등록된 제품 목록 조회 및 관리 |

**Layout Components**:
- AdminHeader
- AdminSidebar
- Content Area (제품 관리 제목, 새 제품 버튼, 필터, 테이블, 페이지네이션)

**Table Columns**:

| Column | Field | Width | Sortable |
|--------|-------|-------|----------|
| Checkbox | - | 48px | No |
| Image | day_image_url | 80px | No |
| 제목 | title | flex | Yes |
| 타입 | type.label | 100px | Yes |
| Lux | lux | 80px | Yes |
| Kelvin | kelvin | 80px | Yes |
| 상태 | is_active | 80px | Yes |
| 액션 | - | 60px | No |

**Filters**:
- 타입: All / Ceiling / Stand / Wall / Desk
- 상태: All / Active / Inactive
- 검색: 제목 기준 텍스트 검색

**Actions**:
- 새 제품: /admin/products/new로 이동
- 수정: /admin/products/:id로 이동
- 삭제: 확인 다이얼로그 후 soft delete (is_active = false)
- 일괄 삭제: 체크박스 선택 후 삭제

---

### 3.3 Product Edit Page

| Property | Value |
|----------|-------|
| URL | /admin/products/new 또는 /admin/products/:id |
| Purpose | 제품 등록 및 수정 |

**Layout Components**:
- AdminHeader
- AdminSidebar
- Content Area (목록으로 버튼, 페이지 제목, 폼 섹션들, 액션 버튼)

**Form Sections**:
- 기본 정보 (제품명, 설명, 타입)
- 기술 사양 (Lux, Kelvin, 가격)
- 미디어 (낮 이미지, 밤 이미지, 비디오)

**Form Fields**:

| Section | Field | Type | Required | Validation |
|---------|-------|------|----------|------------|
| 기본 정보 | title | text | Yes | max 100자 |
| 기본 정보 | description | textarea | No | max 1000자 |
| 기본 정보 | type_id | select | Yes | product_types에서 선택 |
| 기술 사양 | lux | number | Yes | 0-1000 |
| 기술 사양 | kelvin | number | Yes | 1000-10000 |
| 기술 사양 | price | number | No | 0 이상 |
| 미디어 | day_image | file | Yes (new) | image/*, max 5MB |
| 미디어 | night_image | file | Yes (new) | image/*, max 5MB |
| 미디어 | video | file | No | video/mp4, max 50MB |

**Actions**:
- 저장: 폼 유효성 검사 → Supabase 저장 → 목록으로 이동
- 취소: 변경 사항 확인 → 목록으로 이동

---

### 3.4 Order List Page

| Property | Value |
|----------|-------|
| URL | /admin/orders |
| Purpose | 주문 목록 조회 및 상태 관리 |

**Layout Components**:
- AdminHeader
- AdminSidebar
- Content Area (주문 관리 제목, 필터, 테이블, 페이지네이션)

**Table Columns**:

| Column | Field | Width | Sortable |
|--------|-------|-------|----------|
| 주문번호 | order_number | 120px | Yes |
| 날짜 | created_at | 100px | Yes |
| 고객 | first_name + last_name | flex | Yes |
| 이메일 | email | 150px | No |
| 항목 수 | items.count | 60px | No |
| 합계 | total | 100px | Yes |
| 상태 | status.label_ko | 100px | Yes |

**Status Definitions**:

| Status Value | Label (EN) | Label (KO) | Color |
|--------------|------------|------------|-------|
| pending | Pending | 주문 대기 | warning (yellow) |
| confirmed | Confirmed | 주문 확인 | info (blue) |
| shipped | Shipped | 배송 중 | primary (indigo) |
| delivered | Delivered | 배송 완료 | success (green) |
| cancelled | Cancelled | 주문 취소 | error (red) |

**Filters**:
- 상태: All / Pending / Confirmed / Shipped / Delivered / Cancelled
- 날짜: DateRangePicker (시작일 ~ 종료일)
- 검색: 주문번호 또는 이메일

---

### 3.5 Order Detail Page

| Property | Value |
|----------|-------|
| URL | /admin/orders/:id |
| Purpose | 주문 상세 정보 조회 및 상태 변경 |

**Layout Components**:
- AdminHeader
- AdminSidebar
- Content Area (목록으로 버튼, 주문번호, 섹션들)

**Sections**:

1. **상태 타임라인**
   - 시각적 워크플로우 표시 (Stepper)
   - 현재 상태 하이라이트
   - 상태 변경 드롭다운 + 적용 버튼

2. **고객 정보**
   - 이름, 이메일, 전화번호
   - 배송 주소 (국가, 도시, 상세주소)
   - 회사명 (있는 경우)

3. **주문 항목**
   - 제품 썸네일
   - 제품명
   - 선택 옵션 (glass, hardware, height)
   - 단가 x 수량 = 금액

4. **주문 요약**
   - 소계
   - 배송비
   - 할인 (있는 경우)
   - 최종 합계

**Status Workflow**:

| From | To (Allowed) |
|------|--------------|
| pending | confirmed, cancelled |
| confirmed | shipped, cancelled |
| shipped | delivered |
| delivered | (final state) |
| cancelled | (final state) |

---

## 4. Admin Navigation

### 4.1 Sidebar Menu

| Menu Item | Path | Icon |
|-----------|------|------|
| 제품 관리 | /admin/products | inventory_2 |
| 주문 관리 | /admin/orders | receipt_long |
| 옵션 설정 | /admin/options | tune |

Footer:
- 사용자 이메일 표시
- 로그아웃 버튼

### 4.2 Header

- 햄버거 메뉴 (모바일)
- 로고/타이틀: Lumenstate Admin
- 알림 아이콘
- 프로필 아이콘

---

## 5. Responsive Breakpoints

| Breakpoint | Sidebar | Layout |
|------------|---------|--------|
| xs (0-599) | 햄버거 메뉴 (Drawer) | 단일 컬럼 |
| sm (600-899) | 접힌 아이콘 | 2 컬럼 |
| md+ (900+) | 전체 펼침 | 2 컬럼 |

---

## 6. Error States

### 6.1 Empty States

| Context | Message |
|---------|---------|
| 제품 없음 | 등록된 제품이 없습니다. [새 제품 등록] |
| 주문 없음 | 조회된 주문이 없습니다. |
| 검색 결과 없음 | 검색 결과가 없습니다. |

### 6.2 Error Messages

| Context | Message |
|---------|---------|
| 인증 실패 | 이메일 또는 비밀번호가 올바르지 않습니다. |
| 저장 실패 | 저장에 실패했습니다. 다시 시도해주세요. |
| 네트워크 오류 | 네트워크 연결을 확인해주세요. |

---

## 7. Accessibility

- 모든 폼 필드에 label 연결
- 테이블에 caption 및 적절한 scope 속성
- 키보드 네비게이션 지원
- ARIA 라벨 적용
- 색상 대비 WCAG AA 준수

---

## 8. Data Requirements

### 8.1 Product List API
```
GET /products
Query: type, is_active, search, page, limit, sort, order
Response: { data: Product[], total: number }
```

### 8.2 Order List API
```
GET /orders
Query: status, date_from, date_to, search, page, limit, sort, order
Response: { data: Order[], total: number }
```

### 8.3 Order Status Update API
```
PATCH /orders/:id/status
Body: { status: 'confirmed' | 'shipped' | 'delivered' | 'cancelled' }
Response: { success: boolean, order: Order }
```
