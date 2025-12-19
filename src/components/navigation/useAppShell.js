import { useGNB } from './GNB';

/**
 * useAppShell 훅 - AppShell/GNB 상태 접근
 *
 * AppShell 컴포넌트 내부에서 드로어 상태와 반응형 정보에 접근한다.
 * GNB의 컨텍스트를 사용한다.
 *
 * @returns {Object} { isDrawerOpen, toggleDrawer, closeDrawer, isMobile }
 *
 * Example usage:
 * const { isDrawerOpen, toggleDrawer, isMobile } = useAppShell();
 */
export const useAppShell = () => useGNB();
