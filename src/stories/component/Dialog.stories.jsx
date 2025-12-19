import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

export default {
  title: 'MUI Component/Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Dialog

모달 대화상자 컴포넌트입니다. 사용자의 주의를 집중시키고 중요한 정보나 결정을 요청할 때 사용합니다.

### 구성 요소

| 컴포넌트 | 설명 | 예시 |
|----------|------|------|
| Dialog | 대화상자 컨테이너 | \`<Dialog open={open}>...</Dialog>\` |
| DialogTitle | 제목 영역 | 대화상자 제목 |
| DialogContent | 내용 영역 | 본문, 폼 등 |
| DialogActions | 액션 버튼 영역 | 확인, 취소 버튼 |
        `,
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: '대화상자의 최대 너비를 설정합니다.',
      table: {
        type: { summary: 'string | false' },
        defaultValue: { summary: 'sm' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'maxWidth까지 전체 너비를 사용합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullScreen: {
      control: 'boolean',
      description: '전체 화면 대화상자로 표시합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    scroll: {
      control: 'select',
      options: ['paper', 'body'],
      description: '스크롤 동작을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'paper' },
      },
    },
  },
};

/** 기본 대화상자 */
export const Default = {
  args: {
    maxWidth: 'sm',
    fullWidth: false,
    fullScreen: false,
    scroll: 'paper',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="outlined" onClick={ () => setOpen(true) }>
          대화상자 열기
        </Button>
        <Dialog
          open={ open }
          onClose={ () => setOpen(false) }
          maxWidth={ args.maxWidth }
          fullWidth={ args.fullWidth }
          fullScreen={ args.fullScreen }
          scroll={ args.scroll }
        >
          <DialogTitle>기본 대화상자</DialogTitle>
          <DialogContent>
            <DialogContentText>
              대화상자는 사용자의 주의를 집중시키고 중요한 정보를 전달하거나
              결정을 요청할 때 사용합니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => setOpen(false) }>취소</Button>
            <Button onClick={ () => setOpen(false) } variant="contained">
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

/** 확인 대화상자 */
export const Confirmation = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" color="error" onClick={ () => setOpen(true) }>
          삭제하기
        </Button>
        <Dialog open={ open } onClose={ () => setOpen(false) }>
          <DialogTitle>항목을 삭제하시겠습니까?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              이 작업은 되돌릴 수 없습니다. 선택한 항목이 영구적으로 삭제됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => setOpen(false) }>취소</Button>
            <Button onClick={ () => setOpen(false) } color="error" variant="contained">
              삭제
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

/** 폼 대화상자 */
export const FormDialog = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={ () => setOpen(true) }>
          새 항목 추가
        </Button>
        <Dialog open={ open } onClose={ () => setOpen(false) } maxWidth="sm" fullWidth>
          <DialogTitle>새 항목 추가</DialogTitle>
          <DialogContent>
            <DialogContentText sx={ { mb: 2 } }>
              새로운 항목의 정보를 입력해주세요.
            </DialogContentText>
            <Stack spacing={ 2 }>
              <TextField
                autoFocus
                label="제목"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="설명"
                fullWidth
                multiline
                rows={ 3 }
                variant="outlined"
              />
              <TextField
                label="카테고리"
                fullWidth
                variant="outlined"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => setOpen(false) }>취소</Button>
            <Button onClick={ () => setOpen(false) } variant="contained">
              추가
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

/** 알림 대화상자 */
export const Alert = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="outlined" color="warning" onClick={ () => setOpen(true) }>
          경고 표시
        </Button>
        <Dialog open={ open } onClose={ () => setOpen(false) }>
          <DialogTitle sx={ { color: 'warning.main' } }>
            주의가 필요합니다
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              저장하지 않은 변경사항이 있습니다.
              페이지를 떠나면 변경사항이 손실됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => setOpen(false) }>
              계속 편집
            </Button>
            <Button onClick={ () => setOpen(false) } color="warning">
              저장 안 함
            </Button>
            <Button onClick={ () => setOpen(false) } variant="contained">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

/** 크기 변형 */
export const Sizes = {
  render: () => {
    const [openSize, setOpenSize] = useState(null);

    const sizes = ['xs', 'sm', 'md', 'lg'];

    return (
      <>
        <Stack direction="row" spacing={ 2 }>
          { sizes.map((size) => (
            <Button key={ size } variant="outlined" onClick={ () => setOpenSize(size) }>
              { size.toUpperCase() }
            </Button>
          )) }
        </Stack>
        { sizes.map((size) => (
          <Dialog
            key={ size }
            open={ openSize === size }
            onClose={ () => setOpenSize(null) }
            maxWidth={ size }
            fullWidth
          >
            <DialogTitle>maxWidth: { size }</DialogTitle>
            <DialogContent>
              <DialogContentText>
                fullWidth를 true로 설정하면 maxWidth까지 전체 너비를 사용합니다.
                현재 설정된 maxWidth는 "{ size }"입니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={ () => setOpenSize(null) }>닫기</Button>
            </DialogActions>
          </Dialog>
        )) }
      </>
    );
  },
};

/** 스크롤 대화상자 */
export const Scrollable = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="outlined" onClick={ () => setOpen(true) }>
          긴 콘텐츠 대화상자
        </Button>
        <Dialog
          open={ open }
          onClose={ () => setOpen(false) }
          scroll="paper"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>이용약관</DialogTitle>
          <DialogContent dividers>
            { [...Array(10)].map((_, index) => (
              <Typography key={ index } paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
              </Typography>
            )) }
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => setOpen(false) }>취소</Button>
            <Button onClick={ () => setOpen(false) } variant="contained">
              동의
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

/** 리스트 대화상자 */
export const ListDialog = {
  render: () => {
    const [open, setOpen] = useState(false);

    const users = [
      { name: '김철수', email: 'kim@example.com' },
      { name: '이영희', email: 'lee@example.com' },
      { name: '박민수', email: 'park@example.com' },
      { name: '최수진', email: 'choi@example.com' },
    ];

    return (
      <>
        <Button variant="outlined" onClick={ () => setOpen(true) }>
          사용자 선택
        </Button>
        <Dialog open={ open } onClose={ () => setOpen(false) }>
          <DialogTitle>담당자 선택</DialogTitle>
          <List sx={ { pt: 0 } }>
            { users.map((user) => (
              <ListItem
                key={ user.email }
                component="button"
                onClick={ () => setOpen(false) }
                sx={ {
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' },
                } }
              >
                <ListItemAvatar>
                  <Avatar sx={ { bgcolor: 'primary.main' } }>
                    { user.name[0] }
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={ user.name } secondary={ user.email } />
              </ListItem>
            )) }
          </List>
        </Dialog>
      </>
    );
  },
};

/** 커스텀 헤더 */
export const CustomHeader = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={ () => setOpen(true) }>
          설정 열기
        </Button>
        <Dialog open={ open } onClose={ () => setOpen(false) } maxWidth="sm" fullWidth>
          <DialogTitle sx={ { m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
            <Typography variant="h6" component="span">
              설정
            </Typography>
            <IconButton
              onClick={ () => setOpen(false) }
              sx={ { color: 'grey.500' } }
            >
              <Box component="span" sx={ { fontSize: 20 } }>✕</Box>
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Stack spacing={ 3 }>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  알림 설정
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  이메일 알림, 푸시 알림 등을 설정할 수 있습니다.
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  개인정보
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  프로필 정보와 개인정보 보호 설정을 관리합니다.
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  보안
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  비밀번호 변경, 2단계 인증 등 보안 설정을 관리합니다.
                </Typography>
              </Box>
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={ () => setOpen(false) }>닫기</Button>
            <Button onClick={ () => setOpen(false) } variant="contained">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

/** 중첩 대화상자 */
export const Nested = {
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    return (
      <>
        <Button variant="outlined" onClick={ () => setOpen1(true) }>
          첫 번째 대화상자
        </Button>

        <Dialog open={ open1 } onClose={ () => setOpen1(false) }>
          <DialogTitle>첫 번째 대화상자</DialogTitle>
          <DialogContent>
            <DialogContentText>
              대화상자 안에서 다른 대화상자를 열 수 있습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => setOpen1(false) }>닫기</Button>
            <Button onClick={ () => setOpen2(true) } variant="contained">
              다음 대화상자 열기
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={ open2 } onClose={ () => setOpen2(false) }>
          <DialogTitle>두 번째 대화상자</DialogTitle>
          <DialogContent>
            <DialogContentText>
              이것은 중첩된 대화상자입니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={ () => setOpen2(false) }
              variant="contained"
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

/** 실제 사용 예시 - 로그인 */
export const LoginDialog = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={ () => setOpen(true) }>
          로그인
        </Button>
        <Dialog open={ open } onClose={ () => setOpen(false) } maxWidth="xs" fullWidth>
          <DialogTitle sx={ { textAlign: 'center', pt: 4 } }>
            <Typography variant="h5" sx={ { fontWeight: 700 } }>
              로그인
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={ 2 } sx={ { mt: 1 } }>
              <TextField
                label="이메일"
                type="email"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="비밀번호"
                type="password"
                fullWidth
                variant="outlined"
              />
              <Button variant="contained" fullWidth size="large">
                로그인
              </Button>
              <Divider>또는</Divider>
              <Button variant="outlined" fullWidth>
                Google로 계속하기
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions sx={ { justifyContent: 'center', pb: 3 } }>
            <Typography variant="body2" color="text.secondary">
              계정이 없으신가요?
              <Button size="small">회원가입</Button>
            </Typography>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};
