import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { CardContainer } from './CardContainer';
import { SPACING } from '../../styles/tokens';

/**
 * CustomCard 컴포넌트
 *
 * 미디어 영역과 콘텐츠 영역으로 구성된 커스텀 카드 컴포넌트.
 * CardContainer를 확장하여 다양한 레이아웃(vertical, horizontal, overlay)을 지원한다.
 *
 * 동작 방식:
 * 1. layout에 따라 미디어와 콘텐츠 배치 결정
 * 2. 미디어 영역은 이미지, 비디오 등 시각적 콘텐츠 표시
 * 3. 콘텐츠 영역은 텍스트, 버튼 등 정보 표시
 * 4. overlaySlot을 통해 미디어 위에 액션 버튼, 배지 등 오버레이 가능
 * 5. CardContainer의 모든 props를 지원 (variant, elevation, isInteractive, isSelected 등)
 * 6. hover 인터랙션 props로 세밀한 호버 효과 제어 가능
 *
 * Props:
 * @param {string} layout - 레이아웃 타입 ('vertical' | 'horizontal' | 'overlay') [Optional, 기본값: 'vertical']
 * @param {string} mediaPosition - 미디어 위치 ('start' | 'end') [Optional, 기본값: 'start']
 * @param {string} mediaRatio - 미디어 영역 비율 ('1/1' | '4/3' | '16/9' | '21/9' | 'auto') [Optional, 기본값: '16/9']
 * @param {string} mediaSrc - 미디어 소스 URL [Optional]
 * @param {string} mediaAlt - 미디어 대체 텍스트 [Optional, 기본값: '']
 * @param {node} mediaSlot - 커스텀 미디어 요소 (mediaSrc보다 우선) [Optional]
 * @param {node} overlaySlot - 미디어 영역 위에 표시할 오버레이 요소 (액션 버튼, 배지 등) [Optional]
 * @param {node} children - 콘텐츠 영역 내용 [Optional]
 * @param {string} contentPadding - 콘텐츠 패딩 ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl') [Optional, 기본값: 'md']
 * @param {string} contentAlign - 콘텐츠 정렬 ('start' | 'center' | 'end') [Optional, 기본값: 'start']
 * @param {string} gap - 미디어와 콘텐츠 사이 간격 ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl') [Optional, 기본값: 'none']
 *
 * Hover Interaction Props:
 * @param {number} hoverLift - hover 시 위로 들리는 px 값 (예: 4) [Optional]
 * @param {string} hoverBorderColor - hover 시 border 색상 (예: 'primary.main') [Optional]
 * @param {string} hoverBgColor - hover 시 배경색 (예: 'grey.50') [Optional]
 * @param {number} hoverMediaScale - hover 시 미디어 확대 비율 (예: 1.05) [Optional]
 *
 * @param {...containerProps} - CardContainer의 모든 props (variant, elevation, isInteractive, onClick, sx 등)
 *
 * Example usage:
 * <CustomCard
 *   layout="horizontal"
 *   mediaSrc="/image.jpg"
 *   mediaRatio="4/3"
 *   overlaySlot={<ActionButtons />}
 *   variant="elevation"
 *   elevation={4}
 *   isInteractive
 *   hoverLift={4}
 *   hoverBorderColor="primary.main"
 *   hoverMediaScale={1.05}
 * >
 *   <Typography variant="h6">Title</Typography>
 *   <Typography>Description</Typography>
 * </CustomCard>
 */
const CustomCard = forwardRef(function CustomCard({
  // === CustomCard 전용 props ===
  layout = 'vertical',
  mediaPosition = 'start',
  mediaRatio = '16/9',
  mediaSrc,
  mediaAlt = '',
  mediaSlot,
  overlaySlot,
  children,
  contentPadding = 'md',
  contentAlign = 'start',
  gap = 'none',

  // === Hover Interaction props ===
  hoverLift,
  hoverBorderColor,
  hoverBgColor,
  hoverMediaScale,

  // === CardContainer로 전달될 props ===
  // variant, elevation, isInteractive, onClick, sx 등
  ...containerProps
}, ref) {
  /**
   * hover 효과 활성화 여부
   */
  const hasHoverEffects = hoverLift || hoverBorderColor || hoverBgColor || hoverMediaScale;

  /**
   * hover 시 카드 스타일 생성
   * - hoverLift: translateY로 위로 들어올림
   * - hoverBorderColor: border 색상 변경
   * - hoverBgColor: 배경색 변경
   */
  const getHoverStyles = () => {
    if (!hasHoverEffects) return {};

    const hoverState = {};

    if (hoverLift) {
      hoverState.transform = `translateY(-${hoverLift}px)`;
    }
    if (hoverBorderColor) {
      hoverState.borderColor = hoverBorderColor;
    }
    if (hoverBgColor) {
      hoverState.backgroundColor = hoverBgColor;
    }
    if (hoverMediaScale) {
      hoverState['& .custom-card-media img, & .custom-card-media video, & .custom-card-media > *:first-of-type'] = {
        transform: `scale(${hoverMediaScale})`,
      };
    }

    return {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '& .custom-card-media img, & .custom-card-media video, & .custom-card-media > *:first-of-type': {
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      '&:hover': hoverState,
    };
  };

  /**
   * 정렬 맵
   */
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
  };

  /**
   * 레이아웃별 컨테이너 스타일
   * - gap: 미디어와 콘텐츠 사이 간격 (SPACING.stack 토큰 사용)
   */
  const getLayoutStyles = () => {
    const gapValue = SPACING.stack[gap] ?? 0;

    switch (layout) {
      case 'horizontal':
        return {
          display: 'flex',
          flexDirection: mediaPosition === 'end' ? 'row-reverse' : 'row',
          gap: gapValue,
        };

      case 'overlay':
        return {
          position: 'relative',
        };

      case 'vertical':
      default:
        return {
          display: 'flex',
          flexDirection: mediaPosition === 'end' ? 'column-reverse' : 'column',
          gap: gapValue,
        };
    }
  };

  /**
   * 미디어 영역 스타일
   * - 'auto' ratio: 원본 이미지 비율 유지 (aspectRatio 미적용)
   */
  const getMediaStyles = () => {
    const base = {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'grey.200',
    };

    if (layout === 'horizontal') {
      return {
        ...base,
        width: '40%',
        flexShrink: 0,
        ...(mediaRatio !== 'auto' && { aspectRatio: mediaRatio }),
      };
    }

    if (layout === 'overlay') {
      return {
        ...base,
        position: 'absolute',
        inset: 0,
        aspectRatio: 'unset',
      };
    }

    return {
      ...base,
      width: '100%',
      ...(mediaRatio !== 'auto' && { aspectRatio: mediaRatio }),
    };
  };

  /**
   * 콘텐츠 영역 스타일
   */
  const getContentStyles = () => {
    const base = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: alignMap[contentAlign],
      p: SPACING.inset[contentPadding] ?? SPACING.inset.md,
    };

    if (layout === 'horizontal') {
      return {
        ...base,
        flex: 1,
        justifyContent: 'center',
      };
    }

    if (layout === 'overlay') {
      return {
        ...base,
        position: 'relative',
        zIndex: 1,
        minHeight: 200,
        justifyContent: 'flex-end',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        color: 'common.white',
      };
    }

    return base;
  };

  /**
   * 미디어 렌더링
   * - mediaSlot: 커스텀 미디어 요소 (우선)
   * - mediaSrc: 이미지 URL
   * - overlaySlot: 미디어 위 오버레이 요소 (액션 버튼, 배지 등)
   */
  const renderMedia = () => {
    const hasMedia = mediaSlot || mediaSrc;
    if (!hasMedia && !overlaySlot) return null;

    // 이미지 스타일 (auto ratio: 원본 비율 유지)
    const imgStyles = mediaRatio === 'auto'
      ? {
          display: 'block',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      : {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        };

    return (
      <Box className="custom-card-media" sx={getMediaStyles()}>
        {/* 커스텀 미디어 슬롯 (우선) */}
        {mediaSlot}

        {/* 기본 이미지 렌더링 */}
        {!mediaSlot && mediaSrc && (
          <Box
            component="img"
            src={mediaSrc}
            alt={mediaAlt}
            sx={imgStyles}
          />
        )}

        {/* 오버레이 슬롯 (액션 버튼, 배지 등) */}
        {overlaySlot}
      </Box>
    );
  };

  // containerProps에서 sx를 분리하여 레이아웃 스타일과 병합
  const { sx, ...restContainerProps } = containerProps;

  return (
    <CardContainer
      ref={ref}
      padding="none"
      {...restContainerProps}
      sx={{
        ...getLayoutStyles(),
        ...getHoverStyles(),
        ...sx,
      }}
    >
      {renderMedia()}
      {children && (
        <Box sx={getContentStyles()}>
          {children}
        </Box>
      )}
    </CardContainer>
  );
});

export { CustomCard };
