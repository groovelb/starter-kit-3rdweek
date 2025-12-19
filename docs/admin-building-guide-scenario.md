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

**트러블슈팅**:
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

**트러블슈팅**:
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

**트러블슈팅**:

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

**Claude Code에서 요청**:
```
Supabase MCP로 다음 SQL을 마이그레이션으로 적용해줘.
마이그레이션 이름: create_products_simple

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  lux integer NOT NULL DEFAULT 300,
  kelvin integer NOT NULL DEFAULT 4000,
  price integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- RLS는 Phase 4에서 활성화
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
```

**MCP 내부 동작**:
```
mcp__supabase__apply_migration
├── name: "create_products_simple"
└── query: "CREATE TABLE products (...)"
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

**트러블슈팅**:
> **Q: "permission denied" 에러**
> A: MCP OAuth 인증 만료. `/mcp` > supabase 선택 > 재인증

---

### Step 2: 테스트 데이터 입력

---

#### 🔧 DB 작업

**2-1. 테스트 데이터 삽입**

Claude Code에서 요청:
```
Supabase MCP로 다음 SQL을 실행해줘:

INSERT INTO products (title, lux, kelvin, price) VALUES
  ('Aurora Pendant', 480, 4400, 890000),
  ('Ember Floor Lamp', 260, 3200, 650000),
  ('Zenith Desk Light', 350, 5000, 420000);
```

**2-2. 데이터 확인**

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

**트러블슈팅**:
> **Q: 화면에 데이터가 안 보여요**
> A:
> 1. `.env.local`의 `VITE_USE_SUPABASE=true` 확인
> 2. 개발 서버 재시작 확인
> 3. 브라우저 콘솔에서 에러 메시지 확인
> 4. `src/sections/ProductShowcase.jsx`에서 API 호출 코드 확인

---

### Step 3: 제품 데이터 서비스 & 컨텍스트

**핵심 개념**:
- **Service**: Supabase API 호출을 담당하는 함수 모음
- **Context**: React 전역 상태 관리
- **Provider**: App 최상위에서 데이터 제공

---

#### ⚙️ 로직 작업

**3-1. Supabase 클라이언트 생성**

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

**트러블슈팅**:
> **Q: "useProduct must be used within ProductProvider" 에러**
> A: App.jsx에서 ProductProvider가 라우트를 감싸고 있는지 확인

> **Q: 제품이 로드되지 않음**
> A: 브라우저 콘솔에서 네트워크 에러 확인. CORS나 API 키 문제일 수 있음

---

### Step 4: 제품 목록 페이지

---

#### ⚙️ 로직 작업

**4-1. Admin 라우트 설정**

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

**트러블슈팅**:
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

**5-1. products 테이블 필드 확장**

Claude Code에서 요청:
```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: add_product_fields

ALTER TABLE products
ADD COLUMN description text,
ADD COLUMN day_image_url text,
ADD COLUMN night_image_url text,
ADD COLUMN video_url text,
ADD COLUMN sort_order integer DEFAULT 0,
ADD COLUMN updated_at timestamptz DEFAULT now();
```

---

#### 🎨 UI 작업

**5-2. 제품 수정 페이지 구현**

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

**6-2. Storage 정책 설정 (MCP)**

```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: create_storage_policies

-- 이미지 버킷: 누구나 읽기 가능
CREATE POLICY "Public read access for product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- 비디오 버킷: 누구나 읽기 가능
CREATE POLICY "Public read access for product-videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-videos');
```

---

#### 🎨 UI 작업

**6-3. 업로드 UI 구현**

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

**7-1. product_types 테이블 생성**

```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: create_product_types

CREATE TABLE product_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text UNIQUE NOT NULL,
  label text NOT NULL,
  sort_order integer DEFAULT 0
);

-- 초기 데이터
INSERT INTO product_types (value, label, sort_order) VALUES
  ('ceiling', 'Ceiling', 1),
  ('stand', 'Stand', 2),
  ('wall', 'Wall', 3),
  ('desk', 'Desk', 4);

-- products에 FK 추가
ALTER TABLE products ADD COLUMN type_id uuid REFERENCES product_types(id);

-- RLS 비활성화 (Phase 4에서 활성화)
ALTER TABLE product_types DISABLE ROW LEVEL SECURITY;
```

**7-2. product_options 테이블 생성**

```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: create_product_options

CREATE TABLE product_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  value text NOT NULL,
  label text NOT NULL,
  sort_order integer DEFAULT 0,
  UNIQUE(category, value)
);

-- 초기 데이터
INSERT INTO product_options (category, value, label, sort_order) VALUES
  ('glass_finish', 'clear', 'Clear Glass', 1),
  ('glass_finish', 'frosted', 'Frosted Glass', 2),
  ('glass_finish', 'opaline', 'Opaline Glass', 3),
  ('hardware', 'patina-brass', 'Patina Brass', 1),
  ('hardware', 'polished-brass', 'Polished Brass', 2),
  ('hardware', 'matte-black', 'Matte Black', 3);

ALTER TABLE product_options DISABLE ROW LEVEL SECURITY;
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

**8-1. 주문 관련 테이블 생성**

```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: create_order_tables

-- 주문 상태 테이블
CREATE TABLE order_statuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text UNIQUE NOT NULL,
  label_en text NOT NULL,
  label_ko text NOT NULL,
  color text NOT NULL,
  sort_order integer DEFAULT 0
);

INSERT INTO order_statuses (value, label_en, label_ko, color, sort_order) VALUES
  ('pending', 'Pending', '주문 대기', 'warning', 1),
  ('confirmed', 'Confirmed', '주문 확인', 'info', 2),
  ('shipped', 'Shipped', '배송 중', 'primary', 3),
  ('delivered', 'Delivered', '배송 완료', 'success', 4),
  ('cancelled', 'Cancelled', '주문 취소', 'error', 5);

-- 주문 테이블
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE,
  status_id uuid REFERENCES order_statuses(id),
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  company text,
  country text DEFAULT 'KR',
  city text,
  address text,
  apartment text,
  zip_code text,
  subtotal integer DEFAULT 0,
  shipping_cost integer DEFAULT 0,
  discount integer DEFAULT 0,
  total integer DEFAULT 0,
  currency text DEFAULT 'KRW',
  confirmed_at timestamptz,
  shipped_at timestamptz,
  delivered_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 주문 항목 테이블
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_title text NOT NULL,
  product_lux integer,
  product_kelvin integer,
  product_image_url text,
  options jsonb DEFAULT '{}',
  quantity integer NOT NULL DEFAULT 1,
  unit_price integer NOT NULL,
  line_total integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS 비활성화 (Phase 4에서 활성화)
ALTER TABLE order_statuses DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
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

**9-1. View 생성**

```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: create_order_views

CREATE OR REPLACE VIEW orders_with_status
WITH (security_invoker = true) AS
SELECT
  o.*,
  s.value as status_value,
  s.label_en as status_label_en,
  s.label_ko as status_label_ko,
  s.color as status_color,
  (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as items_count
FROM orders o
LEFT JOIN order_statuses s ON o.status_id = s.id;
```

---

#### 🎨 UI 작업

**9-2. 주문 페이지 구현**

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

**10-1. 상태 변경 API 구현**

- 상태 전환 규칙 검증
- 해당 타임스탬프 기록 (confirmed_at, shipped_at 등)

---

#### 🎨 UI 작업

**10-2. 상태 변경 UI 구현**

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

**11-1. Admin 프로필 테이블 생성**

```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: create_admin_profiles

CREATE TABLE admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;
```

**11-2. Supabase Dashboard에서 사용자 생성**

1. Dashboard > Authentication > Users
2. **"Add user"** 클릭
3. 이메일/비밀번호 입력
4. **"Auto Confirm User"** 체크 (개발용)

**11-3. admin_profiles에 레코드 추가**

```
Supabase MCP로 다음 SQL 실행해줘:

INSERT INTO admin_profiles (id, email, display_name, role)
SELECT id, email, '관리자', 'super_admin'
FROM auth.users
WHERE email = 'your-admin@email.com';
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

**12-1. Auth Context 구현**

- Supabase Auth 연동
- Session 관리
- 로그인/로그아웃 함수

---

#### 🎨 UI 작업

**12-2. 로그인 페이지 구현**

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

**13-1. is_admin() 함수 생성**

```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: create_is_admin_function

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
```

**13-2. products 테이블 RLS 활성화**

```
Supabase MCP로 다음 마이그레이션을 적용해줘.
마이그레이션 이름: enable_rls_products

-- RLS 활성화
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 누구나 활성 제품 조회 가능
CREATE POLICY "products_select_public" ON products
  FOR SELECT USING (is_active = true);

-- Admin만 모든 제품 조회
CREATE POLICY "products_select_admin" ON products
  FOR SELECT USING (is_admin());

-- Admin만 생성/수정/삭제
CREATE POLICY "products_insert_admin" ON products
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "products_update_admin" ON products
  FOR UPDATE USING (is_admin());

CREATE POLICY "products_delete_admin" ON products
  FOR DELETE USING (is_admin());
```

**13-3. 다른 테이블들도 동일하게 적용**

- product_types
- product_options
- order_statuses
- orders
- order_items
- admin_profiles

---

#### ✅ 체크포인트

- [ ] 비로그인 상태에서 활성 제품만 조회
- [ ] Admin 로그인 시 모든 제품 조회/수정 가능
- [ ] 비로그인 상태에서 INSERT 시 에러

---

### Step 14: Protected Route

---

#### ⚙️ 로직 작업

**14-1. Protected Route 구현**

- 인증 상태 확인
- 미인증 시 로그인 페이지로 리다이렉트
- 세션 만료 감지

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

## 트러블슈팅 공통

### Phase 0 (환경 설정)

| 증상 | 원인 | 해결 |
|------|------|------|
| MCP 도구가 안 보임 | 연결 안 됨 | Step 0-5 다시 실행, Claude Code 재시작 |
| OAuth 인증 실패 | 브라우저 팝업 차단 | 팝업 허용, 다른 브라우저 시도 |
| "Invalid project ref" | Project ID 오류 | Dashboard > Settings > General에서 정확한 ID 확인 |

### Phase 1-3 (DB 작업)

| 증상 | 원인 | 해결 |
|------|------|------|
| apply_migration 실패 | SQL 문법 오류 | 에러 메시지 확인, 문법 수정 |
| execute_sql 실패 | RLS 차단 | RLS 비활성화 확인 |
| 데이터가 화면에 안 보임 | 환경변수 미설정 | `.env.local` 확인, 서버 재시작 |

### Phase 4 (인증/보안)

| 증상 | 원인 | 해결 |
|------|------|------|
| 로그인 안 됨 | Auth 설정 오류 | Dashboard > Authentication 확인 |
| RLS 403 에러 | 정책 미적용 | is_admin() 함수, 정책 확인 |
| 세션 유지 안 됨 | 토큰 만료 | autoRefreshToken 설정 확인 |

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
