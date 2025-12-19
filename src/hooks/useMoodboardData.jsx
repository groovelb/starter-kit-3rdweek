import { useState, useCallback, useEffect } from 'react';
import museDataStore from '../data/museDataStore';

/**
 * useMoodboardData 커스텀 훅
 *
 * Moodboards 페이지의 모든 데이터와 로직을 관리하는 훅.
 * 무드보드 CRUD, 뷰 전환, 다이얼로그/메뉴 상태 포함.
 *
 * 동작 방식:
 * 1. 마운트 시 museDataStore에서 무드보드 데이터 로드 및 구독
 * 2. 그리드 뷰 ↔ 상세 뷰 전환 관리
 * 3. CRUD 작업 (생성, 이름변경, 삭제, 복제)
 * 4. 다이얼로그 및 메뉴 상태 관리
 *
 * Example usage:
 * const board = useMoodboardData();
 *
 * // 뷰 전환
 * {board.selectedBoard ? (
 *   <MoodboardDetailView board={board.selectedBoard} onBack={board.backToGrid} />
 * ) : (
 *   <MoodboardGridView boards={board.moodboards} onBoardClick={board.selectBoard} />
 * )}
 *
 * @returns {object} 데이터, 뷰 상태, 다이얼로그/메뉴 상태 및 핸들러
 */
export function useMoodboardData() {
  // ============================================
  // 데이터 상태
  // ============================================
  const [moodboards, setMoodboards] = useState(() => museDataStore.getMoodboards());

  // ============================================
  // 뷰 상태
  // ============================================
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  // ============================================
  // 메뉴 상태
  // ============================================
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuTargetBoardId, setMenuTargetBoardId] = useState(null);

  // ============================================
  // 다이얼로그 상태
  // ============================================
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogInputValue, setDialogInputValue] = useState('');

  // ============================================
  // 스토어 구독
  // ============================================
  useEffect(() => {
    const unsubscribe = museDataStore.subscribe('moodboards', setMoodboards);
    return unsubscribe;
  }, []);

  // ============================================
  // 계산된 값
  // ============================================

  /** 현재 선택된 보드 */
  const selectedBoard = selectedBoardId
    ? moodboards.find((b) => b.id === selectedBoardId)
    : null;

  /** 메뉴 대상 보드 */
  const menuTargetBoard = menuTargetBoardId
    ? moodboards.find((b) => b.id === menuTargetBoardId)
    : selectedBoard;

  // ============================================
  // 뷰 전환 핸들러
  // ============================================

  /** 보드 선택 (상세 뷰로 이동) */
  const selectBoard = useCallback((boardId) => {
    setSelectedBoardId(boardId);
  }, []);

  /** 그리드 뷰로 복귀 */
  const backToGrid = useCallback(() => {
    setSelectedBoardId(null);
  }, []);

  // ============================================
  // 메뉴 핸들러
  // ============================================

  /** 메뉴 열기 */
  const openMenu = useCallback((event, boardId = null) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setMenuTargetBoardId(boardId);
  }, []);

  /** 메뉴 닫기 */
  const closeMenu = useCallback(() => {
    setMenuAnchor(null);
    setMenuTargetBoardId(null);
  }, []);

  // ============================================
  // 생성 다이얼로그 핸들러
  // ============================================

  /** 생성 다이얼로그 열기 */
  const openCreateDialog = useCallback(() => {
    setDialogInputValue('');
    setShowCreateDialog(true);
  }, []);

  /** 생성 다이얼로그 닫기 */
  const closeCreateDialog = useCallback(() => {
    setShowCreateDialog(false);
    setDialogInputValue('');
  }, []);

  /**
   * 새 무드보드 생성
   * @returns {object|null} 생성된 보드 또는 null
   */
  const createBoard = useCallback(() => {
    if (!dialogInputValue.trim()) return null;

    const newBoard = museDataStore.createMoodboard(dialogInputValue.trim());
    setSelectedBoardId(newBoard.id); // 새 보드 상세 뷰로 이동
    setDialogInputValue('');
    setShowCreateDialog(false);

    return newBoard;
  }, [dialogInputValue]);

  // ============================================
  // 이름변경 다이얼로그 핸들러
  // ============================================

  /** 이름변경 다이얼로그 열기 */
  const openRenameDialog = useCallback((boardId) => {
    const board = moodboards.find((b) => b.id === boardId);
    if (board) {
      setDialogInputValue(board.name);
      setMenuTargetBoardId(boardId);
      setShowRenameDialog(true);
    }
    closeMenu();
  }, [moodboards, closeMenu]);

  /** 이름변경 다이얼로그 닫기 */
  const closeRenameDialog = useCallback(() => {
    setShowRenameDialog(false);
    setDialogInputValue('');
  }, []);

  /**
   * 무드보드 이름 변경
   * @returns {boolean} 성공 여부
   */
  const renameBoard = useCallback(() => {
    if (!dialogInputValue.trim() || !menuTargetBoard) return false;

    museDataStore.renameMoodboard(menuTargetBoard.id, dialogInputValue.trim());
    setDialogInputValue('');
    setShowRenameDialog(false);
    closeMenu();

    return true;
  }, [dialogInputValue, menuTargetBoard, closeMenu]);

  // ============================================
  // 삭제 다이얼로그 핸들러
  // ============================================

  /** 삭제 다이얼로그 열기 */
  const openDeleteDialog = useCallback((boardId) => {
    setMenuTargetBoardId(boardId);
    setShowDeleteDialog(true);
    closeMenu();
  }, [closeMenu]);

  /** 삭제 다이얼로그 닫기 */
  const closeDeleteDialog = useCallback(() => {
    setShowDeleteDialog(false);
  }, []);

  /**
   * 무드보드 삭제
   * @returns {boolean} 성공 여부
   */
  const deleteBoard = useCallback(() => {
    if (!menuTargetBoard) return false;

    museDataStore.deleteMoodboard(menuTargetBoard.id);

    // 삭제된 보드가 현재 보기 중인 보드면 그리드 뷰로 복귀
    if (selectedBoardId === menuTargetBoard.id) {
      setSelectedBoardId(null);
    }
    setShowDeleteDialog(false);
    closeMenu();

    return true;
  }, [menuTargetBoard, selectedBoardId, closeMenu]);

  // ============================================
  // 기타 액션 핸들러
  // ============================================

  /**
   * 무드보드 복제
   * @returns {object|null} 복제된 보드 또는 null
   */
  const duplicateBoard = useCallback(() => {
    if (!menuTargetBoard) return null;

    const duplicated = museDataStore.duplicateMoodboard(menuTargetBoard.id);
    closeMenu();

    return duplicated;
  }, [menuTargetBoard, closeMenu]);

  /**
   * 공유 (더미)
   * @returns {boolean} 성공 여부
   */
  const shareBoard = useCallback(() => {
    closeMenu();
    return true;
  }, [closeMenu]);

  /**
   * 아이템 제거
   * @param {string} itemId - 제거할 아이템 ID
   * @returns {boolean} 성공 여부
   */
  const removeItem = useCallback((itemId) => {
    if (!selectedBoard) return false;

    museDataStore.removeItemFromMoodboard(selectedBoard.id, itemId);
    return true;
  }, [selectedBoard]);

  // ============================================
  // 반환 값
  // ============================================
  return {
    // 데이터
    moodboards,
    selectedBoard,
    menuTargetBoard,

    // 뷰 상태
    isDetailView: !!selectedBoardId,
    selectBoard,
    backToGrid,

    // 메뉴
    menuProps: {
      anchorEl: menuAnchor,
      onClose: closeMenu,
      onRename: () => openRenameDialog(menuTargetBoard?.id),
      onDuplicate: duplicateBoard,
      onShare: shareBoard,
      onDelete: () => openDeleteDialog(menuTargetBoard?.id),
    },
    openMenu,
    closeMenu,

    // 다이얼로그
    dialogProps: {
      createDialog: {
        isOpen: showCreateDialog,
        value: dialogInputValue,
        onChange: setDialogInputValue,
        onSubmit: createBoard,
        onClose: closeCreateDialog,
      },
      renameDialog: {
        isOpen: showRenameDialog,
        value: dialogInputValue,
        onChange: setDialogInputValue,
        onSubmit: renameBoard,
        onClose: closeRenameDialog,
      },
      deleteDialog: {
        isOpen: showDeleteDialog,
        boardName: menuTargetBoard?.name || '',
        onConfirm: deleteBoard,
        onClose: closeDeleteDialog,
      },
    },
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,

    // 액션
    createBoard,
    renameBoard,
    deleteBoard,
    duplicateBoard,
    shareBoard,
    removeItem,
  };
}

export default useMoodboardData;
