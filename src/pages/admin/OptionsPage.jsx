import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  getOptionsByCategory,
  createOption,
  updateOption,
  deleteOption,
} from '../../services/optionService';

/**
 * OptionsPage
 * 제품 옵션 관리 페이지
 *
 * 탭:
 * - Glass Finish (유리 마감)
 * - Hardware (하드웨어)
 * - Height (높이)
 *
 * 기능:
 * - 옵션 CRUD
 * - 활성화/비활성화
 */

const categories = [
  { value: 'glass_finish', label: 'Glass Finish' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'height', label: 'Height' },
];

function OptionsPage() {
  // 탭 상태
  const [activeTab, setActiveTab] = useState(0);
  const currentCategory = categories[activeTab].value;

  // 데이터 상태
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 편집 다이얼로그 상태
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [formData, setFormData] = useState({
    value: '',
    label: '',
    sort_order: 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  /**
   * 옵션 목록 로드
   */
  const loadOptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await getOptionsByCategory(currentCategory, true);

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setOptions(data || []);
    }

    setIsLoading(false);
  }, [currentCategory]);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  /**
   * 새 옵션 추가 다이얼로그 열기
   */
  const handleAddClick = () => {
    setEditingOption(null);
    setFormData({
      value: '',
      label: '',
      sort_order: options.length + 1,
    });
    setDialogOpen(true);
  };

  /**
   * 편집 다이얼로그 열기
   */
  const handleEditClick = (option) => {
    setEditingOption(option);
    setFormData({
      value: option.value,
      label: option.label,
      sort_order: option.sort_order || 0,
    });
    setDialogOpen(true);
  };

  /**
   * 저장
   */
  const handleSave = async () => {
    if (!formData.value || !formData.label) {
      setError('Value와 Label을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      if (editingOption) {
        // 수정
        const { error: updateError } = await updateOption(editingOption.id, {
          value: formData.value,
          label: formData.label,
          sort_order: formData.sort_order,
        });
        if (updateError) throw updateError;
      } else {
        // 생성
        const { error: createError } = await createOption({
          category: currentCategory,
          value: formData.value,
          label: formData.label,
          sort_order: formData.sort_order,
        });
        if (createError) throw createError;
      }

      setDialogOpen(false);
      loadOptions();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 삭제 (비활성화)
   */
  const handleDelete = async (option) => {
    if (!window.confirm(`"${option.label}" 옵션을 삭제하시겠습니까?`)) {
      return;
    }

    const { error: deleteError } = await deleteOption(option.id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      loadOptions();
    }
  };

  /**
   * 활성화 토글
   */
  const handleToggleActive = async (option) => {
    const { error: updateError } = await updateOption(option.id, {
      is_active: !option.is_active,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      loadOptions();
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
        <Typography variant="h5" fontWeight={600}>
          옵션 설정
        </Typography>
        <Button
          variant="contained"
          startIcon={<span className="material-symbols-outlined">add</span>}
          onClick={handleAddClick}
        >
          새 옵션
        </Button>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Tabs */}
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {categories.map((cat, index) => (
            <Tab key={cat.value} label={cat.label} />
          ))}
        </Tabs>
      </Paper>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 60 }}>순서</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Label</TableCell>
                <TableCell sx={{ width: 100 }}>활성화</TableCell>
                <TableCell sx={{ width: 100 }}>액션</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : options.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      등록된 옵션이 없습니다.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                options.map((option) => (
                  <TableRow
                    key={option.id}
                    sx={{
                      opacity: option.is_active ? 1 : 0.5,
                    }}
                  >
                    <TableCell>{option.sort_order}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {option.value}
                      </Typography>
                    </TableCell>
                    <TableCell>{option.label}</TableCell>
                    <TableCell>
                      <Switch
                        checked={option.is_active}
                        onChange={() => handleToggleActive(option)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleEditClick(option)}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                          edit
                        </span>
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(option)}
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
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {editingOption ? '옵션 수정' : '새 옵션'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              fullWidth
              required
              helperText="시스템에서 사용하는 값 (예: clear, frosted)"
            />
            <TextField
              label="Label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              fullWidth
              required
              helperText="사용자에게 표시되는 이름 (예: Clear, Frosted)"
            />
            <TextField
              label="순서"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>취소</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OptionsPage;
