import { MemoryRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { AppShell } from '../../../components/navigation/AppShell';
import { Page1, Page2, Page3 } from '../../../pages';
import { content } from '../../../data/content';

export default {
  title: 'Custom Component/Navigation/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## AppShell

반응형 애플리케이션 쉘 컴포넌트.

### 특징
- GNB(헤더) + 메인 콘텐츠 영역 구성
- GNB는 content.js에서 로고/메뉴 자동 로드
- 모바일에서 자동으로 드로어 메뉴 전환
- react-router-dom 연동 지원
        `,
      },
    },
  },
  argTypes: {
    activeId: {
      control: 'select',
      options: ['brand', 'collection', 'shop'],
      description: '현재 활성 메뉴 ID',
    },
    breakpoint: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '반응형 전환 브레이크포인트',
    },
    headerHeight: {
      control: { type: 'number', min: 48, max: 96 },
      description: '헤더 높이 (px)',
    },
    hasHeaderBorder: {
      control: 'boolean',
      description: '헤더 하단 보더',
    },
    isHeaderSticky: {
      control: 'boolean',
      description: '헤더 고정 여부',
    },
    isHeaderTransparent: {
      control: 'boolean',
      description: '헤더 투명 배경',
    },
    onMenuClick: {
      action: 'menuClicked',
      description: '메뉴 클릭 핸들러',
    },
  },
};

/** 기본 AppShell - Controls에서 Props 조작 가능 */
export const Default = {
  args: {
    activeId: 'brand',
    breakpoint: 'md',
    headerHeight: 64,
    hasHeaderBorder: true,
    isHeaderSticky: true,
    isHeaderTransparent: false,
  },
  render: (args) => (
    <Box sx={ { height: 400, border: '1px solid', borderColor: 'divider' } }>
      <AppShell { ...args }>
        <Box
          sx={ {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.50',
          } }
        >
          <Box sx={ { textAlign: 'center', p: 4 } }>
            <Typography variant="h4" fontWeight={ 700 } gutterBottom>
              Main Content
            </Typography>
            <Typography color="text.secondary">
              화면 크기를 조절해보세요. 모바일에서는 드로어 메뉴로 전환됩니다.
            </Typography>
          </Box>
        </Box>
      </AppShell>
    </Box>
  ),
};

/**
 * 라우터 연동 AppShell
 */
function RouterAppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에서 activeId 추출
  const menuItems = content.navigation.menuItems;
  const activeId = menuItems.find((item) => item.path === location.pathname)?.id || 'brand';

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  return (
    <AppShell activeId={ activeId } onMenuClick={ handleMenuClick }>
      <Routes>
        <Route path="/" element={ <Page1 /> } />
        <Route path="/brand" element={ <Page1 /> } />
        <Route path="/collection" element={ <Page2 /> } />
        <Route path="/shop" element={ <Page3 /> } />
        <Route path="*" element={ <Page1 /> } />
      </Routes>
    </AppShell>
  );
}

/** 라우터 연동 예시 - 메뉴 클릭 시 페이지 전환 */
export const WithRouter = {
  render: () => (
    <MemoryRouter initialEntries={ ['/brand'] }>
      <Box sx={ { height: 500, border: '1px solid', borderColor: 'divider' } }>
        <RouterAppShell />
      </Box>
    </MemoryRouter>
  ),
};

/** 레이아웃 변형 비교 */
export const LayoutVariants = {
  render: () => (
    <Stack spacing={ 4 }>
      <Box>
        <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
          기본 레이아웃
        </Typography>
        <Box sx={ { height: 300, border: '1px solid', borderColor: 'divider' } }>
          <AppShell activeId="brand">
            <Box sx={ { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' } }>
              <Typography variant="h5" fontWeight={ 600 }>Content Area</Typography>
            </Box>
          </AppShell>
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
          투명 헤더 (Hero 섹션)
        </Typography>
        <Box sx={ { height: 300 } }>
          <AppShell activeId="brand" isHeaderTransparent hasHeaderBorder={ false }>
            <Box
              sx={ {
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              } }
            >
              <Typography variant="h3" fontWeight={ 700 } color="white">
                Hero Section
              </Typography>
            </Box>
          </AppShell>
        </Box>
      </Box>
    </Stack>
  ),
};
