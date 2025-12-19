/**
 * Media Components
 *
 * 미디어 관련 컴포넌트 모음
 * 이미지, 비디오 등 다양한 미디어 처리 컴포넌트를 제공
 */

// AspectMedia - 고정 비율 이미지/비디오
export { default as AspectMedia } from './AspectMedia.jsx';

// VideoScrubbing - 스크롤 기반 비디오 스크러빙
export { default as VideoScrubbing } from './VideoScrubbing.jsx';

// ImageTransition - 인덱스 기반 이미지 트랜지션
export { ImageTransition } from './ImageTransition.jsx';

// ImageCarousel - 이미지 캐러셀 + 인디케이터
export { ImageCarousel } from './ImageCarousel.jsx';

// Indicator - 범용 인디케이터 (common/ui에서 재노출)
export { Indicator } from '../../common/ui/Indicator.jsx';

// CarouselIndicator - 레거시 호환용 (Indicator 사용 권장)
export { CarouselIndicator } from './CarouselIndicator.jsx';
