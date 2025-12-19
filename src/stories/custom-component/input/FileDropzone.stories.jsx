import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FileDropzone } from '../../../components/input/FileDropzone';

export default {
  title: 'Custom Component/Input/FileDropzone',
  component: FileDropzone,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## FileDropzone

드래그 앤 드롭 파일 업로드 영역 컴포넌트.

### 기능
- 드래그 앤 드롭 파일 선택
- default, compact, minimal 변형 지원
- 파일 미리보기 및 업로드 진행률 표시
        `,
      },
    },
  },
};

/**
 * FileDropzone 기본 사용 예시
 */
export const Default = {
  render: () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSelect = (selectedFile) => {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      }
    };

    const handleRemove = () => {
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    };

    return (
      <Box sx={{ maxWidth: 400 }}>
        <FileDropzone
          onFileSelect={handleSelect}
          onFileRemove={handleRemove}
          selectedFile={file}
          previewUrl={preview}
        />
      </Box>
    );
  },
};

/**
 * FileDropzone 변형
 */
export const Variants = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400 }}>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Default
        </Typography>
        <FileDropzone onFileSelect={(f) => console.log(f)} variant="default" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Compact
        </Typography>
        <FileDropzone onFileSelect={(f) => console.log(f)} variant="compact" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Minimal
        </Typography>
        <FileDropzone onFileSelect={(f) => console.log(f)} variant="minimal" />
      </Box>
    </Box>
  ),
};

/**
 * FileDropzone 업로드 상태
 */
export const Uploading = {
  render: () => (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        Uploading State
      </Typography>
      <FileDropzone
        onFileSelect={() => {}}
        selectedFile={{ name: 'sample-image.jpg', size: 2500000 }}
        previewUrl="https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"
        isUploading
        uploadProgress={65}
      />
    </Box>
  ),
};
