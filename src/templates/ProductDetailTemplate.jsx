import { forwardRef, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SplitScreen } from "../components/layout/SplitScreen";
import ProductImageViewer from "../components/product/ProductImageViewer";
import { ProductHeroTemplate } from "./ProductHeroTemplate";
import { ProductInfoTemplate } from "./ProductInfoTemplate";
import { useCart } from "../context/CartContext";

/**
 * ProductDetailTemplate 컴포넌트
 *
 * 제품 상세 페이지 템플릿. SplitScreen 50:50 분할 레이아웃.
 * 왼쪽 영역은 HeroStack으로 제품명을 수직 가운데 정렬.
 *
 * 레이아웃 (SplitScreen + HeroStack):
 * - left (50%):
 *   - Hero: 제품명, Lux/Kelvin (수직 가운데 정렬)
 *   - Footer: Meta, Options, Actions
 * - right (50%): ProductImageViewer (이미지 + 타임라인 슬라이더)
 *
 * Props:
 * @param {object} product - 제품 데이터 (products.js 구조) [Required]
 *   - { id, title, type, lux, kelvin, images, video, price }
 * @param {object} meta - 제품 메타 정보 [Optional]
 *   - { itemNumber, leadTime, shipDate }
 * @param {function} onAddToCart - 장바구니 추가 핸들러 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductDetailTemplate
 *   product={products[0]}
 *   meta={{ itemNumber: 'LM-001', leadTime: '4 Weeks' }}
 *   onAddToCart={(quantity) => console.log(quantity)}
 * />
 */
const ProductDetailTemplate = forwardRef(function ProductDetailTemplate(
	{ product = {}, meta = {}, onAddToCart, sx = {}, ...props },
	ref
) {
	const { addItem } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [options, setOptions] = useState({
		glassFinish: "opaline",
		hardware: "patina-brass",
		height: "61-72",
	});

	// 이미지 배열 생성
	const images = product.images || [];

	/**
	 * 옵션 변경 핸들러
	 */
	const handleOptionChange = (key, value) => {
		setOptions((prev) => ({ ...prev, [key]: value }));
	};

	/**
	 * 장바구니 추가 핸들러
	 */
	const handleAddToCart = (qty, opts) => {
		// CartContext에 아이템 추가
		addItem(product, opts, qty);

		// 외부 핸들러도 호출 (있는 경우)
		if (onAddToCart) {
			onAddToCart(qty, opts);
		}
	};

	return (
		<SplitScreen
			ref={ref}
			ratio="50:50"
			gap={4}
			stackAt="md"
			stackOrder="reverse"
			sx={sx}
			left={
				<Stack
					spacing={24}
					sx={{
						p: { xs: 3, md: 5 },
						justifyContent: "center",
					}}
				>
					<ProductHeroTemplate
						title={product.title}
						description={product.description}
						type={product.type}
						lux={product.lux}
						kelvin={product.kelvin}
					/>
					<ProductInfoTemplate
						meta={meta}
						price={product.price || 0}
						currency={product.currency || "USD"}
						options={options}
						onOptionChange={handleOptionChange}
						quantity={quantity}
						onQuantityChange={setQuantity}
						size="large"
						onAddToCart={handleAddToCart}
					/>
				</Stack>
			}
			right={
				<Box
					sx={{
						position: { md: "sticky" },
						top: { md: 0 },
						height: { md: "100vh" },
					}}
				>
					<ProductImageViewer
						images={images}
						lux={product.lux}
						kelvin={product.kelvin}
						productName={product.title}
					/>
				</Box>
			}
			{...props}
		/>
	);
});

export { ProductDetailTemplate };
export default ProductDetailTemplate;
