# Project Rules

## META INSTRUCTION

IMPORTANT: 이 문서와 참조된 모든 규칙은 프로젝트 법률이다.
YOU MUST 코드 작업 전 관련 규칙을 확인하고, 위반 가능성이 있으면 먼저 사용자에게 알려라.
YOU MUST NOT 명시적 허용 없이 규칙을 위반하는 코드를 작성하지 마라.

## Frontmatter 해석

`.cursor/rules/*.mdc` 파일의 YAML frontmatter:
- `alwaysApply: true` → 모든 작업에 무조건 적용
- `alwaysApply: false` → 관련 작업 시에만 적용
- `globs: "*.jsx"` → 해당 패턴 파일 작업 시 적용
- `description` → 규칙 적용 판단 기준

## 규칙 원본

### CRITICAL (절대 위반 불가)
@.cursor/rules/project-summary.mdc
@.cursor/rules/mui-grid-usage.mdc

**지시된 기능만 구현 (CRITICAL)**
- 사용자가 구체적인 지시를 한 경우, 명시된 기능만 구현할 것
- 요청하지 않은 기능, 옵션, 예외 처리를 임의로 추가하지 말 것
- "있으면 좋을 것 같은" 기능은 먼저 사용자에게 제안하고 승인받은 후 구현

### MUST (반드시 준수)
@.cursor/rules/code-convenstion.mdc
@.cursor/rules/design-system.mdc
@.cursor/rules/project-directory-rules.mdc

### SHOULD (관련 작업 시 준수)
@.cursor/rules/storybook-writing.mdc
@.cursor/rules/easy-refactoring.mdc
@.cursor/rules/mui-custome-theme.mdc

## Key Directories

- `src/components/` – 재사용 UI 컴포넌트 (card, carousel, grid 등)
- `src/stories/` – Storybook 스토리 파일 (overview, style, component, template, page)
- `src/common/ui/` – 공통 UI 요소 (ArrowButton, Indicator)
- `src/styles/` – 테마, 전역 스타일
- `src/templates/` – 컴포넌트 조합 템플릿
- `.storybook/` – Storybook 설정

## Common Commands

```bash
pnpm dev              # Vite 개발 서버
pnpm storybook        # Storybook 실행 (포트 6006)
pnpm build            # 프로덕션 빌드
pnpm build-storybook  # Storybook 정적 빌드
pnpm lint             # ESLint 검사
```

## Workflow

### 모든 코드 변경 전 (MANDATORY)
1. 작업 대상 파일/폴더 확인
2. 관련 규칙 확인 (alwaysApply: true 항목 + 해당 패턴 규칙)
3. 규칙 위반 가능성 체크
4. 충돌 시 → 사용자에게 먼저 알림

### 컴포넌트 생성
1. 요구사항 파악 → 기존 유사 컴포넌트 탐색
2. project-directory-rules.mdc에 따라 위치 결정
3. **디자인 시스템 재활용 (MUST)**:
   - 아이콘: Material Symbols 사용 (`src/stories/style/Icons.stories.jsx` 패턴 참고)
   - 타이포그래피: MUI Typography 컴포넌트 사용
   - 기본 컴포넌트: 기존 `src/components/` 내 컴포넌트 우선 활용
   - 커스텀 SVG/아이콘 생성 금지 (Material Symbols에 없는 경우만 예외)
4. **frontend-design 스킬 사용 (MUST)**: 디자인 관련 작업 시 반드시 `use frontend skill` 호출
5. 구현 (MUI 기반, sx prop 사용)
6. Storybook 스토리 작성
7. 린트 확인

### 디자인 관련 작업 (CRITICAL)
**디자인 작업 시 반드시 `use frontend skill`을 사용해야 합니다.**

해당 작업 예시:
- UI 컴포넌트 스타일링 (색상, 크기, 간격, 레이아웃)
- 새로운 UI 컴포넌트 생성
- 기존 컴포넌트 디자인 수정
- 애니메이션/트랜지션 구현
- 반응형 디자인 작업
- 시각적 요소 조정 (아이콘, 타이포그래피, 그리드)

### 컴포넌트 수정
1. 현재 동작 파악
2. 영향 범위 확인
3. 수정 (기존 동작 유지)
4. 스토리 업데이트 (필요 시)

### 리팩토링
1. 외부 동작 변경 없음 확인
2. easy-refactoring.mdc 참조
3. 기존 스토리 통과 확인

## 규칙 충돌 처리

사용자 요청이 규칙과 충돌할 경우:
1. "이 요청은 [규칙명]과 충돌합니다" 알림
2. 구체적 충돌 내용 설명
3. 사용자가 명시적으로 예외 허용할 때까지 진행 금지
