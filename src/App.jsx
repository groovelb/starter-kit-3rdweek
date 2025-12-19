import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import { useCallback } from 'react';
import { TimelineProvider } from './hooks/useTimeline';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider, useProduct } from './contexts/ProductContext';
import { AppShell } from './components/navigation/AppShell';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import {
  LoginPage,
  ProductListPage,
  ProductEditPage,
  OrderListPage,
  OrderDetailPage,
  OptionsPage,
} from './pages/admin';

/**
 * 제품 상세 페이지 래퍼
 * URL 파라미터에서 productId를 추출하여 Context에서 제품 데이터 조회
 */
function ProductDetailRoute() {
  const { productId } = useParams();
  const { isLoading, getProductById } = useProduct();

  // Context에서 제품 조회
  const product = getProductById(productId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        제품을 찾을 수 없습니다.
      </Box>
    );
  }

  const meta = {
    itemNumber: `LM-${product.id.slice(0, 8).toUpperCase()}`,
    leadTime: '4 Weeks',
    shipDate: 'Jan 15, 2025',
  };

  return (
    <ProductDetailPage
      product={product}
      meta={meta}
    />
  );
}

/**
 * 메인 앱 레이아웃 (GNB 포함)
 *
 * 동작 방식:
 * 1. GNB의 Cart 아이콘 클릭 시 /checkout으로 이동
 */
function AppLayout() {
  const navigate = useNavigate();

  /**
   * Cart 클릭 → /checkout으로 이동
   */
  const handleCartClick = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  return (
    <AppShell onCartClick={handleCartClick}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:productId" element={<ProductDetailRoute />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AppShell>
  );
}

/**
 * Admin 라우트 컴포넌트
 * AuthProvider를 Admin 페이지에만 적용하여 Public 페이지와의 충돌 방지
 *
 * 동작 방식:
 * 1. AuthProvider가 마운트되면 Supabase Auth 초기화 시작
 * 2. 로그인 페이지 또는 ProtectedRoute에서 인증 상태 확인
 * 3. 인증된 사용자만 Admin 기능 접근 가능
 */
function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <AdminLayout title="Admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/new" element={<ProductEditPage />} />
          <Route path="products/:id" element={<ProductEditPage />} />
          <Route path="orders" element={<OrderListPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="options" element={<OptionsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

/**
 * 메인 App 컴포넌트
 *
 * Provider 구조:
 * - ProductProvider: 전역 제품 데이터 캐싱 (모든 페이지)
 * - CartProvider: 장바구니 상태 관리
 * - TimelineProvider: 타임라인 슬라이더 상태
 *
 * 라우팅 구조:
 * - /admin/*: AuthProvider 적용 (인증 필요)
 * - /checkout: 독립 레이아웃
 * - /*: Public 페이지 (AuthProvider 미적용)
 */
function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <TimelineProvider initialTimeline={0}>
          <BrowserRouter>
            <Routes>
              {/* Admin Routes - AuthProvider 내부에서만 적용 */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* Checkout - 독립 레이아웃 (GNB 없음) */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Main - AppShell 레이아웃 (GNB 포함) */}
              <Route path="/*" element={<AppLayout />} />
            </Routes>
          </BrowserRouter>
        </TimelineProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
