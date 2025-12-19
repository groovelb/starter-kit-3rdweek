import { useState, useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Indicator } from '../../common/ui/Indicator';

/**
 * ImageCarousel 컴포넌트
 *
 * 단일 이미지 영역 내에서 여러 이미지를 캐러셀로 표시하는 컴포넌트.
 * 스와이프 제스처, 키보드 네비게이션, 자동 재생을 지원한다.
 *
 * 동작 방식:
 * 1. 이미지들이 가로로 배치되고 현재 인덱스에 따라 이동
 * 2. 터치/마우스 드래그로 스와이프 가능
 * 3. 자동 재생 시 일정 간격으로 다음 이미지로 전환
 * 4. 내장 Indicator로 현재 위치 표시 및 직접 이동
 *
 * Props:
 * @param {Array} images - 이미지 배열 [{ src, alt }] 또는 string[] [Required]
 * @param {string} aspectRatio - 컨테이너 종횡비 [Optional, 기본값: '16/9']
 * @param {string} transition - 트랜지션 타입 ('slide' | 'fade') [Optional, 기본값: 'slide']
 * @param {number} transitionDuration - 트랜지션 시간 (ms) [Optional, 기본값: 300]
 * @param {boolean} isAutoPlay - 자동 재생 [Optional, 기본값: false]
 * @param {number} autoPlayInterval - 자동 재생 간격 (ms) [Optional, 기본값: 5000]
 * @param {boolean} isLoop - 무한 루프 [Optional, 기본값: true]
 * @param {boolean} hasIndicator - 인디케이터 표시 [Optional, 기본값: true]
 * @param {string} indicatorType - 인디케이터 타입 [Optional, 기본값: 'dot']
 * @param {string} indicatorPosition - 인디케이터 위치 [Optional, 기본값: 'bottom']
 * @param {boolean} hasArrows - 화살표 버튼 표시 [Optional, 기본값: true]
 * @param {boolean} isPausedOnHover - 호버 시 자동 재생 일시 정지 [Optional, 기본값: true]
 * @param {function} onSlideChange - 슬라이드 변경 콜백 (index) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ImageCarousel
 *   images={['img1.jpg', 'img2.jpg', 'img3.jpg']}
 *   aspectRatio="16/9"
 *   isAutoPlay
 *   autoPlayInterval={4000}
 *   hasIndicator
 *   indicatorType="line"
 * />
 */
export function ImageCarousel({
  images = [],
  aspectRatio = '16/9',
  transition = 'slide',
  transitionDuration = 300,
  isAutoPlay = false,
  autoPlayInterval = 5000,
  isLoop = true,
  hasIndicator = true,
  indicatorType = 'dot',
  indicatorPosition = 'bottom',
  hasArrows = true,
  isPausedOnHover = true,
  onSlideChange,
  sx,
  ...props
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  /**
   * 이미지 데이터 정규화
   */
  const normalizedImages = images.map((img, idx) => {
    if (typeof img === 'string') {
      return { src: img, alt: `Image ${idx + 1}` };
    }
    return img;
  });

  const totalImages = normalizedImages.length;

  /**
   * 다음 슬라이드로 이동
   */
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= totalImages - 1) {
        return isLoop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [totalImages, isLoop]);

  /**
   * 이전 슬라이드로 이동
   */
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return isLoop ? totalImages - 1 : prev;
      }
      return prev - 1;
    });
  }, [totalImages, isLoop]);

  /**
   * 특정 인덱스로 이동
   */
  const goToIndex = useCallback((index) => {
    if (index >= 0 && index < totalImages) {
      setCurrentIndex(index);
    }
  }, [totalImages]);

  /**
   * 슬라이드 변경 시 콜백 호출
   */
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  /**
   * 자동 재생 로직
   */
  useEffect(() => {
    if (isAutoPlay && !isPaused && !isDragging) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, isPaused, isDragging, autoPlayInterval, goToNext]);

  /**
   * 키보드 네비게이션
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, [goToNext, goToPrev]);

  /**
   * 드래그/스와이프 핸들러
   */
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setDragStart(clientX);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const threshold = 50; // 최소 드래그 거리
    if (dragOffset > threshold) {
      goToPrev();
    } else if (dragOffset < -threshold) {
      goToNext();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // 마우스 이벤트
  const handleMouseDown = (e) => handleDragStart(e.clientX);
  const handleMouseMove = (e) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();
  const handleMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  // 터치 이벤트
  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  /**
   * 인디케이터 위치 스타일
   */
  const getIndicatorPositionStyles = () => {
    const base = { position: 'absolute', zIndex: 2 };
    switch (indicatorPosition) {
      case 'top':
        return { ...base, top: 16, left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { ...base, left: 16, top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { ...base, right: 16, top: '50%', transform: 'translateY(-50%)' };
      case 'bottom':
      default:
        return { ...base, bottom: 16, left: '50%', transform: 'translateX(-50%)' };
    }
  };

  /**
   * 슬라이드 컨테이너 transform 계산
   * 컨테이너 너비가 totalImages * 100%이므로,
   * 한 슬라이드 이동 = (100 / totalImages)%
   */
  const getSlideTransform = () => {
    if (transition === 'fade') {
      return 'none';
    }

    // slide transition
    // 컨테이너 너비 대비 이동 비율 계산
    const slidePercent = 100 / totalImages;
    const dragPercent = isDragging ? (dragOffset / 300) * slidePercent : 0;
    const translateX = -(currentIndex * slidePercent) + dragPercent;
    return `translateX(${translateX}%)`;
  };

  if (totalImages === 0) return null;

  return (
    <Box
      ref={ containerRef }
      tabIndex={ 0 }
      onMouseEnter={ isPausedOnHover ? () => setIsPaused(true) : undefined }
      onMouseLeave={ isPausedOnHover ? () => setIsPaused(false) : undefined }
      sx={ {
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        backgroundColor: 'grey.900',
        outline: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        ...sx,
      } }
      { ...props }
    >
      {/* 슬라이드 컨테이너 */}
      <Box
        onMouseDown={ handleMouseDown }
        onMouseMove={ handleMouseMove }
        onMouseUp={ handleMouseUp }
        onMouseLeave={ handleMouseLeave }
        onTouchStart={ handleTouchStart }
        onTouchMove={ handleTouchMove }
        onTouchEnd={ handleTouchEnd }
        sx={ {
          display: transition === 'fade' ? 'block' : 'flex',
          width: transition === 'fade' ? '100%' : `${totalImages * 100}%`,
          height: '100%',
          transform: getSlideTransform(),
          transition: isDragging ? 'none' : `transform ${transitionDuration}ms ease-out`,
        } }
      >
        { normalizedImages.map((image, index) => (
          <Box
            key={ index }
            sx={ {
              width: transition === 'fade' ? '100%' : `${100 / totalImages}%`,
              height: '100%',
              flexShrink: 0,
              position: transition === 'fade' ? 'absolute' : 'relative',
              top: 0,
              left: 0,
              opacity: transition === 'fade' ? (index === currentIndex ? 1 : 0) : 1,
              transition: transition === 'fade' ? `opacity ${transitionDuration}ms ease-out` : 'none',
            } }
          >
            <Box
              component="img"
              src={ image.src }
              alt={ image.alt }
              draggable={ false }
              sx={ {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
              } }
            />
          </Box>
        )) }
      </Box>

      {/* 화살표 버튼 */}
      { hasArrows && totalImages > 1 && (
        <>
          <IconButton
            onClick={ goToPrev }
            disabled={ !isLoop && currentIndex === 0 }
            sx={ {
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: 'grey.800',
              zIndex: 2,
              '&:hover': { backgroundColor: 'white' },
              '&:disabled': { opacity: 0.3 },
            } }
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={ goToNext }
            disabled={ !isLoop && currentIndex === totalImages - 1 }
            sx={ {
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: 'grey.800',
              zIndex: 2,
              '&:hover': { backgroundColor: 'white' },
              '&:disabled': { opacity: 0.3 },
            } }
          >
            <ChevronRightIcon />
          </IconButton>
        </>
      ) }

      {/* 인디케이터 */}
      { hasIndicator && totalImages > 1 && (
        <Box sx={ getIndicatorPositionStyles() }>
          <Indicator
            total={ totalImages }
            current={ currentIndex }
            variant={ indicatorType }
            direction={ indicatorPosition === 'left' || indicatorPosition === 'right' ? 'vertical' : 'horizontal' }
            activeColor="common.white"
            inactiveColor="rgba(255,255,255,0.5)"
            onClick={ goToIndex }
          />
        </Box>
      ) }
    </Box>
  );
}
