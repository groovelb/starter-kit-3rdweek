import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  TreeNode,
} from '../../components/storybookDocumentation';

export default {
  title: 'Overview/Component Structure',
  parameters: {
    layout: 'padded',
  },
};

/** 컴포넌트 구조 */
export const Doc = {
  render: () => {
    const structure = {
      LandingPage: {
        TopSection: {
          HeroSection: {
            ScrollVideo: '스크롤 연동 비디오',
            TimelineSlider: '타임라인 슬라이더',
          },
          BrandValueSection: {
            BrandValueCard: '브랜드 가치 카드 ×3',
          },
        },
        ProductShowcase: {
          TimelineSlider: '타임라인 슬라이더',
          ProductGallery: {
            ProductFilter: '제품 필터 (타입별)',
            ProductGrid: {
              ProductCard: '제품 카드 ×N',
            },
          },
        },
      },
      ProductDetailPage: {
        ProductDetailSection: {
          ProductDetailTemplate: {
            ProductHeroTemplate: {
              ProductSpecCard: '스펙 카드 ×3',
            },
            ProductInfoTemplate: {
              ProductMeta: '제품 메타 정보',
              ProductOptions: '옵션 선택',
              ProductActions: '장바구니 추가',
            },
            ProductImageViewer: {
              TimeBlendImage: '낮/밤 블렌딩 이미지',
              TimelineSlider: '타임라인 슬라이더',
            },
          },
          CartDrawer: {
            CartHeader: '헤더',
            CartItem: '장바구니 아이템',
            CartSummary: '합계',
            CartCheckoutButton: '체크아웃 버튼',
          },
        },
      },
      CheckoutPage: {
        CheckoutSection: {
          CheckoutTemplate: {
            CheckoutSteps: '단계 표시',
            ExpressCheckout: '빠른 결제',
            ContactForm: '연락처 폼',
            ShippingForm: '배송지 폼',
            OrderSummary: '주문 요약',
          },
        },
      },
    };

    return (
      <>
        <DocumentTitle
          title="Component Structure"
          status="Available"
          note="Design system usage overview"
          brandName="Lumenstate"
          systemName="Starter Kit"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            컴포넌트 구조
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            클릭하여 펼치기/접기 | 페이지별 디자인 시스템 활용 현황
          </Typography>

          <SectionTitle title="페이지별 구조" />
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Box sx={{ fontFamily: 'monospace' }}>
              {Object.entries(structure).map(([key, value]) => (
                <TreeNode
                  key={key}
                  keyName={key}
                  value={value}
                  depth={0}
                  defaultOpen={true}
                />
              ))}
            </Box>
          </Box>
        </PageContainer>
      </>
    );
  },
};
