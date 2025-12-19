# Admin System Building Log

Lumenstate Admin Dashboard 구축 과정 기록

---

## 목차

### Phase 1-6: 초기 구축
- [Phase 1. Database Setup (Supabase MCP)](#phase-1-database-setup-supabase-mcp)
- [Phase 2. Frontend Integration](#phase-2-frontend-integration)
- [Phase 3. Authentication System](#phase-3-authentication-system)
- [Phase 4. Admin Layout Components](#phase-4-admin-layout-components)
- [Phase 5. Admin Pages](#phase-5-admin-pages)
- [Phase 6. Admin User Creation](#phase-6-admin-user-creation)

### Phase 7-10: 기능 확장 및 최적화
- [Phase 7. Public Page Supabase Integration](#phase-7-public-page-supabase-integration)
- [Phase 8. Bulk Upload Feature](#phase-8-bulk-upload-feature)
- [Phase 9. ProductContext 전역 캐싱](#phase-9-productcontext-전역-캐싱)
- [Phase 10. Provider 구조 분리](#phase-10-provider-구조-분리)

### [Appendix: 코드 참조](#appendix-코드-참조)

---

## Phase 1. Database Setup (Supabase MCP)

**요약**: Supabase MCP를 통해 7개 테이블, 2개 뷰, 4개 함수, 2개 Storage 버킷 생성

### 1.1 프로젝트 정보
- Project ID: `dmqismtournyucwmjlbp`
- Region: `ap-northeast-1`

### 1.2 Migration 적용 (19개)

| # | Migration | 설명 |
|---|-----------|------|
| 1 | `create_helper_functions` | `update_updated_at_column()` 트리거 함수 |
| 2 | `create_product_types` | 제품 유형 테이블 |
| 3 | `create_product_options` | 제품 옵션 테이블 |
| 4 | `create_products` | 제품 테이블 |
| 5 | `create_order_statuses` | 주문 상태 테이블 |
| 6 | `create_orders` | 주문 테이블 + `generate_order_number()` |
| 7 | `create_order_items` | 주문 항목 테이블 |
| 8 | `create_admin_profiles` | 어드민 프로필 테이블 |
| 9 | `enable_rls_and_helper_functions` | RLS + `is_admin()` 함수 |
| 10-15 | RLS Policies | 각 테이블별 RLS 정책 |
| 16 | `create_storage_policies` | Storage 버킷 정책 |
| 17 | `create_views` | `products_with_type`, `orders_with_status` |
| 18 | `fix_views_security_invoker` | 뷰 보안 수정 |
| 19 | `fix_functions_search_path` | 함수 search_path 보안 수정 |

### 1.3 Storage Buckets
- `product-images` (public)
- `product-videos` (public)

### 1.4 Initial Data

**product_types:**
- ceiling, stand, wall, desk (4개)

**product_options:**
- glass_finish: clear, frosted, opaline, amber, smoke (5개)
- hardware: patina-brass, polished-brass, brushed-nickel, matte-black, chrome (5개)
- height: 36-48, 49-60, 61-72, 73-84, 85-96 (5개)

**order_statuses:**
- pending, confirmed, shipped, delivered, cancelled (5개)

### 1.5 보안 Advisory 수정

| 문제 | 해결 |
|------|------|
| SECURITY DEFINER Views | `WITH (security_invoker = true)` 옵션으로 뷰 재생성 |
| Mutable Search Path Functions | 모든 함수에 `SET search_path = public` 추가 |

---

## Phase 2. Frontend Integration

**요약**: Supabase Client 설정, TypeScript 타입 생성, Service Layer 구축

### 2.1 Supabase Client 설정
- **파일**: `src/lib/supabase.js`
- 환경 변수 기반 클라이언트 초기화
- 싱글톤 패턴 (HMR 대응)

### 2.2 TypeScript Types 생성
- **파일**: `src/types/database.ts`
- Supabase MCP `generate_typescript_types` 사용
- Helper type aliases: `Product`, `Order`, `OrderItem`, `AdminProfile` 등

### 2.3 Service Layer 생성

| 파일 | 기능 |
|------|------|
| `src/services/productService.js` | 제품 CRUD, 이미지/비디오 업로드 |
| `src/services/orderService.js` | 주문 CRUD, 상태 변경 |
| `src/services/optionService.js` | 옵션 CRUD |

**관련 코드**: [Appendix 2-1](#2-1-supabase-client-설정)

---

## Phase 3. Authentication System

**요약**: AuthContext를 통한 Supabase Auth 연동, ProtectedRoute로 접근 제어

### 3.1 AuthContext 생성
- **파일**: `src/contexts/AuthContext.jsx`

**제공 기능:**
- `user` - Supabase Auth 유저
- `adminProfile` - admin_profiles 데이터
- `isAdmin` - 어드민 여부
- `isLoading` - 로딩 상태
- `signIn(email, password)` - 로그인
- `signOut()` - 로그아웃

### 3.2 ProtectedRoute 생성
- **파일**: `src/components/admin/ProtectedRoute.jsx`
- 비로그인 시 `/admin/login`으로 리다이렉트
- 어드민이 아닌 경우 접근 차단

---

## Phase 4. Admin Layout Components

**요약**: 반응형 사이드바/헤더 레이아웃 구축, ESLint 이슈 해결

### 4.1 컴포넌트 구조
- `src/components/admin/constants.js` - DRAWER_WIDTH, COLLAPSED_WIDTH
- `src/components/admin/AdminSidebar.jsx` - 사이드바 네비게이션
- `src/components/admin/AdminHeader.jsx` - 상단 헤더
- `src/components/admin/AdminLayout.jsx` - 메인 레이아웃

### 4.2 반응형 설계

| Breakpoint | Sidebar | Header |
|------------|---------|--------|
| xs (mobile) | Drawer (임시) | 햄버거 메뉴 |
| sm (tablet) | Collapsed (64px) | 축소 |
| md+ (desktop) | Full (240px) | 전체 |

### 4.3 ESLint 이슈 해결

**문제:** `react-refresh/only-export-components`
- AdminSidebar.jsx에서 컴포넌트와 상수를 함께 export

**해결:** `constants.js` 파일 분리

---

## Phase 5. Admin Pages

**요약**: 6개 어드민 페이지 생성, 라우팅 설정

### 5.1 페이지 구조

| 파일 | 기능 |
|------|------|
| `LoginPage.jsx` | 로그인 |
| `ProductListPage.jsx` | 제품 목록 |
| `ProductEditPage.jsx` | 제품 생성/수정 |
| `OrderListPage.jsx` | 주문 목록 |
| `OrderDetailPage.jsx` | 주문 상세 |
| `OptionsPage.jsx` | 옵션 관리 |

### 5.2 라우팅 설정
- **파일**: `src/App.jsx`
- `/admin/login` - 로그인 (비보호)
- `/admin/*` - 어드민 페이지 (ProtectedRoute)

### 5.3 Import 이슈 해결

**문제:** Named import vs Default import 혼동

**해결:** 사용하려는 모듈의 export 방식 먼저 확인

**관련 코드**: [Appendix 5-2](#5-2-라우팅-설정)

---

## Phase 6. Admin User Creation

**요약**: auth.users 직접 INSERT 시행착오 → 전체 재생성으로 해결

### 6.1 첫 번째 시도: 기본 INSERT
- 결과: 500 Internal Server Error
- 원인: `confirmation_token` 등 string 컬럼 NULL 불가

### 6.2 두 번째 시도: Token 컬럼 수정
- 결과: 여전히 500 Error
- 새로운 원인: `email_change` 컬럼 NULL 문제

### 6.3 세 번째 시도: Identity 레코드 추가
- 결과: 여전히 실패

### 6.4 최종 해결
1. 기존 유저 삭제 (admin_profiles → auth.identities → auth.users 순서)
2. 모든 string 컬럼을 빈 문자열로 지정하여 auth.users 재생성
3. auth.identities 레코드 추가
4. admin_profiles 레코드 추가

**Admin 접속 정보:**
- URL: `http://localhost:5173/admin/login`
- Email: `dddesign@admin.com`
- Password: `12345678`

**관련 코드**: [Appendix 6-4](#6-4-admin-user-생성-쿼리)

---

## Phase 7. Public Page Supabase Integration

**요약**: 로컬 데이터를 Supabase API로 교체 (v1 - 컴포넌트 직접 호출)

> **Note:** 이 방식은 Phase 9에서 ProductContext로 개선됨

### 7.1 초기 접근
- 각 컴포넌트에서 `getProducts()` 직접 호출
- ProductShowcase, ProductDetailRoute 각각 API 호출

### 7.2 데이터 형식 불일치 문제

| Supabase 뷰 컬럼 | 컴포넌트 기대 props |
|------------------|---------------------|
| `type_value` | `type` |
| `day_image_url`, `night_image_url` | `images` (배열) |

### 7.3 발생한 문제들
- 라우터 이동 시 무한 로딩 (useEffect cleanup 미처리)
- 중복 API 호출 (컴포넌트마다 각각 호출)
- Auth/API 충돌 (Promise blocking)

→ Phase 9에서 ProductContext로 해결

---

## Phase 8. Bulk Upload Feature

**요약**: 로컬 products.js 데이터를 Supabase에 일괄 업로드하는 기능 추가

### 8.1 일괄 업로드 함수
- **파일**: `src/services/productService.js`
- `bulkUploadProducts(localProducts, productTypes)` 함수 추가
- type value → type id 매핑 후 순차 INSERT

### 8.2 어드민 UI
- **파일**: `src/pages/admin/ProductListPage.jsx`
- "로컬 데이터 업로드" 버튼 추가
- 확인 다이얼로그, 진행 상태, 결과 표시

**관련 코드**: [Appendix 8-1](#8-1-bulkuploadproducts-함수)

---

## Phase 9. ProductContext 전역 캐싱

**요약**: 제품 데이터를 Context에서 1회 로드 후 캐싱, Strict Mode 대응

### 9.1 문제 인식 (Phase 7 방식의 한계)
- 각 컴포넌트에서 개별 API 호출 → 중복 요청
- 라우터 이동 시마다 재호출 → 불필요한 네트워크 비용
- AuthProvider와 동시 마운트 시 Promise blocking

### 9.2 ProductContext 설계
- **파일**: `src/contexts/ProductContext.jsx`

**원칙:**
- 앱 시작 시 1회 로드, Context에 캐싱
- 세션 유지되는 동안 재호출 없음
- 모든 컴포넌트가 Context를 통해 데이터 접근

**제공 기능:**
- `products` - 변환된 제품 목록
- `isLoading` - 로딩 상태
- `error` - 에러 메시지
- `getProductById(id)` - ID로 제품 조회
- `refetch()` - 수동 새로고침

### 9.3 Strict Mode 대응
- AbortController 대신 `products.length > 0` 체크 사용
- `fetchingRef`로 중복 호출 방지

### 9.4 컴포넌트 수정
- ProductShowcase: 직접 API 호출 → `useProduct()` Context 사용
- ProductDetailRoute: `getProductById` API → Context에서 조회

**관련 코드**: [Appendix 9-2](#9-2-productcontext-구현)

---

## Phase 10. Provider 구조 분리

**요약**: AuthProvider를 Admin 라우트에만 적용하여 Auth/API 충돌 해결

### 10.1 문제 인식

**증상:** `Executing query...` 로그 후 응답 없음 (Network 200 OK)

**원인:** Supabase JS 클라이언트가 Auth 초기화 완료 전까지 다른 요청의 Promise를 resolve하지 않음

**기존 구조:**
```
<ProductProvider>      ← API 요청 시작
  <AuthProvider>       ← Auth 초기화 시작 (blocking)
    ...
  </AuthProvider>
</ProductProvider>
```

### 10.2 해결: AuthProvider 분리

**원칙:**
- AuthProvider는 Admin 페이지에만 필요
- Public 페이지에서 Auth 초기화 불필요

**새 구조:**
- `AdminRoutes` 컴포넌트 분리, 내부에 AuthProvider 적용
- 메인 App에서는 AuthProvider 제거

### 10.3 결과

| 페이지 | AuthProvider | ProductContext |
|--------|--------------|----------------|
| `/` (랜딩) | 미적용 | 적용 |
| `/product/:id` | 미적용 | 적용 |
| `/checkout` | 미적용 | 적용 |
| `/admin/*` | 적용 | 적용 |

**관련 코드**: [Appendix 10-2](#10-2-provider-분리-구조)

---

## Troubleshooting Summary

> 상세 내용은 [troubleshooting.md](./supabase/troubleshooting.md) 참조

| 카테고리 | 이슈 | 해결 |
|----------|------|------|
| A. 인증/권한 | RLS 403 Forbidden | role 값 수정 또는 is_admin() 함수 수정 |
| A. 인증/권한 | 로그인 무한 로딩 | 세션 캐시 정리 |
| B. API/데이터 | 데이터 형식 불일치 | ProductContext에서 변환 |
| B. API/데이터 | Promise Hanging | 싱글톤 패턴 + 타임아웃 |
| C. React 생명주기 | Auth/API 충돌 | AuthProvider 분리 (Phase 10) |
| C. React 생명주기 | 요청 취소 누락 | AbortController (개별 컴포넌트용) |
| C. React 생명주기 | Strict Mode + AbortController | fetchingRef + 데이터 체크 |

---

## 현재 파일 구조

```
src/
├── lib/
│   └── supabase.js            # 싱글톤 패턴 (HMR 대응)
├── services/
│   ├── productService.js      # + withTimeout, signal 지원
│   ├── orderService.js
│   └── optionService.js
├── hooks/
│   └── useTimeline.jsx
├── context/
│   └── CartContext.jsx        # 장바구니 상태
├── contexts/
│   ├── AuthContext.jsx        # Admin 인증 (Admin 라우트에만 적용)
│   └── ProductContext.jsx     # 전역 제품 데이터 캐싱
├── components/admin/
│   ├── constants.js
│   ├── AdminSidebar.jsx
│   ├── AdminHeader.jsx
│   ├── AdminLayout.jsx
│   └── ProtectedRoute.jsx
├── sections/
│   └── ProductShowcase.jsx    # useProduct() Context 사용
├── pages/
│   ├── LandingPage.jsx
│   ├── ProductDetailPage.jsx
│   └── CheckoutPage.jsx
├── pages/admin/
│   ├── index.js
│   ├── LoginPage.jsx
│   ├── ProductListPage.jsx    # + 일괄 업로드 기능
│   ├── ProductEditPage.jsx
│   ├── OrderListPage.jsx
│   ├── OrderDetailPage.jsx
│   └── OptionsPage.jsx
└── App.jsx                    # AdminRoutes 분리, Provider 구조 개선

docs/
├── supabase/
│   ├── data-model.md
│   ├── mcp-setup-guide.md
│   └── troubleshooting.md     # 문제 해결 가이드 (카테고리화)
└── admin-system-building-log.md
```

---

## 교훈 (Lessons Learned)

1. **Supabase Auth 직접 SQL INSERT는 위험**
   - auth.users 테이블은 많은 NOT NULL string 컬럼이 있음
   - 공식 API나 Dashboard를 통한 유저 생성이 안전

2. **View 보안 설정**
   - 기본 SECURITY DEFINER → SECURITY INVOKER로 변경 필요
   - RLS 정책이 제대로 적용되려면 INVOKER 필수

3. **Function Search Path**
   - 보안을 위해 `SET search_path = public` 명시 필요

4. **ESLint react-refresh**
   - 컴포넌트 파일에서 상수 export 금지
   - 별도 파일로 분리 필요

5. **Import 방식 확인**
   - default export vs named export 구분 필수

6. **데이터 형식 확인 우선**
   - Supabase 뷰 컬럼명과 프론트엔드 컴포넌트 props 불일치 주의
   - 어드민 페이지가 작동하면 API는 정상 → 데이터 변환 문제

7. **정상 작동 코드 참고**
   - 이미 작동하는 코드(어드민)의 패턴 활용

8. **React useEffect Cleanup**
   - 비동기 작업 후 상태 업데이트 시 마운트 상태 확인 필수

9. **최소 변경 원칙**
   - 문제 해결 시 여러 파일 동시 수정 금지

10. **Provider 마운트 순서**
    - Supabase JS 클라이언트는 Auth 초기화 중 다른 요청 blocking
    - AuthProvider는 필요한 라우트에만 적용

11. **React Strict Mode 대응**
    - Context 레벨에서 AbortController 사용 시 주의
    - `products.length > 0` + `fetchingRef` 패턴 권장

---

## Appendix: 코드 참조

### 2-1. Supabase Client 설정

**파일**: `src/lib/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance = null;

const getSupabaseClient = () => {
  if (!hasValidConfig) return null;

  // HMR 시 기존 인스턴스 재사용
  if (typeof window !== 'undefined' && window.__supabase) {
    return window.__supabase;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
      realtime: { params: { eventsPerSecond: 1 } },
    });

    if (typeof window !== 'undefined') {
      window.__supabase = supabaseInstance;
    }
  }

  return supabaseInstance;
};

export const supabase = getSupabaseClient();
```

---

### 5-2. 라우팅 설정

**파일**: `src/App.jsx` (Phase 5 시점)

```jsx
<Route path="/admin/login" element={<LoginPage />} />
<Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
  <Route index element={<Navigate to="/admin/products" replace />} />
  <Route path="products" element={<ProductListPage />} />
  <Route path="products/new" element={<ProductEditPage />} />
  <Route path="products/:id" element={<ProductEditPage />} />
  <Route path="orders" element={<OrderListPage />} />
  <Route path="orders/:id" element={<OrderDetailPage />} />
  <Route path="options" element={<OptionsPage />} />
</Route>
```

---

### 6-4. Admin User 생성 쿼리

**기존 유저 삭제:**
```sql
DELETE FROM admin_profiles WHERE id = '...';
DELETE FROM auth.identities WHERE user_id = '...';
DELETE FROM auth.users WHERE id = '...';
```

**auth.users 생성 (모든 string 컬럼 빈 문자열):**
```sql
INSERT INTO auth.users (
  id, email, encrypted_password,
  confirmation_token,           -- ''
  recovery_token,               -- ''
  email_change_token_new,       -- ''
  email_change_token_current,   -- ''
  email_change,                 -- ''
  reauthentication_token,       -- ''
  phone,                        -- ''
  phone_change_token,           -- ''
  phone_change,                 -- ''
  ...
) VALUES (...);
```

**auth.identities 생성:**
```sql
INSERT INTO auth.identities (user_id, provider_id, identity_data, provider, ...)
VALUES ('...', 'dddesign@admin.com', '{"sub": "...", "email": "..."}', 'email', ...);
```

**admin_profiles 생성:**
```sql
INSERT INTO admin_profiles (id, display_name, role)
VALUES ('...', 'dddesign', 'super_admin');
```

---

### 8-1. bulkUploadProducts 함수

**파일**: `src/services/productService.js`

```javascript
export const bulkUploadProducts = async (localProducts, productTypes) => {
  // type value → type id 매핑 생성
  const typeMap = {};
  productTypes.forEach((type) => {
    typeMap[type.value] = type.id;
  });

  const results = { success: 0, failed: 0, errors: [] };

  for (const product of localProducts) {
    const supabaseProduct = {
      title: product.title,
      description: product.description || '',
      type_id: typeMap[product.type] || null,
      lux: product.lux || 0,
      kelvin: product.kelvin || 0,
      price: product.price || null,
      day_image_url: product.images?.[0] || null,
      night_image_url: product.images?.[1] || null,
      video_url: product.video || null,
      is_active: true,
      sort_order: product.id || results.success + 1,
    };

    const { error } = await supabase.from('products').insert(supabaseProduct);

    if (error) {
      results.failed++;
      results.errors.push({ product: product.title, error: error.message });
    } else {
      results.success++;
    }
  }

  return results;
};
```

---

### 9-2. ProductContext 구현

**파일**: `src/contexts/ProductContext.jsx`

```javascript
const fetchingRef = useRef(false);

const loadProducts = useCallback(async () => {
  // 이미 데이터가 있으면 재호출 방지
  if (products.length > 0) {
    setIsLoading(false);
    return;
  }

  // Strict Mode 중복 호출 방지
  if (fetchingRef.current) return;
  fetchingRef.current = true;

  setIsLoading(true);
  setError(null);

  try {
    const { data, error: fetchError } = await getProducts({
      isActive: true,
      sortBy: 'sort_order',
      ascending: true,
      limit: 100,
    });

    if (fetchError) {
      setError(fetchError?.message || 'Failed to load products');
      setProducts([]);
    } else {
      // Supabase 데이터를 컴포넌트 형식으로 변환
      const transformedProducts = (data || []).map((product) => ({
        id: product.id,
        title: product.title,
        type: product.type_value,           // type_value → type
        lux: product.lux,
        kelvin: product.kelvin,
        images: [product.day_image_url, product.night_image_url].filter(Boolean),
        video: product.video_url,
        price: product.price || 1290,
        description: product.description,
      }));
      setProducts(transformedProducts);
    }
  } finally {
    setIsLoading(false);
    fetchingRef.current = false;
  }
}, [products.length]);

useEffect(() => {
  loadProducts();
}, [loadProducts]);
```

---

### 10-2. Provider 분리 구조

**파일**: `src/App.jsx`

```javascript
// Admin 라우트 - AuthProvider 적용
function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/new" element={<ProductEditPage />} />
          <Route path="products/:id" element={<ProductEditPage />} />
          <Route path="orders" element={<OrderListPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="options" element={<OptionsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

// 메인 App - AuthProvider 없음
function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <TimelineProvider initialTimeline={0}>
          <BrowserRouter>
            <Routes>
              {/* Admin Routes - AuthProvider 내부에서만 적용 */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* Checkout - 독립 레이아웃 (GNB 없음) */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Main - AppShell 레이아웃 (GNB 포함) */}
              <Route path="/*" element={<AppLayout />} />
            </Routes>
          </BrowserRouter>
        </TimelineProvider>
      </CartProvider>
    </ProductProvider>
  );
}
```

---

## 참고 문서

- [data-model.md](./supabase/data-model.md) - 테이블 스키마 및 RLS 정책 정의
- [mcp-setup-guide.md](./supabase/mcp-setup-guide.md) - MCP 설정 가이드
- [troubleshooting.md](./supabase/troubleshooting.md) - 문제 해결 가이드

---

*Last Updated: 2025-12-19*
