import { forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as LucideIcons from "lucide-react";
import { CustomCard } from "./CustomCard";

/**
 * BrandValueCard 컴포넌트
 *
 * 브랜드 가치를 아이콘, 제목, 설명으로 표현하는 카드 컴포넌트.
 * CustomCard를 활용한 수직 레이아웃.
 *
 * 동작 방식:
 * 1. icon prop에 해당하는 lucide-react 아이콘을 동적으로 로드
 * 2. 아이콘 → 제목+설명 → 상세 설명 순서로 Stack 배치
 * 3. CustomCard의 contentPadding으로 패딩 관리
 *
 * Props:
 * @param {string} icon - lucide-react 아이콘 이름 (예: 'Sun', 'Moon', 'CircleDot') [Required]
 * @param {string} title - 브랜드 가치 제목 [Required]
 * @param {string} description - 짧은 설명 [Required]
 * @param {string} detailedDescription - 상세 설명 [Optional]
 * @param {number} iconSize - 아이콘 크기 (px) [Optional, 기본값: 32]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <BrandValueCard
 *   icon="Sun"
 *   title="Immanence"
 *   description="Light quietly residing within the space."
 *   detailedDescription="Our luminaires merge with architecture..."
 * />
 */
const BrandValueCard = forwardRef(function BrandValueCard(
	{
		icon,
		title,
		description,
		detailedDescription,
		iconSize = 32,
		sx,
		...props
	},
	ref
) {
	// lucide-react 아이콘 동적 로드
	const IconComponent = LucideIcons[icon];

	return (
		<CustomCard
			ref={ref}
			variant="ghost"
			contentPadding="md"
			sx={sx}
			{...props}
		>
			<Stack spacing={6} py={4}>
				{/* 아이콘 */}
				{IconComponent && (
					<IconComponent
						size={iconSize}
						strokeWidth={1.5}
						color="currentColor"
					/>
				)}

				{/* 제목 + 짧은 설명 */}
				<Stack spacing={0}>
					<Typography
						variant="h5"
						sx={{
							fontWeight: 600,
							color: "text.primary",
						}}
					>
						{title}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							fontSize: "20px",
							color: "text.secondary",
						}}
					>
						{description}
					</Typography>
				</Stack>

				{/* 상세 설명 */}
				{detailedDescription && (
					<Typography
						variant="body1"
						sx={{
							color: "text.secondary",
							lineHeight: 1.6,
						}}
					>
						{detailedDescription}
					</Typography>
				)}
			</Stack>
		</CustomCard>
	);
});

export { BrandValueCard };
export default BrandValueCard;
