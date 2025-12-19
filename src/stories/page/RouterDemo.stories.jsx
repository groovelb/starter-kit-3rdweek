import { MemoryRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { AppShell } from '../../components/navigation/AppShell';
import { content } from '../../data/content';
import LandingPage from '../../pages/LandingPage';
import { Page2, Page3 } from '../../pages';

export default {
  title: 'Page/Router Demo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Router Demo

AppShell + react-router-dom을 활용한 페이지 라우팅 데모.

### 특징
- GNB는 content.js에서 로고/메뉴 자동 로드
- 메뉴 클릭 시 페이지 전환
- 모바일에서 드로어 메뉴 자동 닫힘
- URL 기반 활성 메뉴 표시
        `,
      },
    },
  },
};

/**
 * 라우터 데모 앱
 */
function RouterDemoApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // content.js에서 메뉴 아이템 가져오기
  const menuItems = content.navigation.menuItems;
  const activeId = menuItems.find((item) => item.path === location.pathname)?.id || 'brand';

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  return (
    <AppShell activeId={ activeId } onMenuClick={ handleMenuClick }>
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/brand" element={ <LandingPage /> } />
        <Route path="/collection" element={ <Page2 /> } />
        <Route path="/shop" element={ <Page3 /> } />
        <Route path="*" element={ <LandingPage /> } />
      </Routes>
    </AppShell>
  );
}

/** 라우터 데모 - 메뉴 클릭으로 페이지 전환 */
export const Default = {
  render: () => (
    <MemoryRouter initialEntries={ ['/brand'] }>
      <Box sx={ { minHeight: '100vh' } }>
        <RouterDemoApp />
      </Box>
    </MemoryRouter>
  ),
};
