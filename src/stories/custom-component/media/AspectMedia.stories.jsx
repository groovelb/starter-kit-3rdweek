import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AspectMedia from '../../../components/media/AspectMedia';
import { testImages, testVideos } from '../../../utils/pexels-test-data';

export default {
  title: 'Custom Component/Media/AspectMedia',
  component: AspectMedia,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AspectMedia

이미지 또는 비디오를 지정된 비율로 표시하는 범용 미디어 컴포넌트입니다.

### 핵심 기능
- **CSS aspect-ratio**: 네이티브 비율 유지 (96%+ 브라우저 지원)
- **이미지/비디오 통합**: type prop으로 전환
- **Lazy Loading**: 기본 활성화
- **비디오 제어**: autoPlay, muted, loop, controls 지원

### 용도
- 반응형 이미지 갤러리
- 비디오 썸네일/배경
- 제품 이미지 카드
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['image', 'video'],
      description: '미디어 타입',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'image' },
      },
    },
    aspectRatio: {
      control: 'select',
      options: ['1/1', '4/3', '3/4', '16/9', '9/16', '21/9'],
      description: 'CSS aspect-ratio 값',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '16/9' },
      },
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'CSS object-fit 값',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'cover' },
      },
    },
    isLazy: {
      control: 'boolean',
      description: '지연 로딩 활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

/** 기본 이미지 */
export const Default = {
  args: {
    src: testImages.photography[0].src.medium,
    alt: testImages.photography[0].alt,
    type: 'image',
    aspectRatio: '16/9',
    objectFit: 'cover',
  },
  render: (args) => (
    <Box sx={{ width: 400 }}>
      <AspectMedia {...args} />
    </Box>
  ),
};

/** 다양한 비율 */
export const AspectRatios = {
  render: () => (
    <Grid container spacing={3} sx={{ width: 800 }}>
      {['1/1', '4/3', '16/9', '21/9'].map((ratio, idx) => (
        <Grid size={{ xs: 6, md: 3 }} key={ratio}>
          <Stack spacing={1}>
            <AspectMedia
              src={testImages.photography[idx].src.medium}
              alt={`Ratio ${ratio}`}
              aspectRatio={ratio}
            />
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {ratio}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  ),
};

/** Object Fit 비교 */
export const ObjectFitOptions = {
  render: () => (
    <Grid container spacing={3} sx={{ width: 800 }}>
      {['cover', 'contain', 'fill', 'none'].map((fit) => (
        <Grid size={{ xs: 6, md: 3 }} key={fit}>
          <Stack spacing={1}>
            <Box sx={{ backgroundColor: 'grey.200', p: 0.5 }}>
              <AspectMedia
                src={testImages.abstract[0].src.medium}
                alt={`Object-fit: ${fit}`}
                aspectRatio="1/1"
                objectFit={fit}
              />
            </Box>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              objectFit: {fit}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  ),
};

/** 비디오 */
export const Video = {
  args: {
    type: 'video',
    src: testVideos.motion[0].src.sd,
    poster: testVideos.motion[0].poster,
    aspectRatio: '16/9',
    isAutoPlay: true,
    isMuted: true,
    isLoop: true,
  },
  render: (args) => (
    <Box sx={{ width: 500 }}>
      <AspectMedia {...args} />
    </Box>
  ),
};

/** 비디오 with Controls */
export const VideoWithControls = {
  render: () => (
    <Box sx={{ width: 500 }}>
      <AspectMedia
        type="video"
        src={testVideos.motion[1].src.sd}
        poster={testVideos.motion[1].poster}
        aspectRatio="16/9"
        hasControls
        isMuted={false}
      />
    </Box>
  ),
};

/** 카테고리별 이미지 갤러리 */
export const ImageGallery = {
  render: () => (
    <Stack spacing={4} sx={{ width: 800 }}>
      <Typography variant="h6">Photography</Typography>
      <Grid container spacing={2}>
        {testImages.photography.map((img) => (
          <Grid size={{ xs: 6, md: 3 }} key={img.id}>
            <AspectMedia
              src={img.src.small}
              alt={img.alt}
              aspectRatio={img.aspectRatio}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6">Abstract</Typography>
      <Grid container spacing={2}>
        {testImages.abstract.map((img) => (
          <Grid size={{ xs: 6, md: 3 }} key={img.id}>
            <AspectMedia
              src={img.src.small}
              alt={img.alt}
              aspectRatio={img.aspectRatio}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  ),
};
