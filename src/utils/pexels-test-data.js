/**
 * MUSE Design Inspiration Test Data
 *
 * 디자이너를 위한 시각적 영감 아카이빙 솔루션 MUSE용 테스트 데이터입니다.
 * Pexels API에서 제공하는 무료 스톡 미디어를 사용합니다.
 *
 * ## 카테고리
 * - branding: 브랜딩, 기업 아이덴티티, 로고 레퍼런스
 * - editorial: 에디토리얼, 매거진, 출판 디자인
 * - uiux: UI/UX 디자인, 인터페이스, 디지털 제품
 * - typography: 타이포그래피, 레터링, 폰트 레퍼런스
 * - photography: 제품 촬영, 라이프스타일, 광고 사진
 * - spatial: 공간 디자인, 인테리어, 건축
 * - abstract: 추상, 그라디언트, 텍스처
 * - motion: 모션 그래픽, 영상, 애니메이션
 *
 * ## 사용법
 * ```js
 * import { testImages, testVideos, getRandomImage } from '@/utils/pexels-test-data';
 *
 * // 특정 카테고리 이미지
 * <img src={testImages.branding[0].src.medium} />
 *
 * // 랜덤 이미지
 * <img src={getRandomImage('editorial').src.large} />
 * ```
 *
 * ## 라이선스
 * Pexels License: 무료 사용, 상업적 사용 가능, 저작자 표시 권장
 * https://www.pexels.com/license/
 */

// ============================================================
// Image Size Presets
// ============================================================
const createImageSizes = (id) => ({
  original: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb`,
  large: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
  medium: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=640`,
  small: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=320`,
  thumbnail: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=160`,
});

// ============================================================
// Design Inspiration Images by Category
// 디자인 결과물 중심 키워드: abstract, fine art, illustration, poster, gradient, photography, portrait
// 각 카테고리 8개 이미지
// ============================================================
export const testImages = {
  // 추상 아트 (query: "abstract art", "abstract painting")
  abstract: [
    {
      id: 2110951,
      alt: 'Abstract fluid art',
      photographer: 'Mudassir Ali',
      src: createImageSizes(2110951),
      aspectRatio: '4/3',
      tags: ['abstract', 'fluid', 'colorful'],
    },
    {
      id: 1762973,
      alt: 'Geometric abstract pattern',
      photographer: 'Anni Roenkae',
      src: createImageSizes(1762973),
      aspectRatio: '16/9',
      tags: ['abstract', 'geometric', 'pattern'],
    },
    {
      id: 3075993,
      alt: 'Warm gradient study',
      photographer: 'Gradienta',
      src: createImageSizes(3075993),
      aspectRatio: '16/9',
      tags: ['abstract', 'gradient', 'warm'],
    },
    {
      id: 2832382,
      alt: 'Blue abstract waves',
      photographer: 'Anni Roenkae',
      src: createImageSizes(2832382),
      aspectRatio: '4/3',
      tags: ['abstract', 'waves', 'blue'],
    },
    {
      id: 1699030,
      alt: 'Liquid marble texture',
      photographer: 'Anni Roenkae',
      src: createImageSizes(1699030),
      aspectRatio: '4/3',
      tags: ['abstract', 'marble', 'texture'],
    },
    {
      id: 2860804,
      alt: 'Neon abstract light',
      photographer: 'Jr Korpa',
      src: createImageSizes(2860804),
      aspectRatio: '16/9',
      tags: ['abstract', 'neon', 'light'],
    },
    {
      id: 1616403,
      alt: 'Color explosion abstract',
      photographer: 'Anni Roenkae',
      src: createImageSizes(1616403),
      aspectRatio: '3/4',
      tags: ['abstract', 'explosion', 'vibrant'],
    },
    {
      id: 2156881,
      alt: 'Psychedelic swirl pattern',
      photographer: 'Anni Roenkae',
      src: createImageSizes(2156881),
      aspectRatio: '4/3',
      tags: ['abstract', 'swirl', 'psychedelic'],
    },
  ],

  // 파인 아트 (query: "fine art", "artwork", "painting")
  fineart: [
    {
      id: 1585325,
      alt: 'Oil painting texture',
      photographer: 'Steve Johnson',
      src: createImageSizes(1585325),
      aspectRatio: '4/3',
      tags: ['fineart', 'oil', 'texture'],
    },
    {
      id: 1579708,
      alt: 'Colorful acrylic painting',
      photographer: 'Steve Johnson',
      src: createImageSizes(1579708),
      aspectRatio: '4/3',
      tags: ['fineart', 'acrylic', 'colorful'],
    },
    {
      id: 1266808,
      alt: 'Canvas artwork detail',
      photographer: 'Steve Johnson',
      src: createImageSizes(1266808),
      aspectRatio: '3/4',
      tags: ['fineart', 'canvas', 'detail'],
    },
    {
      id: 2911521,
      alt: 'Mixed media artwork',
      photographer: 'Steve Johnson',
      src: createImageSizes(2911521),
      aspectRatio: '4/3',
      tags: ['fineart', 'mixed media', 'contemporary'],
    },
    {
      id: 1646953,
      alt: 'Expressive brush strokes',
      photographer: 'Steve Johnson',
      src: createImageSizes(1646953),
      aspectRatio: '4/3',
      tags: ['fineart', 'brush', 'expressive'],
    },
    {
      id: 1568607,
      alt: 'Abstract expressionism',
      photographer: 'Steve Johnson',
      src: createImageSizes(1568607),
      aspectRatio: '4/3',
      tags: ['fineart', 'expressionism', 'bold'],
    },
    {
      id: 2471171,
      alt: 'Contemporary art piece',
      photographer: 'Steve Johnson',
      src: createImageSizes(2471171),
      aspectRatio: '4/3',
      tags: ['fineart', 'contemporary', 'modern'],
    },
    {
      id: 1572386,
      alt: 'Textured paint surface',
      photographer: 'Steve Johnson',
      src: createImageSizes(1572386),
      aspectRatio: '4/3',
      tags: ['fineart', 'texture', 'impasto'],
    },
  ],

  // 일러스트레이션 (query: "illustration", "digital art", "artwork")
  illustration: [
    {
      id: 2832468,
      alt: 'Digital illustration artwork',
      photographer: 'Jr Korpa',
      src: createImageSizes(2832468),
      aspectRatio: '4/3',
      tags: ['illustration', 'digital', 'vibrant'],
    },
    {
      id: 3493730,
      alt: 'Surreal digital art',
      photographer: 'Jr Korpa',
      src: createImageSizes(3493730),
      aspectRatio: '3/4',
      tags: ['illustration', 'surreal', 'fantasy'],
    },
    {
      id: 2860810,
      alt: 'Artistic visual composition',
      photographer: 'Jr Korpa',
      src: createImageSizes(2860810),
      aspectRatio: '4/3',
      tags: ['illustration', 'composition', 'artistic'],
    },
    {
      id: 3617457,
      alt: 'Creative digital artwork',
      photographer: 'Jr Korpa',
      src: createImageSizes(3617457),
      aspectRatio: '3/4',
      tags: ['illustration', 'creative', 'modern'],
    },
    {
      id: 2899726,
      alt: 'Vibrant color artwork',
      photographer: 'Jr Korpa',
      src: createImageSizes(2899726),
      aspectRatio: '4/3',
      tags: ['illustration', 'vibrant', 'color'],
    },
    {
      id: 2832432,
      alt: 'Fantasy art composition',
      photographer: 'Jr Korpa',
      src: createImageSizes(2832432),
      aspectRatio: '4/3',
      tags: ['illustration', 'fantasy', 'dreamy'],
    },
    {
      id: 3617500,
      alt: 'Digital art experiment',
      photographer: 'Jr Korpa',
      src: createImageSizes(3617500),
      aspectRatio: '3/4',
      tags: ['illustration', 'experimental', 'digital'],
    },
    {
      id: 2832450,
      alt: 'Abstract digital painting',
      photographer: 'Jr Korpa',
      src: createImageSizes(2832450),
      aspectRatio: '4/3',
      tags: ['illustration', 'abstract', 'painting'],
    },
  ],

  // 포스터 & 그래픽 (query: "poster", "graphic poster", "typography poster")
  poster: [
    {
      id: 752484,
      alt: 'Bold typography poster',
      photographer: 'Magda Ehlers',
      src: createImageSizes(752484),
      aspectRatio: '3/4',
      tags: ['poster', 'typography', 'bold'],
    },
    {
      id: 1591056,
      alt: 'Neon sign artwork',
      photographer: 'Jonathan Borba',
      src: createImageSizes(1591056),
      aspectRatio: '4/3',
      tags: ['poster', 'neon', 'signage'],
    },
    {
      id: 2249528,
      alt: 'Minimalist wall art',
      photographer: 'Anni Roenkae',
      src: createImageSizes(2249528),
      aspectRatio: '3/4',
      tags: ['poster', 'minimal', 'wall art'],
    },
    {
      id: 1585326,
      alt: 'Colorful poster artwork',
      photographer: 'Steve Johnson',
      src: createImageSizes(1585326),
      aspectRatio: '4/3',
      tags: ['poster', 'colorful', 'vibrant'],
    },
    {
      id: 1484516,
      alt: 'Retro typography design',
      photographer: 'Magda Ehlers',
      src: createImageSizes(1484516),
      aspectRatio: '3/4',
      tags: ['poster', 'retro', 'typography'],
    },
    {
      id: 2387793,
      alt: 'Modern graphic poster',
      photographer: 'Anni Roenkae',
      src: createImageSizes(2387793),
      aspectRatio: '4/3',
      tags: ['poster', 'graphic', 'modern'],
    },
    {
      id: 1762279,
      alt: 'Artistic signage design',
      photographer: 'Anni Roenkae',
      src: createImageSizes(1762279),
      aspectRatio: '16/9',
      tags: ['poster', 'signage', 'artistic'],
    },
    {
      id: 2310713,
      alt: 'Bold visual statement',
      photographer: 'Anni Roenkae',
      src: createImageSizes(2310713),
      aspectRatio: '3/4',
      tags: ['poster', 'bold', 'statement'],
    },
  ],

  // 그라디언트 & 컬러 (query: "gradient", "color gradient", "colorful background")
  gradient: [
    {
      id: 3109807,
      alt: 'Gradient mesh artwork',
      photographer: 'Codioful',
      src: createImageSizes(3109807),
      aspectRatio: '16/9',
      tags: ['gradient', 'mesh', 'colorful'],
    },
    {
      id: 2088205,
      alt: 'Fluid color gradient',
      photographer: 'Anni Roenkae',
      src: createImageSizes(2088205),
      aspectRatio: '3/4',
      tags: ['gradient', 'fluid', 'organic'],
    },
    {
      id: 4915559,
      alt: 'Holographic gradient',
      photographer: 'Gradienta',
      src: createImageSizes(4915559),
      aspectRatio: '16/9',
      tags: ['gradient', 'holographic', 'iridescent'],
    },
    {
      id: 6984989,
      alt: 'Soft pastel gradient',
      photographer: 'Gradienta',
      src: createImageSizes(6984989),
      aspectRatio: '16/9',
      tags: ['gradient', 'pastel', 'soft'],
    },
    {
      id: 6984992,
      alt: 'Vibrant color blend',
      photographer: 'Gradienta',
      src: createImageSizes(6984992),
      aspectRatio: '16/9',
      tags: ['gradient', 'vibrant', 'blend'],
    },
    {
      id: 4915555,
      alt: 'Aurora gradient effect',
      photographer: 'Gradienta',
      src: createImageSizes(4915555),
      aspectRatio: '16/9',
      tags: ['gradient', 'aurora', 'effect'],
    },
    {
      id: 6985001,
      alt: 'Sunset color transition',
      photographer: 'Gradienta',
      src: createImageSizes(6985001),
      aspectRatio: '16/9',
      tags: ['gradient', 'sunset', 'warm'],
    },
    {
      id: 4915553,
      alt: 'Cool tone gradient',
      photographer: 'Gradienta',
      src: createImageSizes(4915553),
      aspectRatio: '16/9',
      tags: ['gradient', 'cool', 'blue'],
    },
  ],

  // 사진 (query: "photography", "still life", "product photography")
  photography: [
    {
      id: 3945659,
      alt: 'Product photography dark',
      photographer: 'cottonbro studio',
      src: createImageSizes(3945659),
      aspectRatio: '4/3',
      tags: ['photography', 'product', 'dark'],
    },
    {
      id: 3685175,
      alt: 'Lifestyle product shot',
      photographer: 'cottonbro studio',
      src: createImageSizes(3685175),
      aspectRatio: '4/3',
      tags: ['photography', 'lifestyle', 'natural'],
    },
    {
      id: 4041392,
      alt: 'Minimalist cosmetic photo',
      photographer: 'Valeria Boltneva',
      src: createImageSizes(4041392),
      aspectRatio: '3/4',
      tags: ['photography', 'cosmetic', 'minimal'],
    },
    {
      id: 4202325,
      alt: 'Food styling photo',
      photographer: 'Valeria Boltneva',
      src: createImageSizes(4202325),
      aspectRatio: '4/3',
      tags: ['photography', 'food', 'styling'],
    },
    {
      id: 1029141,
      alt: 'Magazine editorial shot',
      photographer: 'Pixabay',
      src: createImageSizes(1029141),
      aspectRatio: '16/9',
      tags: ['photography', 'editorial', 'magazine'],
    },
    {
      id: 3622614,
      alt: 'Studio still life',
      photographer: 'cottonbro studio',
      src: createImageSizes(3622614),
      aspectRatio: '4/3',
      tags: ['photography', 'still life', 'studio'],
    },
    {
      id: 4195325,
      alt: 'Creative product arrangement',
      photographer: 'Valeria Boltneva',
      src: createImageSizes(4195325),
      aspectRatio: '4/3',
      tags: ['photography', 'product', 'creative'],
    },
    {
      id: 3622618,
      alt: 'Artistic composition photo',
      photographer: 'cottonbro studio',
      src: createImageSizes(3622618),
      aspectRatio: '4/3',
      tags: ['photography', 'artistic', 'composition'],
    },
  ],

  // 포트레이트 (query: "portrait", "fashion portrait", "artistic portrait")
  portrait: [
    {
      id: 1542085,
      alt: 'Fashion portrait studio',
      photographer: 'Daria Shevtsova',
      src: createImageSizes(1542085),
      aspectRatio: '3/4',
      tags: ['portrait', 'fashion', 'studio'],
    },
    {
      id: 1183266,
      alt: 'Artistic portrait light',
      photographer: 'Daria Shevtsova',
      src: createImageSizes(1183266),
      aspectRatio: '3/4',
      tags: ['portrait', 'artistic', 'light'],
    },
    {
      id: 1536619,
      alt: 'Creative portrait concept',
      photographer: 'Daria Shevtsova',
      src: createImageSizes(1536619),
      aspectRatio: '3/4',
      tags: ['portrait', 'creative', 'concept'],
    },
    {
      id: 1689731,
      alt: 'Moody portrait shadow',
      photographer: 'Luis Quintero',
      src: createImageSizes(1689731),
      aspectRatio: '3/4',
      tags: ['portrait', 'moody', 'shadow'],
    },
    {
      id: 1468379,
      alt: 'Natural light portrait',
      photographer: 'Luis Quintero',
      src: createImageSizes(1468379),
      aspectRatio: '4/3',
      tags: ['portrait', 'natural', 'light'],
    },
    {
      id: 1081685,
      alt: 'Editorial fashion portrait',
      photographer: 'Luis Quintero',
      src: createImageSizes(1081685),
      aspectRatio: '3/4',
      tags: ['portrait', 'editorial', 'fashion'],
    },
    {
      id: 2379005,
      alt: 'Expressive portrait art',
      photographer: 'Luis Quintero',
      src: createImageSizes(2379005),
      aspectRatio: '4/3',
      tags: ['portrait', 'expressive', 'art'],
    },
    {
      id: 1642228,
      alt: 'Contemporary portrait style',
      photographer: 'Luis Quintero',
      src: createImageSizes(1642228),
      aspectRatio: '3/4',
      tags: ['portrait', 'contemporary', 'style'],
    },
  ],
};

// ============================================================
// Design Reference Videos (query: "abstract animation", "motion graphics")
// ============================================================
export const testVideos = {
  // 모션 그래픽 & 추상 애니메이션
  motion: [
    {
      id: 3129671,
      alt: 'Abstract liquid motion',
      photographer: 'Rostislav Uzunov',
      duration: 10,
      aspectRatio: '16/9',
      src: {
        hd: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4',
        sd: 'https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_30fps.mp4',
      },
      poster: createImageSizes(2110951).medium,
      tags: ['motion', 'liquid', 'abstract'],
    },
    {
      id: 3141210,
      alt: 'Gradient color transition',
      photographer: 'Rostislav Uzunov',
      duration: 8,
      aspectRatio: '16/9',
      src: {
        hd: 'https://videos.pexels.com/video-files/3141210/3141210-hd_1920_1080_30fps.mp4',
        sd: 'https://videos.pexels.com/video-files/3141210/3141210-sd_640_360_30fps.mp4',
      },
      poster: createImageSizes(3109807).medium,
      tags: ['motion', 'gradient', 'transition'],
    },
    {
      id: 5377684,
      alt: 'Particle flow animation',
      photographer: 'Rostislav Uzunov',
      duration: 12,
      aspectRatio: '16/9',
      src: {
        hd: 'https://videos.pexels.com/video-files/5377684/5377684-hd_1920_1080_25fps.mp4',
        sd: 'https://videos.pexels.com/video-files/5377684/5377684-sd_640_360_25fps.mp4',
      },
      poster: createImageSizes(2088205).medium,
      tags: ['motion', 'particle', 'flow'],
    },
  ],
};

// ============================================================
// Utility Functions
// ============================================================

/**
 * 특정 카테고리에서 랜덤 이미지 반환
 * @param {string} category - 카테고리명 (branding, editorial, uiux, typography, photography, spatial, abstract, motion)
 * @returns {Object} 이미지 객체
 */
export const getRandomImage = (category = 'abstract') => {
  const images = testImages[category] || testImages.abstract;
  return images[Math.floor(Math.random() * images.length)];
};

/**
 * 특정 카테고리에서 랜덤 비디오 반환
 * @param {string} category - 카테고리명 (abstract, creative, spatial)
 * @returns {Object} 비디오 객체
 */
export const getRandomVideo = (category = 'abstract') => {
  const videos = testVideos[category] || testVideos.abstract;
  return videos[Math.floor(Math.random() * videos.length)];
};

/**
 * 모든 카테고리 이름 반환
 * @returns {Object} { images: string[], videos: string[] }
 */
export const getCategories = () => ({
  images: Object.keys(testImages),
  videos: Object.keys(testVideos),
});

/**
 * 특정 비율의 이미지만 필터링
 * @param {string} aspectRatio - 비율 (예: '16/9', '4/3', '1/1')
 * @returns {Object[]} 필터링된 이미지 배열
 */
export const getImagesByRatio = (aspectRatio) => {
  return Object.values(testImages)
    .flat()
    .filter((img) => img.aspectRatio === aspectRatio);
};

/**
 * 특정 태그로 이미지 필터링
 * @param {string} tag - 태그명
 * @returns {Object[]} 필터링된 이미지 배열
 */
export const getImagesByTag = (tag) => {
  return Object.values(testImages)
    .flat()
    .filter((img) => img.tags?.includes(tag));
};

/**
 * 플레이스홀더 이미지 URL 생성 (Pexels 기반)
 * @param {number} width - 너비
 * @param {number} height - 높이
 * @param {string} category - 카테고리
 * @returns {string} 이미지 URL
 */
export const getPlaceholder = (width = 400, height = 300, category = 'abstract') => {
  const image = getRandomImage(category);
  return `https://images.pexels.com/photos/${image.id}/pexels-photo-${image.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
};

/**
 * 모든 태그 목록 반환
 * @returns {string[]} 고유 태그 배열
 */
export const getAllTags = () => {
  const tags = new Set();
  Object.values(testImages)
    .flat()
    .forEach((img) => {
      img.tags?.forEach((tag) => tags.add(tag));
    });
  return Array.from(tags).sort();
};

// ============================================================
// All Images/Videos Flat Arrays (for easy iteration)
// ============================================================
export const allImages = Object.values(testImages).flat();
export const allVideos = Object.values(testVideos).flat();

export default {
  testImages,
  testVideos,
  getRandomImage,
  getRandomVideo,
  getCategories,
  getImagesByRatio,
  getImagesByTag,
  getPlaceholder,
  getAllTags,
  allImages,
  allVideos,
};
