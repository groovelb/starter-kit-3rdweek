import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { DEFAULT_PRODUCT_OPTIONS } from '../components/product/ProductOptions';

/**
 * CartContext
 *
 * 장바구니 전역 상태 관리 컨텍스트.
 * useCart 훅으로 접근하여 장바구니 조작.
 *
 * 제공하는 값:
 * - items: 장바구니 아이템 배열
 * - addItem: 아이템 추가 (product, options, quantity)
 * - removeItem: 아이템 제거 (itemId)
 * - updateQuantity: 수량 변경 (itemId, quantity)
 * - clearCart: 장바구니 비우기
 * - totalItems: 총 아이템 수
 * - subtotal: 소계 금액
 * - getOptionLabel: 옵션 값을 라벨로 변환
 */
const CartContext = createContext(null);

/**
 * 옵션 값을 고유 ID 문자열로 변환
 */
const generateItemId = (productId, options) => {
  const optionString = Object.entries(options || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join('-');
  return `${productId}-${optionString}`;
};

/**
 * 옵션 값(value)을 라벨(label)로 변환
 */
const getOptionLabel = (optionKey, optionValue) => {
  const optionList = DEFAULT_PRODUCT_OPTIONS[optionKey];
  if (!optionList) return optionValue;

  const option = optionList.find((opt) => opt.value === optionValue);
  return option ? option.label : optionValue;
};

/**
 * CartProvider 컴포넌트
 *
 * 장바구니 상태를 자식 컴포넌트에 제공.
 *
 * Props:
 * @param {ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  /**
   * 장바구니에 아이템 추가
   * 동일한 제품+옵션 조합이면 수량만 증가
   */
  const addItem = useCallback((product, options = {}, quantity = 1) => {
    const itemId = generateItemId(product.id, options);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingIndex >= 0) {
        // 기존 아이템 수량 증가
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      // 새 아이템 추가
      return [
        ...prevItems,
        {
          id: itemId,
          product: {
            id: product.id,
            title: product.title,
            images: product.images,
            price: product.price || 0,
            lux: product.lux,
            kelvin: product.kelvin,
          },
          options,
          quantity,
        },
      ];
    });
  }, []);

  /**
   * 장바구니에서 아이템 제거
   */
  const removeItem = useCallback((itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  /**
   * 아이템 수량 변경
   */
  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  /**
   * 장바구니 비우기
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  /**
   * 총 아이템 수 계산
   */
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  /**
   * 소계 금액 계산
   */
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + (item.product.price || 0) * item.quantity;
    }, 0);
  }, [items]);

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    getOptionLabel,
  }), [items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart 훅
 *
 * CartContext에 접근하는 커스텀 훅.
 *
 * @returns {object} 장바구니 상태 및 메서드
 *   - items: 장바구니 아이템 배열
 *   - addItem: (product, options, quantity) => void
 *   - removeItem: (itemId) => void
 *   - updateQuantity: (itemId, quantity) => void
 *   - clearCart: () => void
 *   - totalItems: number
 *   - subtotal: number
 *   - getOptionLabel: (optionKey, optionValue) => string
 *
 * Example usage:
 * const { items, addItem, subtotal } = useCart();
 */
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export default CartContext;
