import { useState, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * FileDropzone 컴포넌트
 *
 * 드래그 앤 드롭 또는 클릭으로 파일을 업로드하는 영역.
 * 미리보기, 업로드 진행률, 파일 정보 표시 기능 제공.
 *
 * 동작 방식:
 * 1. 드래그 앤 드롭 또는 클릭으로 파일 선택
 * 2. 선택된 파일의 썸네일 미리보기 표시
 * 3. 업로드 진행률 표시 (isUploading 상태)
 * 4. 업로드 완료 후 성공 상태 표시
 *
 * Props:
 * @param {function} onFileSelect - 파일 선택 핸들러 (file) => void [Required]
 * @param {function} onFileRemove - 파일 제거 핸들러 [Optional]
 * @param {File} selectedFile - 현재 선택된 파일 [Optional]
 * @param {string} previewUrl - 미리보기 이미지 URL [Optional]
 * @param {boolean} isUploading - 업로드 중 상태 [Optional, 기본값: false]
 * @param {number} uploadProgress - 업로드 진행률 (0-100) [Optional, 기본값: 0]
 * @param {boolean} isComplete - 업로드 완료 상태 [Optional, 기본값: false]
 * @param {string} accept - 허용 파일 형식 [Optional, 기본값: 'image/*,video/*']
 * @param {number} maxSize - 최대 파일 크기 (bytes) [Optional, 기본값: 50MB]
 * @param {string} variant - 스타일 변형 ('default' | 'compact' | 'minimal') [Optional, 기본값: 'default']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FileDropzone
 *   onFileSelect={handleFileSelect}
 *   selectedFile={file}
 *   previewUrl={preview}
 *   isUploading={uploading}
 *   uploadProgress={progress}
 * />
 */
export function FileDropzone({
  onFileSelect,
  onFileRemove,
  selectedFile,
  previewUrl,
  isUploading = false,
  uploadProgress = 0,
  isComplete = false,
  accept = 'image/*,video/*',
  maxSize = 50 * 1024 * 1024,
  variant = 'default',
  sx,
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * 파일 유효성 검사
   */
  const validateFile = useCallback(
    (file) => {
      if (file.size > maxSize) {
        const maxSizeMB = Math.round(maxSize / (1024 * 1024));
        return `File size exceeds ${maxSizeMB}MB limit`;
      }
      return null;
    },
    [maxSize]
  );

  /**
   * 파일 처리
   */
  const handleFile = useCallback(
    (file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      onFileSelect(file);
    },
    [validateFile, onFileSelect]
  );

  /**
   * 드래그 이벤트 핸들러
   */
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  /**
   * 클릭으로 파일 선택
   */
  const handleClick = useCallback(() => {
    if (!isUploading && !isComplete) {
      fileInputRef.current?.click();
    }
  }, [isUploading, isComplete]);

  /**
   * 파일 입력 변경 핸들러
   */
  const handleInputChange = useCallback(
    (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
      e.target.value = '';
    },
    [handleFile]
  );

  /**
   * 파일 제거
   */
  const handleRemove = useCallback(
    (e) => {
      e.stopPropagation();
      setError(null);
      onFileRemove?.();
    },
    [onFileRemove]
  );

  /**
   * 변형별 높이
   */
  const variantHeight = {
    default: 240,
    compact: 160,
    minimal: 120,
  };

  /**
   * 파일 크기 포맷팅
   */
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  /**
   * 미리보기가 있는 경우의 렌더링
   */
  if (previewUrl || selectedFile) {
    return (
      <Box
        sx={{
          position: 'relative',
          height: variantHeight[variant],
          borderRadius: 2,
          overflow: 'hidden',
          border: '2px solid',
          borderColor: isComplete ? 'success.main' : 'divider',
          backgroundColor: 'grey.900',
          ...sx,
        }}
      >
        {/* 미리보기 이미지 */}
        {previewUrl && (
          <Box
            component="img"
            src={previewUrl}
            alt="Preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}

        {/* 업로드 진행률 오버레이 */}
        {isUploading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'white', mb: 2 }}>
              Uploading... {uploadProgress}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ width: '60%', height: 6, borderRadius: 1 }}
            />
          </Box>
        )}

        {/* 완료 상태 오버레이 */}
        {isComplete && !isUploading && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              bgcolor: 'success.main',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            <CheckCircleIcon fontSize="small" />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Uploaded
            </Typography>
          </Box>
        )}

        {/* 파일 정보 */}
        {selectedFile && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 1.5,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {selectedFile.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.400' }}>
              {formatFileSize(selectedFile.size)}
            </Typography>
          </Box>
        )}

        {/* 삭제 버튼 */}
        {!isUploading && onFileRemove && (
          <IconButton
            size="small"
            onClick={handleRemove}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              '&:hover': {
                bgcolor: 'error.main',
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    );
  }

  /**
   * 드롭존 기본 상태 렌더링
   */
  return (
    <Box
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        height: variantHeight[variant],
        borderRadius: 2,
        border: '2px dashed',
        borderColor: error ? 'error.main' : isDragActive ? 'primary.main' : 'divider',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: error ? 'error.main' : 'primary.main',
          backgroundColor: 'action.hover',
        },
        ...sx,
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      {/* 아이콘 */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isDragActive ? 'primary.main' : 'action.selected',
          color: isDragActive ? 'white' : 'text.secondary',
          transition: 'all 0.2s ease',
        }}
      >
        {isDragActive ? (
          <CloudUploadIcon sx={{ fontSize: 28 }} />
        ) : (
          <ImageIcon sx={{ fontSize: 28 }} />
        )}
      </Box>

      {/* 안내 텍스트 */}
      <Box sx={{ textAlign: 'center' }}>
        {variant !== 'minimal' && (
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: isDragActive ? 'primary.main' : 'text.primary',
            }}
          >
            {isDragActive ? 'Drop your file here' : 'Drag & drop or click to upload'}
          </Typography>
        )}
        {variant === 'default' && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            Supports images and videos up to {Math.round(maxSize / (1024 * 1024))}MB
          </Typography>
        )}
      </Box>

      {/* 에러 메시지 */}
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
