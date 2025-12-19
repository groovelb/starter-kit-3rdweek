import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { CardContainer } from '../../../components/card/CardContainer';
import { SPACING, toPx } from '../../../styles/tokens';

export default {
  title: 'Custom Component/Card/CardContainer',
  component: CardContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CardContainer

MUI Card를 확장한 래퍼 컴포넌트. SPACING 시멘틱 토큰을 사용하여 일관된 패딩을 적용합니다.

### Variant 타입
- **outlined**: 테두리가 있는 기본 스타일 (기본값)
- **elevation**: 그림자가 있는 스타일
- **ghost**: 배경/테두리 없는 투명 스타일
- **filled**: 배경색이 채워진 스타일

### Padding (SPACING.inset 토큰)
| padding | 값 | 픽셀 |
|---------|-----|------|
| none | 0 | 0px |
| xs | 1 | 8px |
| sm | 2 | 16px |
| md | 3 | 24px |
| lg | 4 | 32px |
| xl | 5 | 40px |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'elevation', 'ghost', 'filled'],
      description: '카드 스타일. outlined/elevation은 MUI Card 기본, ghost/filled는 커스텀.',
      table: {
        type: { summary: "'outlined' | 'elevation' | 'ghost' | 'filled'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: '내부 패딩. SPACING.inset 토큰 사용.',
      table: {
        type: { summary: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' },
      },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24 },
      description: '그림자 깊이 (0-24). variant="elevation"일 때만 적용.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
      if: { arg: 'variant', eq: 'elevation' },
    },
    isInteractive: {
      control: 'boolean',
      description: '호버 효과 활성화. true 시 마우스 오버에 시각적 피드백.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러.',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

/** 기본 CardContainer - Controls에서 variant, padding, isInteractive 등을 조작해보세요 */
export const Default = {
  args: {
    variant: 'outlined',
    padding: 'md',
    elevation: 1,
    isInteractive: false,
  },
  render: (args) => (
    <CardContainer {...args} sx={ { width: 320 } }>
      <Typography variant="h6" sx={ { fontWeight: 600, mb: 1 } }>
        카드 제목
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={ { mb: 2 } }>
        CardContainer는 MUI Card를 확장하여 SPACING.inset 토큰으로 패딩을 적용합니다.
      </Typography>
      <Stack direction="row" spacing={ 1 }>
        <Chip label="React" size="small" />
        <Chip label="MUI" size="small" />
      </Stack>
    </CardContainer>
  ),
};

/** Variant 비교 - outlined, elevation, ghost, filled */
export const Variants = {
  render: () => (
    <Stack spacing={ 3 }>
      <Stack direction="row" spacing={ 2 } flexWrap="wrap" useFlexGap>
        { ['outlined', 'elevation', 'ghost', 'filled'].map((variant) => (
          <CardContainer
            key={ variant }
            variant={ variant }
            padding="md"
            elevation={ 2 }
            sx={ { width: 180 } }
          >
            <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 0.5 } }>
              { variant }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              variant=&quot;{ variant }&quot;
            </Typography>
          </CardContainer>
        )) }
      </Stack>

      {/* Padding 비교 */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          Padding (SPACING.inset 토큰)
        </Typography>
        <Stack direction="row" spacing={ 2 } alignItems="flex-start" flexWrap="wrap" useFlexGap>
          { ['none', 'xs', 'sm', 'md', 'lg'].map((p) => (
            <CardContainer
              key={ p }
              variant="outlined"
              padding={ p }
              sx={ { width: 120 } }
            >
              <Typography variant="caption" sx={ { fontWeight: 600 } }>
                { p }
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                { toPx(SPACING.inset[p]) }px
              </Typography>
            </CardContainer>
          )) }
        </Stack>
      </Box>
    </Stack>
  ),
};

/** 상태 조합 - Interactive + Selected */
export const States = {
  render: () => (
    <Stack spacing={ 3 }>
      {/* Interactive 상태 */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          Interactive (isInteractive=true) - 호버해보세요
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          { ['outlined', 'elevation', 'ghost', 'filled'].map((variant) => (
            <CardContainer
              key={ variant }
              variant={ variant }
              padding="sm"
              elevation={ 2 }
              isInteractive
              sx={ { width: 140 } }
            >
              <Typography variant="caption" sx={ { fontWeight: 600 } }>
                { variant }
              </Typography>
            </CardContainer>
          )) }
        </Stack>
      </Box>

      {/* Interactive 사용 예시 */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          선택 가능한 옵션 (isInteractive 활용)
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          { ['Basic', 'Pro', 'Enterprise'].map((plan, index) => (
            <CardContainer
              key={ plan }
              variant="outlined"
              padding="md"
              isInteractive
              sx={ { width: 140 } }
            >
              <Typography variant="subtitle2" sx={ { fontWeight: 700, mb: 0.5 } }>
                { plan }
              </Typography>
              <Typography variant="h6" sx={ { fontWeight: 700, mb: 1 } }>
                ${ index === 0 ? '9' : index === 1 ? '29' : '99' }
                <Typography component="span" variant="caption" color="text.secondary">
                  /mo
                </Typography>
              </Typography>
              <Button
                variant={ index === 1 ? 'contained' : 'outlined' }
                size="small"
                fullWidth
              >
                { index === 1 ? 'Current' : 'Select' }
              </Button>
            </CardContainer>
          )) }
        </Stack>
      </Box>
    </Stack>
  ),
};
