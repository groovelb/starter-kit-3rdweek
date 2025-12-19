import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * ProductSpecCard 컴포넌트
 *
 * 제품 스펙 정보를 아이콘 + 라벨 + 값 조합으로 표시하는 카드.
 * LineGrid 내부에서 사용하여 구분선과 함께 배치.
 *
 * Props:
 * @param {ReactNode} icon - lucide-react 아이콘 컴포넌트 [Required]
 * @param {string} label - 스펙 라벨 (예: "Type", "Luminance") [Required]
 * @param {string|number} value - 스펙 값 (예: "Ceiling", "260 lx") [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * import { Sun } from 'lucide-react';
 * <ProductSpecCard icon={<Sun size={20} strokeWidth={1.5} />} label="Luminance" value="260 lx" />
 */
function ProductSpecCard({ icon, label, value, sx = {} }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 1,
        py: 2,
        ...sx,
      }}
    >
      {/* 아이콘 */}
      <Box
        sx={{
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>

      {/* 라벨 + 값 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export { ProductSpecCard };
export default ProductSpecCard;
