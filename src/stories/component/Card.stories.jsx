import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default {
  title: 'MUI Component/Card/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Card

관련 콘텐츠를 그룹화하여 표시하는 카드 컴포넌트입니다.

### 구성 요소

| 컴포넌트 | 설명 | 예시 |
|----------|------|------|
| Card | 카드 컨테이너 | \`<Card>...</Card>\` |
| CardHeader | 제목, 부제목, 아바타 | 작성자 정보 |
| CardMedia | 이미지, 비디오 | 썸네일 |
| CardContent | 주요 콘텐츠 | 텍스트, 설명 |
| CardActions | 액션 버튼 | 좋아요, 공유 |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
      description: '카드 스타일. elevation은 그림자, outlined는 테두리로 구분합니다.',
      table: {
        type: { summary: "'elevation' | 'outlined'" },
        defaultValue: { summary: 'elevation' },
      },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24 },
      description: '그림자 깊이 (0-24). variant="elevation"일 때만 적용됩니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
      if: { arg: 'variant', eq: 'elevation' },
    },
    raised: {
      control: 'boolean',
      description: 'true 시 elevation=8 고정. variant="elevation"일 때만 적용됩니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'variant', eq: 'elevation' },
    },
    square: {
      control: 'boolean',
      description: 'true 시 borderRadius=0으로 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

/** 기본 카드 - Controls에서 elevation, variant 등을 조작해보세요 */
export const Default = {
  args: {
    elevation: 1,
    variant: 'elevation',
    raised: false,
    square: false,
  },
  render: (args) => (
    <Card
      sx={ { maxWidth: 345 } }
      elevation={ args.elevation }
      variant={ args.variant }
      raised={ args.raised }
      square={ args.square }
    >
      <CardMedia
        component="img"
        height="140"
        image="https://picsum.photos/seed/card1/345/140"
        alt="카드 이미지"
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          카드 제목
        </Typography>
        <Typography variant="body2" color="text.secondary">
          카드는 관련된 콘텐츠를 그룹화하여 표시하는 컴포넌트입니다.
          다양한 정보를 구조화된 형태로 보여줄 수 있습니다.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">더 보기</Button>
        <Button size="small">공유</Button>
      </CardActions>
    </Card>
  ),
};

/** Variant 비교 - elevation vs outlined */
export const Variants = {
  render: () => (
    <Stack direction="row" spacing={ 3 }>
      <Card variant="elevation" elevation={ 2 } sx={ { width: 200 } }>
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            variant
          </Typography>
          <Typography variant="h6">elevation</Typography>
          <Typography variant="body2" color="text.secondary">
            그림자로 영역 구분
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={ { width: 200 } }>
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            variant
          </Typography>
          <Typography variant="h6">outlined</Typography>
          <Typography variant="body2" color="text.secondary">
            테두리로 영역 구분
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

/** 구성 요소별 활용법 */
export const Composition = {
  render: () => (
    <Stack spacing={ 4 }>
      {/* CardHeader */}
      <Box>
        <Typography variant="subtitle2" sx={ { mb: 1, fontWeight: 600 } }>
          CardHeader - 제목, 부제목, 아바타, 액션 버튼
        </Typography>
        <Card sx={ { maxWidth: 345 } }>
          <CardHeader
            avatar={
              <Avatar sx={ { bgcolor: 'primary.main' } }>K</Avatar>
            }
            action={
              <IconButton>
                <Box component="span" sx={ { fontSize: 20 } }>⋮</Box>
              </IconButton>
            }
            title="김철수"
            subheader="2024년 1월 15일"
          />
        </Card>
      </Box>

      {/* CardMedia */}
      <Box>
        <Typography variant="subtitle2" sx={ { mb: 1, fontWeight: 600 } }>
          CardMedia - 이미지, 비디오 썸네일
        </Typography>
        <Card sx={ { maxWidth: 345 } }>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/seed/card2/345/160"
            alt="카드 이미지"
          />
        </Card>
      </Box>

      {/* CardContent */}
      <Box>
        <Typography variant="subtitle2" sx={ { mb: 1, fontWeight: 600 } }>
          CardContent - 주요 콘텐츠 (텍스트, 설명, 태그 등)
        </Typography>
        <Card sx={ { maxWidth: 345 } }>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              콘텐츠 제목
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={ { mb: 1.5 } }>
              카드의 주요 내용을 담는 영역입니다. 텍스트, 가격, 태그 등 다양한 정보를 배치합니다.
            </Typography>
            <Stack direction="row" spacing={ 1 }>
              <Chip label="React" size="small" />
              <Chip label="MUI" size="small" />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* CardActions */}
      <Box>
        <Typography variant="subtitle2" sx={ { mb: 1, fontWeight: 600 } }>
          CardActions - 액션 버튼 영역
        </Typography>
        <Card sx={ { maxWidth: 345 } }>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              하단에 버튼을 배치할 때 사용합니다.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">자세히 보기</Button>
            <Button size="small" variant="contained">액션</Button>
          </CardActions>
        </Card>
      </Box>

      {/* 전체 조합 */}
      <Box>
        <Typography variant="subtitle2" sx={ { mb: 1, fontWeight: 600 } }>
          전체 조합 예시
        </Typography>
        <Card sx={ { maxWidth: 345 } }>
          <CardHeader
            avatar={<Avatar sx={ { bgcolor: 'secondary.main' } }>D</Avatar>}
            action={
              <IconButton>
                <Box component="span" sx={ { fontSize: 20 } }>⋮</Box>
              </IconButton>
            }
            title="개발자 김"
            subheader="2024.01.15"
          />
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/seed/card3/345/160"
            alt="게시물 이미지"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              CardHeader, CardMedia, CardContent, CardActions를 모두 조합한 예시입니다.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton>
              <Box component="span" sx={ { fontSize: 20 } }>♡</Box>
            </IconButton>
            <IconButton>
              <Box component="span" sx={ { fontSize: 20 } }>💬</Box>
            </IconButton>
            <IconButton>
              <Box component="span" sx={ { fontSize: 20 } }>↗</Box>
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </Stack>
  ),
};
