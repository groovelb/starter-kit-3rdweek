import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import UnderlineInput from '../shared/UnderlineInput';

/**
 * ContactForm 컴포넌트
 *
 * 연락처 정보 폼. 이메일 입력 + 뉴스레터 체크박스 + 로그인 링크.
 *
 * Props:
 * @param {string} email - 이메일 값 [Optional]
 * @param {boolean} newsletter - 뉴스레터 구독 여부 [Optional, 기본값: false]
 * @param {function} onEmailChange - 이메일 변경 핸들러 (email) => void [Optional]
 * @param {function} onNewsletterChange - 뉴스레터 변경 핸들러 (checked) => void [Optional]
 * @param {function} onSignIn - 로그인 클릭 핸들러 [Optional]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ContactForm
 *   email={email}
 *   newsletter={newsletter}
 *   onEmailChange={setEmail}
 *   onNewsletterChange={setNewsletter}
 *   onSignIn={() => navigate('/login')}
 * />
 */
const ContactForm = forwardRef(function ContactForm(
  {
    email = '',
    newsletter = false,
    onEmailChange,
    onNewsletterChange,
    onSignIn,
    sx = {},
    ...props
  },
  ref
) {
  return (
    <Box ref={ref} sx={{ mb: 4, ...sx }} {...props}>
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          연락처
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={onSignIn}
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          로그인
        </Link>
      </Box>

      {/* 이메일 입력 */}
      <UnderlineInput
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => onEmailChange?.(e.target.value)}
        placeholder="이메일을 입력하세요"
        sx={{ mb: 2 }}
      />

      {/* 뉴스레터 체크박스 */}
      <FormControlLabel
        control={
          <Checkbox
            checked={newsletter}
            onChange={(e) => onNewsletterChange?.(e.target.checked)}
            size="small"
          />
        }
        label={
          <Typography variant="body2">
            뉴스 및 혜택 이메일 수신
          </Typography>
        }
      />
    </Box>
  );
});

export { ContactForm };
export default ContactForm;
