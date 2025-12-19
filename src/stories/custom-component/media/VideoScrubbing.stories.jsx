import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DocumentTitle, PageContainer, SectionTitle } from '../../../components/storybookDocumentation';
import VideoScrubbing from '../../../components/media/VideoScrubbing';

import testVideo from '../../../assets/product/9-motion.mp4';

const TEST_VIDEO_URL = testVideo;

export default {
  title: 'Custom Component/Media/VideoScrubbing',
  component: VideoScrubbing,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## VideoScrubbing

스크롤 위치에 따라 비디오를 프레임 단위로 재생(스크러빙)하는 컴포넌트입니다.

### 핵심 기능
- 스크롤 기반 재생: 페이지 스크롤에 따라 비디오 프레임 이동
- 성능 최적화: IntersectionObserver + requestAnimationFrame (~60fps)
- 진행도 콜백: onProgressChange로 외부에서 진행도(0-1) 활용 가능
        `,
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: '비디오 소스 경로',
      table: {
        type: { summary: 'string' },
      },
    },
    containerRef: {
      control: false,
      description: '스크롤 추적용 컨테이너 요소',
      table: {
        type: { summary: 'React.RefObject' },
      },
    },
    startInView: {
      control: 'boolean',
      description: '뷰포트 상단에서 시작하는 경우 true (Hero 섹션 등)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ratio: {
      control: 'select',
      options: ['auto', '16/9', '4/3', '21/9', '1/1'],
      description: '비디오 비율',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    scrollRange: {
      control: 'object',
      description: '스크롤 범위 매핑',
      table: {
        type: { summary: '{ start: number, end: number }' },
        defaultValue: { summary: '{ start: 0, end: 1 }' },
      },
    },
    onProgressChange: {
      control: false,
      description: '진행도 변경 콜백 (0-1)',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

/** 스크롤 영역 래퍼 */
const ScrollArea = ({ children, height = '150vh' }) => (
  <Box sx={{ minHeight: height, pb: 8 }}>
    {children}
  </Box>
);

/** 진행도 콜백 데모 */
const ProgressDemo = () => {
  const [progress, setProgress] = useState(0);

  return (
    <ScrollArea height="180vh">
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          backgroundColor: 'grey.100',
          py: 1.5,
          px: 2,
          mb: 3,
        }}
      >
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          progress: {(progress * 100).toFixed(1)}%
        </Typography>
        <Box sx={{ height: 4, backgroundColor: 'grey.300', mt: 1 }}>
          <Box
            sx={{
              height: '100%',
              width: `${progress * 100}%`,
              backgroundColor: 'primary.main',
              transition: 'width 0.05s linear',
            }}
          />
        </Box>
      </Box>
      <Box sx={{ maxWidth: 800 }}>
        <VideoScrubbing
          src={TEST_VIDEO_URL}
          onProgressChange={setProgress}
        />
      </Box>
    </ScrollArea>
  );
};

/** 컨테이너 Ref 데모 */
const ContainerRefDemo = () => {
  const containerRef = useRef(null);

  return (
    <ScrollArea height="180vh">
      <Box
        ref={containerRef}
        sx={{
          height: '150vh',
          backgroundColor: 'grey.50',
          p: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          이 컨테이너 높이 기준으로 비디오 진행
        </Typography>
        <Box sx={{ position: 'sticky', top: 16, maxWidth: 800 }}>
          <VideoScrubbing
            src={TEST_VIDEO_URL}
            containerRef={containerRef}
          />
        </Box>
      </Box>
    </ScrollArea>
  );
};

/** 기본 사용 */
export const Default = {
  render: () => (
    <>
      <DocumentTitle
        title="VideoScrubbing"
        status="Available"
        note="Scroll-based video scrubbing"
        brandName="Design System"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          VideoScrubbing
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          스크롤 위치에 따라 비디오를 프레임 단위로 재생하는 컴포넌트입니다.
        </Typography>

        <SectionTitle title="Demo" description="스크롤하여 비디오 재생 테스트" />
        <ScrollArea>
          <Box sx={{ maxWidth: 800 }}>
            <VideoScrubbing src={TEST_VIDEO_URL} />
          </Box>
        </ScrollArea>

        <SectionTitle title="Props" description="컴포넌트 속성" />
        <TableContainer sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Prop</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Default</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>src</TableCell>
                <TableCell sx={{ fontSize: 13 }}>string</TableCell>
                <TableCell sx={{ fontSize: 13 }}>-</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>비디오 소스 경로 [Required]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>containerRef</TableCell>
                <TableCell sx={{ fontSize: 13 }}>React.RefObject</TableCell>
                <TableCell sx={{ fontSize: 13 }}>null</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>스크롤 추적용 컨테이너 요소</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>startInView</TableCell>
                <TableCell sx={{ fontSize: 13 }}>boolean</TableCell>
                <TableCell sx={{ fontSize: 13 }}>false</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>뷰포트 상단에서 시작하는 경우 true (Hero 섹션 등)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>ratio</TableCell>
                <TableCell sx={{ fontSize: 13 }}>string</TableCell>
                <TableCell sx={{ fontSize: 13 }}>auto</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>비디오 비율 (auto, 16/9, 4/3, 21/9, 1/1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>scrollRange</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{'{ start, end }'}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{'{ 0, 1 }'}</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>스크롤 범위 매핑 (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>onProgressChange</TableCell>
                <TableCell sx={{ fontSize: 13 }}>function</TableCell>
                <TableCell sx={{ fontSize: 13 }}>-</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>진행도 변경 콜백 (progress: 0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>sx</TableCell>
                <TableCell sx={{ fontSize: 13 }}>object</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{'{}'}</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>MUI sx 스타일 객체</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Usage" description="코드 예시" />
        <Box
          component="pre"
          sx={{
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            mb: 4,
          }}
        >
{`import VideoScrubbing from '@/components/media/VideoScrubbing';

// 기본 사용
<VideoScrubbing src="/video.mp4" />

// Hero 섹션 (뷰포트 상단에서 시작)
<VideoScrubbing src="/video.mp4" startInView />

// 비율 지정
<VideoScrubbing src="/video.mp4" ratio="16/9" />

// 진행도 콜백 활용
const [progress, setProgress] = useState(0);
<VideoScrubbing
  src="/video.mp4"
  onProgressChange={setProgress}
/>

// 컨테이너 기준 스크롤
const containerRef = useRef(null);
<Box ref={containerRef} sx={{ height: '200vh' }}>
  <VideoScrubbing
    src="/video.mp4"
    containerRef={containerRef}
  />
</Box>`}
        </Box>

        <SectionTitle title="Video Encoding" description="스크러빙 최적화를 위한 비디오 인코딩" />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          부드러운 스크러빙을 위해서는 비디오의 키프레임(I-frame) 설정이 중요합니다.
          일반 비디오는 키프레임 간격이 2~10초로, seeking 시 가장 가까운 키프레임부터 디코딩해야 하므로 끊김이 발생합니다.
        </Typography>

        <TableContainer sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>비디오 타입</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>키프레임 간격</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Seeking 속도</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>파일 크기</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontSize: 13 }}>일반 MP4</TableCell>
                <TableCell sx={{ fontSize: 13 }}>2~10초</TableCell>
                <TableCell sx={{ color: 'error.main', fontSize: 13 }}>50~100ms (끊김)</TableCell>
                <TableCell sx={{ fontSize: 13 }}>기본</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: 13 }}>스크러빙 최적화</TableCell>
                <TableCell sx={{ fontSize: 13 }}>매 프레임</TableCell>
                <TableCell sx={{ color: 'success.main', fontSize: 13 }}>1~5ms (즉시)</TableCell>
                <TableCell sx={{ fontSize: 13 }}>2~3배</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          FFmpeg 인코딩 명령어
        </Typography>
        <Box
          component="pre"
          sx={{
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            mb: 2,
          }}
        >
{`# 모든 프레임을 키프레임으로 인코딩
ffmpeg -i input.mp4 -g 1 -keyint_min 1 -c:v libx264 -crf 23 output.mp4

# 옵션 설명
# -g 1          : GOP(Group of Pictures) 크기를 1로 설정
# -keyint_min 1 : 최소 키프레임 간격 1
# -crf 23       : 품질 설정 (낮을수록 고품질, 18~28 권장)`}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 4 }}>
          참고: 키프레임 최적화 비디오는 파일 크기가 증가하므로, 짧은 클립(30초 이내)에 적합합니다.
        </Typography>
      </PageContainer>
    </>
  ),
};

/** 진행도 콜백 */
export const WithProgressCallback = {
  render: () => (
    <>
      <DocumentTitle
        title="VideoScrubbing"
        status="Available"
        note="Using onProgressChange callback"
        brandName="Design System"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Progress Callback
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          onProgressChange 콜백으로 현재 진행도(0-1)를 외부에서 활용할 수 있습니다.
        </Typography>
        <ProgressDemo />
      </PageContainer>
    </>
  ),
};

/** 컨테이너 Ref */
export const WithContainerRef = {
  render: () => (
    <>
      <DocumentTitle
        title="VideoScrubbing"
        status="Available"
        note="Using containerRef"
        brandName="Design System"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Container Reference
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          containerRef를 전달하면 해당 컨테이너 기준으로 스크롤 진행도를 계산합니다.
        </Typography>
        <ContainerRefDemo />
      </PageContainer>
    </>
  ),
};

/** 다양한 비율 */
export const AspectRatios = {
  render: () => (
    <>
      <DocumentTitle
        title="VideoScrubbing"
        status="Available"
        note="Aspect ratio variations"
        brandName="Design System"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Aspect Ratios
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          ratio prop으로 다양한 비율을 적용할 수 있습니다.
        </Typography>

        <ScrollArea height="300vh">
          <Stack spacing={6} sx={{ maxWidth: 800 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'monospace' }}>
                ratio: auto (원본 비율)
              </Typography>
              <VideoScrubbing
                src={TEST_VIDEO_URL}
                ratio="auto"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'monospace' }}>
                ratio: 21/9 (Cinematic)
              </Typography>
              <VideoScrubbing
                src={TEST_VIDEO_URL}
                ratio="21/9"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'monospace' }}>
                ratio: 16/9 (Standard)
              </Typography>
              <VideoScrubbing
                src={TEST_VIDEO_URL}
                ratio="16/9"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'monospace' }}>
                ratio: 4/3 (Classic)
              </Typography>
              <VideoScrubbing
                src={TEST_VIDEO_URL}
                ratio="4/3"
              />
            </Box>
          </Stack>
        </ScrollArea>
      </PageContainer>
    </>
  ),
};

/** startInView 모드 */
export const StartInView = {
  render: () => (
    <>
      <DocumentTitle
        title="VideoScrubbing"
        status="Available"
        note="Start from viewport top"
        brandName="Design System"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Start In View
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          startInView=true일 때, 비디오가 뷰포트 상단에서 시작하면 progress=0부터 시작합니다.
          Hero 섹션처럼 페이지 상단에 배치되는 경우에 사용합니다.
        </Typography>

        <ScrollArea height="200vh">
          <Box sx={{ maxWidth: 800 }}>
            <VideoScrubbing
              src={TEST_VIDEO_URL}
              startInView
            />
          </Box>
        </ScrollArea>
      </PageContainer>
    </>
  ),
};
