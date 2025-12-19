import { createContext, useContext, useState, useMemo, useCallback } from 'react';

/**
 * Cart Context
 *
 * 장바구니 전역 상태 관리.
 * 상품 추가/삭제/수량 변경 및 장바구니 슬라이드 열기/닫기 제어.
 *
 * 동작 방식:
 * 1. items 배열에 장바구니 아이템 저장
 * 2. isCartOpen으로 장바구니 슬라이드 표시 여부 제어
 * 3. localStorage에 장바구니 상태 영속화 (새로고침 유지)
 *
 * @typedef {Object} CartItem
 * @property {string} id - 고유 아이템 ID (productId + options 조합)
 * @property {number} productId - 제품 ID
 * @property {Object} product - 제품 데이터
 * @property {number} quantity - 수량
 * @property {Object} options - 선택된 옵션 { glassFinish, hardware, height }
 * @property {number} price - 단가
 *
 * @typedef {Object} CartContextValue
 * @property {CartItem[]} items - 장바구니 아이템 목록
 * @property {boolean} isCartOpen - 장바구니 슬라이드 열림 여부
 * @property {function} addItem - 아이템 추가
 * @property {function} removeItem - 아이템 삭제
 * @property {function} updateQuantity - 수량 변경
 * @property {function} clearCart - 장바구니 비우기
 * @property {function} openCart - 장바구니 열기
 * @property {function} closeCart - 장바구니 닫기
 * @property {function} getSubtotal - 합계 계산
 * @property {function} getItemCount - 총 수량
 */
const CartContext = createContext({
  items: [],
  isCartOpen: false,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  getSubtotal: () => 0,
  getItemCount: () => 0,
});

/**
 * useCart 커스텀 훅
 *
 * 전역 장바구니 상태에 접근하는 훅.
 *
 * 동작 방식:
 * 1. CartContext에서 장바구니 상태와 액션 반환
 * 2. items로 현재 장바구니 아이템 확인
 * 3. addItem/removeItem 등으로 장바구니 조작
 *
 * Example usage:
 * const { items, addItem, getSubtotal } = useCart();
 *
 * @returns {CartContextValue} 장바구니 컨텍스트 값
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/**
 * 아이템 고유 ID 생성
 * productId와 options 조합으로 고유 키 생성
 *
 * @param {number} productId - 제품 ID
 * @param {Object} options - 선택된 옵션
 * @returns {string} 고유 ID
 */
const generateItemId = (productId, options) => {
  const optionString = Object.entries(options || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
  return `${productId}-${optionString}`;
};

/**
 * localStorage 키
 */
const STORAGE_KEY = 'lumenstate-cart';

/**
 * localStorage에서 장바구니 로드
 */
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * localStorage에 장바구니 저장
 */
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // 저장 실패 시 무시
  }
};

/**
 * CartProvider 컴포넌트
 *
 * 전역 장바구니 상태를 제공하는 Provider.
 *
 * 동작 방식:
 * 1. items 배열에 장바구니 아이템 관리
 * 2. isCartOpen으로 슬라이드 패널 제어
 * 3. localStorage에 상태 영속화
 *
 * Props:
 * @param {React.ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => loadCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * 장바구니에 아이템 추가
   *
   * 동작:
   * 1. 동일 제품+옵션 조합이 있으면 수량 증가
   * 2. 없으면 새 아이템 추가
   * 3. localStorage에 저장
   *
   * @param {Object} product - 제품 데이터
   * @param {Object} options - 선택된 옵션
   * @param {number} quantity - 추가할 수량 (기본값: 1)
   */
  const addItem = useCallback((product, options = {}, quantity = 1) => {
    setItems((prevItems) => {
      const itemId = generateItemId(product.id, options);
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);

      let newItems;
      if (existingIndex >= 0) {
        // 기존 아이템 수량 증가
        newItems = prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // 새 아이템 추가
        const newItem = {
          id: itemId,
          productId: product.id,
          product,
          quantity,
          options,
          price: product.price || 0,
        };
        newItems = [...prevItems, newItem];
      }

      saveCartToStorage(newItems);
      return newItems;
    });
  }, []);

  /**
   * 장바구니에서 아이템 제거
   *
   * @param {string} itemId - 제거할 아이템 ID
   */
  const removeItem = useCallback((itemId) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      saveCartToStorage(newItems);
      return newItems;
    });
  }, []);

  /**
   * 아이템 수량 변경
   *
   * @param {string} itemId - 아이템 ID
   * @param {number} quantity - 새 수량 (1 미만이면 삭제)
   */
  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveCartToStorage(newItems);
      return newItems;
    });
  }, [removeItem]);

  /**
   * 장바구니 비우기
   */
  const clearCart = useCallback(() => {
    setItems([]);
    saveCartToStorage([]);
  }, []);

  /**
   * 장바구니 슬라이드 열기
   */
  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  /**
   * 장바구니 슬라이드 닫기
   */
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  /**
   * 장바구니 합계 계산
   *
   * @returns {number} 총 금액
   */
  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  /**
   * 총 아이템 수량
   *
   * @returns {number} 총 수량
   */
  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  /**
   * Context 값
   */
  const contextValue = useMemo(
    () => ({
      items,
      isCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      getSubtotal,
      getItemCount,
    }),
    [
      items,
      isCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      getSubtotal,
      getItemCount,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default useCart;
