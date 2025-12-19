import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DocumentTitle, PageContainer, SectionTitle } from '../../../components/storybookDocumentation';
import { ImageCarousel } from '../../../components/media/ImageCarousel';
import { CarouselIndicator } from '../../../components/media/CarouselIndicator';

export default {
  title: 'Custom Component/Media/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ImageCarousel

스와이프와 자동 재생을 지원하는 이미지 캐러셀 컴포넌트.

### 용도
- 제품 이미지 갤러리
- Hero 슬라이더
- 프로모션 배너
        `,
      },
    },
  },
  argTypes: {
    transition: {
      control: 'select',
      options: ['slide', 'fade'],
      description: '트랜지션 타입',
    },
    isAutoPlay: {
      control: 'boolean',
      description: '자동 재생',
    },
    hasArrows: {
      control: 'boolean',
      description: '화살표 버튼 표시',
    },
    hasIndicator: {
      control: 'boolean',
      description: '인디케이터 표시',
    },
    indicatorType: {
      control: 'select',
      options: ['dot', 'line', 'fraction', 'progress'],
      description: '인디케이터 타입',
    },
    indicatorPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '인디케이터 위치',
    },
  },
};

// 샘플 이미지
const sampleImages = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop', alt: 'Mountains' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop', alt: 'Forest' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop', alt: 'Beach' },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop', alt: 'Night Sky' },
  { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&h=800&fit=crop', alt: 'Forest Path' },
];

/** 기본 사용 */
export const Default = {
  args: {
    images: sampleImages,
    aspectRatio: '16/9',
    transition: 'slide',
    isAutoPlay: false,
    hasArrows: true,
    hasIndicator: true,
    indicatorType: 'dot',
    indicatorPosition: 'bottom',
    isLoop: true,
  },
  render: (args) => (
    <Box sx={ { maxWidth: 800 } }>
      <ImageCarousel { ...args } />
    </Box>
  ),
};

/** 문서 및 데모 */
export const Documentation = {
  render: () => (
    <>
      <DocumentTitle
        title="ImageCarousel"
        status="Available"
        note="Swipe/autoplay image carousel"
        brandName="Media"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          ImageCarousel
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          스와이프 제스처, 키보드 네비게이션, 자동 재생을 지원하는 이미지 캐러셀입니다.
          내장된 CarouselIndicator로 현재 위치를 표시합니다.
        </Typography>

        <SectionTitle title="Props" description="ImageCarousel 컴포넌트의 Props입니다." />
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
                <TableCell>이미지 배열</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>transition</TableCell>
                <TableCell>&apos;slide&apos; | &apos;fade&apos;</TableCell>
                <TableCell>&apos;slide&apos;</TableCell>
                <TableCell>트랜지션 타입</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>isAutoPlay</TableCell>
                <TableCell>boolean</TableCell>
                <TableCell>false</TableCell>
                <TableCell>자동 재생</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>autoPlayInterval</TableCell>
                <TableCell>number</TableCell>
                <TableCell>5000</TableCell>
                <TableCell>자동 재생 간격 (ms)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>isLoop</TableCell>
                <TableCell>boolean</TableCell>
                <TableCell>true</TableCell>
                <TableCell>무한 루프</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>hasIndicator</TableCell>
                <TableCell>boolean</TableCell>
                <TableCell>true</TableCell>
                <TableCell>인디케이터 표시</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>indicatorType</TableCell>
                <TableCell>&apos;dot&apos; | &apos;line&apos; | &apos;fraction&apos; | &apos;progress&apos;</TableCell>
                <TableCell>&apos;dot&apos;</TableCell>
                <TableCell>인디케이터 타입</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>indicatorPosition</TableCell>
                <TableCell>&apos;top&apos; | &apos;bottom&apos; | &apos;left&apos; | &apos;right&apos;</TableCell>
                <TableCell>&apos;bottom&apos;</TableCell>
                <TableCell>인디케이터 위치</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontFamily: 'monospace' } }>hasArrows</TableCell>
                <TableCell>boolean</TableCell>
                <TableCell>true</TableCell>
                <TableCell>화살표 버튼 표시</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Slide Transition" description="기본 슬라이드 트랜지션입니다. 드래그하여 스와이프할 수 있습니다." />
        <Box sx={ { maxWidth: 700 } }>
          <ImageCarousel
            images={ sampleImages }
            transition="slide"
            hasIndicator
            indicatorType="dot"
          />
        </Box>

        <SectionTitle title="Fade Transition" description="페이드 트랜지션입니다." />
        <Box sx={ { maxWidth: 700 } }>
          <ImageCarousel
            images={ sampleImages }
            transition="fade"
            transitionDuration={ 500 }
            hasIndicator
            indicatorType="line"
          />
        </Box>

        <SectionTitle title="Auto Play" description="자동 재생 캐러셀입니다. 호버 시 일시 정지됩니다." />
        <Box sx={ { maxWidth: 700 } }>
          <ImageCarousel
            images={ sampleImages }
            isAutoPlay
            autoPlayInterval={ 3000 }
            hasIndicator
            indicatorType="progress"
          />
        </Box>

        <SectionTitle title="Indicator Types" description="다양한 인디케이터 타입입니다." />
        <Stack spacing={ 4 }>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              Dot (기본)
            </Typography>
            <Box sx={ { maxWidth: 500 } }>
              <ImageCarousel
                images={ sampleImages.slice(0, 4) }
                hasIndicator
                indicatorType="dot"
                hasArrows={ false }
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              Line
            </Typography>
            <Box sx={ { maxWidth: 500 } }>
              <ImageCarousel
                images={ sampleImages.slice(0, 4) }
                hasIndicator
                indicatorType="line"
                hasArrows={ false }
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={ { mb: 1, color: 'text.secondary' } }>
              Fraction
            </Typography>
            <Box sx={ { maxWidth: 500 } }>
              <ImageCarousel
                images={ sampleImages.slice(0, 4) }
                hasIndicator
                indicatorType="fraction"
                hasArrows={ false }
              />
            </Box>
          </Box>
        </Stack>

        <SectionTitle title="Indicator Position" description="인디케이터 위치 옵션입니다." />
        <Stack direction={ { xs: 'column', md: 'row' } } spacing={ 2 }>
          <Box sx={ { flex: 1 } }>
            <Typography variant="caption" sx={ { mb: 1, display: 'block' } }>Top</Typography>
            <ImageCarousel
              images={ sampleImages.slice(0, 3) }
              aspectRatio="4/3"
              indicatorPosition="top"
              hasArrows={ false }
            />
          </Box>
          <Box sx={ { flex: 1 } }>
            <Typography variant="caption" sx={ { mb: 1, display: 'block' } }>Right</Typography>
            <ImageCarousel
              images={ sampleImages.slice(0, 3) }
              aspectRatio="4/3"
              indicatorPosition="right"
              hasArrows={ false }
            />
          </Box>
        </Stack>

        <SectionTitle title="CarouselIndicator (Standalone)" description="인디케이터를 독립적으로 사용할 수 있습니다." />
        <Stack spacing={ 3 } sx={ { p: 3, backgroundColor: 'grey.100' } }>
          <Box>
            <Typography variant="caption" sx={ { mb: 1, display: 'block' } }>Dot</Typography>
            <CarouselIndicator total={ 5 } current={ 2 } type="dot" />
          </Box>
          <Box>
            <Typography variant="caption" sx={ { mb: 1, display: 'block' } }>Line</Typography>
            <CarouselIndicator total={ 5 } current={ 2 } type="line" />
          </Box>
          <Box>
            <Typography variant="caption" sx={ { mb: 1, display: 'block' } }>Fraction</Typography>
            <CarouselIndicator total={ 5 } current={ 2 } type="fraction" />
          </Box>
          <Box>
            <Typography variant="caption" sx={ { mb: 1, display: 'block' } }>Progress</Typography>
            <CarouselIndicator total={ 5 } current={ 2 } type="progress" />
          </Box>
        </Stack>

        <SectionTitle title="Different Aspect Ratios" description="다양한 종횡비 설정입니다." />
        <Stack direction={ { xs: 'column', md: 'row' } } spacing={ 2 }>
          <Box sx={ { flex: 1 } }>
            <Typography variant="caption" sx={ { mb: 1, display: 'block' } }>16/9</Typography>
            <ImageCarousel images={ sampleImages.slice(0, 3) } aspectRatio="16/9" hasArrows={ false } />
          </Box>
          <Box sx={ { flex: 1 } }>
            <Typography variant="caption" sx={ { mb: 1, display: 'block' } }>1/1</Typography>
            <ImageCarousel images={ sampleImages.slice(0, 3) } aspectRatio="1/1" hasArrows={ false } />
          </Box>
        </Stack>

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
          { `// 기본 캐러셀
<ImageCarousel
  images={['img1.jpg', 'img2.jpg', 'img3.jpg']}
  hasIndicator
  hasArrows
/>

// 자동 재생 + 페이드 트랜지션
<ImageCarousel
  images={productImages}
  transition="fade"
  isAutoPlay
  autoPlayInterval={4000}
  indicatorType="progress"
/>

// 인디케이터만 사용
<CarouselIndicator
  total={5}
  current={currentIndex}
  type="line"
  onClick={(index) => setCurrentIndex(index)}
/>` }
        </Box>
      </PageContainer>
    </>
  ),
};
