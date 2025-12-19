# Admin System Building Guide - 학습 시나리오

> **목표**: 디자이너가 Claude Code + Supabase MCP 환경에서 **제로베이스**부터 어드민 시스템을 구축
> **전제**: Supabase 계정 없음, MCP 설정 안 됨, 환경변수 없음

---

## 전체 학습 순서 Overview

```
Phase 0: 환경 설정
├── Step 0-1: Supabase 가입
├── Step 0-2: 프로젝트 생성
├── Step 0-3: API 키 확인
├── Step 0-4: 프론트엔드 환경변수 설정
├── Step 0-5: Claude Code MCP 설정
└── Step 0-6: MCP 연결 확인

Phase 1: 제품 등록하기
├── Step 1: 제품 테이블 생성
├── Step 2: 테스트 데이터 입력
├── Step 3: 제품 데이터 서비스 & 컨텍스트
└── Step 4: 제품 목록 페이지

Phase 2: 제품 CRUD 완성
├── Step 5: 제품 상세/수정 페이지
├── Step 6: 이미지 업로드 (Storage)
└── Step 7: 관련 테이블 (types, options)

Phase 3: 주문 관리
├── Step 8: 주문 테이블 설계
├── Step 9: 주문 목록 & 상세 페이지
└── Step 10: 상태 변경 워크플로우

Phase 4: 인증 & 보안
├── Step 11: Supabase Auth 설정
├── Step 12: 로그인 페이지
├── Step 13: RLS 정책 적용
└── Step 14: Protected Route
```

---

## Phase 0: 환경 설정

> **완료 시점**: Supabase 프로젝트가 생성되고, Claude Code에서 MCP로 DB를 조작할 수 있는 상태

---

### Step 0-1: Supabase 가입

**목표**: Supabase 계정 생성

**작업**:
1. https://supabase.com 접속
2. **"Start your project"** 클릭
3. GitHub 또는 이메일로 회원가입
4. 이메일 인증 완료 (이메일 가입 시)

**체크포인트**:
- [ ] Supabase Dashboard에 로그인 성공
- [ ] Organization(조직) 화면이 보임

**주의사항**:
> **Q: GitHub 로그인이 안 돼요**
> A: GitHub에서 Supabase OAuth 앱 권한을 확인하세요. Settings > Applications > Authorized OAuth Apps

---

### Step 0-2: 프로젝트 생성

**목표**: Lumenstate용 Supabase 프로젝트 생성

**작업**:
1. Dashboard에서 **"New Project"** 클릭
2. Organization 선택 (없으면 새로 생성)
3. 프로젝트 정보 입력:

| 필드 | 입력값 | 설명 |
|------|--------|------|
| **Name** | `lumenstate` | 프로젝트 이름 |
| **Database Password** | (강력한 비밀번호) | **반드시 메모해두세요!** |
| **Region** | `Northeast Asia (Seoul)` | 가장 가까운 지역 |
| **Pricing Plan** | `Free` | 개발/테스트용 |

4. **"Create new project"** 클릭
5. 프로젝트 생성 완료까지 **2-3분 대기**

**체크포인트**:
- [ ] 프로젝트 Dashboard가 표시됨
- [ ] 좌측 메뉴에 Table Editor, Authentication 등이 보임

**참고 이미지 위치**: Supabase Dashboard > Home

---

### Step 0-3: API 키 확인

**목표**: 프론트엔드와 MCP에서 사용할 키 확인

**작업**:
1. Supabase Dashboard > **Settings** (좌측 하단 톱니바퀴)
2. **API** 메뉴 클릭
3. 다음 정보를 **안전한 곳에 메모**:

#### 확인해야 할 정보

| 항목 | 위치 | 용도 | 공개 여부 |
|------|------|------|----------|
| **Project URL** | API Settings 상단 | 모든 API 호출에 사용 | 공개 가능 |
| **anon / public key** | Project API keys | 프론트엔드 클라이언트 | 공개 가능 |
| **service_role key** | Project API keys | 서버/MCP (RLS 우회) | **절대 비공개** |
| **Project Reference ID** | General > Reference ID | MCP 연결에 사용 | 공개 가능 |

```
예시:
Project URL:      https://dmqismtournyucwmjlbp.supabase.co
anon key:         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (더 긺)
Project Ref:      dmqismtournyucwmjlbp
```

**체크포인트**:
- [ ] Project URL 메모 완료
- [ ] anon key 메모 완료
- [ ] Project Reference ID 메모 완료

**주의사항**:
> **service_role key는 프론트엔드 코드에 절대 넣지 마세요!**
> 이 키는 RLS(Row Level Security)를 우회하므로 노출되면 DB 전체가 위험합니다.

---

### Step 0-4: 프론트엔드 환경변수 설정

**목표**: React 앱에서 Supabase에 연결할 수 있도록 설정

**작업**:
1. 프로젝트 루트에 `.env.local` 파일 생성
2. 다음 내용 입력:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

# Feature flag (나중에 true로 변경)
VITE_USE_SUPABASE=false
```

3. 실제 값으로 교체:
   - `your-project-id` → Step 0-3에서 메모한 Project Reference ID
   - `your-anon-public-key` → Step 0-3에서 메모한 anon key

4. `.gitignore` 확인:
```gitignore
# 이 줄들이 있는지 확인
.env
.env.local
.env.*.local
```

**체크포인트**:
- [ ] `.env.local` 파일 생성됨
- [ ] VITE_SUPABASE_URL에 실제 URL 입력됨
- [ ] VITE_SUPABASE_ANON_KEY에 실제 키 입력됨
- [ ] `.gitignore`에 환경변수 파일 제외됨

**주의사항**:
> **Q: 환경변수가 인식이 안 돼요**
> A: Vite는 `VITE_` 접두사가 있는 변수만 클라이언트에 노출합니다.
> 개발 서버를 재시작하세요: `pnpm dev` 중지 후 다시 실행

---

### Step 0-5: Claude Code MCP 설정

**목표**: Claude Code에서 Supabase DB를 직접 조작할 수 있도록 MCP 연결

**MCP란?**
> Model Context Protocol - Claude가 외부 도구(Supabase DB 등)와 상호작용할 수 있게 해주는 프로토콜

**작업**:

#### 5-1. MCP 서버 추가 (터미널에서 실행)

```bash
claude mcp add supabase \
  --transport http \
  "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF"
```

**YOUR_PROJECT_REF**를 Step 0-3에서 메모한 Project Reference ID로 교체:

```bash
# 예시
claude mcp add supabase \
  --transport http \
  "https://mcp.supabase.com/mcp?project_ref=dmqismtournyucwmjlbp"
```

#### 5-2. Scope 옵션 (선택)

| 옵션 | 설명 | 사용 시점 |
|------|------|----------|
| `-s local` (기본) | 현재 프로젝트에서만 사용 | 개인 작업 |
| `-s project` | `.mcp.json`에 저장, git 커밋됨 | 팀 공유 |
| `-s user` | 모든 프로젝트에서 사용 | 여러 프로젝트 |

```bash
# 팀 공유용 (권장)
claude mcp add supabase \
  --transport http \
  -s project \
  "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF"
```

#### 5-3. OAuth 인증

1. 위 명령어 실행 후 **Claude Code 재시작** (터미널에서 `claude` 다시 실행)
2. `/mcp` 명령어 입력
3. `supabase` 서버 선택 후 Enter
4. **브라우저가 열리면** Supabase OAuth 인증 완료
5. "Authorization successful" 메시지 확인

**체크포인트**:
- [ ] `claude mcp add` 명령 실행 완료
- [ ] Claude Code 재시작 완료
- [ ] 브라우저에서 OAuth 인증 완료

---

### Step 0-6: MCP 연결 확인

**목표**: MCP가 정상 연결되었는지 테스트

**작업**:

#### 6-1. MCP 상태 확인

Claude Code에서 `/mcp` 입력:

```
예상 결과:
┌─────────────────────────────────────────┐
│ MCP Servers                             │
├─────────────────────────────────────────┤
│ ✓ supabase (connected)                  │
│   Tools: 15 available                   │
└─────────────────────────────────────────┘
```

#### 6-2. 테이블 목록 조회 테스트

Claude Code에서 다음 요청:
```
Supabase MCP로 현재 테이블 목록을 조회해줘
```

예상 결과: 빈 배열 `[]` 또는 기존 테이블 목록

#### 6-3. 사용 가능한 MCP 도구 확인

| 도구 | 용도 |
|------|------|
| `list_tables` | 테이블 목록 조회 |
| `apply_migration` | DDL 실행 (CREATE, ALTER, DROP) |
| `execute_sql` | DML 실행 (SELECT, INSERT, UPDATE, DELETE) |
| `list_migrations` | 마이그레이션 이력 조회 |
| `get_logs` | 로그 조회 |
| `get_advisors` | 보안/성능 권고사항 확인 |

**체크포인트**:
- [ ] `/mcp`에서 supabase가 `✓ connected` 표시
- [ ] `list_tables` 실행 시 에러 없이 결과 반환

**주의사항**:

| 증상 | 원인 | 해결 |
|------|------|------|
| supabase가 목록에 없음 | MCP 추가 안 됨 | Step 0-5 다시 실행 |
| `disconnected` 표시 | OAuth 인증 필요 | `/mcp` > supabase 선택 > 인증 |
| "Invalid project ref" | Project Reference ID 오류 | 올바른 ID로 재설정 |

```bash
# MCP 재설정이 필요한 경우
claude mcp remove supabase
claude mcp add supabase --transport http "https://mcp.supabase.com/mcp?project_ref=올바른ID"
```

---

## Phase 0 완료 체크리스트

Phase 1로 넘어가기 전 확인:

- [ ] Supabase 계정 생성 완료
- [ ] 프로젝트 생성 완료 (이름: lumenstate)
- [ ] Project URL 메모 완료
- [ ] anon key 메모 완료
- [ ] Project Reference ID 메모 완료
- [ ] `.env.local` 파일 생성 및 설정 완료
- [ ] MCP 서버 추가 완료
- [ ] OAuth 인증 완료
- [ ] `/mcp`에서 supabase connected 확인

**예상 소요 시간**: 15-30분

---

## Phase 1: 제품 등록하기

> **완료 시점**: 제품 테이블 생성, 데이터 입력, Admin 목록 페이지 동작

---

### Step 1: 제품 테이블 생성

**핵심 개념**:
- **RLS(Row Level Security)**: 행 단위 접근 제어. 지금은 **비활성화**로 시작 (Phase 4에서 활성화)
- **Migration**: 테이블 생성/변경을 기록하는 SQL 스크립트

---

#### 🔧 DB 작업

**프롬프트**:
```
@docs/supabase/data-model.md 의 products 테이블 정의를 참고해서
Supabase MCP로 제품 테이블을 생성해줘.
기본 필드(제품명, lux, kelvin, 가격, 활성 상태)만 포함하고,
RLS는 비활성화 상태로 시작해줘.
```

**예상 결과**: 마이그레이션 성공 메시지

---

#### 🎨 UI 참고

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Data Model` → Schema 탭 | products 테이블 필드 정의 |

---

#### ✅ 체크포인트

- [ ] apply_migration 성공
- [ ] "마이그레이션 목록 조회해줘" 요청 시 `create_products_simple` 표시

**주의사항**:
> **Q: "permission denied" 에러**
> A: MCP OAuth 인증 만료. `/mcp` > supabase 선택 > 재인증

---

### Step 2: 테스트 데이터 입력

---

#### 🔧 DB 작업

**프롬프트 (테스트 데이터 삽입)**:
```
@docs/supabase/data-model.md 의 products 테이블 구조를 참고해서
테스트용 제품 3개를 추가해줘.
제품명, lux, kelvin, 가격 값을 적절히 넣어줘.
```

**프롬프트 (데이터 확인)**:
```
products 테이블 전체 데이터 조회해줘
```

예상 결과: 3개 행 반환

---

#### ⚙️ 프론트엔드 설정

**2-3. 환경변수 활성화**

`.env.local` 수정:
```env
VITE_USE_SUPABASE=true
```

**2-4. 개발 서버 재시작**

```bash
pnpm dev
```

---

#### 🎨 UI 확인

브라우저에서 메인 페이지 접속 → 제품 섹션 확인

| 스토리북 | 확인 내용 |
|----------|----------|
| `Section/ProductShowcase` | 상품 카드가 그리드로 표시되는지 |
| `Custom Component/card/ProductCard` | 개별 카드 UI |

---

#### ✅ 체크포인트

- [ ] 데이터 삽입 성공 (3개 행)
- [ ] 조회 시 3개 제품 데이터 반환
- [ ] 브라우저에서 제품 카드 표시 (이미지 없음 - 정상)

**주의사항**:
> **Q: 화면에 데이터가 안 보여요**
> A:
> 1. `.env.local`의 `VITE_USE_SUPABASE=true` 확인
> 2. 개발 서버 재시작 (`pnpm dev` 중지 후 다시 실행)
> 3. 브라우저 콘솔에서 에러 메시지 확인
> 4. 상세: [troubleshooting.md A-2](./supabase/troubleshooting.md#a-2-로그인-무한-로딩)

---

### Step 3: 제품 데이터 서비스 & 컨텍스트

**핵심 개념**:
- **Service**: Supabase API 호출을 담당하는 함수 모음
- **Context**: React 전역 상태 관리
- **Provider**: App 최상위에서 데이터 제공

---

#### ⚙️ 로직 작업

**프롬프트 (Supabase 연동 파일 생성)**:
```
Supabase 클라이언트 파일(src/lib/supabase.js)과
제품 데이터를 가져오는 서비스(src/services/productService.js)를 만들어줘.
ProductContext도 만들어서 앱 전체에서 제품 데이터를 사용할 수 있게 해줘.
App.jsx에서 ProductProvider로 전체 앱을 감싸줘.
```

---

**참고 코드 (Supabase 클라이언트)**:

`src/lib/supabase.js` 파일 생성:

```jsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 환경변수가 설정되지 않았습니다.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**3-2. Product Service 생성**

`src/services/productService.js` 파일 생성:

```jsx
import { supabase } from '../lib/supabase';

// 활성 제품 조회
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ID로 제품 조회
export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
```

**3-3. ProductContext 생성**

`src/contexts/ProductContext.jsx` 파일 생성:

```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, getProductById as fetchProductById } from '../services/productService';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 초기 로딩
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // ID로 제품 조회 (캐시 우선)
  function getProductById(id) {
    return products.find(p => p.id === id) || null;
  }

  const value = {
    products,
    isLoading,
    error,
    getProductById,
    refetch: fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return context;
}
```

**3-4. App.jsx에 Provider 적용**

```jsx
// src/App.jsx
import { ProductProvider } from './contexts/ProductContext';

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        {/* 라우트 */}
      </BrowserRouter>
    </ProductProvider>
  );
}
```

---

#### 🎨 UI 연동

**3-5. ProductShowcase에서 Context 사용**

```jsx
// src/sections/ProductShowcase.jsx
import { useProduct } from '../contexts/ProductContext';

function ProductShowcase() {
  const { products, isLoading, error } = useProduct();

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return <ProductGrid products={products} />;
}
```

---

#### ✅ 체크포인트

- [ ] `src/lib/supabase.js` 생성 완료
- [ ] `src/services/productService.js` 생성 완료
- [ ] `src/contexts/ProductContext.jsx` 생성 완료
- [ ] App.jsx에서 ProductProvider로 감싸기 완료
- [ ] 브라우저에서 제품 데이터 표시 확인

**주의사항**:
> **Q: "useProduct must be used within ProductProvider" 에러**
> A: App.jsx에서 ProductProvider가 라우트를 감싸고 있는지 확인

> **Q: 제품이 로드되지 않음 (무한 로딩)**
> A:
> 1. 브라우저 콘솔에서 네트워크 에러 확인
> 2. Vite HMR로 인한 클라이언트 중복 생성 가능성 → `supabase.js`에 싱글톤 패턴 적용 권장
> 3. 상세: [troubleshooting.md B-2](./supabase/troubleshooting.md#b-2-간헐적-promise-hanging)

---

### Step 4: 제품 목록 페이지

---

#### ⚙️ 로직 작업

**프롬프트 (Admin 라우트 및 목록 페이지)**:
```
@docs/supabase/information-architecture.md 의 Admin Site Map을 참고해서
Admin 레이아웃(사이드바, 헤더)과 제품 목록 페이지를 만들어줘.
/admin/products 경로로 접근 가능하도록 라우트 설정도 해줘.
Phase 4 전까지는 인증 없이 접근 가능하도록 해줘.
```

---

**참고 (Admin 라우트 설정)**:

Phase 4 전까지 인증 없이 Admin 페이지에 접근할 수 있도록 설정.

`src/App.jsx`에 Admin 라우트 추가:
```jsx
import AdminLayout from './layouts/AdminLayout';
import ProductListPage from './pages/admin/ProductListPage';

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          {/* 기존 라우트 */}

          {/* Admin 라우트 (Phase 4에서 인증 추가) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<ProductListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}
```

---

#### 🎨 UI 작업

**4-2. 제품 목록 페이지 구현**

`src/pages/admin/ProductListPage.jsx` 파일 생성:

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Admin Site Map` | 전체 URL 구조, 사이드바 메뉴 |
| `UX Architecture/Admin Pages` → Product List 탭 | 테이블 컬럼, 필터 정의 |
| `MUI Component/DataDisplay/Table` | MUI Table 사용법 |

**4-3. 필요 파일**

- `src/layouts/AdminLayout.jsx` - Admin 레이아웃 (사이드바, 헤더)
- `src/pages/admin/ProductListPage.jsx` - 제품 목록 페이지

---

#### ✅ 체크포인트

- [ ] /admin/products 페이지 접근 가능
- [ ] 3개 제품이 테이블에 표시
- [ ] 사이드바 메뉴 표시 (제품관리, 주문관리, 옵션설정)

**주의사항**:
> **Q: /admin 경로가 404**
> A: `src/App.jsx`에서 admin 라우트 설정 확인

> **Q: 로그인 페이지로 리다이렉트됨**
> A: Phase 4 전까지 ProtectedRoute 임시 비활성화

---

## Phase 2: 제품 CRUD 완성

> **완료 시점**: 제품 생성, 수정, 이미지 업로드 동작

---

### Step 5: 제품 상세/수정 페이지

---

#### 🔧 DB 작업

**프롬프트 (필드 확장)**:
```
@docs/supabase/data-model.md 의 products 테이블 정의를 참고해서
products 테이블에 추가 필드를 넣어줘.
설명, 낮/밤 이미지 URL, 비디오 URL, 정렬 순서, 수정일시 필드를 추가해줘.
```

---

#### 🎨 UI 작업

**프롬프트 (제품 수정 페이지)**:
```
@docs/supabase/information-architecture.md 의 Product Edit Page 스펙을 참고해서
/admin/products/:id 페이지를 만들어줘.
제품 정보를 수정하고 저장할 수 있는 폼을 구현해줘.
```

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Admin Pages` → Product Edit 탭 | 폼 필드, 섹션 구조, 유효성 검사 |
| `MUI Component/Input/TextField` | 텍스트 입력 |
| `MUI Component/Input/Select` | 드롭다운 선택 |
| `Custom Component/Input/FileDropzone` | 파일 업로드 UI |

**필요 파일**:
- `src/pages/admin/ProductEditPage.jsx` - 제품 편집 페이지

---

#### ⚙️ 로직 작업

**5-3. 제품 수정 테스트**

1. `/admin/products/:id` 페이지 접속
2. 기존 제품 데이터 수정
3. 저장 후 목록에서 변경 확인

---

#### ✅ 체크포인트

- [ ] /admin/products/:id 페이지 동작
- [ ] 폼에 기존 데이터 표시
- [ ] 수정 후 저장 성공
- [ ] 목록에서 변경 내용 확인

---

### Step 6: 이미지 업로드 (Storage)

**핵심 개념**:
- **Storage Bucket**: 파일을 저장하는 컨테이너
- **Public Bucket**: URL로 직접 접근 가능
- **Private Bucket**: 인증 필요

---

#### 🔧 DB 작업

**6-1. Storage 버킷 생성 (Dashboard)**

Supabase Dashboard > Storage > New Bucket:

| Bucket Name | Public | 용도 |
|-------------|--------|------|
| `product-images` | ✓ Yes | 제품 이미지 |
| `product-videos` | ✓ Yes | 제품 비디오 |

**프롬프트 (Storage 정책 설정)**:
```
@docs/supabase/data-model.md 의 Storage 버킷 정의를 참고해서
product-images, product-videos 버킷에 공개 읽기 정책을 설정해줘.
누구나 제품 이미지와 비디오를 볼 수 있도록 해줘.
```

---

#### 🎨 UI 작업

**프롬프트 (이미지 업로드 기능)**:
```
제품 수정 페이지에 이미지 업로드 기능을 추가해줘.
product-images 버킷에 파일을 업로드하고,
업로드된 URL을 제품의 day_image_url, night_image_url 필드에 저장해줘.
```

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Data Model` → Docs | Storage 버킷 구조 |
| `Custom Component/Input/FileDropzone` | 드래그앤드롭 업로드 UI |

---

#### ✅ 체크포인트

- [ ] product-images 버킷 생성
- [ ] product-videos 버킷 생성
- [ ] 정책 적용 완료
- [ ] 이미지 업로드 테스트 성공

---

### Step 7: 관련 테이블 (types, options)

**핵심 개념**:
- **Foreign Key (FK)**: 다른 테이블을 참조하는 키
- **1:N 관계**: 하나의 타입에 여러 제품이 속함

---

#### 🔧 DB 작업

**프롬프트 (제품 타입 테이블)**:
```
@docs/supabase/data-model.md 의 product_types 테이블 정의를 참고해서
제품 타입 테이블을 생성해줘.
Ceiling, Stand, Wall, Desk 타입을 초기 데이터로 넣고,
products 테이블에서 타입을 참조할 수 있도록 연결해줘.
```

**프롬프트 (제품 옵션 테이블)**:
```
@docs/supabase/data-model.md 의 product_options 테이블 정의를 참고해서
제품 옵션 테이블을 생성해줘.
유리 마감(Clear, Frosted, Opaline)과 하드웨어(Brass, Black) 옵션을 초기 데이터로 넣어줘.
```

---

#### 🎨 UI 참고

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Data Model` → Docs | 테이블 관계도 |
| `UX Architecture/Data Model` → Schema | 각 테이블 필드 정의 |

---

#### ✅ 체크포인트

- [ ] product_types 테이블 생성
- [ ] product_options 테이블 생성
- [ ] 초기 데이터 삽입 확인
- [ ] 제품 편집 시 타입 선택 가능

---

## Phase 3: 주문 관리

> **완료 시점**: 주문 목록 조회, 상세 보기, 상태 변경 동작

---

### Step 8: 주문 테이블 설계

**핵심 개념**:
- **orders**: 주문 정보 (고객, 배송지, 합계)
- **order_items**: 주문에 포함된 상품들 (1:N)
- **order_statuses**: 상태 정의 (pending, shipped 등)

---

#### 🔧 DB 작업

**프롬프트 (주문 관련 테이블)**:
```
@docs/supabase/data-model.md 의 주문 관련 테이블 정의를 참고해서
Supabase MCP로 다음 테이블들을 생성해줘:
1. order_statuses - 주문 상태 (대기, 확인, 배송중, 완료, 취소)
2. orders - 주문 정보 (고객 정보, 배송지, 금액)
3. order_items - 주문 항목 (주문에 포함된 제품들)

주문 상태 초기 데이터도 넣어줘.
```

---

#### 🎨 UI 참고

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Data Model` → Schema | orders, order_items 필드 |
| `UX Architecture/Data Model` → Docs | 테이블 관계 (orders → order_items) |

---

#### ✅ 체크포인트

- [ ] 3개 테이블 생성 완료
- [ ] order_statuses에 5개 상태 삽입됨
- [ ] FK 관계 정상 동작

---

### Step 9: 주문 목록 & 상세

**핵심 개념**:
- **View**: 여러 테이블을 JOIN한 가상 테이블
- **orders_with_status**: orders + order_statuses 조인

---

#### 🔧 DB 작업

**프롬프트 (주문 조회용 View)**:
```
@docs/supabase/data-model.md 의 orders_with_status View 정의를 참고해서
주문 목록 조회용 View를 만들어줘.
주문 정보에 상태 라벨, 색상, 주문 항목 수가 함께 조회되도록 해줘.
```

---

#### 🎨 UI 작업

**프롬프트 (주문 목록/상세 페이지)**:
```
@docs/supabase/information-architecture.md 의 Admin Site Map을 참고해서
주문 목록 페이지(/admin/orders)와 상세 페이지(/admin/orders/:id)를 만들어줘.
목록은 테이블로 보여주고, 상태별로 색상 Chip을 표시해줘.
상세 페이지에서는 주문 정보, 주문 항목, 상태 타임라인을 보여줘.
```

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Admin Pages` → Order List 탭 | 테이블 컬럼, 필터 |
| `UX Architecture/Admin Pages` → Order Detail 탭 | 섹션 구성 |

**필요 시 구현할 컴포넌트**:
- `src/pages/admin/OrderListPage.jsx` - 주문 목록 페이지
- `src/pages/admin/OrderDetailPage.jsx` - 주문 상세 페이지

---

#### ✅ 체크포인트

- [ ] View 생성 완료
- [ ] /admin/orders 페이지에서 주문 목록 표시
- [ ] 상태별 색상 Chip 표시
- [ ] /admin/orders/:id에서 상세 정보 표시

---

### Step 10: 상태 변경 워크플로우

**상태 전환 규칙**:
| From | To (Allowed) |
|------|--------------|
| pending | confirmed, cancelled |
| confirmed | shipped, cancelled |
| shipped | delivered |
| delivered | (final state) |
| cancelled | (final state) |

---

#### ⚙️ 로직 작업

**프롬프트 (상태 변경 로직)**:
```
주문 상태를 변경하는 기능을 구현해줘.
orderService.js에 updateOrderStatus 함수를 만들어서:
- 현재 상태에서 가능한 다음 상태만 선택 가능하도록 검증
- 상태 변경 시 해당 타임스탬프 자동 기록 (confirmed_at, shipped_at 등)
```

---

#### 🎨 UI 작업

**프롬프트 (상태 변경 UI)**:
```
주문 상세 페이지에 상태 변경 UI를 추가해줘.
현재 상태에서 가능한 다음 상태만 드롭다운에 표시하고,
"상태 변경" 버튼 클릭 시 업데이트되도록 해줘.
상태 변경 이력은 Stepper로 타임라인 형태로 보여줘.
```

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Admin Pages` → OrderStatus | 상태 정의, 전환 규칙 |
| `MUI Component/Navigation/Stepper` | 상태 타임라인 UI |
| `MUI Component/Input/Select` | 상태 드롭다운 |

---

#### ✅ 체크포인트

- [ ] 상태 드롭다운에서 선택 가능
- [ ] "상태 변경" 버튼 클릭 시 업데이트
- [ ] 상태별 타임스탬프 기록 (confirmed_at 등)

---

## Phase 4: 인증 & 보안

> **완료 시점**: 로그인 필요, 권한에 따른 접근 제한 동작

---

### Step 11: Supabase Auth 설정

---

#### 🔧 DB 작업

**프롬프트 (관리자 프로필 테이블)**:
```
@docs/supabase/data-model.md 의 admin_profiles 테이블 정의를 참고해서
관리자 프로필 테이블을 생성해줘.
Supabase Auth 사용자와 연결되도록 해줘.
```

**Dashboard 작업 (사용자 생성)**:
1. Dashboard > Authentication > Users
2. **"Add user"** 클릭
3. 이메일/비밀번호 입력
4. **"Auto Confirm User"** 체크 (개발용)

**프롬프트 (관리자 등록)**:
```
방금 Dashboard에서 만든 사용자를 admin_profiles 테이블에 등록해줘.
이메일이 'your-admin@email.com'인 사용자를 super_admin 역할로 추가해줘.
```

---

#### 🎨 UI 참고

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Admin Site Map` | 사용자 역할 정의 |

---

#### ✅ 체크포인트

- [ ] auth.users에 사용자 생성됨
- [ ] admin_profiles에 레코드 추가됨

---

### Step 12: 로그인 페이지

---

#### ⚙️ 로직 작업

**프롬프트 (Auth Context)**:
```
Supabase Auth를 사용하는 AuthContext를 만들어줘.
로그인, 로그아웃, 세션 관리 기능을 포함해줘.
로그인 성공 시 admin_profiles 테이블에서 관리자 정보를 확인해줘.
```

---

#### 🎨 UI 작업

**프롬프트 (로그인 페이지)**:
```
@docs/supabase/information-architecture.md 의 Admin Site Map을 참고해서
/admin/login 로그인 페이지를 만들어줘.
이메일과 비밀번호 입력 필드, 로그인 버튼을 포함하고,
로그인 성공 시 /admin/products로 이동해줘.
에러 발생 시 메시지를 표시해줘.
```

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Admin Pages` → Login 탭 | UI 요소, 플로우 |
| `UX Architecture/Admin Pages` → ErrorStates | 에러 메시지 |
| `Custom Component/UnderlineInput` | 입력 필드 스타일 |

**필요 시 구현할 컴포넌트**:
- `src/contexts/AuthContext.jsx` - 인증 컨텍스트
- `src/pages/admin/LoginPage.jsx` - 로그인 페이지

---

#### ✅ 체크포인트

- [ ] /admin/login 페이지 표시
- [ ] 로그인 성공 시 /admin/products로 이동
- [ ] 실패 시 에러 메시지 표시

---

### Step 13: RLS 정책 적용

**핵심 개념**:
- **RLS 활성화**: 모든 쿼리에 정책 적용
- **USING**: SELECT, UPDATE, DELETE 조건
- **WITH CHECK**: INSERT, UPDATE 조건

---

#### 🔧 DB 작업

**프롬프트 (관리자 확인 함수)**:
```
@docs/supabase/information-architecture.md 의 권한 정의를 참고해서
현재 로그인한 사용자가 관리자인지 확인하는 함수를 만들어줘.
admin_profiles 테이블에 등록된 사용자면 관리자로 판단해줘.
```

**프롬프트 (제품 테이블 보안 정책)**:
```
@docs/supabase/information-architecture.md 의 권한 정의를 참고해서
products 테이블에 보안 정책을 적용해줘:
- 누구나: 활성 제품 조회 가능
- 관리자만: 모든 제품 조회, 생성, 수정, 삭제 가능
```

**프롬프트 (나머지 테이블 보안 정책)**:
```
product_types, product_options, orders, order_items, admin_profiles 테이블에도
동일한 패턴으로 보안 정책을 적용해줘.
관리자만 접근 가능하도록 해줘.
```

---

#### ✅ 체크포인트

- [ ] 비로그인 상태에서 활성 제품만 조회
- [ ] Admin 로그인 시 모든 제품 조회/수정 가능
- [ ] 비로그인 상태에서 INSERT 시 에러

---

### Step 14: Protected Route

---

#### ⚙️ 로직 작업

**프롬프트 (Protected Route)**:
```
인증이 필요한 Admin 페이지들을 보호하는 ProtectedRoute 컴포넌트를 만들어줘.
AuthContext를 사용해서:
- 미로그인 시 /admin/login으로 리다이렉트
- 로딩 중에는 스피너 표시
- 세션 만료 시 자동 로그아웃
```

---

#### 🎨 UI 참고

| 스토리북 | 확인 내용 |
|----------|----------|
| `UX Architecture/Admin Site Map` | 사용자 역할별 권한 |

**필요 시 구현할 컴포넌트**:
- `src/components/admin/ProtectedRoute.jsx` - 인증 보호 라우트

---

#### ✅ 체크포인트

- [ ] 미로그인 시 /admin/* 접근 불가
- [ ] 로그인 후 Admin 페이지 접근 가능
- [ ] 세션 만료 시 자동 로그아웃

---

## Storybook 참조 요약

### UX Architecture 카테고리

| 스토리 | Phase | 주요 활용 |
|--------|-------|----------|
| `Admin Site Map` | 전체 | URL 구조, 메뉴 구성, 역할 정의 |
| `Admin Pages` → Login | Phase 4 | 로그인 UI/플로우 |
| `Admin Pages` → Product List | Phase 1-2 | 테이블 컬럼, 필터 |
| `Admin Pages` → Product Edit | Phase 2 | 폼 필드, 유효성 검사 |
| `Admin Pages` → Order List | Phase 3 | 주문 테이블, 상태 정의 |
| `Admin Pages` → Order Detail | Phase 3 | 섹션 구성, 상태 변경 |
| `Admin Pages` → OrderStatus | Phase 3 | 상태 전환 규칙 |
| `Admin Pages` → ErrorStates | 전체 | 에러/빈 상태 메시지 |
| `Data Model` → Docs | Phase 1-3 | 테이블 구조, 관계, Storage |
| `Data Model` → Schema | Phase 1-3 | 필드별 상세 정의 |
| `Data Model` → API | Phase 2-3 | REST API 엔드포인트 |

### 컴포넌트 참조

| 카테고리 | 스토리 | Phase |
|----------|--------|-------|
| MUI Component/DataDisplay | Table | Phase 1 |
| MUI Component/Input | TextField, Select | Phase 2 |
| MUI Component/Navigation | Tabs, Stepper | Phase 3 |
| MUI Component/Feedback | Dialog | Phase 2-4 |
| Custom Component/Input | FileDropzone | Phase 2 |
| Custom Component | UnderlineInput | Phase 4 |
| Section | ProductShowcase | Phase 1 |
| Custom Component/card | ProductCard | Phase 1 |

---

## 주의사항 (자주 발생하는 문제)

> 상세한 해결 방법은 [troubleshooting.md](./supabase/troubleshooting.md) 참조

### A. 인증 및 권한

| 증상 | 원인 | 해결 |
|------|------|------|
| 제품 CRUD 시 403 Forbidden | `is_admin()` 함수의 role 값 불일치 | `admin_profiles.role`을 `'admin'`으로 수정하거나, 함수에 `'super_admin'` 추가 |
| 로그인 페이지 무한 로딩 | 로컬 스토리지의 `sb-*` 토큰 손상 | 개발자 도구 > Local Storage에서 `sb-` 키 삭제 |
| 환경변수 미인식 | `.env` 파일 미설정 | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 확인 |

### B. 데이터 로딩

| 증상 | 원인 | 해결 |
|------|------|------|
| 메인 페이지만 무한 로딩 (어드민은 정상) | Supabase 컬럼명과 컴포넌트 props 불일치 | `ProductContext`에서 데이터 변환 로직 적용 (`type_value → type`, `[day_image, night_image] → images`) |
| 간헐적 무한 로딩 (새로고침하면 됨) | Vite HMR로 Supabase 클라이언트 중복 생성 | `supabase.js`에 싱글톤 패턴 적용 (`window.__supabase` 캐싱) |

### C. React 생명주기

| 증상 | 원인 | 해결 |
|------|------|------|
| `Executing query...` 후 응답 없음 | Auth/API 동시 초기화 충돌 | `AuthProvider`를 Admin 라우트(`/admin/*`)에만 적용 |
| Strict Mode에서 `AbortError` | useEffect 두 번 실행으로 첫 요청 abort | Context 레벨에서는 AbortController 대신 `fetchingRef` + 데이터 체크 사용 |

---

## 권장 학습 시간

| Phase | 예상 시간 | 난이도 | 주요 성취 |
|-------|----------|--------|----------|
| Phase 0 | 30분-1시간 | ★☆☆ | 환경 설정 완료 |
| Phase 1 | 1-2시간 | ★☆☆ | "내 데이터가 화면에!" |
| Phase 2 | 2-3시간 | ★★☆ | CRUD 완성 |
| Phase 3 | 2-3시간 | ★★☆ | 주문 관리 완성 |
| Phase 4 | 3-4시간 | ★★★ | 인증/보안 완성 |

**총 예상 시간**: 8-13시간 (1-2일 워크샵)

---

## Quick Reference: MCP 명령어

```bash
# MCP 서버 추가
claude mcp add supabase --transport http "https://mcp.supabase.com/mcp?project_ref=YOUR_REF"

# MCP 서버 제거
claude mcp remove supabase

# 현재 MCP 상태 확인
/mcp
```

## Quick Reference: 환경 변수

```env
# .env.local
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
VITE_USE_SUPABASE=true
```

---

*Last Updated: 2025-12-19*
