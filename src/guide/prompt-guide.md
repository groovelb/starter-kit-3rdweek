# Prompt Guide

---

## Media

### TimeBlendImage

Box를 사용해서 낮/밤 이미지 블렌딩 컴포넌트를 만들어줘. 두 개의 img를 absolute로 겹쳐서 timeline 값(0~1)에 따라 opacity를 조절해줘. 0이면 낮 이미지만, 1이면 밤 이미지만 보이게.

---

## Shared

### TimelineSlider

Slider와 Typography, lucide-react 아이콘(Sun, Sunset, Moon)을 사용해서 시간대 슬라이더를 만들어줘. 4개 지점(12pm, 4pm, 8pm, 12am)에 스냅되고, useTimeline 훅으로 전역 상태와 연동해줘.

### MinimalTimelineSlider

Box와 lucide-react 아이콘(Sun, Sunset, Moon)을 사용해서 헤더용 초소형 타임라인 슬라이더를 만들어줘. 아이콘 클릭으로 시간대 이동하고, 1px 축 라인과 틱 마커로 현재 위치를 표시해줘. useTimeline 훅으로 전역 상태와 연동해줘.

### ScrollVideo

VideoScrubbing과 TimelineSlider, Typography를 사용해서 스크롤 비디오 컴포넌트를 만들어줘. 스크롤 위치에 따라 비디오 프레임이 변하고, 하단에 시간 오버레이를 표시해줘.

---

## Card

### BrandValueCard

CustomCard와 Stack, Typography, lucide-react 아이콘을 사용해서 브랜드 가치 카드를 만들어줘. @src/data/content.js의 brandValue.features 배열에서 icon, title, description, detailedDescription 값을 사용해줘. CustomCard는 variant="ghost", contentPadding="md"로 설정해줘.

### ProductCard

CustomCard와 TimeBlendImage, Stack, Typography를 사용해서 제품 카드를 만들어줘. @src/data/products.js의 products 배열에서 title, type, lux, kelvin, images 값을 사용해줘. TimeBlendImage에 images[0]을 dayImage, images[1]을 nightImage로 전달하고, CustomCard는 layout="vertical", mediaRatio="auto", variant="ghost"로 설정해줘.

---

## Product

### ProductSpecCard

Box와 Typography, lucide-react 아이콘을 사용해서 제품 스펙 카드를 만들어줘. 아이콘 + 라벨(caption) + 값(monospace)을 세로로 배치해줘. LineGrid 내부에서 구분선과 함께 사용돼.

### ProductOptions

Stack과 UnderlineSelect를 사용해서 제품 옵션 선택 영역을 만들어줘. @src/data/products.js의 PRODUCT_OPTIONS에서 glassFinish, hardware, height 배열을 각 UnderlineSelect의 options로 전달해줘.

### ProductMeta

Box와 UnderlineInput을 사용해서 제품 메타 정보를 표시해줘. itemNumber, leadTime, shipDate를 각각 UnderlineInput readOnly로 표시해줘.

### ProductActions

Box와 Button, Typography, QuantitySelector를 사용해서 제품 액션 영역을 만들어줘. 수량 선택, 총 가격 표시, Add to Cart 버튼을 가로로 배치해줘.

### ProductGallery

Box와 Stack, TimeBlendImage를 사용해서 제품 이미지 갤러리를 만들어줘. 메인 이미지 + 썸네일 스트립 형태로, timeline 값에 따라 낮/밤 이미지 블렌딩을 지원해줘. 페이지네이션 인디케이터로 현재 위치를 표시해줘.

### ProductTabs

Box와 Typography, Divider를 사용해서 제품 정보 탭 메뉴를 만들어줘. 세로/가로 방향 지원하고, Overview/Description/Tech Specs 등 탭 목록을 props로 받아서 렌더링해줘.

### ProductImageViewer

Box와 Typography, TimeBlendImage, TimelineSlider를 사용해서 제품 이미지 뷰어를 만들어줘. 배경에 낮/밤 블렌딩 이미지, 하단에 그래디언트 오버레이와 슬라이더를 표시해줘. 우측 상단에 lux·K 값을 monospace로 표시해줘.

### ProductFilter

Tabs와 Tab, Box를 사용해서 제품 타입 필터를 만들어줘. @src/data/products.js의 PRODUCT_TYPES에서 CEILING, STAND, WALL, DESK 값을 사용하고, 세로 탭 형태로 All/Ceiling/Stand/Wall/Desk 필터를 표시해줘.

---

## Cart

### CartHeader

Box와 Typography, IconButton, @mui/icons-material Close 아이콘을 사용해서 장바구니 헤더를 만들어줘. 좌측에 "Cart" 타이틀, 우측에 X 닫기 버튼을 배치해줘.

### CartItem

Box와 Typography, ButtonBase, QuantitySelector를 사용해서 장바구니 아이템을 만들어줘. 썸네일(100x100) + 제품명 + 옵션 목록 + 가격 + 수량 조절 + Remove 버튼을 배치해줘.

### CartSummary

Box와 Typography를 사용해서 장바구니 요약을 만들어줘. "Subtotal" 라벨과 총 금액을 좌우로 배치해줘. 금액은 monospace로 표시해줘.

### CartCheckoutButton

Box와 Button을 사용해서 체크아웃 버튼을 만들어줘. 전체 너비의 contained 버튼으로, secondary.main 배경색을 사용해줘.

### CartDrawer

Drawer와 Box, Typography, Divider, CartHeader, CartItem, CartSummary, CartCheckoutButton을 사용해서 장바구니 슬라이드 패널을 만들어줘. 오른쪽에서 슬라이드 인/아웃되고, 상단에 헤더, 중간에 아이템 리스트(스크롤), 하단에 요약과 버튼을 배치해줘.

---

## Navigation

### GNB

Box와 Typography, IconButton, Badge, lucide-react ShoppingBag 아이콘을 사용해서 글로벌 네비게이션 바를 만들어줘. @src/data/content.js의 brand.name을 로고로 표시하고, useCart 훅에서 totalItems를 Badge로 표시해줘.

### Footer

Stack과 Typography, InputBase, IconButton, lucide-react 아이콘(ArrowRight, Instagram, Twitter)을 사용해서 푸터를 만들어줘. @src/data/content.js의 brand.name, brand.tagline, footer.copyright 값을 사용하고, 뉴스레터 이메일 입력 폼을 포함해줘.

### AppShell

Box와 GNB, Footer를 사용해서 앱 레이아웃 쉘을 만들어줘. 상단에 GNB, 중간에 메인 콘텐츠(children), 하단에 Footer를 배치해줘. GNB는 sticky 옵션을 지원해줘.

---

## Template

### ProductHeroTemplate

Box와 Grid, Typography, LineGrid, ProductSpecCard, lucide-react 아이콘(Lamp, LampCeiling, LampDesk, LampFloor, Sun, SlidersHorizontal)을 사용해서 제품 히어로 영역 템플릿을 만들어줘. 제품명(h2), 설명, 3열 스펙 카드(타입/Lux/Kelvin)를 세로로 배치해줘.

### ProductInfoTemplate

Box와 ProductMeta, ProductOptions, ProductActions를 사용해서 제품 정보 영역 템플릿을 만들어줘. 메타 정보(품번, 리드타임, 배송일) + 옵션 선택 + 액션 영역을 세로로 배치해줘.

### ProductGrid

Grid와 ProductCard를 사용해서 제품 그리드 템플릿을 만들어줘. @src/data/products.js의 products 배열을 순회해서 ProductCard를 배치해줘. Grid size는 xs: 6, sm: 4, md: 3으로 설정해줘.

### ProductDetailTemplate

SplitScreen과 Stack, ProductHeroTemplate, ProductInfoTemplate, ProductImageViewer를 사용해서 제품 상세 템플릿을 만들어줘. @src/data/products.js의 products 배열에서 title, description, type, lux, kelvin, images, price 값을 사용해줘. SplitScreen은 ratio="50:50", stackAt="md", stackOrder="reverse"로 설정해줘.

### CheckoutTemplate

Box와 CheckoutLayout, CheckoutLogo, CheckoutSteps, ExpressCheckout, ContactForm, ShippingForm, CheckoutActions, PolicyLinks, OrderSummary를 사용해서 체크아웃 템플릿을 만들어줘. 좌측에 폼 영역(로고, 단계, 빠른결제, 연락처, 배송지, 액션, 정책), 우측에 주문 요약을 배치해줘.

---

## Section

### HeroSection

LineGrid와 Grid, ScrollVideo, Typography를 사용해서 히어로 섹션을 만들어줘. @src/data/content.js의 hero.videos.row1Col1과 hero.videos.row1Col2 비디오를 사용하고, hero.title과 hero.subtitle을 오버레이로 표시해줘. Grid 비율은 8:4로 설정해줘.

### BrandValueSection

LineGrid와 Grid, BrandValueCard를 사용해서 브랜드 가치 섹션을 만들어줘. @src/data/content.js의 brandValue.features 배열을 순회해서 3개의 BrandValueCard를 배치해줘. Grid size는 xs: 12, md: 4로 설정해줘.

### TopSection

LineGrid와 HeroSection, BrandValueSection을 사용해서 상단 섹션을 만들어줘. Row 1에 HeroSection(8:4 비디오), Row 2에 BrandValueSection(4:4:4 카드)을 배치해줘.

### ProductShowcase

SectionContainer와 TimelineSlider, ProductGallery를 사용해서 제품 쇼케이스 섹션을 만들어줘. @src/data/content.js의 products.sectionTitle, products.sectionSubtitle을 헤더에 표시하고, @src/data/products.js의 products 배열을 ProductGallery에 전달해줘.

### ProductDetailSection

SectionContainer와 ProductDetailTemplate, CartDrawer를 사용해서 제품 상세 섹션을 만들어줘. useCart 훅으로 장바구니 상태를 연동하고, 장바구니 추가 시 CartDrawer를 자동으로 열어줘.

### CheckoutSection

CheckoutTemplate과 useCart를 사용해서 체크아웃 섹션을 만들어줘. CartContext에서 items, subtotal을 가져오고, Contact/Shipping 폼 상태를 관리해줘.

---

## Page

### LandingPage

HeroSection, ProductShowcase, BrandValueSection을 순서대로 배치해서 랜딩 페이지를 만들어줘. @src/data/content.js와 @src/data/products.js 데이터를 사용해줘.

### ProductDetailPage

ProductDetailSection을 사용해서 제품 상세 페이지를 만들어줘. URL의 productId 파라미터로 @src/data/products.js의 products 배열에서 해당 제품을 찾아서 전달해줘.

### CheckoutPage

CheckoutSection을 사용해서 체크아웃 페이지를 만들어줘. GNB 없이 독립적인 체크아웃 플로우로 구성해줘.
