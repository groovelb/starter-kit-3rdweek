import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DocumentTitle, PageContainer, SectionTitle } from '../../../components/storybookDocumentation';
import { ImageTransition } from '../../../components/media/ImageTransition';

export default {
  title: 'Custom Component/Media/ImageTransition',
  component: ImageTransition,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ImageTransition

인덱스 기반 이미지 트랜지션 컴포넌트.

### 용도
- 이미지 슬라이더/갤러리의 트랜지션
- Hero 이미지 전환
- 제품 이미지 변경 효과
        `,
      },
    },
  },
  argTypes: {
    transition: {
      control: 'select',
      options: ['fade', 'slide', 'zoom', 'reveal', 'flip'],
      description: '트랜지션 효과',
    },
    duration: {
      control: { type: 'range', min: 200, max: 2000, step: 100 },
      description: '트랜지션 지속 시간 (ms)',
    },
    aspectRatio: {
      control: 'select',
      options: ['16/9', '4/3', '1/1', '21/9'],
      description: '컨테이너 종횡비',
    },
  },
};

// 샘플 이미지
const sampleImages = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop', alt: 'Mountains' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop', alt: 'Forest' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop', alt: 'Beach' },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop', alt: 'Night Sky' },
];

/** 기본 사용 */
export const Default = {
  render: function DefaultStory() {
    const [index, setIndex] = useState(0);

    return (
      <Box sx={ { maxWidth: 800 } }>
        <ImageTransition
          images={ sampleImages }
          activeIndex={ index }
          transition="fade"
          duration={ 500 }
        />
        <Stack direction="row" spacing={ 1 } sx={ { mt: 2, justifyContent: 'center' } }>
          { sampleImages.map((_, i) => (
            <Button
              key={ i }
              variant={ index === i ? 'contained' : 'outlined' }
              size="small"
              onClick={ () => setIndex(i) }
            >
              { i + 1 }
            </Button>
          )) }
        </Stack>
      </Box>
    );
  },
};

/** 문서 및 데모 */
export const Documentation = {
  render: function DocumentationStory() {
    const [fadeIndex, setFadeIndex] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);
    const [zoomIndex, setZoomIndex] = useState(0);
    const [revealIndex, setRevealIndex] = useState(0);
    const [flipIndex, setFlipIndex] = useState(0);

    const handlePrev = (current, setter) => {
      setter(current > 0 ? current - 1 : sampleImages.length - 1);
    };

    const handleNext = (current, setter) => {
      setter(current < sampleImages.length - 1 ? current + 1 : 0);
    };

    return (
      <>
        <DocumentTitle
          title="ImageTransition"
          status="Available"
          note="Index-based image transition component"
          brandName="Media"
          systemName="Starter Kit"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            ImageTransition
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            activeIndex를 변경하면 이전 이미지와 새 이미지 간 트랜지션이 실행됩니다.
            5가지 트랜지션 효과를 지원합니다.
          </Typography>

          <SectionTitle title="Props" description="ImageTransition 컴포넌트의 Props입니다." />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Prop</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Type</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Default</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={ { fontFamily: 'monospace' } }>images</TableCell>
                  <TableCell>Array</TableCell>
                  <TableCell>[]</TableCell>
                  <TableCell>이미지 배열 (string[] 또는 {'{src, alt}'}[])</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontFamily: 'monospace' } }>activeIndex</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>현재 활성 이미지 인덱스</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontFamily: 'monospace' } }>transition</TableCell>
                  <TableCell>&apos;fade&apos; | &apos;slide&apos; | &apos;zoom&apos; | &apos;reveal&apos; | &apos;flip&apos;</TableCell>
                  <TableCell>&apos;fade&apos;</TableCell>
                  <TableCell>트랜지션 효과</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontFamily: 'monospace' } }>duration</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>500</TableCell>
                  <TableCell>트랜지션 지속 시간 (ms)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontFamily: 'monospace' } }>easing</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>&apos;ease-out&apos;</TableCell>
                  <TableCell>CSS 이징 함수</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontFamily: 'monospace' } }>aspectRatio</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>&apos;16/9&apos;</TableCell>
                  <TableCell>컨테이너 종횡비</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontFamily: 'monospace' } }>onTransitionEnd</TableCell>
                  <TableCell>function</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>트랜지션 완료 콜백</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <SectionTitle title="Transition: Fade" description="기본 크로스페이드 효과입니다." />
          <Box sx={ { maxWidth: 700 } }>
            <ImageTransition
              images={ sampleImages }
              activeIndex={ fadeIndex }
              transition="fade"
              duration={ 600 }
            />
            <Stack direction="row" spacing={ 1 } sx={ { mt: 2, justifyContent: 'center' } }>
              <Button variant="outlined" onClick={ () => handlePrev(fadeIndex, setFadeIndex) }>
                ← Prev
              </Button>
              <Typography sx={ { lineHeight: '36px', px: 2 } }>
                { fadeIndex + 1 } / { sampleImages.length }
              </Typography>
              <Button variant="outlined" onClick={ () => handleNext(fadeIndex, setFadeIndex) }>
                Next →
              </Button>
            </Stack>
          </Box>

          <SectionTitle title="Transition: Slide" description="좌우 슬라이드 효과입니다." />
          <Box sx={ { maxWidth: 700 } }>
            <ImageTransition
              images={ sampleImages }
              activeIndex={ slideIndex }
              transition="slide"
              duration={ 500 }
            />
            <Stack direction="row" spacing={ 1 } sx={ { mt: 2, justifyContent: 'center' } }>
              <Button variant="outlined" onClick={ () => handlePrev(slideIndex, setSlideIndex) }>
                ← Prev
              </Button>
              <Typography sx={ { lineHeight: '36px', px: 2 } }>
                { slideIndex + 1 } / { sampleImages.length }
              </Typography>
              <Button variant="outlined" onClick={ () => handleNext(slideIndex, setSlideIndex) }>
                Next →
              </Button>
            </Stack>
          </Box>

          <SectionTitle title="Transition: Zoom" description="줌 인/아웃 효과입니다." />
          <Box sx={ { maxWidth: 700 } }>
            <ImageTransition
              images={ sampleImages }
              activeIndex={ zoomIndex }
              transition="zoom"
              duration={ 700 }
            />
            <Stack direction="row" spacing={ 1 } sx={ { mt: 2, justifyContent: 'center' } }>
              <Button variant="outlined" onClick={ () => handlePrev(zoomIndex, setZoomIndex) }>
                ← Prev
              </Button>
              <Typography sx={ { lineHeight: '36px', px: 2 } }>
                { zoomIndex + 1 } / { sampleImages.length }
              </Typography>
              <Button variant="outlined" onClick={ () => handleNext(zoomIndex, setZoomIndex) }>
                Next →
              </Button>
            </Stack>
          </Box>

          <SectionTitle title="Transition: Reveal" description="마스크 reveal 효과입니다." />
          <Box sx={ { maxWidth: 700 } }>
            <ImageTransition
              images={ sampleImages }
              activeIndex={ revealIndex }
              transition="reveal"
              duration={ 800 }
            />
            <Stack direction="row" spacing={ 1 } sx={ { mt: 2, justifyContent: 'center' } }>
              <Button variant="outlined" onClick={ () => handlePrev(revealIndex, setRevealIndex) }>
                ← Prev
              </Button>
              <Typography sx={ { lineHeight: '36px', px: 2 } }>
                { revealIndex + 1 } / { sampleImages.length }
              </Typography>
              <Button variant="outlined" onClick={ () => handleNext(revealIndex, setRevealIndex) }>
                Next →
              </Button>
            </Stack>
          </Box>

          <SectionTitle title="Transition: Flip" description="3D 플립 효과입니다." />
          <Box sx={ { maxWidth: 700 } }>
            <ImageTransition
              images={ sampleImages }
              activeIndex={ flipIndex }
              transition="flip"
              duration={ 600 }
            />
            <Stack direction="row" spacing={ 1 } sx={ { mt: 2, justifyContent: 'center' } }>
              <Button variant="outlined" onClick={ () => handlePrev(flipIndex, setFlipIndex) }>
                ← Prev
              </Button>
              <Typography sx={ { lineHeight: '36px', px: 2 } }>
                { flipIndex + 1 } / { sampleImages.length }
              </Typography>
              <Button variant="outlined" onClick={ () => handleNext(flipIndex, setFlipIndex) }>
                Next →
              </Button>
            </Stack>
          </Box>

          <SectionTitle title="All Transitions Comparison" description="모든 트랜지션 효과 비교입니다." />
          <TransitionComparison />

          <SectionTitle title="Usage Example" description="코드 사용 예시입니다." />
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.100',
              p: 3,
              fontSize: 13,
              fontFamily: 'monospace',
              overflow: 'auto',
              lineHeight: 1.6,
            } }
          >
            { `const [activeIndex, setActiveIndex] = useState(0);

// 기본 페이드 트랜지션
<ImageTransition
  images={['img1.jpg', 'img2.jpg', 'img3.jpg']}
  activeIndex={activeIndex}
  transition="fade"
  duration={500}
/>

// 슬라이드 트랜지션
<ImageTransition
  images={[
    { src: 'img1.jpg', alt: 'First' },
    { src: 'img2.jpg', alt: 'Second' },
  ]}
  activeIndex={activeIndex}
  transition="slide"
  duration={400}
  aspectRatio="4/3"
  onTransitionEnd={() => console.log('Done!')}
/>` }
          </Box>
        </PageContainer>
      </>
    );
  },
};

/** 트랜지션 비교 컴포넌트 */
function TransitionComparison() {
  const [indices, setIndices] = useState({
    fade: 0,
    slide: 0,
    zoom: 0,
    reveal: 0,
    flip: 0,
  });

  const handleChangeAll = () => {
    setIndices(prev => ({
      fade: (prev.fade + 1) % sampleImages.length,
      slide: (prev.slide + 1) % sampleImages.length,
      zoom: (prev.zoom + 1) % sampleImages.length,
      reveal: (prev.reveal + 1) % sampleImages.length,
      flip: (prev.flip + 1) % sampleImages.length,
    }));
  };

  const transitions = ['fade', 'slide', 'zoom', 'reveal', 'flip'];

  return (
    <Box>
      <Button variant="contained" onClick={ handleChangeAll } sx={ { mb: 3 } }>
        Change All Images →
      </Button>
      <Box
        sx={ {
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 2,
        } }
      >
        { transitions.map((t) => (
          <Box key={ t }>
            <Typography variant="caption" sx={ { mb: 1, display: 'block', fontWeight: 600 } }>
              { t.toUpperCase() }
            </Typography>
            <ImageTransition
              images={ sampleImages }
              activeIndex={ indices[t] }
              transition={ t }
              duration={ 600 }
              aspectRatio="16/9"
            />
          </Box>
        )) }
      </Box>
    </Box>
  );
}
