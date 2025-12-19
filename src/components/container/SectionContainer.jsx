import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

/**
 * SectionContainer
 *
 * 페이지 내의 각 섹션을 구분하는 컨테이너입니다.
 * xl(1536px) 최대 너비를 가지며, 그 이하에서는 반응형 좌우 패딩이 적용됩니다.
 * 화면 중앙에 정렬되며, Stack을 사용하여 children 간의 간격을 조정할 수 있습니다.
 *
 * @param {node} children - 콘텐츠
 * @param {number|object} spacing - children 간의 간격 (MUI spacing 단위) [Default: { xs: 4, md: 8 }]
 * @param {object} sx - 추가 스타일
 */
export const SectionContainer = ({ children, spacing = { xs: 4, md: 8 }, sx, ...props }) => {
  return (
    <Container
      component="section"
      maxWidth="xl"
      sx={{
        py: { xs: 4, md: 6 },
      }}
      {...props}
    >
      <Stack
        spacing={spacing}
        sx={sx}
      >
        {children}
      </Stack>
    </Container>
  );
};

