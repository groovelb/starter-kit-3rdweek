import { forwardRef, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { Sun, Sunset, Moon } from 'lucide-react';

import { useTimeline, TIME_PRESETS } from '../../hooks/useTimeline';

/**
 * MinimalTimelineSlider 컴포넌트
 *
 * 헤더용 초소형 타임라인.
 * 데이터 시각화 스타일 - 검정/흰색 라인과 틱만 사용.
 *
 * 동작 방식:
 * 1. 아이콘 클릭으로 시간대 이동
 * 2. 1px 축 라인 + 틱 마커
 * 3. 전역 TimelineContext 연동
 *
 * Props:
 * @param {function} onChange - 값 변경 시 콜백 (value: 0-1) [Optional]
 * @param {boolean} useGlobalState - 전역 TimelineContext 사용 여부 [Optional, 기본값: true]
 * @param {number} value - 직접 제어 시 timeline 값 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 */
const MinimalTimelineSlider = forwardRef(function MinimalTimelineSlider({
  onChange,
  useGlobalState = true,
  value: controlledValue,
  sx,
  ...props
}, ref) {
  const { timeline: globalTimeline, setTimeline, isDarkMode } = useTimeline();
  const timeline = useGlobalState ? globalTimeline : (controlledValue ?? 0);

  // 테마에 따른 색상 (검정/흰색만)
  const lineColor = isDarkMode ? '#F2E9DA' : '#12100E';

  const timeMarkers = useMemo(() => [
    { label: '12pm', icon: Sun, timeline: TIME_PRESETS[0].timeline },
    { label: '4pm', icon: Sunset, timeline: TIME_PRESETS[1].timeline },
    { label: '8pm', icon: Moon, timeline: TIME_PRESETS[2].timeline },
    { label: '12am', icon: Moon, timeline: TIME_PRESETS[3].timeline },
  ], []);

  const activeMarkerIndex = useMemo(() => {
    let closestIndex = 0;
    let minDiff = Math.abs(timeline - timeMarkers[0].timeline);
    timeMarkers.forEach((marker, index) => {
      const diff = Math.abs(timeline - marker.timeline);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    return closestIndex;
  }, [timeline, timeMarkers]);

  const handleMarkerClick = useCallback((markerTimeline) => {
    if (useGlobalState) setTimeline(markerTimeline);
    if (onChange) onChange(markerTimeline);
  }, [useGlobalState, setTimeline, onChange]);

  const progressWidth = `${timeline * 100}%`;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 0.5,
        minWidth: 100,
        ...sx,
      }}
      {...props}
    >
      {/* 아이콘 행 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {timeMarkers.map((marker, index) => {
          const IconComponent = marker.icon;
          const isActive = index === activeMarkerIndex;

          return (
            <Box
              key={marker.label}
              onClick={() => handleMarkerClick(marker.timeline)}
              role="button"
              tabIndex={0}
              aria-label={`Set time to ${marker.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMarkerClick(marker.timeline);
                }
              }}
              sx={{
                cursor: 'pointer',
                padding: '2px',
                '&:focus-visible': {
                  outline: `1px solid ${lineColor}`,
                },
              }}
            >
              <IconComponent
                size={12}
                strokeWidth={1.5}
                color={lineColor}
                style={{
                  opacity: isActive ? 1 : 0.35,
                  transition: 'opacity 200ms',
                }}
              />
            </Box>
          );
        })}
      </Box>

      {/* 틱 + 축 라인 */}
      <Box sx={{ position: 'relative', height: '6px' }}>
        {/* 틱 마커 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {timeMarkers.map((marker, index) => {
            const isActive = index === activeMarkerIndex;
            return (
              <Box
                key={`tick-${marker.label}`}
                sx={{
                  width: '1px',
                  height: '100%',
                  backgroundColor: lineColor,
                  opacity: isActive ? 1 : 0.35,
                  transition: 'opacity 200ms',
                }}
              />
            );
          })}
        </Box>

        {/* 축 라인 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: lineColor,
            opacity: 0.35,
          }}
        />

        {/* 진행 표시 라인 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: progressWidth,
            height: '1px',
            backgroundColor: lineColor,
            transition: 'width 200ms',
          }}
        />
      </Box>
    </Box>
  );
});

export { MinimalTimelineSlider };
export default MinimalTimelineSlider;
