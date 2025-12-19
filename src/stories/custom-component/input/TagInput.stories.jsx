import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TagInput } from '../../../components/input/TagInput';

export default {
  title: 'Custom Component/Input/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## TagInput

태그 입력 및 관리 필드 컴포넌트.

### 기능
- 태그 추가/삭제
- 최대 태그 수 제한
- 자동완성 제안 지원
        `,
      },
    },
  },
};

/**
 * TagInput 기본 사용 예시
 */
export const Default = {
  render: () => {
    const [tags, setTags] = useState(['minimal', 'dark']);

    return (
      <Box sx={{ maxWidth: 400 }}>
        <TagInput
          tags={tags}
          onChange={setTags}
          placeholder="Add tags..."
          maxTags={8}
          label="Style Keywords"
        />
      </Box>
    );
  },
};

/**
 * TagInput with Suggestions
 */
export const WithSuggestions = {
  render: () => {
    const [tags, setTags] = useState([]);
    const suggestions = ['minimal', 'bold', 'colorful', 'dark', 'light', 'retro', 'modern', 'organic', 'geometric', 'playful'];

    return (
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          TagInput with Suggestions
        </Typography>
        <TagInput
          tags={tags}
          onChange={setTags}
          placeholder="Type to see suggestions..."
          suggestions={suggestions}
          maxTags={5}
        />
      </Box>
    );
  },
};
