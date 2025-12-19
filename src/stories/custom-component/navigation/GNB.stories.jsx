import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GNB } from '../../../components/navigation/GNB';

export default {
  title: 'Custom Component/Navigation/GNB',
  component: GNB,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## GNB

반응형 Global Navigation Bar 컴포넌트.

### 특징
- content.js에서 로고(brand.name)와 메뉴(navigation.menuItems) 자동 로드
- 데스크탑: 헤더에 네비게이션 표시
- 모바일: 햄버거 메뉴 + 드로어로 전환
- 투명/고정 헤더 옵션
        `,
      },
    },
  },
  argTypes: {
    activeId: {
      control: 'select',
      options: ['brand', 'collection', 'shop'],
      description: '현재 활성 메뉴 ID',
    },
    breakpoint: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '반응형 전환 브레이크포인트',
    },
    height: {
      control: { type: 'number', min: 48, max: 96 },
      description: '헤더 높이 (px)',
    },
    hasBorder: {
      control: 'boolean',
      description: '헤더 하단 보더',
    },
    isSticky: {
      control: 'boolean',
      description: '헤더 고정 여부',
    },
    isTransparent: {
      control: 'boolean',
      description: '투명 배경 + 블러 효과',
    },
    onMenuClick: {
      action: 'menuClicked',
      description: '메뉴 클릭 핸들러',
    },
  },
};

/** 기본 GNB - Controls에서 Props 조작 가능 */
export const Default = {
  args: {
    activeId: 'brand',
    breakpoint: 'md',
    height: 64,
    hasBorder: true,
    isSticky: true,
    isTransparent: false,
  },
  render: (args) => (
    <Box sx={ { height: 400 } }>
      <GNB { ...args } />
      <Box sx={ { p: 4, bgcolor: 'grey.50', height: '100%' } }>
        <Typography color="text.secondary">
          브라우저 너비를 줄여서 반응형 전환을 확인하세요.
        </Typography>
      </Box>
    </Box>
  ),
};

/** 헤더 스타일 비교 */
export const HeaderStyles = {
  render: () => (
    <Stack spacing={ 4 }>
      <Box>
        <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
          hasBorder: true (기본)
        </Typography>
        <Box sx={ { border: '1px solid', borderColor: 'divider' } }>
          <GNB activeId="brand" hasBorder />
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" sx={ { fontFamily: 'monospace', mb: 1, display: 'block' } }>
          isTransparent: true (Hero 섹션용)
        </Typography>
        <Box sx={ { position: 'relative' } }>
          <GNB activeId="brand" isTransparent hasBorder={ false } />
          <Box
            sx={ {
              height: 200,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            } }
          >
            <Typography variant="h4" color="white" fontWeight={ 700 }>
              Hero Section
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  ),
};
