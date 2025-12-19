import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { GridContent } from '../../components/storybookDocumentation';

export default {
  title: 'MUI Component/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Grid

MUI Grid v7 컴포넌트입니다.

\`size\` prop을 사용하여 반응형 레이아웃을 구성합니다. **12컬럼 시스템**을 기반으로 합니다.

### 12컬럼 시스템
- 한 row의 컬럼 합은 항상 **12**입니다.
- 합이 12를 초과하면 자동으로 다음 줄로 넘어갑니다.
- 예: \`size={6}\` 2개 = 12 (한 줄), \`size={6}\` 3개 = 18 (두 줄로 분리)

| 배치 | size 값 | 합계 |
|------|---------|------|
| 2등분 | 6 + 6 | 12 |
| 3등분 | 4 + 4 + 4 | 12 |
| 4등분 | 3 + 3 + 3 + 3 | 12 |
| 사이드바 | 3 + 9 | 12 |

### 주요 변경사항 (v7)
- \`xs\`, \`sm\`, \`md\` 등의 props 대신 \`size\` prop 사용
- \`size={{ xs: 12, md: 6 }}\` 형태로 반응형 지정

### 사용 패턴
| 패턴 | 설명 | 예시 |
|------|------|------|
| 고정 크기 | 숫자로 컬럼 지정 | \`size={6}\` |
| 반응형 | 브레이크포인트별 지정 | \`size={{ xs: 12, md: 6 }}\` |
| 자동 확장 | 남은 공간 채움 | \`size="grow"\` |
        `,
      },
    },
  },
  argTypes: {
    spacing: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      description: 'Grid 아이템 간의 간격을 지정합니다. (8px 단위)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
};

/** 기본 그리드 - spacing 조절 가능 */
export const Default = {
  args: {
    spacing: 2,
  },
  render: ({ spacing }) => (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ spacing }>
        <Grid size={ 8 }>
          <GridContent label="size=8" variant="primary" />
        </Grid>
        <Grid size={ 4 }>
          <GridContent label="size=4" variant="secondary" />
        </Grid>
        <Grid size={ 4 }>
          <GridContent label="size=4" />
        </Grid>
        <Grid size={ 8 }>
          <GridContent label="size=8" variant="primary" />
        </Grid>
      </Grid>
    </Box>
  ),
};

/** 균등 컬럼 - 3등분 */
export const EqualColumns = {
  args: {
    spacing: 2,
  },
  render: ({ spacing }) => (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ spacing }>
        <Grid size={ 4 }>
          <GridContent label="size=4" variant="primary" />
        </Grid>
        <Grid size={ 4 }>
          <GridContent label="size=4" variant="secondary" />
        </Grid>
        <Grid size={ 4 }>
          <GridContent label="size=4" />
        </Grid>
      </Grid>
    </Box>
  ),
};

/** 반응형 그리드 - 브레이크포인트별 다른 크기 */
export const Responsive = {
  args: {
    spacing: 2,
  },
  render: ({ spacing }) => (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ spacing }>
        <Grid size={ { xs: 12, sm: 6, md: 4 } }>
          <GridContent label="xs=12 sm=6 md=4" variant="primary" />
        </Grid>
        <Grid size={ { xs: 12, sm: 6, md: 4 } }>
          <GridContent label="xs=12 sm=6 md=4" variant="secondary" />
        </Grid>
        <Grid size={ { xs: 12, sm: 6, md: 4 } }>
          <GridContent label="xs=12 sm=6 md=4" variant="primary" />
        </Grid>
      </Grid>
    </Box>
  ),
};

/** 자동 레이아웃 - grow 사용 */
export const AutoLayout = {
  args: {
    spacing: 2,
  },
  render: ({ spacing }) => (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ spacing }>
        <Grid size="grow">
          <GridContent label="grow" />
        </Grid>
        <Grid size={ 6 }>
          <GridContent label="size=6" variant="primary" />
        </Grid>
        <Grid size="grow">
          <GridContent label="grow" />
        </Grid>
      </Grid>
    </Box>
  ),
};

/** 중첩 그리드 */
export const NestedGrid = {
  args: {
    spacing: 2,
  },
  render: ({ spacing }) => (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ spacing }>
        <Grid size={ 8 }>
          <Box sx={ { border: '2px dashed', borderColor: 'grey.400', p: 1 } }>
            <Grid container spacing={ 1 }>
              <Grid size={ 12 }>
                <GridContent label="Nested 12" variant="primary" />
              </Grid>
              <Grid size={ 6 }>
                <GridContent label="Nested 6" variant="primary" />
              </Grid>
              <Grid size={ 6 }>
                <GridContent label="Nested 6" variant="primary" />
              </Grid>
              <Grid size={ 4 }>
                <GridContent label="Nested 4" variant="primary" />
              </Grid>
              <Grid size={ 4 }>
                <GridContent label="Nested 4" variant="primary" />
              </Grid>
              <Grid size={ 4 }>
                <GridContent label="Nested 4" variant="primary" />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid size={ 4 }>
          <Box sx={ { border: '2px dashed', borderColor: 'grey.400', p: 1, height: '100%' } }>
            <Grid container spacing={ 1 } sx={ { height: '100%' } }>
              <Grid size={ 12 }>
                <GridContent label="Nested 12" variant="secondary" />
              </Grid>
              <Grid size={ 12 }>
                <GridContent label="Nested 12" variant="secondary" />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ),
};

/** Spacing 비교 - 다양한 간격 한눈에 보기 */
export const SpacingComparison = {
  render: () => (
    <Box sx={ { flexGrow: 1 } }>
      <Grid container spacing={ 1 } sx={ { mb: 2 } }>
        <Grid size={ 4 }><GridContent label="spacing=1" variant="primary" /></Grid>
        <Grid size={ 4 }><GridContent label="spacing=1" variant="secondary" /></Grid>
        <Grid size={ 4 }><GridContent label="spacing=1" /></Grid>
      </Grid>
      <Grid container spacing={ 2 } sx={ { mb: 2 } }>
        <Grid size={ 4 }><GridContent label="spacing=2" variant="primary" /></Grid>
        <Grid size={ 4 }><GridContent label="spacing=2" variant="secondary" /></Grid>
        <Grid size={ 4 }><GridContent label="spacing=2" /></Grid>
      </Grid>
      <Grid container spacing={ 4 }>
        <Grid size={ 4 }><GridContent label="spacing=4" variant="primary" /></Grid>
        <Grid size={ 4 }><GridContent label="spacing=4" variant="secondary" /></Grid>
        <Grid size={ 4 }><GridContent label="spacing=4" /></Grid>
      </Grid>
    </Box>
  ),
};

