import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';

/**
 * VideoScrubbing Component
 * 스크롤 위치에 따라 비디오를 프레임 단위로 재생(스크러빙)하는 컴포넌트입니다.
 *
 * 동작 방식 (startInView: false, 기본값):
 * 1. 비디오 상단이 화면 하단에 등장 → progress = 0 (비디오 첫 프레임)
 * 2. 스크롤에 따라 비디오 프레임이 시킹됨
 * 3. 비디오 하단이 화면 상단을 벗어남 → progress = 1 (비디오 마지막 프레임)
 *
 * 동작 방식 (startInView: true):
 * 1. 비디오가 뷰포트 상단에 위치 → progress = 0 (비디오 첫 프레임)
 * 2. 스크롤에 따라 비디오 프레임이 시킹됨
 * 3. 비디오가 화면 상단을 벗어남 → progress = 1 (비디오 마지막 프레임)
 *
 * @param {string} src - 비디오 소스 경로 [Required]
 * @param {React.RefObject} containerRef - 스크롤 추적용 컨테이너 요소 [Optional]
 * @param {boolean} startInView - 뷰포트 상단에서 시작하는 경우 true [Optional, 기본값: false]
 * @param {string} ratio - 비디오 비율 (예: '16/9', '4/3', 'auto') [Optional, 기본값: 'auto']
 * @param {Object} sx - MUI sx 스타일 [Optional]
 * @param {Object} scrollRange - 스크롤 범위 매핑 { start: 0, end: 1 } [Optional]
 * @param {function} onProgressChange - 진행도 변경 콜백 (progress: 0-1) [Optional]
 */
const VideoScrubbing = ({
  src,
  containerRef = null,
  startInView = false,
  ratio = 'auto',
  sx = {},
  scrollRange = { start: 0, end: 1 },
  onProgressChange,
  ...props
}) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Initialize video to frame 0 on load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      video.currentTime = 0;
    };

    video.addEventListener('loadeddata', handleLoadedData);

    if (video.readyState >= 2) {
      video.currentTime = 0;
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    let animationFrameId = null;
    let lastScrollTime = 0;
    const throttleDelay = 16; // ~60fps

    const updateVideoTime = () => {
      const now = Date.now();
      if (now - lastScrollTime < throttleDelay) {
        animationFrameId = requestAnimationFrame(updateVideoTime);
        return;
      }
      lastScrollTime = now;

      let progress = 0;
      const windowHeight = window.innerHeight;

      if (containerRef && containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;

        if (startInView) {
          // 뷰포트 상단에서 시작하는 경우 (Hero 섹션 등)
          // rect.top >= 0 → progress = 0 (상단이 뷰포트 상단에 위치)
          // rect.top = -containerHeight → progress = 1 (하단이 화면 상단을 벗어남)
          progress = -rect.top / containerHeight;
        } else {
          // 화면 하단에서 등장하는 경우 (기본값)
          // rect.top = windowHeight → progress = 0 (상단이 화면 하단에 등장)
          // rect.top = -containerHeight → progress = 1 (하단이 화면 상단을 벗어남)
          const totalScrollRange = windowHeight + containerHeight;
          progress = (windowHeight - rect.top) / totalScrollRange;
        }
      } else {
        const rect = video.getBoundingClientRect();
        const videoHeight = video.offsetHeight;

        if (startInView) {
          // 뷰포트 상단에서 시작하는 경우 (Hero 섹션 등)
          // rect.top >= 0 → progress = 0 (상단이 뷰포트 상단에 위치)
          // rect.top = -videoHeight → progress = 1 (하단이 화면 상단을 벗어남)
          progress = -rect.top / videoHeight;
        } else {
          // 화면 하단에서 등장하는 경우 (기본값)
          // rect.top = windowHeight → progress = 0 (상단이 화면 하단에 등장)
          // rect.top = -videoHeight → progress = 1 (하단이 화면 상단을 벗어남)
          const totalScrollRange = windowHeight + videoHeight;
          progress = (windowHeight - rect.top) / totalScrollRange;
        }
      }

      // Apply scroll range mapping
      const { start, end } = scrollRange;
      progress = (progress - start) / (end - start);

      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));

      // Callback
      if (onProgressChange) {
        onProgressChange(progress);
      }

      // Update video time
      if (video.duration) {
        const targetTime = video.duration * progress;
        if (Math.abs(video.currentTime - targetTime) > 0.033) {
          video.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    animationFrameId = requestAnimationFrame(updateVideoTime);

    const handleScroll = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateVideoTime);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, containerRef, startInView, scrollRange, onProgressChange]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Video */}
      <Box
        component="video"
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        sx={{
          width: '100%',
          height: ratio === 'auto' ? 'auto' : '100%',
          aspectRatio: ratio === 'auto' ? undefined : ratio,
          objectFit: ratio === 'auto' ? undefined : 'cover',
          display: 'block',
          position: 'relative',
          zIndex: 0,
          ...sx,
        }}
        {...props}
      >
        <source src={src} type="video/mp4" />
      </Box>
    </Box>
  );
};

export default VideoScrubbing;
