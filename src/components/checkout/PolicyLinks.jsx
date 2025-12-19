import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

/**
 * PolicyLinks 컴포넌트
 *
 * 체크아웃 하단 정책 링크. Refund policy, Privacy policy, Terms of service.
 *
 * Props:
 * @param {Array} links - 링크 배열 [Optional]
 *   - [{ label: 'Refund policy', href: '/refund' }, ...]
 * @param {function} onLinkClick - 링크 클릭 핸들러 (link) => void [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <PolicyLinks onLinkClick={(link) => navigate(link.href)} />
 */

const DEFAULT_LINKS = [
  { id: 'refund', label: 'Refund policy', href: '/refund-policy' },
  { id: 'privacy', label: 'Privacy policy', href: '/privacy-policy' },
  { id: 'terms', label: 'Terms of service', href: '/terms-of-service' },
];

const PolicyLinks = forwardRef(function PolicyLinks(
  {
    links = DEFAULT_LINKS,
    onLinkClick,
    sx = {},
    ...props
  },
  ref
) {
  return (
    <Box ref={ref} sx={{ mt: 6, ...sx }} {...props}>
      <Divider sx={{ mb: 3 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {links.map((link) => (
          <Link
            key={link.id}
            component="button"
            variant="body2"
            onClick={() => onLinkClick?.(link)}
            sx={{
              color: 'text.secondary',
              textDecoration: 'underline',
              fontSize: '0.75rem',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            {link.label}
          </Link>
        ))}
      </Box>
    </Box>
  );
});

export { PolicyLinks };
export default PolicyLinks;
