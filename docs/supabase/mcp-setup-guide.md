# Supabase MCP 설정 가이드

## Overview

이 문서는 Claude Code에서 Supabase MCP를 설정하여 데이터베이스를 자동으로 구성하는 방법을 안내합니다.

---

## 1. Supabase 프로젝트 생성

### 1.1 계정 생성

1. https://supabase.com 접속
2. GitHub 또는 이메일로 회원가입
3. 조직(Organization) 생성 또는 선택

### 1.2 새 프로젝트 생성

1. Dashboard에서 **"New Project"** 클릭
2. 프로젝트 정보 입력:

| 필드 | 값 | 설명 |
|------|-----|------|
| Name | `lumenstate` | 프로젝트 이름 |
| Database Password | (강력한 비밀번호) | 반드시 저장해두세요 |
| Region | Northeast Asia (Seoul) | 가장 가까운 지역 선택 |
| Pricing Plan | Free | 개발/테스트용 |

3. **"Create new project"** 클릭
4. 프로젝트 생성 완료까지 2-3분 대기

---

## 2. API 키 확인

프로젝트가 생성되면 **Settings > API** 메뉴에서 다음 정보를 확인합니다:

### 2.1 Project URL
```
https://your-project-id.supabase.co
```
- 프론트엔드와 MCP 모두에서 사용

### 2.2 API Keys

| Key | 용도 | 공개 여부 |
|-----|------|----------|
| `anon` / `public` | 프론트엔드 클라이언트 | 공개 가능 |
| `service_role` | 서버/MCP (RLS 우회) | **비공개 필수** |

**중요**: `service_role` 키는 절대 프론트엔드 코드에 노출하지 마세요.

---

## 3. Claude Code에 MCP 서버 추가

Supabase MCP는 **HTTP 리모트 서버** 방식을 사용합니다. OAuth 인증으로 자동 연결됩니다.

### 3.1 CLI 명령어 (권장)

```bash
claude mcp add --transport http supabase "https://mcp.supabase.com/mcp?project_ref=your-project-ref"
```

**예시** (이 프로젝트):
```bash
claude mcp add --transport http supabase "https://mcp.supabase.com/mcp?project_ref=dmqismtournyucwmjlbp"
```

| 옵션 | 설명 |
|------|------|
| `--transport http` | HTTP 리모트 서버 방식 (필수) |
| `project_ref` | Supabase 프로젝트 ID (Project Settings > General에서 확인) |

### 3.2 Scope 옵션

```bash
# 현재 프로젝트 전용 (기본값, 나만 사용)
claude mcp add --transport http supabase -s local "https://mcp.supabase.com/mcp?project_ref=your-project-ref"

# 팀 공유용 (.mcp.json에 저장, git 커밋됨)
claude mcp add --transport http supabase -s project "https://mcp.supabase.com/mcp?project_ref=your-project-ref"

# 모든 프로젝트에서 사용
claude mcp add --transport http supabase -s user "https://mcp.supabase.com/mcp?project_ref=your-project-ref"
```

### 3.3 OAuth 인증

1. 위 명령어 실행 후 Claude Code 재시작
2. `/mcp` 명령어 입력
3. `supabase` 서버 선택 후 Enter
4. 브라우저에서 Supabase OAuth 인증 완료

### 3.4 MCP 삭제

```bash
claude mcp remove supabase -s local
```

### 3.5 연결 확인

1. Claude Code 재시작 (터미널에서 `claude` 다시 실행)
2. `/mcp` 명령어 입력
3. `supabase` 서버가 `✓ connected`로 표시되는지 확인

---

## 4. MCP로 데이터베이스 설정

MCP 연결 후 Claude Code에서 다음 작업을 요청할 수 있습니다:

### 4.1 테이블 생성

```
Supabase MCP를 사용해서 docs/supabase/data-model.md의 SQL 스키마로 테이블을 생성해줘
```

### 4.2 RLS 정책 설정

```
docs/supabase/data-model.md의 RLS 정책 섹션을 Supabase에 적용해줘
```

### 4.3 Storage 버킷 생성

```
product-images와 product-videos Storage 버킷을 생성하고 공개 읽기 정책을 설정해줘
```

### 4.4 초기 데이터 삽입

```
docs/supabase/data-model.md의 Initial Data INSERT문을 실행해서 product_types, product_options, order_statuses 초기 데이터를 삽입해줘
```

---

## 5. Supabase MCP 주요 기능

| 기능 | 설명 |
|------|------|
| `execute_sql` | SQL 쿼리 실행 |
| `get_tables` | 테이블 목록 조회 |
| `get_table_schema` | 테이블 스키마 조회 |
| `insert_rows` | 데이터 삽입 |
| `select_rows` | 데이터 조회 |
| `update_rows` | 데이터 수정 |
| `delete_rows` | 데이터 삭제 |

### 예시: SQL 실행

```
Supabase MCP로 다음 SQL을 실행해줘:
SELECT * FROM products WHERE is_active = true;
```

---

## 6. 프론트엔드 환경 변수 설정

### 6.1 환경 변수 파일 생성

프로젝트 루트에 `.env.local` 파일 생성:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

# Feature flag
VITE_USE_SUPABASE=false
```

### 6.2 .gitignore 확인

`.env.local`이 `.gitignore`에 포함되어 있는지 확인:

```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

---

## 7. 문제 해결

### 7.1 MCP 연결 실패

**증상**: `/mcp` 명령에서 supabase가 표시되지 않음

**해결**:
1. 설정 파일 JSON 문법 오류 확인
2. `npx` 명령이 실행 가능한지 확인 (`npx -v`)
3. Claude Code 완전 재시작

### 7.2 인증 오류

**증상**: `Invalid API key` 오류

**해결**:
1. `service_role` 키가 올바른지 확인
2. 키 앞뒤 공백 제거
3. 프로젝트 URL이 정확한지 확인

### 7.3 RLS 정책 오류

**증상**: `new row violates row-level security policy`

**해결**:
1. MCP는 `service_role` 키를 사용하므로 RLS를 우회함
2. 프론트엔드에서 발생하면 정책 확인 필요
3. Supabase Dashboard > Authentication > Policies에서 확인

---

## 8. 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase MCP GitHub](https://github.com/supabase/mcp-server-supabase)
- [Claude Code MCP 문서](https://docs.anthropic.com/claude-code/mcp)

---

## 9. 체크리스트

MCP 설정 완료 확인:

- [ ] Supabase 프로젝트 생성됨
- [ ] Project URL 확인됨
- [ ] `anon` 키 확인됨 (프론트엔드용)
- [ ] `service_role` 키 확인됨 (MCP용)
- [ ] Claude Code 설정 파일에 MCP 서버 추가됨
- [ ] Claude Code 재시작됨
- [ ] `/mcp` 명령으로 연결 확인됨
- [ ] `.env.local` 파일 생성됨
- [ ] `.gitignore`에 환경 변수 파일 추가됨
