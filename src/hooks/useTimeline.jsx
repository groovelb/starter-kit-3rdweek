import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import lightTheme from '../styles/themes/theme';
import darkTheme from '../styles/themes/darkTheme';

/**
 * Timeline Context
 *
 * Lumenstate 시간대 전역 상태 관리.
 * timeline 값(0-1)에 따라 자동으로 라이트/다크 테마 전환.
 *
 * 시간대 매핑:
 * - 0.00 = 12pm (정오) - 라이트
 * - 0.33 = 4pm (오후) - 라이트
 * - 0.50 = 6pm (전환점) - 라이트→다크 경계
 * - 0.67 = 8pm (저녁) - 다크
 * - 1.00 = 12am (자정) - 다크
 *
 * @typedef {Object} TimelineContextValue
 * @property {number} timeline - 시간대 값 (0-1)
 * @property {function} setTimeline - 시간대 값 설정 함수
 * @property {boolean} isDarkMode - 다크 모드 여부 (timeline >= 0.5)
 * @property {Object} timeInfo - 현재 시간 정보 { hour, label, lux, kelvin }
 */
const TimelineContext = createContext({
  timeline: 0,
  setTimeline: () => {},
  isDarkMode: false,
  timeInfo: {
    hour: 12,
    label: '12pm',
    lux: 480,
    kelvin: 4400,
  },
});

/**
 * useTimeline 커스텀 훅
 *
 * 전역 타임라인 상태에 접근하는 훅.
 *
 * 동작 방식:
 * 1. TimelineContext에서 timeline 값과 setter 반환
 * 2. isDarkMode로 현재 테마 상태 확인
 * 3. timeInfo로 현재 시간의 상세 정보 확인
 *
 * Example usage:
 * const { timeline, setTimeline, isDarkMode } = useTimeline();
 *
 * @returns {TimelineContextValue} 타임라인 컨텍스트 값
 */
export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
};

/**
 * 시간대별 조도/색온도 매핑 테이블
 *
 * timeline 값에 따른 lux(조도)와 kelvin(색온도) 보간.
 */
const TIME_PRESETS = [
  { timeline: 0.00, hour: 12, label: '12pm', lux: 480, kelvin: 4400 },
  { timeline: 0.33, hour: 16, label: '4pm', lux: 380, kelvin: 3800 },
  { timeline: 0.67, hour: 20, label: '8pm', lux: 180, kelvin: 3200 },
  { timeline: 1.00, hour: 24, label: '12am', lux: 80, kelvin: 2700 },
];

/**
 * timeline 값에서 시간 정보 계산
 *
 * @param {number} timeline - 0-1 값
 * @returns {Object} { hour, label, lux, kelvin }
 */
const getTimeInfo = (timeline) => {
  // 범위 외 값 처리
  const clampedTimeline = Math.max(0, Math.min(1, timeline));

  // 해당 구간 찾기
  let lowerIndex = 0;
  for (let i = 0; i < TIME_PRESETS.length - 1; i++) {
    if (clampedTimeline >= TIME_PRESETS[i].timeline &&
        clampedTimeline <= TIME_PRESETS[i + 1].timeline) {
      lowerIndex = i;
      break;
    }
  }

  const lower = TIME_PRESETS[lowerIndex];
  const upper = TIME_PRESETS[Math.min(lowerIndex + 1, TIME_PRESETS.length - 1)];

  // 구간 내 보간 비율
  const range = upper.timeline - lower.timeline;
  const t = range > 0 ? (clampedTimeline - lower.timeline) / range : 0;

  // 선형 보간
  const lux = Math.round(lower.lux + (upper.lux - lower.lux) * t);
  const kelvin = Math.round(lower.kelvin + (upper.kelvin - lower.kelvin) * t);
  const hour = Math.round(lower.hour + (upper.hour - lower.hour) * t);

  // 시간 라벨 결정 (가장 가까운 프리셋)
  let closestPreset = TIME_PRESETS[0];
  let minDiff = Math.abs(clampedTimeline - TIME_PRESETS[0].timeline);

  for (const preset of TIME_PRESETS) {
    const diff = Math.abs(clampedTimeline - preset.timeline);
    if (diff < minDiff) {
      minDiff = diff;
      closestPreset = preset;
    }
  }

  return {
    hour,
    label: closestPreset.label,
    lux,
    kelvin,
  };
};

/**
 * TimelineProvider 컴포넌트
 *
 * 전역 타임라인 상태와 테마 자동 전환을 제공하는 Provider.
 *
 * 동작 방식:
 * 1. timeline 값(0-1) 관리
 * 2. timeline >= 0.5 → 다크 테마 자동 적용
 * 3. 자식 컴포넌트에서 useTimeline()으로 접근
 *
 * Props:
 * @param {React.ReactNode} children - 자식 컴포넌트 [Required]
 * @param {number} initialTimeline - 초기 timeline 값 [Optional, 기본값: 0]
 *
 * Example usage:
 * <TimelineProvider initialTimeline={0}>
 *   <App />
 * </TimelineProvider>
 */
export const TimelineProvider = ({ children, initialTimeline = 0 }) => {
  const [timeline, setTimelineState] = useState(initialTimeline);

  /**
   * timeline 값 설정 (0-1 범위로 클램핑)
   */
  const setTimeline = useCallback((value) => {
    const clampedValue = Math.max(0, Math.min(1, value));
    setTimelineState(clampedValue);
  }, []);

  /**
   * 다크 모드 여부 (timeline >= 0.5)
   */
  const isDarkMode = useMemo(() => timeline >= 0.5, [timeline]);

  /**
   * 현재 시간 정보
   */
  const timeInfo = useMemo(() => getTimeInfo(timeline), [timeline]);

  /**
   * 현재 테마 선택
   */
  const currentTheme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  /**
   * Context 값
   */
  const contextValue = useMemo(
    () => ({
      timeline,
      setTimeline,
      isDarkMode,
      timeInfo,
    }),
    [timeline, setTimeline, isDarkMode, timeInfo]
  );

  return (
    <TimelineContext.Provider value={contextValue}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </TimelineContext.Provider>
  );
};

// 상수 내보내기 (Storybook/테스트용)
export { TIME_PRESETS, getTimeInfo };

export default useTimeline;
