import { forwardRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { content } from '../../data/content';

/**
 * CheckoutLogo 컴포넌트
 *
 * 체크아웃 페이지 상단 로고.
 * content.js에서 브랜드명을 가져옴.
 *
 * Props:
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <CheckoutLogo />
 */
const CheckoutLogo = forwardRef(function CheckoutLogo(
  { sx = {}, ...props },
  ref
) {
  const brandName = content.brand.name;

  return (
    <Box
      ref={ref}
      sx={{
        textAlign: 'center',
        mb: 2,
        ...sx,
      }}
      {...props}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
        }}
      >
        {brandName}
      </Typography>
    </Box>
  );
});

export { CheckoutLogo };
export default CheckoutLogo;
