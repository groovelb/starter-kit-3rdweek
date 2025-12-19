# Components

---

## Part 1: Starter-Kit (범용)

브랜드 독립적인 재사용 가능한 기본 UI 컴포넌트. 어떤 프로젝트에서도 확장/재사용 가능.

### Layout

- PhiSplit: 황금비 분할 레이아웃 (`components/layout/PhiSplit.jsx`)
- SplitScreen: 좌우 분할 레이아웃. ratio, stackAt, stackOrder 지원 (`components/layout/SplitScreen.jsx`)
- HeroStack: 수직 레이아웃. Hero(중앙) + Footer(하단) flex-grow 패턴 (`components/layout/HeroStack.jsx`)
- LineGrid: 그리드 아이템 사이 1px 라인 자동 삽입 (`components/layout/LineGrid.jsx`)
- CenteredAsideLayout: 중앙 + 사이드 레이아웃 (`components/layout/CenteredAsideLayout.jsx`)
- BentoGrid: 벤토 그리드 레이아웃 (`components/layout/BentoGrid.jsx`)
- RatioContainer: 비율 기반 컨테이너 (`components/layout/RatioContainer.jsx`)
- FullPageContainer: 전체 페이지 컨테이너 (`components/layout/FullPageContainer.jsx`)

### Container

- PageContainer: 반응형 페이지 컨테이너. PC maxWidth 고정, 모바일 100% (`components/container/PageContainer.jsx`)
- SectionContainer: 섹션 컨테이너 (`components/container/SectionContainer.jsx`)
- CarouselContainer: 캐로셀 컨테이너 (`components/container/CarouselContainer.jsx`)

### Card

- CardContainer: 카드 기본 컨테이너. variant, padding, elevation (`components/card/CardContainer.jsx`)
- CustomCard: 미디어+콘텐츠 카드. vertical/horizontal/overlay 레이아웃 (`components/card/CustomCard.jsx`)

### Input

- FileDropzone: 파일 드래그&드롭 영역 (`components/input/FileDropzone.jsx`)
- SearchBar: 검색 입력 바 (`components/input/SearchBar.jsx`)
- TagInput: 태그 입력 필드 (`components/input/TagInput.jsx`)
- UnderlineInput: 밑줄만 있는 텍스트 인풋. size(small/medium/large) (`components/shared/UnderlineInput.jsx`)
- UnderlineSelect: 밑줄만 있는 셀렉트. MUI Select 기반 (`components/shared/UnderlineSelect.jsx`)

### Media

- AspectMedia: 비율 기반 미디어 컨테이너 (`components/media/AspectMedia.jsx`)
- ImageCarousel: 이미지 캐로셀 (`components/media/ImageCarousel.jsx`)
- ImageTransition: 이미지 트랜지션 효과 (`components/media/ImageTransition.jsx`)
- VideoScrubbing: 비디오 스크러빙 (`components/media/VideoScrubbing.jsx`)
- CarouselIndicator: 캐로셀 인디케이터 (`components/media/CarouselIndicator.jsx`)

### Navigation

- NavMenu: 네비게이션 메뉴 (`components/navigation/NavMenu.jsx`)
- CategoryTab: 카테고리 탭 (`components/navigation/CategoryTab.jsx`)

### Typography

- FitText: 컨테이너에 맞춤 텍스트 (`components/typography/FitText.jsx`)
- HighlightedTypography: 하이라이트 타이포그래피 (`components/typography/HighlightedTypography.jsx`)
- InlineTypography: 인라인 타이포그래피 (`components/typography/InlineTypography.jsx`)
- StretchedHeadline: 스트레치 헤드라인 (`components/typography/StretchedHeadline.jsx`)
- StyledParagraph: 스타일드 문단 (`components/typography/StyledParagraph.jsx`)
- Title: 타이틀 컴포넌트 (`components/typography/Title.jsx`)
- QuotedContainer: 인용 컨테이너 (`components/typography/QuotedContainer.jsx`)

### Shared (범용)

- QuantitySelector: 수량 선택기. - / + 버튼과 숫자 표시 (`components/shared/QuantitySelector.jsx`)
- SelectField: 드롭다운 선택 필드. 라벨 + 선택값 + 화살표 (`components/shared/SelectField.jsx`)
- Breadcrumb: 네비게이션 경로 표시 (`components/shared/Breadcrumb.jsx`)
- ArrowLink: 화살표 링크. → 아이콘 + 텍스트 (`components/shared/ArrowLink.jsx`)

---

## Part 2: Lumenstate Brand (브랜드 전용)

환경 반응형 조명 브랜드 Lumenstate 전용 컴포넌트. 타임라인 기반 조도/색온도 시스템.

### Context

- TimelineContext: 시간대 값(0-1) 전역 상태 관리. useTimeline 훅 (`hooks/useTimeline.jsx`)
- CartContext: 장바구니 상태 관리. useCart 훅 (items, addItem, removeItem, updateQuantity) (`context/CartContext.jsx`)

### Shared (Lumenstate 전용)

- TimelineSlider: 4단계 시간대 슬라이더 (12pm→4pm→8pm→12am) (`components/shared/TimelineSlider.jsx`)
- MinimalTimelineSlider: 헤더용 간소화 타임라인 슬라이더 (`components/shared/MinimalTimelineSlider.jsx`)
- ScrollVideo: 스크롤 위치 기반 비디오 프레임 시킹 (`components/shared/ScrollVideo.jsx`)

### Media (Lumenstate 전용)

- TimeBlendImage: 타임라인 기반 낮/밤 이미지 크로스페이드 블렌딩 (`components/media/TimeBlendImage.jsx`)

### Product

- ProductCard: 제품 카드. 타임라인 기반 낮/밤 블렌딩, 타입 태그, 상태 라벨 (`components/product/ProductCard.jsx`)
- ProductGallery: 제품 이미지 갤러리. 메인 이미지 + 페이지네이션 (`components/product/ProductGallery.jsx`)
- ProductOptions: 제품 옵션 선택 (Glass Finish, Hardware, OAH) (`components/product/ProductOptions.jsx`)
- ProductMeta: 제품 메타 정보 (Item Number, Lead Time, Est. Ship Date) (`components/product/ProductMeta.jsx`)
- ProductActions: 제품 액션 영역 (수량 + 가격 + Add to Cart) (`components/product/ProductActions.jsx`)
- ProductTabs: 제품 정보 탭 (Overview, Description, Tech Specs) (`components/product/ProductTabs.jsx`)
- ProductImageViewer: 제품 이미지 뷰어 (`components/product/ProductImageViewer.jsx`)
- ProductSpecCard: 제품 스펙 카드 (`components/product/ProductSpecCard.jsx`)
- ProductFilter: 제품 타입 필터 (All/Ceiling/Stand/Wall/Desk) (`components/navigation/ProductFilter.jsx`)

### Card (Lumenstate 전용)

- BrandValueCard: 브랜드 가치 카드 (아이콘 + 타이틀 + 설명) (`components/card/BrandValueCard.jsx`)

### Cart

- CartDrawer: 장바구니 슬라이드 패널. MUI Drawer 기반 (`components/cart/CartDrawer.jsx`)
- CartHeader: 장바구니 헤더. "Cart" 타이틀 + Close 버튼 (`components/cart/CartHeader.jsx`)
- CartItem: 장바구니 아이템. 썸네일 + 제품명 + 옵션 + 가격 + 수량 (`components/cart/CartItem.jsx`)
- CartSummary: 장바구니 요약. Subtotal 금액 (`components/cart/CartSummary.jsx`)
- CartCheckoutButton: 체크아웃 버튼 (`components/cart/CartCheckoutButton.jsx`)

### Checkout

- CheckoutLayout: 체크아웃 2컬럼 레이아웃 (좌: 폼, 우: 주문 요약) (`components/checkout/CheckoutLayout.jsx`)
- CheckoutLogo: 체크아웃 상단 브랜드 로고 (`components/checkout/CheckoutLogo.jsx`)
- CheckoutSteps: 체크아웃 단계 인디케이터 (`components/checkout/CheckoutSteps.jsx`)
- ExpressCheckout: 빠른 결제 옵션 (Shop Pay, Google Pay) (`components/checkout/ExpressCheckout.jsx`)
- ContactForm: 연락처 폼. Email + 뉴스레터 체크박스 (`components/checkout/ContactForm.jsx`)
- ShippingForm: 배송지 폼 (`components/checkout/ShippingForm.jsx`)
- CheckoutActions: 체크아웃 액션 버튼 (`components/checkout/CheckoutActions.jsx`)
- PolicyLinks: 정책 링크 (`components/checkout/PolicyLinks.jsx`)
- OrderItem: 주문 요약 아이템 (`components/checkout/OrderItem.jsx`)
- DiscountInput: 할인코드 입력 (`components/checkout/DiscountInput.jsx`)
- OrderSummary: 주문 요약 패널 (`components/checkout/OrderSummary.jsx`)

### Navigation (Lumenstate 전용)

- GNB: 글로벌 네비게이션 바. 로고 + Cart 아이콘 (뱃지) (`components/navigation/GNB.jsx`)
- AppShell: 앱 셸. GNB + Footer + 콘텐츠 영역 (`components/navigation/AppShell.jsx`)
- Footer: 푸터. 뉴스레터 구독 등 (`components/navigation/Footer.jsx`)

### Templates (Lumenstate 전용)

- ProductDetailTemplate: 제품 상세 페이지 템플릿. SplitScreen 50:50 분할 (`templates/ProductDetailTemplate.jsx`)
- ProductHeroTemplate: 제품 히어로 영역 템플릿 (제품명, 설명, 스펙) (`templates/ProductHeroTemplate.jsx`)
- ProductInfoTemplate: 제품 정보 영역 템플릿 (메타, 옵션, CTA) (`templates/ProductInfoTemplate.jsx`)
- ProductGallery: 제품 갤러리 템플릿 (`templates/ProductGallery.jsx`)
- ProductGrid: 제품 그리드 템플릿 (`templates/ProductGrid.jsx`)
- CheckoutTemplate: 체크아웃 페이지 템플릿 (`templates/CheckoutTemplate.jsx`)

### Sections (Lumenstate 전용)

- HeroSection: 히어로 섹션. 스크롤 비디오 + 타이틀 오버레이 (`sections/HeroSection.jsx`)
- ProductShowcase: 제품 쇼케이스 섹션. 타임라인 슬라이더 + 필터 + 그리드 (`sections/ProductShowcase.jsx`)
- BrandValueSection: 브랜드 가치 제안 섹션. 3컬럼 피처 그리드 (`sections/BrandValueSection.jsx`)
- TopSection: 상단 섹션 (`sections/TopSection.jsx`)
- ProductDetailSection: 제품 상세 섹션. ProductDetailTemplate + CartDrawer (`sections/ProductDetailSection.jsx`)
- CheckoutSection: 체크아웃 섹션. CheckoutTemplate + 폼 상태 관리 (`sections/CheckoutSection.jsx`)

### Pages (Lumenstate 전용)

- LandingPage: 랜딩 페이지. HeroSection + ProductShowcase + BrandValueSection (`pages/LandingPage.jsx`)
- ProductDetailPage: 제품 상세 페이지. ProductDetailSection (`pages/ProductDetailPage.jsx`)
- CheckoutPage: 체크아웃 페이지. CheckoutTemplate (`pages/CheckoutPage.jsx`)
