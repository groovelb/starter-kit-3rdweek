import Box from '@mui/material/Box';

/**
 * SpacingBox 컴포넌트
 *
 * 스페이싱 값을 정육면체로 시각화하는 컴포넌트입니다.
 * 테이블 셀 안에서 사용하여 spacing 크기를 직관적으로 보여줍니다.
 *
 * Props:
 * @param {number} size - 박스 크기 (픽셀 값) [Required]
 * @param {string} color - 박스 색상 [Optional, 기본값: 'primary.main']
 * @param {number} maxSize - 최대 박스 크기 [Optional, 기본값: 80]
 *
 * Example usage:
 * <SpacingBox size={16} />
 * <SpacingBox size={24} color="secondary.main" />
 */
export const SpacingBox = ({
  size,
  color = 'primary.main',
  maxSize = 80,
}) => {
  const boxSize = Math.max(4, Math.min(size, maxSize));

  return (
    <Box
      sx={ {
        width: boxSize,
        height: boxSize,
        backgroundColor: color,
        minWidth: size > 0 ? 4 : 0,
        minHeight: size > 0 ? 4 : 0,
      } }
    />
  );
};

export default SpacingBox;
