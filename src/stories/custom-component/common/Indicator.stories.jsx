import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Indicator } from '../../../common/ui/Indicator';

/**
 * Story 컴포넌트: AllVariants 데모
 */
function AllVariantsDemo() {
  const [current, setCurrent] = useState(1);
  const total = 5;

  const handlePrev = () => setCurrent((p) => (p > 0 ? p - 1 : total - 1));
  const handleNext = () => setCurrent((p) => (p < total - 1 ? p + 1 : 0));

  const variants = ['dot', 'line', 'dash', 'fraction', 'progress'];

  return (
    <Box sx={ { p: 4, minWidth: 400 } }>
      <Stack spacing={ 4 }>
        <Stack direction="row" spacing={ 2 } justifyContent="center">
          <Button variant="outlined" size="small" onClick={ handlePrev }>
            Prev
          </Button>
          <Button variant="outlined" size="small" onClick={ handleNext }>
            Next
          </Button>
        </Stack>

        { variants.map((variant) => (
          <Stack key={ variant } spacing={ 1 } alignItems="center">
            <Typography
              variant="caption"
              sx={ { color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 } }
            >
              { variant }
            </Typography>
            <Box
              sx={ {
                p: 2,
                backgroundColor: variant === 'fraction' || variant === 'progress'
                  ? 'grey.900'
                  : 'grey.100',
                borderRadius: 1,
                minWidth: variant === 'progress' ? 200 : 'auto',
              } }
            >
              <Indicator
                total={ total }
                current={ current }
                variant={ variant }
                activeColor={ variant === 'fraction' || variant === 'progress' ? 'common.white' : 'primary.main' }
                inactiveColor={ variant === 'fraction' || variant === 'progress' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)' }
                onClick={ variant !== 'fraction' && variant !== 'progress' ? setCurrent : undefined }
              />
            </Box>
          </Stack>
        )) }
      </Stack>
    </Box>
  );
}

export default {
  title: 'Custom Component/Common/Indicator',
  component: Indicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Indicator

캐러셀, 슬라이더, 페이지네이션을 위한 인디케이터 컴포넌트입니다.

### 특징
- 다양한 변형: dot, line, dash, fraction, progress
- 가로/세로 방향 지원
- 키보드 네비게이션 지원
- ARIA 접근성 속성 적용
- 색상 및 크기 커스터마이징 가능
        `,
      },
    },
  },
  argTypes: {
    total: {
      control: { type: 'number', min: 1, max: 20 },
      description: '전체 아이템 수',
    },
    current: {
      control: { type: 'number', min: 0, max: 19 },
      description: '현재 활성 인덱스 (0부터 시작)',
    },
    variant: {
      control: 'select',
      options: ['dot', 'line', 'dash', 'fraction', 'progress'],
      description: '인디케이터 스타일',
    },
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '배치 방향',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '인디케이터 크기',
    },
    activeColor: {
      control: 'color',
      description: '활성 상태 색상',
    },
    inactiveColor: {
      control: 'color',
      description: '비활성 상태 색상',
    },
    gap: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.5 },
      description: '인디케이터 간 간격',
    },
    hasAnimation: {
      control: 'boolean',
      description: '애니메이션 활성화 여부',
    },
    hasHoverEffect: {
      control: 'boolean',
      description: '호버 효과 활성화 여부',
    },
  },
};

/**
 * 기본 인디케이터 - Controls에서 모든 Props 조작 가능
 */
export const Default = {
  args: {
    total: 5,
    current: 2,
    variant: 'dot',
    direction: 'horizontal',
    size: 'md',
    activeColor: '#1976d2',
    inactiveColor: 'rgba(0, 0, 0, 0.3)',
    hasAnimation: true,
    hasHoverEffect: true,
  },
};

/**
 * 모든 변형 비교 - 인터랙티브 데모
 */
export const AllVariants = {
  render: () => <AllVariantsDemo />,
};
