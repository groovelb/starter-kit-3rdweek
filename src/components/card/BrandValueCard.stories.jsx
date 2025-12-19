import { BrandValueCard } from './BrandValueCard';

export default {
  title: 'Custom Component/card/BrandValueCard',
  component: BrandValueCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## BrandValueCard

브랜드 가치를 아이콘, 제목, 설명으로 표현하는 카드 컴포넌트.

### 레이아웃 (수직 배치)
1. 아이콘 (lucide-react)
2. 제목 (h6)
3. 짧은 설명
4. 상세 설명 (선택)

### 아이콘
lucide-react 아이콘 이름을 문자열로 전달합니다.
예: 'Sun', 'Moon', 'CircleHalf', 'Repeat', 'WaveSine'
        `,
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'lucide-react 아이콘 이름',
    },
    title: {
      control: 'text',
      description: '브랜드 가치 제목',
    },
    description: {
      control: 'text',
      description: '짧은 설명',
    },
    detailedDescription: {
      control: 'text',
      description: '상세 설명',
    },
    iconSize: {
      control: { type: 'number', min: 16, max: 64 },
      description: '아이콘 크기 (px)',
    },
    sx: {
      control: 'object',
      description: '추가 스타일 객체',
    },
  },
};

/**
 * 기본 사용법
 */
export const Default = {
  args: {
    icon: 'Sun',
    title: 'Immanence',
    description: 'Light quietly residing within the space.',
    detailedDescription: 'Our luminaires merge with architecture, emitting indirect, glare-free light that preserves surfaces and sightlines.',
  },
};

/**
 * 아이콘만 다른 예시
 */
export const WithDifferentIcon = {
  args: {
    icon: 'Repeat',
    title: 'Continuity',
    description: 'Seamless & natural day to night flow.',
    detailedDescription: 'Brightness and spectrum follow the day\'s rhythm, gliding from noon clarity to evening warmth.',
  },
};

/**
 * 상세 설명 없이 사용
 */
export const WithoutDetailedDescription = {
  args: {
    icon: 'WaveSine',
    title: 'Flexibility',
    description: 'Auto by default, precise on demand.',
  },
};
