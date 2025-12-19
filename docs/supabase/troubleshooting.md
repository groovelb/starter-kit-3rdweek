# Supabase Troubleshooting Guide

어드민 패널 구축 과정에서 발생할 수 있는 이슈와 해결 방법을 정리한 문서입니다.

---

## 목차

### A. 인증 및 권한 (Authentication & Authorization)
- [A-1. RLS 권한 오류 (403 Forbidden)](#a-1-rls-권한-오류-403-forbidden)
- [A-2. 로그인 무한 로딩](#a-2-로그인-무한-로딩)

### B. API 요청 및 데이터 (API & Data)
- [B-1. 데이터 형식 불일치로 인한 무한 로딩](#b-1-데이터-형식-불일치로-인한-무한-로딩)
- [B-2. 간헐적 Promise Hanging](#b-2-간헐적-promise-hanging)

### C. React 생명주기 충돌 (React Lifecycle)
- [C-1. Auth/API 동시 초기화 충돌](#c-1-authapi-동시-초기화-충돌)
- [C-2. 라우터 이동 시 요청 취소 누락](#c-2-라우터-이동-시-요청-취소-누락)
- [C-3. Strict Mode + AbortController 충돌](#c-3-strict-mode--abortcontroller-충돌)

### [Appendix: 코드 참조](#appendix-코드-참조)

---

## A. 인증 및 권한 (Authentication & Authorization)

### A-1. RLS 권한 오류 (403 Forbidden)

**요약**: `is_admin()` 함수가 허용하는 role 값과 `admin_profiles` 테이블의 실제 role 값이 불일치하여 제품 CRUD 시 권한 오류 발생

**증상**
- 제품 생성/수정/삭제 시 403 Forbidden
- PostgreSQL 에러 코드 `42501` (insufficient_privilege)

**원인**
- `is_admin()` 함수: `'admin'`, `'editor'`만 허용
- 실제 테이블: `'super_admin'` 등 다른 값 사용

**해결**
- 방법 1: `admin_profiles.role` 값을 `'admin'`으로 수정
- 방법 2: `is_admin()` 함수에 `'super_admin'` 추가

**관련 코드**: [Appendix A-1](#a-1-is_admin-함수-및-role-수정)

---

### A-2. 로그인 무한 로딩

**요약**: Supabase 세션 토큰 손상 또는 환경 변수 미설정으로 인해 `AuthContext` 초기화가 완료되지 않음

**증상**
- 로그인 페이지에서 스피너가 멈추지 않음
- 콘솔에 `[Auth] Starting initialization...` 이후 로그 없음

**원인**
- 로컬 스토리지의 `sb-*` 세션 토큰 손상
- `.env` 파일의 Supabase URL/Key 미설정
- 네트워크 연결 실패

**해결**
- 방법 1: 5초 후 표시되는 "세션 초기화" 링크 클릭
- 방법 2: 개발자 도구 > Local Storage에서 `sb-` 키 삭제
- 방법 3: `.env` 파일 확인

**관련 코드**: [Appendix A-2](#a-2-authcontext-초기화-로직)

---

## B. API 요청 및 데이터 (API & Data)

### B-1. 데이터 형식 불일치로 인한 무한 로딩

**요약**: Supabase 뷰의 컬럼명과 프론트엔드 컴포넌트가 기대하는 props 형식이 달라 렌더링 실패

**증상**
- 메인 페이지 ProductShowcase 무한 로딩
- 어드민 페이지는 정상 작동

**원인**
- Supabase: `type_value`, `day_image_url`, `night_image_url`
- 컴포넌트: `type`, `images` (배열)

**해결**
- `ProductContext`에서 데이터 변환 로직 적용
- `type_value → type`, `[day_image_url, night_image_url] → images`

**교훈**
- 정상 작동하는 코드(어드민)를 참고하여 차이점 파악
- 쿼리 방식 변경보다 데이터 변환으로 해결

**관련 코드**: [Appendix B-1](#b-1-데이터-변환-로직)

---

### B-2. 간헐적 Promise Hanging

**요약**: Supabase JS 클라이언트의 Promise가 resolve되지 않고 영원히 pending 상태 유지

**증상**
- 첫 로드는 정상, 이후 간헐적 무한 로딩
- Network 탭: 200 OK 응답 확인됨
- 콘솔: 요청 시작 로그만 있고 완료 로그 없음

**원인**
- Vite HMR로 인한 Supabase 클라이언트 중복 인스턴스
- 브라우저 동시 연결 수 초과
- Auth 토큰 갱신 중 블로킹

**해결**
- `supabase.js`에 싱글톤 패턴 적용 (window 객체 캐싱)
- `productService.js`에 Promise 타임아웃 래퍼 적용

**관련 코드**: [Appendix B-2](#b-2-싱글톤-패턴-및-타임아웃)

---

## C. React 생명주기 충돌 (React Lifecycle)

### C-1. Auth/API 동시 초기화 충돌

**요약**: `AuthProvider`와 `ProductProvider`가 동시에 마운트되면서 Supabase 클라이언트 내부에서 Auth 초기화가 API 요청을 블로킹

**증상**
- `Executing query...` 로그 후 응답 없음
- Network 탭: 200 OK 확인됨
- `Query completed` 로그 출력 안 됨

**원인**
- `ProductProvider` → API 요청 시작
- `AuthProvider` → `getSession()` 호출
- Supabase 클라이언트가 Auth 완료까지 다른 요청 대기

**해결**
- `AuthProvider`를 Admin 라우트(`/admin/*`)에만 적용
- Public 페이지에서 Auth 초기화 제거

**관련 코드**: [Appendix C-1](#c-1-provider-분리-구조)

---

### C-2. 라우터 이동 시 요청 취소 누락

**요약**: 컴포넌트 언마운트 시 진행 중인 API 요청이 취소되지 않아 상태 업데이트 충돌

**증상**
- 라우터 이동 후 돌아오면 무한 로딩
- 페이지 새로고침해도 동일 증상

**원인**
- `isMounted` 플래그만 사용 → 요청 자체는 계속 진행
- 언마운트된 컴포넌트에서 `setState` 시도

**해결**
- `productService.js`에 `signal` 파라미터 추가
- 컴포넌트에서 `AbortController` 사용
- cleanup에서 `abortController.abort()` 호출

**적용 대상**
- 개별 컴포넌트 (라우터 이동으로 언마운트되는 경우)
- 페이지네이션/검색 등 파라미터 변경 시

**관련 코드**: [Appendix C-2](#c-2-abortcontroller-적용)

---

### C-3. Strict Mode + AbortController 충돌

**요약**: React Strict Mode에서 useEffect가 두 번 실행되면서 첫 번째 요청이 즉시 abort됨

**증상**
- `Query completed: AbortError` 에러
- `Already fetching, skip` 후 데이터 로드 안 됨
- 개발 모드에서만 발생

**원인**
1. 첫 번째 마운트 → 요청 시작, `fetchingRef = true`
2. 첫 번째 언마운트 (Strict Mode) → `abort()` 실행
3. 두 번째 마운트 → `fetchingRef = true`라서 skip
4. 결과: 데이터 로드 실패

**해결**
- Context 레벨에서는 AbortController 사용 안 함
- 대신 `products.length > 0` 체크 + `fetchingRef`로 중복 방지

**AbortController 사용 가이드**

| 상황 | AbortController | fetchingRef + 데이터 체크 |
|------|-----------------|-------------------------|
| Context (전역 캐시) | 사용 안 함 | 권장 |
| 개별 컴포넌트 | 필요 | 보조 역할 |
| 페이지네이션/검색 | 필요 | 보조 역할 |

**관련 코드**: [Appendix C-3](#c-3-context-레벨-중복-호출-방지)

---

## Appendix: 코드 참조

### A-1. is_admin() 함수 및 role 수정

**진단 쿼리**
```sql
SELECT id, display_name, role FROM admin_profiles;
```

**해결 방법 1: role 값 수정**
```sql
UPDATE admin_profiles
SET role = 'admin'
WHERE role = 'super_admin';
```

**해결 방법 2: 함수 수정**
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### A-2. AuthContext 초기화 로직

**파일**: `src/contexts/AuthContext.jsx`

**정상 로그 흐름**
```
[Auth] Starting initialization...
[Auth] getSession result: { hasSession: false, error: undefined }
[Auth] Initialization complete, setting isLoading=false
```

**환경 변수 설정**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_USE_SUPABASE=true
```

---

### B-1. 데이터 변환 로직

**파일**: `src/contexts/ProductContext.jsx`

```javascript
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
```

---

### B-2. 싱글톤 패턴 및 타임아웃

**파일**: `src/lib/supabase.js`

```javascript
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
```

**파일**: `src/services/productService.js`

```javascript
const withTimeout = (promise, ms = 15000, operation = 'Operation') => {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`${operation} timeout after ${ms}ms`));
      }, ms);
    }),
  ]);
};
```

---

### C-1. Provider 분리 구조

**파일**: `src/App.jsx`

```javascript
// Admin 라우트 - AuthProvider 적용
function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          {/* Admin 하위 라우트 */}
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
        <TimelineProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin/*" element={<AdminRoutes />} />
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

### C-2. AbortController 적용

**파일**: `src/services/productService.js`

```javascript
export const getProducts = async ({ signal = null, ...options } = {}) => {
  if (signal?.aborted) {
    return { data: [], count: 0, error: new Error('Request aborted') };
  }

  let query = supabase.from('products_with_type').select('*');

  if (signal) {
    query = query.abortSignal(signal);
  }

  // ... 쿼리 실행
};
```

**개별 컴포넌트 적용 예시**
```javascript
useEffect(() => {
  const abortController = new AbortController();
  let isMounted = true;

  const loadData = async () => {
    const { data } = await getProducts({ signal: abortController.signal });
    if (!isMounted) return;
    setProducts(data);
  };

  loadData();

  return () => {
    isMounted = false;
    abortController.abort();
  };
}, []);
```

---

### C-3. Context 레벨 중복 호출 방지

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
  if (fetchingRef.current) {
    return;
  }

  fetchingRef.current = true;

  try {
    const { data } = await getProducts({ isActive: true, limit: 100 });
    setProducts(transformData(data));
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

## 참고 문서

- [data-model.md](./data-model.md) - 테이블 스키마 및 RLS 정책 정의
- [mcp-setup-guide.md](./mcp-setup-guide.md) - MCP 설정 가이드
