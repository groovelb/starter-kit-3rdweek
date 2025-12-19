import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CustomCard } from '../../../components/card/CustomCard';

export default {
  title: 'Custom Component/Card/CustomCard',
  component: CustomCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CustomCard

미디어 영역과 콘텐츠 영역으로 구성된 카드 컴포넌트.
CardContainer를 확장하여 레이아웃, 미디어 비율, 오버레이 등을 지원합니다.

### 레이아웃 타입
- **vertical**: 미디어가 위, 콘텐츠가 아래 (기본값)
- **horizontal**: 미디어와 콘텐츠가 좌우 배치
- **overlay**: 미디어 위에 콘텐츠가 오버레이

### 미디어 비율
- \`1/1\`: 정사각형
- \`4/3\`: 표준 사진 비율
- \`16/9\`: 와이드스크린
- \`21/9\`: 울트라와이드
- \`auto\`: 원본 이미지 비율 유지

### CardContainer Props
variant, elevation, isInteractive, isSelected 등 CardContainer의 모든 props를 지원합니다.

### Hover Interaction Props
- \`hoverLift\`: hover 시 위로 들리는 px 값
- \`hoverBorderColor\`: hover 시 border 색상
- \`hoverBgColor\`: hover 시 배경색
- \`hoverMediaScale\`: hover 시 미디어 확대 비율
        `,
      },
    },
  },
  argTypes: {
    // === CustomCard 전용 props ===
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'overlay'],
      description: '카드 레이아웃 타입',
      table: {
        type: { summary: "'vertical' | 'horizontal' | 'overlay'" },
        defaultValue: { summary: 'vertical' },
      },
    },
    mediaPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: '미디어 위치 (vertical: 상/하, horizontal: 좌/우)',
      table: {
        type: { summary: "'start' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    mediaRatio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '21/9', 'auto'],
      description: '미디어 영역 비율. auto는 원본 비율 유지.',
      table: {
        type: { summary: "'1/1' | '4/3' | '16/9' | '21/9' | 'auto'" },
        defaultValue: { summary: '16/9' },
      },
    },
    mediaSrc: {
      control: 'text',
      description: '미디어 이미지 URL',
      table: {
        type: { summary: 'string' },
      },
    },
    mediaAlt: {
      control: 'text',
      description: '미디어 대체 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    contentPadding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: '콘텐츠 영역 패딩 (SPACING.inset 토큰)',
      table: {
        type: { summary: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' },
      },
    },
    contentAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '콘텐츠 수평 정렬',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: '미디어와 콘텐츠 사이 간격 (SPACING.stack 토큰)',
      table: {
        type: { summary: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'none' },
      },
    },

    // === CardContainer props (전달됨) ===
    variant: {
      control: 'select',
      options: ['outlined', 'elevation', 'ghost', 'filled'],
      description: '[CardContainer] 카드 스타일',
      table: {
        type: { summary: "'outlined' | 'elevation' | 'ghost' | 'filled'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24 },
      description: '[CardContainer] 그림자 깊이. variant="elevation"일 때 적용.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
      if: { arg: 'variant', eq: 'elevation' },
    },
    isInteractive: {
      control: 'boolean',
      description: '[CardContainer] 호버 효과 활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '[CardContainer] 클릭 이벤트 핸들러',
      table: {
        type: { summary: 'function' },
      },
    },

    // === Hover Interaction props ===
    hoverLift: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'hover 시 위로 들리는 px 값',
      table: {
        type: { summary: 'number' },
        category: 'Hover Interaction',
      },
    },
    hoverBorderColor: {
      control: 'text',
      description: 'hover 시 border 색상 (예: primary.main, #ff0000)',
      table: {
        type: { summary: 'string' },
        category: 'Hover Interaction',
      },
    },
    hoverBgColor: {
      control: 'text',
      description: 'hover 시 배경색 (예: grey.50, #f5f5f5)',
      table: {
        type: { summary: 'string' },
        category: 'Hover Interaction',
      },
    },
    hoverMediaScale: {
      control: { type: 'number', min: 1, max: 1.5, step: 0.01 },
      description: 'hover 시 미디어 확대 비율 (예: 1.05)',
      table: {
        type: { summary: 'number' },
        category: 'Hover Interaction',
      },
    },
  },
};

/** 기본 CustomCard - Controls에서 모든 props를 조작해보세요 */
export const Default = {
  args: {
    layout: 'vertical',
    mediaPosition: 'start',
    mediaSrc: 'https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=600',
    mediaAlt: 'Sample image',
    mediaRatio: '16/9',
    contentPadding: 'md',
    contentAlign: 'start',
    gap: 'none',
    variant: 'outlined',
    elevation: 1,
    isInteractive: false,
  },
  render: (args) => (
    <CustomCard {...args} sx={ { width: 320 } }>
      <Typography variant="h6" sx={ { fontWeight: 600, mb: 1 } }>
        카드 제목
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={ { mb: 1.5 } }>
        CustomCard는 CardContainer를 확장하여 미디어와 콘텐츠 레이아웃을 지원합니다.
      </Typography>
      <Stack direction="row" spacing={ 1 }>
        <Chip label="React" size="small" />
        <Chip label="MUI" size="small" />
      </Stack>
    </CustomCard>
  ),
};

/** 레이아웃 비교 - vertical, horizontal, overlay */
export const Layouts = {
  render: () => (
    <Stack spacing={ 4 }>
      {/* Vertical */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          Vertical (기본)
        </Typography>
        <CustomCard
          layout="vertical"
          mediaSrc="https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=600"
          mediaRatio="16/9"
          contentPadding="md"
          sx={ { width: 280 } }
        >
          <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
            Vertical 레이아웃
          </Typography>
          <Typography variant="body2" color="text.secondary">
            미디어가 위, 콘텐츠가 아래
          </Typography>
        </CustomCard>
      </Box>

      {/* Horizontal */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          Horizontal
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          <CustomCard
            layout="horizontal"
            mediaPosition="start"
            mediaSrc="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="1/1"
            contentPadding="md"
            sx={ { width: 400 } }
          >
            <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
              mediaPosition: start
            </Typography>
            <Typography variant="body2" color="text.secondary">
              미디어가 왼쪽
            </Typography>
          </CustomCard>
          <CustomCard
            layout="horizontal"
            mediaPosition="end"
            mediaSrc="https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="1/1"
            contentPadding="md"
            sx={ { width: 400 } }
          >
            <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
              mediaPosition: end
            </Typography>
            <Typography variant="body2" color="text.secondary">
              미디어가 오른쪽
            </Typography>
          </CustomCard>
        </Stack>
      </Box>

      {/* Overlay */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          Overlay
        </Typography>
        <CustomCard
          layout="overlay"
          mediaSrc="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600"
          contentPadding="lg"
          sx={ { width: 400, height: 280 } }
        >
          <Typography variant="h5" sx={ { fontWeight: 700, mb: 1 } }>
            Overlay 레이아웃
          </Typography>
          <Typography variant="body2" sx={ { opacity: 0.9 } }>
            미디어 위에 그라데이션과 함께 콘텐츠가 오버레이됩니다.
          </Typography>
        </CustomCard>
      </Box>
    </Stack>
  ),
};

/** 기능 조합 - overlaySlot, mediaSlot, CardContainer props */
export const Features = {
  render: () => (
    <Stack spacing={ 4 }>
      {/* overlaySlot */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          overlaySlot - 미디어 위 오버레이 요소
        </Typography>
        <CustomCard
          mediaSrc="https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"
          mediaRatio="4/3"
          contentPadding="sm"
          overlaySlot={
            <Box sx={ { position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 } }>
              <IconButton size="small" sx={ { bgcolor: 'background.paper', boxShadow: 1 } }>
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={ { bgcolor: 'primary.main', color: 'white', boxShadow: 1 } }>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          }
          sx={ { width: 280 } }
        >
          <Typography variant="body2" sx={ { fontWeight: 600 } }>
            overlaySlot 사용
          </Typography>
          <Typography variant="caption" color="text.secondary">
            미디어 위에 액션 버튼 배치
          </Typography>
        </CustomCard>
      </Box>

      {/* CardContainer variant */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          CardContainer variant 적용
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          { ['outlined', 'elevation', 'ghost', 'filled'].map((v) => (
            <CustomCard
              key={ v }
              variant={ v }
              elevation={ 4 }
              mediaSrc="https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=600"
              mediaRatio="16/9"
              contentPadding="sm"
              sx={ { width: 160 } }
            >
              <Typography variant="caption" sx={ { fontWeight: 600 } }>
                { v }
              </Typography>
            </CustomCard>
          )) }
        </Stack>
      </Box>

      {/* isInteractive */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          Interactive 상태
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          <CustomCard
            mediaSrc="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            isInteractive
            overlaySlot={
              <Box sx={ { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } }>
                <IconButton sx={ { bgcolor: 'rgba(0,0,0,0.6)', color: 'white' } }>
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
              </Box>
            }
            sx={ { width: 240 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              isInteractive
            </Typography>
            <Typography variant="caption" color="text.secondary">
              호버 시 효과 적용
            </Typography>
          </CustomCard>
        </Stack>
      </Box>

      {/* mediaSlot */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          mediaSlot - 커스텀 미디어 요소
        </Typography>
        <CustomCard
          mediaSlot={
            <Box
              sx={ {
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '2px',
                width: '100%',
                aspectRatio: '1/1',
                backgroundColor: 'grey.200',
              } }
            >
              { [1, 2, 3, 4].map((i) => (
                <Box
                  key={ i }
                  component="img"
                  src={ `https://picsum.photos/seed/${i}/200/200` }
                  alt={ `Image ${i}` }
                  sx={ { width: '100%', height: '100%', objectFit: 'cover' } }
                />
              )) }
            </Box>
          }
          contentPadding="md"
          sx={ { width: 280 } }
        >
          <Typography variant="subtitle1" sx={ { fontWeight: 700 } }>
            2×2 썸네일 그리드
          </Typography>
          <Typography variant="body2" color="text.secondary">
            mediaSlot으로 커스텀 미디어 구현
          </Typography>
        </CustomCard>
      </Box>
    </Stack>
  ),
};

/** Hover Interaction - hoverLift, hoverBorderColor, hoverBgColor, hoverMediaScale */
export const HoverInteractions = {
  render: () => (
    <Stack spacing={ 4 }>
      {/* hoverLift */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          hoverLift - 위로 들어올림
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          <CustomCard
            mediaSrc="https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            hoverLift={ 4 }
            sx={ { width: 200 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              hoverLift: 4
            </Typography>
          </CustomCard>
          <CustomCard
            mediaSrc="https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            hoverLift={ 8 }
            sx={ { width: 200 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              hoverLift: 8
            </Typography>
          </CustomCard>
        </Stack>
      </Box>

      {/* hoverBorderColor */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          hoverBorderColor - border 색상 변경
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          <CustomCard
            variant="outlined"
            mediaSrc="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            hoverBorderColor="primary.main"
            sx={ { width: 200 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              primary.main
            </Typography>
          </CustomCard>
          <CustomCard
            variant="outlined"
            mediaSrc="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            hoverBorderColor="error.main"
            sx={ { width: 200 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              error.main
            </Typography>
          </CustomCard>
        </Stack>
      </Box>

      {/* hoverBgColor */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          hoverBgColor - 배경색 변경
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          <CustomCard
            variant="ghost"
            mediaSrc="https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            hoverBgColor="grey.100"
            sx={ { width: 200 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              grey.100
            </Typography>
          </CustomCard>
          <CustomCard
            variant="ghost"
            mediaSrc="https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            hoverBgColor="primary.50"
            sx={ { width: 200 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              primary.50
            </Typography>
          </CustomCard>
        </Stack>
      </Box>

      {/* hoverMediaScale */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          hoverMediaScale - 미디어 확대
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          <CustomCard
            mediaSrc="https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            hoverMediaScale={ 1.05 }
            sx={ { width: 200 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              scale: 1.05
            </Typography>
          </CustomCard>
          <CustomCard
            mediaSrc="https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=600"
            mediaRatio="16/9"
            contentPadding="md"
            hoverMediaScale={ 1.1 }
            sx={ { width: 200 } }
          >
            <Typography variant="body2" sx={ { fontWeight: 600 } }>
              scale: 1.1
            </Typography>
          </CustomCard>
        </Stack>
      </Box>

      {/* 조합 */}
      <Box>
        <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
          조합 - 모든 hover 효과 적용
        </Typography>
        <CustomCard
          variant="outlined"
          mediaSrc="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600"
          mediaRatio="16/9"
          contentPadding="md"
          hoverLift={ 6 }
          hoverBorderColor="primary.main"
          hoverBgColor="grey.50"
          hoverMediaScale={ 1.05 }
          sx={ { width: 280 } }
        >
          <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
            All Hover Effects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            hoverLift + hoverBorderColor + hoverBgColor + hoverMediaScale
          </Typography>
        </CustomCard>
      </Box>
    </Stack>
  ),
};
