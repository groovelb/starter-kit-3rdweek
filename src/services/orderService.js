import { supabase, isSupabaseEnabled } from '../lib/supabase';

/**
 * Order Service
 * Supabase와 연동하여 주문 데이터를 관리하는 서비스
 */

/**
 * 주문 상태 목록 조회
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export const getOrderStatuses = async () => {
  if (!isSupabaseEnabled()) {
    return { data: [], error: new Error('Supabase is not enabled') };
  }

  const { data, error } = await supabase
    .from('order_statuses')
    .select('*')
    .order('sort_order', { ascending: true });

  return { data, error };
};

/**
 * 주문 목록 조회 (View 사용, Admin 권한 필요)
 * @param {Object} options - 조회 옵션
 * @param {string} options.statusValue - 주문 상태 필터
 * @param {string} options.dateFrom - 시작 날짜 (YYYY-MM-DD)
 * @param {string} options.dateTo - 종료 날짜 (YYYY-MM-DD)
 * @param {string} options.search - 검색어 (주문번호 또는 이메일)
 * @param {number} options.page - 페이지 번호 (1부터 시작)
 * @param {number} options.limit - 페이지당 항목 수
 * @param {string} options.sortBy - 정렬 기준 컬럼
 * @param {boolean} options.ascending - 오름차순 여부
 * @returns {Promise<{data: Array, count: number, error: Error|null}>}
 */
export const getOrders = async ({
  statusValue = null,
  dateFrom = null,
  dateTo = null,
  search = '',
  page = 1,
  limit = 10,
  sortBy = 'created_at',
  ascending = false,
} = {}) => {
  if (!isSupabaseEnabled()) {
    return { data: [], count: 0, error: new Error('Supabase is not enabled') };
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('orders_with_status')
    .select('*', { count: 'exact' });

  // 상태 필터
  if (statusValue) {
    query = query.eq('status_value', statusValue);
  }

  // 날짜 범위 필터
  if (dateFrom) {
    query = query.gte('created_at', `${dateFrom}T00:00:00`);
  }
  if (dateTo) {
    query = query.lte('created_at', `${dateTo}T23:59:59`);
  }

  // 검색어 필터 (주문번호 또는 이메일)
  if (search) {
    query = query.or(`order_number.ilike.%${search}%,email.ilike.%${search}%`);
  }

  // 정렬 및 페이지네이션
  query = query
    .order(sortBy, { ascending })
    .range(from, to);

  const { data, count, error } = await query;
  return { data, count, error };
};

/**
 * 단일 주문 조회 (Admin 권한 필요)
 * @param {string} id - 주문 UUID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const getOrderById = async (id) => {
  if (!isSupabaseEnabled()) {
    return { data: null, error: new Error('Supabase is not enabled') };
  }

  const { data, error } = await supabase
    .from('orders_with_status')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

/**
 * 주문 항목 조회
 * @param {string} orderId - 주문 UUID
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export const getOrderItems = async (orderId) => {
  if (!isSupabaseEnabled()) {
    return { data: [], error: new Error('Supabase is not enabled') };
  }

  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: true });

  return { data, error };
};

/**
 * 주문 생성 (Checkout에서 사용)
 * @param {Object} orderData - 주문 데이터
 * @param {Array} items - 주문 항목 배열
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const createOrder = async (orderData, items) => {
  if (!isSupabaseEnabled()) {
    return { data: null, error: new Error('Supabase is not enabled') };
  }

  // 기본 주문 상태 (pending) 조회
  const { data: statuses } = await getOrderStatuses();
  const pendingStatus = statuses?.find(s => s.value === 'pending');

  // 주문 생성 (order_number는 트리거에서 자동 생성)
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      ...orderData,
      status_id: pendingStatus?.id,
      order_number: null, // 트리거에서 생성
    })
    .select()
    .single();

  if (orderError) {
    return { data: null, error: orderError };
  }

  // 주문 항목 생성
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    product_title: item.title,
    product_lux: item.lux,
    product_kelvin: item.kelvin,
    product_image_url: item.imageUrl,
    options: item.options || {},
    quantity: item.quantity,
    unit_price: item.unitPrice,
    line_total: item.quantity * item.unitPrice,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    // 롤백: 주문 삭제
    await supabase.from('orders').delete().eq('id', order.id);
    return { data: null, error: itemsError };
  }

  return { data: order, error: null };
};

/**
 * 주문 상태 변경 (Admin 권한 필요)
 * @param {string} orderId - 주문 UUID
 * @param {string} statusValue - 새 상태 값 (pending, confirmed, shipped, delivered, cancelled)
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export const updateOrderStatus = async (orderId, statusValue) => {
  if (!isSupabaseEnabled()) {
    return { data: null, error: new Error('Supabase is not enabled') };
  }

  // 상태 ID 조회
  const { data: statuses } = await getOrderStatuses();
  const newStatus = statuses?.find(s => s.value === statusValue);

  if (!newStatus) {
    return { data: null, error: new Error(`Invalid status: ${statusValue}`) };
  }

  // 상태별 타임스탬프 필드 매핑
  const timestampField = {
    confirmed: 'confirmed_at',
    shipped: 'shipped_at',
    delivered: 'delivered_at',
    cancelled: 'cancelled_at',
  }[statusValue];

  const updates = {
    status_id: newStatus.id,
  };

  if (timestampField) {
    updates[timestampField] = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single();

  return { data, error };
};

export default {
  getOrderStatuses,
  getOrders,
  getOrderById,
  getOrderItems,
  createOrder,
  updateOrderStatus,
};
