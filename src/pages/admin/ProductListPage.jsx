import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { getProducts, getProductTypes, deleteProduct, bulkUploadProducts } from '../../services/productService';
import { products as localProducts } from '../../data/products';

/**
 * ProductListPage
 * 제품 목록 관리 페이지
 *
 * 기능:
 * - 제품 목록 조회 (테이블)
 * - 필터: 타입, 상태, 검색
 * - 페이지네이션
 * - 제품 생성/수정/삭제
 */
function ProductListPage() {
  const navigate = useNavigate();

  // 데이터 상태
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 필터 상태
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 페이지네이션 상태
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 선택 상태
  const [selected, setSelected] = useState([]);

  // 삭제 다이얼로그
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 일괄 업로드 다이얼로그
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, status: '' });

  // 일괄 삭제 다이얼로그
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  /**
   * 제품 타입 목록 로드
   */
  useEffect(() => {
    const loadTypes = async () => {
      const { data } = await getProductTypes();
      if (data) {
        setProductTypes(data);
      }
    };
    loadTypes();
  }, []);

  /**
   * 제품 목록 로드
   */
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { data, count, error: fetchError } = await getProducts({
      typeValue: typeFilter || null,
      isActive: statusFilter === '' ? null : statusFilter === 'active',
      search: searchQuery,
      page: page + 1,
      limit: rowsPerPage,
    });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setProducts(data || []);
      setTotalCount(count || 0);
    }

    setIsLoading(false);
  }, [typeFilter, statusFilter, searchQuery, page, rowsPerPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /**
   * 검색 핸들러 (디바운스)
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  /**
   * 전체 선택
   */
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(products.map((p) => p.id));
    } else {
      setSelected([]);
    }
  };

  /**
   * 개별 선택
   */
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  /**
   * 삭제 확인
   */
  const handleDeleteClick = (product) => {
    setDeleteTarget(product);
    setDeleteDialogOpen(true);
  };

  /**
   * 삭제 실행
   */
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    const { error: deleteError } = await deleteProduct(deleteTarget.id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      loadProducts();
    }

    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  /**
   * 선택한 제품 일괄 삭제
   */
  const handleBulkDeleteConfirm = async () => {
    setIsBulkDeleting(true);

    let successCount = 0;
    let failCount = 0;

    for (const productId of selected) {
      const { error: deleteError } = await deleteProduct(productId);
      if (deleteError) {
        failCount++;
      } else {
        successCount++;
      }
    }

    setIsBulkDeleting(false);
    setBulkDeleteDialogOpen(false);
    setSelected([]);

    if (failCount > 0) {
      setError(`${successCount}개 삭제 성공, ${failCount}개 실패`);
    }

    loadProducts();
  };

  /**
   * 로컬 데이터 일괄 업로드
   * 이미지/비디오를 Storage에 업로드 후 제품 테이블에 URL 저장
   */
  const handleBulkUpload = async () => {
    setIsUploading(true);
    setUploadResult(null);
    setUploadProgress({ current: 0, total: localProducts.length, status: '시작 중...' });

    const result = await bulkUploadProducts(
      localProducts,
      productTypes,
      (current, total, status) => {
        setUploadProgress({ current, total, status });
      }
    );

    setUploadResult(result);
    setIsUploading(false);

    if (result.success > 0) {
      loadProducts();
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" fontWeight={600}>
            제품 관리
          </Typography>
          {selected.length > 0 && (
            <Chip
              label={`${selected.length}개 선택됨`}
              size="small"
              color="primary"
              onDelete={() => setSelected([])}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {selected.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<span className="material-symbols-outlined">delete</span>}
              onClick={() => setBulkDeleteDialogOpen(true)}
            >
              선택 삭제 ({selected.length})
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<span className="material-symbols-outlined">upload</span>}
            onClick={() => setUploadDialogOpen(true)}
          >
            로컬 데이터 업로드
          </Button>
          <Button
            variant="contained"
            startIcon={<span className="material-symbols-outlined">add</span>}
            onClick={() => navigate('/admin/products/new')}
          >
            새 제품
          </Button>
        </Box>
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
            placeholder="제품명 검색"
            value={searchQuery}
            onChange={handleSearchChange}
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

          {/* Type Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(0);
              }}
              displayEmpty
            >
              <MenuItem value="">전체 타입</MenuItem>
              {productTypes.map((type) => (
                <MenuItem key={type.id} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Status Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              displayEmpty
            >
              <MenuItem value="">전체 상태</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < products.length}
                    checked={products.length > 0 && selected.length === products.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ width: 80 }}>이미지</TableCell>
                <TableCell>제목</TableCell>
                <TableCell sx={{ width: 100 }}>타입</TableCell>
                <TableCell sx={{ width: 80 }} align="right">Lux</TableCell>
                <TableCell sx={{ width: 80 }} align="right">Kelvin</TableCell>
                <TableCell sx={{ width: 80 }}>상태</TableCell>
                <TableCell sx={{ width: 60 }}>액션</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      등록된 제품이 없습니다.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ mt: 1 }}
                      onClick={() => navigate('/admin/products/new')}
                    >
                      새 제품 등록
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    hover
                    selected={selected.includes(product.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(product.id)}
                        onChange={() => handleSelect(product.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        component="img"
                        src={product.day_image_url || '/placeholder.png'}
                        alt={product.title}
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
                      <Typography variant="body2" fontWeight={500}>
                        {product.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.type_label || '-'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">{product.lux}</TableCell>
                    <TableCell align="right">{product.kelvin}</TableCell>
                    <TableCell>
                      <Chip
                        label={product.is_active ? 'Active' : 'Inactive'}
                        size="small"
                        color={product.is_active ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/products/${product.id}`)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                          edit
                        </span>
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                          delete
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

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>제품 삭제</DialogTitle>
        <DialogContent>
          <Typography>
            "{deleteTarget?.title}" 제품을 삭제하시겠습니까?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            이 작업은 되돌릴 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Delete Dialog */}
      <Dialog
        open={bulkDeleteDialogOpen}
        onClose={() => !isBulkDeleting && setBulkDeleteDialogOpen(false)}
      >
        <DialogTitle>선택한 제품 삭제</DialogTitle>
        <DialogContent>
          {isBulkDeleting ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
              <CircularProgress size={24} />
              <Typography>삭제 중...</Typography>
            </Box>
          ) : (
            <>
              <Typography>
                선택한 {selected.length}개 제품을 삭제하시겠습니까?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                이 작업은 되돌릴 수 없습니다.
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!isBulkDeleting && (
            <>
              <Button onClick={() => setBulkDeleteDialogOpen(false)}>취소</Button>
              <Button onClick={handleBulkDeleteConfirm} color="error" variant="contained">
                삭제
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => !isUploading && setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>로컬 데이터 일괄 업로드</DialogTitle>
        <DialogContent>
          {!uploadResult && !isUploading ? (
            <>
              <Typography sx={{ mb: 2 }}>
                <strong>products.js</strong> 파일의 {localProducts.length}개 제품을
                Supabase에 업로드합니다.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 이미지와 비디오를 Storage에 업로드합니다
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 업로드된 URL이 제품 테이블에 저장됩니다
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 기존 데이터는 유지됩니다 (중복 생성 가능)
              </Typography>
              <Alert severity="warning" sx={{ mt: 2 }}>
                파일 크기에 따라 시간이 오래 걸릴 수 있습니다.
              </Alert>
            </>
          ) : isUploading ? (
            <Box sx={{ py: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CircularProgress size={24} />
                <Typography>
                  {uploadProgress.current} / {uploadProgress.total} 제품 처리 중
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 8,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  overflow: 'hidden',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: `${(uploadProgress.current / uploadProgress.total) * 100}%`,
                    height: '100%',
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {uploadProgress.status}
              </Typography>
            </Box>
          ) : (
            <>
              <Alert
                severity={uploadResult.failed === 0 ? 'success' : 'warning'}
                sx={{ mb: 2 }}
              >
                {uploadResult.success}개 성공, {uploadResult.failed}개 실패
              </Alert>
              {uploadResult.errors.length > 0 && (
                <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                    실패 목록:
                  </Typography>
                  {uploadResult.errors.map((err, idx) => (
                    <Typography key={idx} variant="body2" color="error">
                      • {err.product}: {err.error}
                    </Typography>
                  ))}
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!uploadResult && !isUploading ? (
            <>
              <Button onClick={() => setUploadDialogOpen(false)}>
                취소
              </Button>
              <Button
                onClick={handleBulkUpload}
                variant="contained"
              >
                업로드 시작
              </Button>
            </>
          ) : isUploading ? (
            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
              업로드 중에는 창을 닫을 수 없습니다
            </Typography>
          ) : (
            <Button
              onClick={() => {
                setUploadDialogOpen(false);
                setUploadResult(null);
              }}
              variant="contained"
            >
              닫기
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProductListPage;
