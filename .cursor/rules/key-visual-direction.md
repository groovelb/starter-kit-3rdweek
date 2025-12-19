# Lumenstate Key Visual Direction

> "빛은 공간의 상태다."

---

## Visual Concept

조명 제품의 선과 면으로 구성된 기하학적 형태를 UI에 계승합니다.
곡선 세리프 서체로 빛의 부드러운 확산을 표현하고,
라인 그리드와 충분한 여백으로 공간의 품격을 유지합니다.

---

## Color

4색만 사용. 그래디언트/글로우/블러 금지.

- Wall Tint White `#F5F2EE`: 라이트 배경, 카드 배경
- 3800K White `#F2E9DA`: 다크 모드 텍스트
- Warm Black `#12100E`: 다크 배경, 라이트 모드 텍스트
- 3800K Accent `#FFC66E`: 액센트 (CTA, 링크, 포커스)

### MUI 토큰 매핑

| 모드 | primary.main | secondary.main |
|------|--------------|----------------|
| Light | `#12100E` (Warm Black) | `#FFC66E` (Accent) |
| Dark | `#F5F2EE` (Wall Tint White) | `#FFC66E` (Accent) |

- **primary**: 기본 텍스트, 아이콘, 보더 (모드에 따라 반전)
- **secondary**: CTA 버튼, 링크, 액센트 (모드 불문 동일)

선택 이유:
- 3800K 색온도 기반으로 조명 제품의 따뜻한 빛을 반영
- 순백/순흑 대신 틴트된 색상으로 실제 벽면과 조명 환경 재현
- primary는 텍스트/UI 기본색, secondary는 강조색으로 역할 분리

### 시간대별 배경색 전환

12:00pm → 12:00am 사이를 4단계로 나눠 배경색이 점진적으로 전환됩니다.

- 12:00pm (정오): `#F5F2EE` - 가장 밝음
- 4:00pm (오후): `#F5F2EE` - 밝음 유지
- 8:00pm (저녁): `#12100E` - 어두움 전환
- 12:00am (자정): `#12100E` - 가장 어두움

4:00pm → 8:00pm 구간에서 밝은색에서 어두운색으로 자연스럽게 보간됩니다.

---

## Typography

- Display: Cormorant Garamond
- Body: Pretendard Variable

선택 이유:
- Cormorant Garamond: 세리프 곡선이 빛의 확산을 연상, 기하학적 우아함
- Pretendard: 한글/영문 혼용 최적화, 가변 폰트 지원

---

## Icon

Library: `lucide-react`

선택 이유:
- 1.5px 스트로크로 브랜드 라인 스타일과 일치
- 경량, 트리쉐이킹 지원
- Feather Icons 계승으로 미니멀 미감 보장
