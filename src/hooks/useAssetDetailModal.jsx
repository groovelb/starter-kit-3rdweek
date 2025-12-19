import { useState, useCallback } from 'react';

/**
 * useAssetDetailModal 커스텀 훅
 *
 * 이미지 상세 모달의 상태와 네비게이션을 관리하는 훅.
 * 이전/다음 이미지 네비게이션, 좋아요 토글 기능 포함.
 *
 * 동작 방식:
 * 1. open() 호출 시 선택된 에셋과 인덱스 저장
 * 2. previous()/next() 호출 시 인덱스 이동 및 에셋 업데이트
 * 3. close() 호출 시 상태 초기화
 *
 * Example usage:
 * const detailModal = useAssetDetailModal(filteredAssets);
 *
 * // 모달 열기
 * <ImageCard onClick={() => detailModal.open(asset, index)} />
 *
 * // 모달 렌더링
 * <ImageDetailModal
 *   isOpen={detailModal.isOpen}
 *   asset={detailModal.asset}
 *   onClose={detailModal.close}
 *   onPrevious={detailModal.previous}
 *   onNext={detailModal.next}
 *   hasPrevious={detailModal.hasPrevious}
 *   hasNext={detailModal.hasNext}
 * />
 *
 * @param {Array} items - 네비게이션할 아이템 목록
 * @returns {object} 모달 상태 및 핸들러
 */
export function useAssetDetailModal(items = []) {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [likedIds, setLikedIds] = useState([]);

  /**
   * 모달 열기
   * @param {object} asset - 선택된 에셋
   * @param {number} index - 목록 내 인덱스
   */
  const open = useCallback((asset, index) => {
    setSelectedAsset(asset);
    setSelectedIndex(index);
  }, []);

  /**
   * 모달 닫기
   */
  const close = useCallback(() => {
    setSelectedAsset(null);
    setSelectedIndex(-1);
  }, []);

  /**
   * 이전 아이템으로 이동
   */
  const previous = useCallback(() => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedAsset(items[newIndex]);
    }
  }, [selectedIndex, items]);

  /**
   * 다음 아이템으로 이동
   */
  const next = useCallback(() => {
    if (selectedIndex < items.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedAsset(items[newIndex]);
    }
  }, [selectedIndex, items]);

  /**
   * 좋아요 토글
   * @param {string} assetId - 에셋 ID
   */
  const toggleLike = useCallback((assetId) => {
    setLikedIds((prev) =>
      prev.includes(assetId)
        ? prev.filter((id) => id !== assetId)
        : [...prev, assetId]
    );
  }, []);

  /**
   * 특정 에셋의 좋아요 여부 확인
   * @param {string} assetId - 에셋 ID
   * @returns {boolean}
   */
  const isLiked = useCallback(
    (assetId) => likedIds.includes(assetId),
    [likedIds]
  );

  return {
    // 상태
    isOpen: !!selectedAsset,
    asset: selectedAsset,
    index: selectedIndex,
    likedIds,

    // 네비게이션
    hasPrevious: selectedIndex > 0,
    hasNext: selectedIndex < items.length - 1,

    // 핸들러
    open,
    close,
    previous,
    next,
    toggleLike,
    isLiked,
  };
}

export default useAssetDetailModal;
