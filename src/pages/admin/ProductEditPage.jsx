import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import {
  getProductById,
  getProductTypes,
  createProduct,
  updateProduct,
  uploadProductImage,
} from '../../services/productService';

/**
 * ProductEditPage
 * 제품 생성/수정 페이지
 *
 * URL:
 * - /admin/products/new: 새 제품 생성
 * - /admin/products/:id: 기존 제품 수정
 *
 * 폼 섹션:
 * - 기본 정보 (제목, 설명, 타입)
 * - 기술 사양 (Lux, Kelvin, 가격)
 * - 미디어 (낮 이미지, 밤 이미지)
 * - 상태 (활성화 여부)
 */
function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  // 데이터 상태
  const [productTypes, setProductTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // 폼 상태
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type_id: '',
    lux: 0,
    kelvin: 0,
    price: 0,
    day_image_url: '',
    night_image_url: '',
    video_url: '',
    is_active: true,
  });

  // 이미지 파일 상태
  const [dayImageFile, setDayImageFile] = useState(null);
  const [nightImageFile, setNightImageFile] = useState(null);

  /**
   * 제품 타입 로드
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
   * 기존 제품 데이터 로드
   */
  useEffect(() => {
    if (isNew) return;

    const loadProduct = async () => {
      setIsLoading(true);
      const { data, error: fetchError } = await getProductById(id);

      if (fetchError) {
        setError(fetchError.message);
      } else if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          type_id: data.type_id || '',
          lux: data.lux || 0,
          kelvin: data.kelvin || 0,
          price: data.price || 0,
          day_image_url: data.day_image_url || '',
          night_image_url: data.night_image_url || '',
          video_url: data.video_url || '',
          is_active: data.is_active ?? true,
        });
      }

      setIsLoading(false);
    };

    loadProduct();
  }, [id, isNew]);

  /**
   * 폼 입력 핸들러
   */
  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * 이미지 선택 핸들러
   */
  const handleImageChange = (type) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'day') {
      setDayImageFile(file);
      // 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, day_image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setNightImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, night_image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * 저장 핸들러
   */
  const handleSave = async () => {
    setError(null);
    setIsSaving(true);

    try {
      // 유효성 검사
      if (!formData.title.trim()) {
        throw new Error('제품명을 입력해주세요.');
      }

      let productId = id;

      // 제품 생성 또는 수정
      if (isNew) {
        const { data, error: createError } = await createProduct({
          ...formData,
          type_id: formData.type_id || null,
        });

        if (createError) throw createError;
        productId = data.id;
      } else {
        const { error: updateError } = await updateProduct(id, {
          ...formData,
          type_id: formData.type_id || null,
        });

        if (updateError) throw updateError;
      }

      // 이미지 업로드
      if (dayImageFile) {
        const { url, error: uploadError } = await uploadProductImage(
          dayImageFile,
          productId,
          'day'
        );
        if (uploadError) throw uploadError;
        await updateProduct(productId, { day_image_url: url });
      }

      if (nightImageFile) {
        const { url, error: uploadError } = await uploadProductImage(
          nightImageFile,
          productId,
          'night'
        );
        if (uploadError) throw uploadError;
        await updateProduct(productId, { night_image_url: url });
      }

      navigate('/admin/products');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          startIcon={<span className="material-symbols-outlined">arrow_back</span>}
          onClick={() => navigate('/admin/products')}
        >
          목록으로
        </Button>
        <Typography variant="h5" fontWeight={600}>
          {isNew ? '새 제품 등록' : '제품 수정'}
        </Typography>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Form */}
      <Paper sx={{ p: 3 }}>
        {/* 기본 정보 */}
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          기본 정보
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="제품명"
              value={formData.title}
              onChange={handleChange('title')}
              fullWidth
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="설명"
              value={formData.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>제품 타입</InputLabel>
              <Select
                value={formData.type_id}
                onChange={handleChange('type_id')}
                label="제품 타입"
              >
                <MenuItem value="">선택 안 함</MenuItem>
                {productTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_active}
                  onChange={handleChange('is_active')}
                />
              }
              label="활성화"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* 기술 사양 */}
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          기술 사양
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Lux"
              type="number"
              value={formData.lux}
              onChange={handleChange('lux')}
              fullWidth
              inputProps={{ min: 0, max: 1000 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Kelvin"
              type="number"
              value={formData.kelvin}
              onChange={handleChange('kelvin')}
              fullWidth
              inputProps={{ min: 1000, max: 10000 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="가격"
              type="number"
              value={formData.price}
              onChange={handleChange('price')}
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* 미디어 */}
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          미디어
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              낮 이미지
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 200,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                bgcolor: 'grey.50',
              }}
            >
              {formData.day_image_url ? (
                <Box
                  component="img"
                  src={formData.day_image_url}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Typography color="text.secondary">이미지 없음</Typography>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange('day')}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              밤 이미지
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 200,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                bgcolor: 'grey.900',
              }}
            >
              {formData.night_image_url ? (
                <Box
                  component="img"
                  src={formData.night_image_url}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Typography color="grey.500">이미지 없음</Typography>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange('night')}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin/products')}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={16} /> : null}
          >
            {isSaving ? '저장 중...' : '저장'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductEditPage;
