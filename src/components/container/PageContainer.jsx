import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

/**
 * PageContainer
 *
 * 페이지의 메인 콘텐츠를 감싸는 컨테이너입니다.
 * 항상 화면 중앙에 정렬되며, children(섹션)들은 전체 너비를 사용합니다.
 * Stack을 사용하여 children 간의 간격을 조정할 수 있습니다.
 *
 * @param {node} children - 콘텐츠
 * @param {number|object} spacing - children 간의 간격 (MUI spacing 단위) [Default: 0]
 * @param {object} sx - 추가 스타일
 */
export const PageContainer = ({
  children,
  sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...sx,
      }}
      {...props}
    >
      <Stack
        spacing={16}
        alignItems="center"
        sx={{ width: '100%' }}
      >
        {children}
      </Stack>
    </Box>
  );
};

