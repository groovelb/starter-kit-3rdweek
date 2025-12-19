import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LineGrid from '../../../components/layout/LineGrid';
import { GridContent } from '../../../components/storybookDocumentation';

export default {
  title: 'Custom Component/Layout/LineGrid',
  component: LineGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## LineGrid

MUI Grid를 확장하여 아이템 사이에 선(border)을 자동으로 그려주는 커스텀 레이아웃 컴포넌트입니다.

### 주요 기능
- **Grid Container 모드**: \`container\` prop 사용 시 Grid 아이템 사이에 수직/수평선 자동 생성
- **Stack 모드**: \`container\` prop 없이 사용 시 Stack + Divider로 동작
- **Equal Height**: \`equalHeight\` prop으로 모든 행 높이 균등 분배
- **Row Heights**: \`rowHeights\` prop으로 행별 비율 지정 가능

### 사용 패턴
| 패턴 | 설명 | 예시 |
|------|------|------|
| Grid Container | 선이 있는 그리드 | \`<LineGrid container gap={16}>\` |
| Stack | 수직 구분선 | \`<LineGrid>\` |
| Equal Height | 균등 높이 | \`<LineGrid container equalHeight>\` |
| Row Heights | 비율 지정 | \`<LineGrid container rowHeights={[1, 2]}>\` |
        `,
      },
    },
  },
  argTypes: {
    container: {
      control: 'boolean',
      description: 'Grid container 모드 활성화. false면 Stack 모드로 동작',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    gap: {
      control: { type: 'range', min: 0, max: 64, step: 8 },
      description: '아이템 간 간격 (px). 선은 이 간격의 중앙에 그려집니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    borderColor: {
      control: 'text',
      description: '선 색상 (MUI 색상 토큰)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text.primary' },
      },
    },
    equalHeight: {
      control: 'boolean',
      description: '모든 행 높이를 균등하게 분배',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rowHeights: {
      control: 'object',
      description: '행별 높이 비율 배열 (예: [1, 2, 1])',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: 'null' },
      },
    },
  },
};

/** 기본 Grid Container - 선이 있는 그리드 레이아웃 */
export const Default = {
  args: {
    container: true,
    gap: 16,
    borderColor: 'text.primary',
  },
  render: ({ container, gap, borderColor }) => (
    <Box sx={ { width: '100%', maxWidth: 600 } }>
      <LineGrid container={ container } gap={ gap } borderColor={ borderColor }>
        <Grid size={ { xs: 6 } }>
          <GridContent label="xs=6" variant="primary" height={ 80 } />
        </Grid>
        <Grid size={ { xs: 6 } }>
          <GridContent label="xs=6" variant="secondary" height={ 80 } />
        </Grid>
        <Grid size={ { xs: 4 } }>
          <GridContent label="xs=4" height={ 80 } />
        </Grid>
        <Grid size={ { xs: 4 } }>
          <GridContent label="xs=4" variant="primary" height={ 80 } />
        </Grid>
        <Grid size={ { xs: 4 } }>
          <GridContent label="xs=4" variant="secondary" height={ 80 } />
        </Grid>
      </LineGrid>
    </Box>
  ),
};

/** Stack 모드 - 수직 Divider로 섹션 구분 */
export const StackMode = {
  args: {
    gap: 16,
    borderColor: 'text.primary',
  },
  render: ({ gap, borderColor }) => (
    <Box sx={ { width: '100%', maxWidth: 400 } }>
      <LineGrid gap={ gap } borderColor={ borderColor }>
        <GridContent label="Section 1" variant="primary" height={ 60 } />
        <GridContent label="Section 2" variant="secondary" height={ 60 } />
        <GridContent label="Section 3" height={ 60 } />
      </LineGrid>
    </Box>
  ),
};

/** Equal Height - 모든 행 균등 높이 */
export const EqualHeight = {
  args: {
    gap: 16,
    borderColor: 'divider',
  },
  render: ({ gap, borderColor }) => (
    <Box sx={ { width: '100%', maxWidth: 600, height: 300 } }>
      <LineGrid container gap={ gap } borderColor={ borderColor } equalHeight>
        <Grid size={ { xs: 12 } }>
          <GridContent label="Row 1 (1/3)" variant="primary" height="100%" />
        </Grid>
        <Grid size={ { xs: 6 } }>
          <GridContent label="Row 2 - Col 1" variant="secondary" height="100%" />
        </Grid>
        <Grid size={ { xs: 6 } }>
          <GridContent label="Row 2 - Col 2" height="100%" />
        </Grid>
        <Grid size={ { xs: 4 } }>
          <GridContent label="Row 3" variant="primary" height="100%" />
        </Grid>
        <Grid size={ { xs: 4 } }>
          <GridContent label="Row 3" variant="secondary" height="100%" />
        </Grid>
        <Grid size={ { xs: 4 } }>
          <GridContent label="Row 3" height="100%" />
        </Grid>
      </LineGrid>
    </Box>
  ),
};

/** Row Heights - 행별 비율 지정 */
export const CustomRowHeights = {
  args: {
    gap: 16,
    borderColor: 'text.secondary',
    rowHeights: [1, 2],
  },
  render: ({ gap, borderColor, rowHeights }) => (
    <Box sx={ { width: '100%', maxWidth: 600, height: 300 } }>
      <LineGrid container gap={ gap } borderColor={ borderColor } rowHeights={ rowHeights }>
        <Grid size={ { xs: 12 } }>
          <GridContent label="Row 1 (1/3 height)" variant="primary" height="100%" />
        </Grid>
        <Grid size={ { xs: 6 } }>
          <GridContent label="Row 2 (2/3 height)" variant="secondary" height="100%" />
        </Grid>
        <Grid size={ { xs: 6 } }>
          <GridContent label="Row 2 (2/3 height)" height="100%" />
        </Grid>
      </LineGrid>
    </Box>
  ),
};

/** 반응형 그리드 - 브레이크포인트별 레이아웃 변경 */
export const Responsive = {
  args: {
    gap: 16,
    borderColor: 'text.primary',
  },
  render: ({ gap, borderColor }) => (
    <Box sx={ { width: '100%', maxWidth: 800 } }>
      <Typography variant="caption" color="text.secondary" sx={ { mb: 2, display: 'block' } }>
        브라우저 크기를 조절해서 반응형 동작을 확인하세요
      </Typography>
      <LineGrid container gap={ gap } borderColor={ borderColor }>
        <Grid size={ { xs: 12, md: 8 } }>
          <GridContent label="xs=12 md=8" variant="primary" height={ 100 } />
        </Grid>
        <Grid size={ { xs: 12, md: 4 } }>
          <GridContent label="xs=12 md=4" variant="secondary" height={ 100 } />
        </Grid>
        <Grid size={ { xs: 6, md: 4 } }>
          <GridContent label="xs=6 md=4" height={ 80 } />
        </Grid>
        <Grid size={ { xs: 6, md: 4 } }>
          <GridContent label="xs=6 md=4" variant="primary" height={ 80 } />
        </Grid>
        <Grid size={ { xs: 12, md: 4 } }>
          <GridContent label="xs=12 md=4" variant="secondary" height={ 80 } />
        </Grid>
      </LineGrid>
    </Box>
  ),
};

/** Border Color 변형 - 다양한 선 색상 */
export const BorderColorVariants = {
  render: () => (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 400 } }>
      <Box>
        <Typography variant="subtitle2" sx={ { mb: 1 } }>borderColor="text.primary"</Typography>
        <LineGrid container gap={ 16 } borderColor="text.primary">
          <Grid size={ { xs: 6 } }><GridContent label="1" height={ 50 } /></Grid>
          <Grid size={ { xs: 6 } }><GridContent label="2" height={ 50 } /></Grid>
        </LineGrid>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={ { mb: 1 } }>borderColor="primary.main"</Typography>
        <LineGrid container gap={ 16 } borderColor="primary.main">
          <Grid size={ { xs: 6 } }><GridContent label="1" variant="primary" height={ 50 } /></Grid>
          <Grid size={ { xs: 6 } }><GridContent label="2" variant="primary" height={ 50 } /></Grid>
        </LineGrid>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={ { mb: 1 } }>borderColor="divider"</Typography>
        <LineGrid container gap={ 16 } borderColor="divider">
          <Grid size={ { xs: 6 } }><GridContent label="1" variant="secondary" height={ 50 } /></Grid>
          <Grid size={ { xs: 6 } }><GridContent label="2" variant="secondary" height={ 50 } /></Grid>
        </LineGrid>
      </Box>
    </Box>
  ),
};
