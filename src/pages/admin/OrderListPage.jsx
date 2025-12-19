import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { getOrders, getOrderStatuses } from '../../services/orderService';

/**
 * OrderListPage
 * 주문 목록 관리 페이지
 *
 * 기능:
 * - 주문 목록 조회 (테이블)
 * - 필터: 상태, 날짜, 검색
 * - 페이지네이션
 */

const statusColorMap = {
  warning: 'warning',
  info: 'info',
  primary: 'primary',
  success: 'success',
  error: 'error',
};

function OrderListPage() {
  const navigate = useNavigate();

  // 데이터 상태
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 필터 상태
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 페이지네이션 상태
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /**
   * 주문 상태 목록 로드
   */
  useEffect(() => {
    const loadStatuses = async () => {
      const { data } = await getOrderStatuses();
      if (data) {
        setOrderStatuses(data);
      }
    };
    loadStatuses();
  }, []);

  /**
   * 주문 목록 로드
   */
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { data, count, error: fetchError } = await getOrders({
      statusValue: statusFilter || null,
      dateFrom: dateFrom || null,
      dateTo: dateTo || null,
      search: searchQuery,
      page: page + 1,
      limit: rowsPerPage,
    });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setOrders(data || []);
      setTotalCount(count || 0);
    }

    setIsLoading(false);
  }, [statusFilter, dateFrom, dateTo, searchQuery, page, rowsPerPage]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  /**
   * 날짜 포맷
   */
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          주문 관리
        </Typography>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {/* Search */}
          <TextField
            size="small"
            placeholder="주문번호 또는 이메일"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    search
                  </span>
                </InputAdornment>
              ),
            }}
          />

          {/* Status Filter */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              displayEmpty
            >
              <MenuItem value="">전체 상태</MenuItem>
              {orderStatuses.map((status) => (
                <MenuItem key={status.id} value={status.value}>
                  {status.label_ko}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date From */}
          <TextField
            size="small"
            type="date"
            label="시작일"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(0);
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 160 }}
          />

          {/* Date To */}
          <TextField
            size="small"
            type="date"
            label="종료일"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(0);
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 160 }}
          />
        </Box>
      </Paper>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 140 }}>주문번호</TableCell>
                <TableCell sx={{ width: 100 }}>날짜</TableCell>
                <TableCell>고객</TableCell>
                <TableCell sx={{ width: 180 }}>이메일</TableCell>
                <TableCell sx={{ width: 60 }} align="center">항목</TableCell>
                <TableCell sx={{ width: 120 }} align="right">합계</TableCell>
                <TableCell sx={{ width: 100 }}>상태</TableCell>
                <TableCell sx={{ width: 60 }}>상세</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      조회된 주문이 없습니다.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {order.order_number}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(order.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {order.first_name} {order.last_name}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {order.email}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{order.items_count || 0}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={500}>
                        {formatCurrency(order.total)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status_label_ko || '-'}
                        size="small"
                        color={statusColorMap[order.status_color] || 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                          visibility
                        </span>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="페이지당 행:"
        />
      </Paper>
    </Box>
  );
}

export default OrderListPage;
