/**
 * Lumenstate Dark Theme Configuration
 *
 * "빛은 공간의 상태다."
 *
 * 밤(8pm-12am) 시간대를 위한 다크 테마.
 * 라이트 테마와 동일한 브랜드 4색 기반.
 *
 * ## 다크 모드 컬러 토큰
 * - 배경: Warm Black (#12100E)
 * - 텍스트: 3800K White (#F2E9DA)
 * - 보조 텍스트: #F2E9DA 80% opacity
 * - 액센트: 3800K Accent (#FFC66E)
 */

import { createTheme } from '@mui/material/styles';
import {
  BRAND_COLORS,
  typography,
  spacing,
  shape,
  breakpoints,
  zIndex,
  transitions,
  displayFontFamily,
  bodyFontFamily,
} from './theme';

// ============================================================
// Dark Mode Palette (4색 제한 유지)
// ============================================================
const darkPalette = {
  mode: 'dark',

  // 브랜드 Primary - Wall Tint White (라이트 모드 배경색)
  primary: {
    light: '#FFFAF5',
    main: BRAND_COLORS.wallTintWhite, // #F5F2EE
    dark: '#E8E4DF',
    contrastText: BRAND_COLORS.warmBlack,
  },

  // Secondary - Accent Color (동일)
  secondary: {
    light: '#FFD89A',
    main: BRAND_COLORS.accent,        // #FFC66E
    dark: '#E6A84A',
    contrastText: BRAND_COLORS.warmBlack,
  },

  // 상태 색상 (라이트 테마와 동일)
  error: {
    light: '#E57373',
    main: '#D32F2F',
    dark: '#B71C1C',
    contrastText: '#FFFFFF',
  },

  warning: {
    light: '#FFB74D',
    main: '#F9A825',
    dark: '#F57F17',
    contrastText: BRAND_COLORS.warmBlack,
  },

  info: {
    light: '#64B5F6',
    main: '#1976D2',
    dark: '#0D47A1',
    contrastText: '#FFFFFF',
  },

  success: {
    light: '#81C784',
    main: '#388E3C',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },

  // Grey 스케일 (반전)
  grey: {
    50: '#12100E',    // Warm Black
    100: '#1A1816',
    200: '#2A2725',
    300: '#3D3835',
    400: '#5A554E',
    500: '#7A746B',
    600: '#9C958B',
    700: '#B8B2A9',
    800: '#D4CFC8',
    900: '#F5F2EE',   // Wall Tint White
    A100: '#1A1816',
    A200: '#2A2725',
    A400: '#5A554E',
    A700: '#B8B2A9',
  },

  // 텍스트 색상 (반전)
  text: {
    primary: BRAND_COLORS.warmWhite,                    // #F2E9DA
    secondary: `${BRAND_COLORS.warmWhite}CC`,           // 80% opacity
    disabled: `${BRAND_COLORS.warmWhite}61`,            // 38% opacity
  },

  // 배경 색상 (반전)
  background: {
    default: BRAND_COLORS.warmBlack,  // #12100E
    paper: BRAND_COLORS.warmBlack,    // #12100E
  },

  // 구분선
  divider: `${BRAND_COLORS.warmWhite}1F`,  // 12% opacity

  // 액션 상태 색상
  action: {
    active: `${BRAND_COLORS.warmWhite}8A`,              // 54% opacity
    hover: `${BRAND_COLORS.warmWhite}0A`,               // 4% opacity
    hoverOpacity: 0.04,
    selected: `${BRAND_COLORS.warmWhite}14`,            // 8% opacity
    selectedOpacity: 0.08,
    disabled: `${BRAND_COLORS.warmWhite}42`,            // 26% opacity
    disabledBackground: `${BRAND_COLORS.warmWhite}1F`,  // 12% opacity
    disabledOpacity: 0.38,
    focus: `${BRAND_COLORS.warmWhite}1F`,               // 12% opacity
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },

  // 공통 색상
  common: {
    black: BRAND_COLORS.warmBlack,
    white: BRAND_COLORS.wallTintWhite,
  },

  // Lumenstate 커스텀 토큰
  brand: BRAND_COLORS,

  contrastThreshold: 3,
  tonalOffset: 0.2,
};

// ============================================================
// Dark Mode Shadows (Warm White 기반)
// ============================================================
const darkShadows = [
  'none',                                           // 0
  '0 0 12px rgba(242, 233, 218, 0.04)',            // 1 - sm
  '0 0 14px rgba(242, 233, 218, 0.05)',            // 2
  '0 0 16px rgba(242, 233, 218, 0.06)',            // 3 - md
  '0 0 18px rgba(242, 233, 218, 0.07)',            // 4
  '0 0 20px rgba(242, 233, 218, 0.08)',            // 5 - lg
  '0 0 22px rgba(242, 233, 218, 0.09)',            // 6
  '0 0 24px rgba(242, 233, 218, 0.10)',            // 7 - xl
  '0 0 26px rgba(242, 233, 218, 0.11)',            // 8
  '0 0 28px rgba(242, 233, 218, 0.12)',            // 9
  '0 0 30px rgba(242, 233, 218, 0.13)',            // 10
  '0 0 32px rgba(242, 233, 218, 0.14)',            // 11
  '0 0 34px rgba(242, 233, 218, 0.15)',            // 12
  '0 0 36px rgba(242, 233, 218, 0.16)',            // 13
  '0 0 38px rgba(242, 233, 218, 0.17)',            // 14
  '0 0 40px rgba(242, 233, 218, 0.18)',            // 15
  '0 0 42px rgba(242, 233, 218, 0.19)',            // 16
  '0 0 44px rgba(242, 233, 218, 0.20)',            // 17
  '0 0 46px rgba(242, 233, 218, 0.21)',            // 18
  '0 0 48px rgba(242, 233, 218, 0.22)',            // 19
  '0 0 50px rgba(242, 233, 218, 0.23)',            // 20
  '0 0 52px rgba(242, 233, 218, 0.24)',            // 21
  '0 0 54px rgba(242, 233, 218, 0.25)',            // 22
  '0 0 56px rgba(242, 233, 218, 0.26)',            // 23
  '0 0 58px rgba(242, 233, 218, 0.27)',            // 24
];

// ============================================================
// Dark Mode Components Override
// ============================================================
const darkComponents = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        backgroundColor: BRAND_COLORS.warmBlack,
        color: BRAND_COLORS.warmWhite,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        textTransform: 'none',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        backgroundColor: BRAND_COLORS.warmBlack,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        backgroundColor: BRAND_COLORS.warmBlack,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
        },
      },
    },
  },
};

// ============================================================
// Dark Theme 생성
// ============================================================
const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  spacing,
  shape,
  shadows: darkShadows,
  breakpoints,
  zIndex,
  transitions,
  components: darkComponents,
});

export default darkTheme;

// 개별 토큰 내보내기 (Storybook 문서화용)
export {
  darkPalette,
  darkShadows,
  darkComponents,
  displayFontFamily,
  bodyFontFamily,
};
