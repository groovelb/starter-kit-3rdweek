import { useState, useCallback, useMemo, useEffect } from 'react';
import museDataStore from '../data/museDataStore';

/**
 * useArchiveData 커스텀 훅
 *
 * Archive 페이지의 모든 데이터와 로직을 관리하는 훅.
 * 에셋 데이터, 필터링, 모달 상태, CRUD 작업 포함.
 *
 * 동작 방식:
 * 1. 마운트 시 museDataStore에서 데이터 로드 및 구독
 * 2. 검색어/태그/정렬 기준에 따라 에셋 필터링
 * 3. 업로드, 무드보드 추가 등 액션 처리
 * 4. 스토어 변경 시 자동 UI 업데이트
 *
 * Example usage:
 * const archive = useArchiveData();
 *
 * // 필터링된 에셋 사용
 * <AssetGallery assets={archive.filteredAssets} />
 *
 * // 필터 props 전달
 * <FilterBar {...archive.filterProps} />
 *
 * @returns {object} 데이터, 필터, 모달 상태 및 핸들러
 */
export function useArchiveData() {
  // ============================================
  // 데이터 상태 (스토어에서 초기화)
  // ============================================
  const [assets, setAssets] = useState(() => museDataStore.getAssets());
  const [moodboards, setMoodboards] = useState(() => museDataStore.getMoodboards());

  // ============================================
  // 필터 상태
  // ============================================
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // ============================================
  // 모달 상태
  // ============================================
  const [showUpload, setShowUpload] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);
  const [currentAssetForBoard, setCurrentAssetForBoard] = useState(null);

  // ============================================
  // 스토어 구독
  // ============================================
  useEffect(() => {
    const unsubAssets = museDataStore.subscribe('assets', setAssets);
    const unsubMoodboards = museDataStore.subscribe('moodboards', setMoodboards);

    return () => {
      unsubAssets();
      unsubMoodboards();
    };
  }, []);

  // ============================================
  // 계산된 값
  // ============================================

  /** 사용 가능한 모든 태그 */
  const allTags = useMemo(() => {
    const tags = new Set();
    assets.forEach((asset) => {
      asset.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [assets]);

  /** 필터링된 에셋 목록 */
  const filteredAssets = useMemo(() => {
    let result = [...assets];

    // 검색어 필터
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      result = result.filter(
        (asset) =>
          asset.title.toLowerCase().includes(searchLower) ||
          asset.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // 태그 필터
    if (selectedTags.length > 0) {
      result = result.filter((asset) =>
        selectedTags.some((tag) => asset.tags?.includes(tag))
      );
    }

    // 정렬
    switch (sortBy) {
      case 'oldest':
        result.reverse();
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [assets, searchValue, selectedTags, sortBy]);

  /** 무드보드 옵션 목록 (CollectionDropdown용) */
  const moodboardOptions = useMemo(() => {
    return moodboards.map((board) => ({
      id: board.id,
      name: board.name,
      count: board.items.length,
    }));
  }, [moodboards]);

  // ============================================
  // 필터 핸들러
  // ============================================

  /** 태그 토글 */
  const handleTagToggle = useCallback((tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  /** 필터 초기화 */
  const clearFilters = useCallback(() => {
    setSearchValue('');
    setSelectedTags([]);
  }, []);

  // ============================================
  // 업로드 모달 핸들러
  // ============================================

  /** 업로드 모달 열기 */
  const openUploadModal = useCallback(() => {
    setShowUpload(true);
  }, []);

  /** 업로드 모달 닫기 */
  const closeUploadModal = useCallback(() => {
    setShowUpload(false);
  }, []);

  /**
   * 업로드 처리
   * @param {object} data - 업로드 데이터
   * @returns {Promise<object>} 생성된 에셋
   */
  const handleUpload = useCallback(async (data) => {
    // 업로드 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 스토어에 새 에셋 추가
    const newAsset = museDataStore.addAsset({
      title: data.title || 'Untitled Upload',
      tags: data.tags || [],
      thumbnail: data.previewUrl || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: data.file?.type?.startsWith('video') ? 'video' : 'image',
      format: data.file?.name?.split('.').pop()?.toUpperCase() || 'JPG',
      size: data.file?.size ? `${(data.file.size / 1024 / 1024).toFixed(1)} MB` : 'Unknown',
      license: data.license || 'Personal',
    });

    return newAsset;
  }, []);

  // ============================================
  // 무드보드 선택 모달 핸들러
  // ============================================

  /** 무드보드 선택 모달 열기 */
  const openBoardSelect = useCallback((asset) => {
    setCurrentAssetForBoard(asset);
    setShowBoardDropdown(true);
  }, []);

  /** 무드보드 선택 모달 닫기 */
  const closeBoardSelect = useCallback(() => {
    setShowBoardDropdown(false);
    setCurrentAssetForBoard(null);
  }, []);

  /**
   * 무드보드에 에셋 추가
   * @param {string} boardId - 무드보드 ID
   * @returns {object|null} 추가된 보드 정보
   */
  const addToBoard = useCallback((boardId) => {
    if (!currentAssetForBoard) return null;

    const board = moodboards.find((b) => b.id === boardId);
    museDataStore.addItemToMoodboard(boardId, currentAssetForBoard);

    setShowBoardDropdown(false);
    setCurrentAssetForBoard(null);

    return board;
  }, [currentAssetForBoard, moodboards]);

  /**
   * 새 무드보드 생성 및 에셋 추가
   * @param {string} name - 새 보드 이름
   * @returns {object} 생성된 보드 정보
   */
  const createBoardAndAdd = useCallback((name) => {
    const newBoard = museDataStore.createMoodboard(name);

    if (currentAssetForBoard) {
      museDataStore.addItemToMoodboard(newBoard.id, currentAssetForBoard);
    }

    setShowBoardDropdown(false);
    setCurrentAssetForBoard(null);

    return { board: newBoard, hasItem: !!currentAssetForBoard };
  }, [currentAssetForBoard]);

  // ============================================
  // 반환 값
  // ============================================
  return {
    // 데이터
    assets,
    filteredAssets,
    moodboards,
    moodboardOptions,
    allTags,
    count: filteredAssets.length,

    // 필터 상태
    searchValue,
    selectedTags,
    sortBy,
    viewMode,

    // 필터 핸들러
    setSearchValue,
    handleTagToggle,
    setSortBy,
    setViewMode,
    clearFilters,

    // FilterBar에 전달할 props 객체
    filterProps: {
      searchValue,
      onSearchChange: setSearchValue,
      availableTags: allTags,
      selectedTags,
      onTagToggle: handleTagToggle,
      onClearFilters: clearFilters,
      sortBy,
      onSortChange: setSortBy,
      viewMode,
      onViewModeChange: setViewMode,
      resultCount: filteredAssets.length,
    },

    // 업로드 모달
    uploadModal: {
      isOpen: showUpload,
      open: openUploadModal,
      close: closeUploadModal,
      onUpload: handleUpload,
    },

    // 무드보드 선택 모달
    boardSelectModal: {
      isOpen: showBoardDropdown,
      open: openBoardSelect,
      close: closeBoardSelect,
      collections: moodboardOptions,
      onSelect: addToBoard,
      onCreate: createBoardAndAdd,
      currentAsset: currentAssetForBoard,
    },
  };
}

export default useArchiveData;
