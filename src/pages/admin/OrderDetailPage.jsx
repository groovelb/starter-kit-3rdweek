import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {
  getOrderById,
  getOrderItems,
  getOrderStatuses,
  updateOrderStatus,
} from '../../services/orderService';

/**
 * OrderDetailPage
 * 주문 상세 페이지
 *
 * 섹션:
 * - 상태 타임라인 (Stepper)
 * - 고객 정보
 * - 주문 항목
 * - 주문 요약
 */

const statusSteps = ['pending', 'confirmed', 'shipped', 'delivered'];

const statusColorMap = {
  warning: 'warning',
  info: 'info',
  primary: 'primary',
  success: 'success',
  error: 'error',
};

function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 데이터 상태
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  // 상태 변경
  const [newStatus, setNewStatus] = useState('');

  /**
   * 데이터 로드
   */
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      // 상태 목록 로드
      const { data: statuses } = await getOrderStatuses();
      if (statuses) {
        setOrderStatuses(statuses);
      }

      // 주문 상세 로드
      const { data: orderData, error: orderError } = await getOrderById(id);
      if (orderError) {
        setError(orderError.message);
      } else {
        setOrder(orderData);
        setNewStatus(orderData?.status_value || '');
      }

      // 주문 항목 로드
      const { data: items } = await getOrderItems(id);
      if (items) {
        setOrderItems(items);
      }

      setIsLoading(false);
    };

    loadData();
  }, [id]);

  /**
   * 상태 변경 핸들러
   */
  const handleStatusChange = async () => {
    if (!newStatus || newStatus === order?.status_value) return;

    setIsUpdating(true);
    setError(null);

    const { error: updateError } = await updateOrderStatus(id, newStatus);

    if (updateError) {
      setError(updateError.message);
    } else {
      // 주문 데이터 리로드
      const { data: orderData } = await getOrderById(id);
      if (orderData) {
        setOrder(orderData);
      }
    }

    setIsUpdating(false);
  };

  /**
   * 날짜 포맷
   */
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * 금액 포맷
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount || 0);
  };

  /**
   * 현재 상태 스텝 인덱스
   */
  const getActiveStep = () => {
    if (order?.status_value === 'cancelled') return -1;
    return statusSteps.indexOf(order?.status_value || 'pending');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Alert severity="error">주문을 찾을 수 없습니다.</Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          startIcon={<span className="material-symbols-outlined">arrow_back</span>}
          onClick={() => navigate('/admin/orders')}
        >
          목록으로
        </Button>
        <Typography variant="h5" fontWeight={600}>
          {order.order_number}
        </Typography>
        <Chip
          label={order.status_label_ko}
          color={statusColorMap[order.status_color] || 'default'}
        />
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* 상태 타임라인 */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              주문 상태
            </Typography>

            {order.status_value !== 'cancelled' ? (
              <Stepper activeStep={getActiveStep()} alternativeLabel sx={{ my: 3 }}>
                {statusSteps.map((step) => {
                  const status = orderStatuses.find((s) => s.value === step);
                  return (
                    <Step key={step}>
                      <StepLabel>{status?.label_ko || step}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            ) : (
              <Alert severity="error" sx={{ my: 2 }}>
                이 주문은 취소되었습니다.
              </Alert>
            )}

            {/* 상태 변경 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  {orderStatuses.map((status) => (
                    <MenuItem key={status.id} value={status.value}>
                      {status.label_ko}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleStatusChange}
                disabled={isUpdating || newStatus === order.status_value}
              >
                {isUpdating ? '변경 중...' : '상태 변경'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* 고객 정보 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              고객 정보
            </Typography>
            <Box sx={{ '& > div': { py: 1, borderBottom: '1px solid', borderColor: 'divider' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">이름</Typography>
                <Typography>{order.first_name} {order.last_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">이메일</Typography>
                <Typography>{order.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">전화번호</Typography>
                <Typography>{order.phone || '-'}</Typography>
              </Box>
              {order.company && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">회사</Typography>
                  <Typography>{order.company}</Typography>
                </Box>
              )}
            </Box>

            <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
              배송 주소
            </Typography>
            <Typography color="text.secondary">
              {order.address}
              {order.apartment && `, ${order.apartment}`}
              <br />
              {order.city}, {order.zip_code}
              <br />
              {order.country}
            </Typography>
          </Paper>
        </Grid>

        {/* 주문 요약 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              주문 요약
            </Typography>
            <Box sx={{ '& > div': { py: 1, borderBottom: '1px solid', borderColor: 'divider' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">주문일시</Typography>
                <Typography>{formatDate(order.created_at)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">소계</Typography>
                <Typography>{formatCurrency(order.subtotal)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">배송비</Typography>
                <Typography>{formatCurrency(order.shipping_cost)}</Typography>
              </Box>
              {order.discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">할인</Typography>
                  <Typography color="error">-{formatCurrency(order.discount)}</Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                <Typography fontWeight={600}>합계</Typography>
                <Typography fontWeight={600} fontSize={18}>
                  {formatCurrency(order.total)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* 주문 항목 */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              주문 항목
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 80 }}>이미지</TableCell>
                    <TableCell>제품명</TableCell>
                    <TableCell>옵션</TableCell>
                    <TableCell align="right" sx={{ width: 100 }}>단가</TableCell>
                    <TableCell align="center" sx={{ width: 80 }}>수량</TableCell>
                    <TableCell align="right" sx={{ width: 120 }}>금액</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box
                          component="img"
                          src={item.product_image_url || '/placeholder.png'}
                          alt={item.product_title}
                          sx={{
                            width: 48,
                            height: 48,
                            objectFit: 'cover',
                            borderRadius: 1,
                            bgcolor: 'grey.100',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>{item.product_title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.product_lux} lx · {item.product_kelvin} K
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {item.options && Object.entries(item.options).map(([key, value]) => (
                          <Chip
                            key={key}
                            label={`${key}: ${value}`}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </TableCell>
                      <TableCell align="right">{formatCurrency(item.unit_price)}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>
                        {formatCurrency(item.line_total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderDetailPage;
