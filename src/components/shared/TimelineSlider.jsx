import { forwardRef, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { Sun, Sunset, Moon } from 'lucide-react';

import { useTimeline, TIME_PRESETS } from '../../hooks/useTimeline';

/**
 * TimelineSlider 컴포넌트
 *
 * 데이터 시각화 스타일의 기본적인 축(axis) 디자인.
 * 검정/흰색 라인과 틱만 사용한 미니멀한 타임라인.
 *
 * 동작 방식:
 * 1. 수평 축 위에 4개 틱 마커 (12pm, 4pm, 8pm, 12am)
 * 2. 드래그 가능한 인디케이터로 timeline 값 조절
 * 3. 아이콘과 시간 라벨은 틱 위에 표시
 *
 * Props:
 * @param {function} onChange - 값 변경 시 콜백 (value: 0-1) [Optional]
 * @param {boolean} showLabels - 시간 라벨 표시 여부 [Optional, 기본값: true]
 * @param {boolean} useGlobalState - 전역 TimelineContext 사용 여부 [Optional, 기본값: true]
 * @param {number} value - 직접 제어 시 timeline 값 [Optional]
 * @param {string} color - 라인/아이콘 색상 강제 지정 [Optional]
 * @param {boolean} disableTransition - 트랜지션 비활성화 (스크롤 연동 시) [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 */
const TimelineSlider = forwardRef(function TimelineSlider({
  onChange,
  showLabels = true,
  useGlobalState = true,
  value: controlledValue,
  color,
  disableTransition = false,
  sx,
  ...props
}, ref) {
  const { timeline: globalTimeline, setTimeline, isDarkMode } = useTimeline();
  const timeline = useGlobalState ? globalTimeline : (controlledValue ?? 0);

  // 테마에 따른 색상 (color prop이 있으면 우선 적용)
  const lineColor = color || (isDarkMode ? '#F2E9DA' : '#12100E');

  // 4개 지점만 선택 가능하도록 스냅
  const handleChange = useCallback((event, newValue) => {
    const normalizedValue = newValue / 100;

    // 가장 가까운 프리셋으로 스냅
    let closestPreset = TIME_PRESETS[0];
    let minDiff = Math.abs(normalizedValue - TIME_PRESETS[0].timeline);

    for (const preset of TIME_PRESETS) {
      const diff = Math.abs(normalizedValue - preset.timeline);
      if (diff < minDiff) {
        minDiff = diff;
        closestPreset = preset;
      }
    }

    if (useGlobalState) setTimeline(closestPreset.timeline);
    if (onChange) onChange(closestPreset.timeline);
  }, [useGlobalState, setTimeline, onChange]);

  const timeMarkers = useMemo(() => [
    { label: '12pm', icon: Sun, position: TIME_PRESETS[0].timeline * 100 },
    { label: '4pm', icon: Sunset, position: TIME_PRESETS[1].timeline * 100 },
    { label: '8pm', icon: Moon, position: TIME_PRESETS[2].timeline * 100 },
    { label: '12am', icon: Moon, position: TIME_PRESETS[3].timeline * 100 },
  ], []);

  // 슬라이더 marks (4개 지점)
  const sliderMarks = useMemo(() =>
    TIME_PRESETS.map(preset => ({ value: preset.timeline * 100 })),
  []);

  const activeMarkerIndex = useMemo(() => {
    const currentValue = timeline * 100;
    let closestIndex = 0;
    let minDiff = Math.abs(currentValue - timeMarkers[0].position);
    timeMarkers.forEach((marker, index) => {
      const diff = Math.abs(currentValue - marker.position);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    return closestIndex;
  }, [timeline, timeMarkers]);

  // 데이터 시각화 스타일 슬라이더 - 1px 라인 + 원형 인디케이터
  const sliderSx = useMemo(() => ({
    width: '100%',
    height: '8px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',

    '& .MuiSlider-rail': {
      height: '1px',
      backgroundColor: lineColor,
      opacity: 0.35,
      borderRadius: 0,
      top: '50%',
      transform: 'translateY(-50%)',
    },

    '& .MuiSlider-track': {
      height: '1px',
      backgroundColor: lineColor,
      border: 'none',
      borderRadius: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      transition: disableTransition ? 'none' : undefined,
    },

    '& .MuiSlider-thumb': {
      width: '8px',
      height: '8px',
      backgroundColor: lineColor,
      borderRadius: '50%',
      border: 'none',
      boxShadow: 'none',
      transition: disableTransition ? 'none' : undefined,

      '&:hover, &.Mui-focusVisible, &.Mui-active': {
        boxShadow: 'none',
      },

      '&::before': {
        display: 'none',
      },
    },

    '& .MuiSlider-mark': {
      display: 'none',
    },
  }), [lineColor, disableTransition]);

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        ...sx,
      }}
      {...props}
    >
      {/* 아이콘 + 라벨 */}
      <Box
        sx={{
          position: 'relative',
          height: 48,
          mb: 1.5,
          pointerEvents: 'none',
        }}
      >
        {timeMarkers.map((marker, index) => {
          const IconComponent = marker.icon;
          const isActive = index === activeMarkerIndex;

          return (
            <Box
              key={marker.label}
              sx={{
                position: 'absolute',
                left: `${marker.position}%`,
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <IconComponent
                size={20}
                strokeWidth={1.5}
                color={lineColor}
                style={{
                  opacity: isActive ? 1 : 0.35,
                  transition: disableTransition ? 'none' : 'opacity 200ms',
                }}
              />
              {showLabels && (
                <Typography
                  sx={{
                    fontSize: 11,
                    fontFamily: 'monospace',
                    color: lineColor,
                    opacity: isActive ? 1 : 0.35,
                    transition: disableTransition ? 'none' : 'opacity 200ms',
                  }}
                >
                  {marker.label}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* 틱 마커 + 축 라인 */}
      <Box
        sx={{
          position: 'relative',
          height: '8px',
        }}
      >
        {/* 틱 마커 - 슬라이더 위치와 정렬 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: 'none',
          }}
        >
          {timeMarkers.map((marker, index) => {
            const isActive = index === activeMarkerIndex;
            return (
              <Box
                key={`tick-${marker.label}`}
                sx={{
                  position: 'absolute',
                  left: `${marker.position}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '1px',
                  height: '8px',
                  backgroundColor: lineColor,
                  opacity: isActive ? 1 : 0.35,
                  transition: disableTransition ? 'none' : 'opacity 200ms',
                }}
              />
            );
          })}
        </Box>

        {/* 축 라인 + 슬라이더 */}
        <Slider
          value={timeline * 100}
          onChange={handleChange}
          min={0}
          max={100}
          step={null}
          marks={sliderMarks}
          aria-label="Timeline"
          sx={sliderSx}
        />
      </Box>
    </Box>
  );
});

export { TimelineSlider };
export default TimelineSlider;
