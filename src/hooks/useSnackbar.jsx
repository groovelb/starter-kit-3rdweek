import { useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * useSnackbar 커스텀 훅
 *
 * 스낵바 알림 상태를 관리하는 재사용 가능한 훅.
 * 성공, 에러, 정보 등 다양한 알림을 간편하게 표시.
 *
 * 동작 방식:
 * 1. notify() 호출 시 스낵바 표시
 * 2. 3초 후 자동으로 닫힘
 * 3. SnackbarComponent를 렌더링하여 UI에 표시
 *
 * Example usage:
 * const { notify, SnackbarComponent } = useSnackbar();
 *
 * // 알림 표시
 * notify('업로드 완료!', 'success');
 * notify('오류가 발생했습니다', 'error');
 *
 * // 렌더링
 * return (
 *   <>
 *     <Content />
 *     <SnackbarComponent />
 *   </>
 * );
 *
 * @param {object} options - 옵션
 * @param {number} options.autoHideDuration - 자동 닫힘 시간 (ms) [기본값: 3000]
 * @param {object} options.anchorOrigin - 위치 [기본값: { vertical: 'bottom', horizontal: 'center' }]
 * @returns {object} { notify, close, SnackbarComponent }
 */
export function useSnackbar(options = {}) {
  const {
    autoHideDuration = 3000,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  } = options;

  const [state, setState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  /**
   * 스낵바 알림 표시
   * @param {string} message - 표시할 메시지
   * @param {string} severity - 알림 유형 ('success' | 'error' | 'warning' | 'info')
   */
  const notify = useCallback((message, severity = 'success') => {
    setState({
      open: true,
      message,
      severity,
    });
  }, []);

  /**
   * 스낵바 닫기
   */
  const close = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  /**
   * 스낵바 컴포넌트
   * 페이지 하단에 렌더링
   */
  const SnackbarComponent = useCallback(
    () => (
      <Snackbar
        open={state.open}
        autoHideDuration={autoHideDuration}
        onClose={close}
        anchorOrigin={anchorOrigin}
      >
        <Alert
          severity={state.severity}
          variant="filled"
          onClose={close}
        >
          {state.message}
        </Alert>
      </Snackbar>
    ),
    [state.open, state.message, state.severity, autoHideDuration, anchorOrigin, close]
  );

  return {
    notify,
    close,
    SnackbarComponent,
    isOpen: state.open,
  };
}

export default useSnackbar;
