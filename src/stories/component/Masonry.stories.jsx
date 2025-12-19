import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

/**
 * 랜덤 높이 생성 (Masonry 효과 시연용)
 */
const heights = [150, 90, 180, 120, 200, 100, 160, 130, 170, 110, 140, 190];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.grey[300]}`,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    borderColor: theme.palette.grey[700],
  }),
}));

const ColoredItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImageItem = styled(Box)({
  borderRadius: 4,
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
});

export default {
  title: 'MUI Component/Layout/Masonry',
  component: Masonry,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Masonry

\`@mui/lab\`의 Masonry 컴포넌트입니다. **Pinterest 스타일**의 가변 높이 그리드 레이아웃을 구현합니다.

### Grid와의 차이점

| Grid | Masonry |
|------|---------|
| Flexbox 기반 | CSS columns 기반 |
| 행 높이 균등 | 개별 아이템 높이 유지 |
| 가로 → 세로 순서 | 세로 → 가로 순서 |
| 일반 레이아웃 | 이미지 갤러리, 카드 목록 |

### 사용 시나리오
- 이미지 갤러리 (다양한 비율)
- 카드 목록 (다양한 콘텐츠 길이)
- Pinterest/Behance 스타일 레이아웃

### 주요 Props

| Prop | 타입 | 설명 |
|------|------|------|
| \`columns\` | number \\| object | 컬럼 수 (반응형 지원) |
| \`spacing\` | number | 아이템 간 간격 (8px 단위) |
| \`defaultColumns\` | number | SSR용 기본 컬럼 수 |
| \`defaultSpacing\` | number | SSR용 기본 간격 |
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: '컬럼 수를 지정합니다.',
      table: {
        type: { summary: 'number | object' },
        defaultValue: { summary: '4' },
      },
    },
    spacing: {
      control: 'select',
      options: [0, 1, 2, 3, 4],
      description: '아이템 간 간격 (8px 단위)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
};

/** 기본 Masonry - 다양한 높이의 아이템 */
export const Default = {
  args: {
    columns: 4,
    spacing: 2,
  },
  render: ({ columns, spacing }) => (
    <Box sx={{ width: '100%' }}>
      <Masonry columns={columns} spacing={spacing}>
        {heights.map((height, index) => (
          <Item key={index} sx={{ height }}>
            {index + 1}
          </Item>
        ))}
      </Masonry>
    </Box>
  ),
};

/** 반응형 컬럼 - 브레이크포인트별 컬럼 수 */
export const Responsive = {
  render: () => (
    <Box sx={{ width: '100%' }}>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={2}
      >
        {heights.map((height, index) => (
          <ColoredItem key={index} sx={{ height }}>
            {index + 1}
          </ColoredItem>
        ))}
      </Masonry>
    </Box>
  ),
};

/** 이미지 갤러리 - 실제 이미지로 Masonry 효과 */
export const ImageGallery = {
  render: () => {
    // 디자인 결과물 이미지 (abstract, fineart, illustration, poster, gradient)
    const images = [
      { id: 1, src: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Abstract fluid art' },
      { id: 2, src: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Oil painting' },
      { id: 3, src: 'https://images.pexels.com/photos/2832468/pexels-photo-2832468.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Digital illustration' },
      { id: 4, src: 'https://images.pexels.com/photos/752484/pexels-photo-752484.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Typography poster' },
      { id: 5, src: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Gradient mesh' },
      { id: 6, src: 'https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Acrylic painting' },
      { id: 7, src: 'https://images.pexels.com/photos/3493730/pexels-photo-3493730.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Surreal art' },
      { id: 8, src: 'https://images.pexels.com/photos/2088205/pexels-photo-2088205.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Fluid gradient' },
    ];

    return (
      <Box sx={{ width: '100%' }}>
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
          {images.map((image) => (
            <ImageItem key={image.id}>
              <img src={image.src} alt={image.alt} loading="lazy" />
            </ImageItem>
          ))}
        </Masonry>
      </Box>
    );
  },
};

/** Spacing 비교 */
export const SpacingComparison = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {[1, 2, 3].map((spacing) => (
        <Box key={spacing}>
          <Box sx={{ mb: 1, fontWeight: 600 }}>spacing={spacing}</Box>
          <Masonry columns={4} spacing={spacing}>
            {[100, 80, 120, 90].map((height, index) => (
              <Item key={index} sx={{ height }}>
                {index + 1}
              </Item>
            ))}
          </Masonry>
        </Box>
      ))}
    </Box>
  ),
};

/** 컬럼 수 비교 */
export const ColumnsComparison = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {[2, 3, 4, 5].map((columns) => (
        <Box key={columns}>
          <Box sx={{ mb: 1, fontWeight: 600 }}>columns={columns}</Box>
          <Masonry columns={columns} spacing={1}>
            {heights.slice(0, 8).map((height, index) => (
              <ColoredItem key={index} sx={{ height }}>
                {index + 1}
              </ColoredItem>
            ))}
          </Masonry>
        </Box>
      ))}
    </Box>
  ),
};
