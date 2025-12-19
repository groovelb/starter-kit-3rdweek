import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default {
  title: 'MUI Component/Input/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## TextField

사용자 텍스트 입력을 받는 폼 컴포넌트입니다.

### 사용 패턴

| 패턴 | 설명 | 예시 |
|------|------|------|
| Outlined | 테두리 스타일 (기본) | \`variant="outlined"\` |
| Filled | 배경색 스타일 | \`variant="filled"\` |
| Standard | 언더라인 스타일 | \`variant="standard"\` |
| Multiline | 여러 줄 입력 | \`multiline rows={4}\` |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: '입력 필드의 시각적 스타일을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: '입력 필드의 크기를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: '포커스 시 색상을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드를 비활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 필드로 표시합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: '에러 상태를 표시합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비로 확장합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '입력 필드의 라벨입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: '입력 필드 아래 도움말 텍스트입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

/** 기본 텍스트 필드 */
export const Default = {
  args: {
    label: '라벨',
    placeholder: '텍스트를 입력하세요',
  },
};

/** Variant 비교 */
export const AllVariants = {
  render: () => (
    <Stack spacing={ 3 } sx={ { width: 300 } }>
      <TextField label="Outlined" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />
    </Stack>
  ),
};

/** 크기 비교 */
export const Sizes = {
  render: () => (
    <Stack spacing={ 3 } direction="row" alignItems="center">
      <TextField label="Small" size="small" />
      <TextField label="Medium" size="medium" />
    </Stack>
  ),
};

/** 필수 입력 */
export const Required = {
  args: {
    label: '이름',
    required: true,
    helperText: '필수 입력 항목입니다',
  },
};

/** 에러 상태 */
export const Error = {
  render: () => (
    <Stack spacing={ 3 } sx={ { width: 300 } }>
      <TextField
        label="이메일"
        error
        helperText="올바른 이메일 형식이 아닙니다"
        defaultValue="invalid-email"
      />
      <TextField
        label="비밀번호"
        type="password"
        error
        helperText="비밀번호는 8자 이상이어야 합니다"
      />
    </Stack>
  ),
};

/** 비활성화 & 읽기 전용 */
export const DisabledAndReadOnly = {
  render: () => (
    <Stack spacing={ 3 } sx={ { width: 300 } }>
      <TextField
        label="Disabled"
        defaultValue="비활성화된 입력"
        disabled
      />
      <TextField
        label="Read Only"
        defaultValue="읽기 전용 입력"
        slotProps={ {
          input: {
            readOnly: true,
          },
        } }
      />
    </Stack>
  ),
};

/** 여러 줄 입력 (Multiline) */
export const Multiline = {
  render: () => (
    <Stack spacing={ 3 } sx={ { width: 400 } }>
      <TextField
        label="기본 멀티라인"
        multiline
        rows={ 4 }
        placeholder="여러 줄의 텍스트를 입력하세요"
      />
      <TextField
        label="자동 높이 조절"
        multiline
        minRows={ 2 }
        maxRows={ 6 }
        placeholder="내용에 따라 높이가 자동으로 조절됩니다"
      />
    </Stack>
  ),
};

/** 입력 타입 */
export const InputTypes = {
  render: () => (
    <Stack spacing={ 3 } sx={ { width: 300 } }>
      <TextField label="텍스트" type="text" />
      <TextField label="비밀번호" type="password" />
      <TextField label="이메일" type="email" />
      <TextField label="숫자" type="number" />
      <TextField label="날짜" type="date" slotProps={ { inputLabel: { shrink: true } } } />
      <TextField label="시간" type="time" slotProps={ { inputLabel: { shrink: true } } } />
    </Stack>
  ),
};

/** Adornment (접두/접미 요소) */
export const WithAdornments = {
  render: () => (
    <Stack spacing={ 3 } sx={ { width: 300 } }>
      <TextField
        label="금액"
        slotProps={ {
          input: {
            startAdornment: <InputAdornment position="start">₩</InputAdornment>,
          },
        } }
      />
      <TextField
        label="무게"
        slotProps={ {
          input: {
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        } }
      />
      <TextField
        label="비밀번호"
        type="password"
        slotProps={ {
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="small">
                  <Box component="span" sx={ { fontSize: 16 } }>👁</Box>
                </IconButton>
              </InputAdornment>
            ),
          },
        } }
      />
    </Stack>
  ),
};

/** 색상 변형 */
export const Colors = {
  render: () => (
    <Stack spacing={ 3 } sx={ { width: 300 } }>
      <TextField label="Primary" color="primary" focused />
      <TextField label="Secondary" color="secondary" focused />
      <TextField label="Success" color="success" focused />
      <TextField label="Warning" color="warning" focused />
    </Stack>
  ),
};

/** 전체 너비 */
export const FullWidth = {
  render: () => (
    <Box sx={ { width: 400 } }>
      <TextField
        label="전체 너비"
        fullWidth
        helperText="부모 요소의 전체 너비를 차지합니다"
      />
    </Box>
  ),
};

/** 폼 예시 - 로그인 */
export const LoginForm = {
  render: () => (
    <Box
      component="form"
      sx={ {
        width: 360,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        bgcolor: 'background.paper',
        boxShadow: 1,
      } }
    >
      <Typography variant="h5" sx={ { fontWeight: 700, mb: 1 } }>
        로그인
      </Typography>
      <TextField
        label="이메일"
        type="email"
        required
        fullWidth
        placeholder="example@email.com"
      />
      <TextField
        label="비밀번호"
        type="password"
        required
        fullWidth
        placeholder="비밀번호를 입력하세요"
      />
      <Typography variant="caption" color="text.secondary">
        * 필수 입력 항목
      </Typography>
    </Box>
  ),
};

/** 폼 예시 - 회원가입 */
export const SignupForm = {
  render: () => (
    <Box
      component="form"
      sx={ {
        width: 400,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        bgcolor: 'background.paper',
        boxShadow: 1,
      } }
    >
      <Typography variant="h5" sx={ { fontWeight: 700, mb: 1 } }>
        회원가입
      </Typography>
      <TextField
        label="이름"
        required
        fullWidth
        helperText="실명을 입력해주세요"
      />
      <TextField
        label="이메일"
        type="email"
        required
        fullWidth
        helperText="인증 메일이 발송됩니다"
      />
      <TextField
        label="비밀번호"
        type="password"
        required
        fullWidth
        helperText="8자 이상, 영문/숫자/특수문자 포함"
      />
      <TextField
        label="비밀번호 확인"
        type="password"
        required
        fullWidth
      />
      <TextField
        label="자기소개"
        multiline
        rows={ 3 }
        fullWidth
        placeholder="간단한 자기소개를 작성해주세요 (선택)"
      />
    </Box>
  ),
};
