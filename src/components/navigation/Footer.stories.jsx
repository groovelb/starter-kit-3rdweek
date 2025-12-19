import { Footer } from './Footer';

export default {
  title: 'Custom Component/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Footer

뉴스레터 구독 폼이 포함된 미니멀한 Footer 컴포넌트입니다.

### 구성
- 상단: 뉴스레터 구독 섹션 (이메일 입력 + 제출)
- 하단: 브랜드 로고, 네비게이션 링크, 소셜 아이콘
- 최하단: 저작권 정보

### 인터랙션
- 이메일 입력 후 제출 시 \`onSubscribe\` 콜백 호출
- 제출 성공 시 "Thank you for subscribing" 메시지 표시
- 3초 후 자동으로 입력 상태 리셋
        `,
      },
    },
  },
  argTypes: {
    onSubscribe: {
      action: 'subscribed',
      description: '뉴스레터 구독 핸들러. 이메일 주소를 인자로 받음',
      table: {
        type: { summary: '(email: string) => void' },
      },
    },
    sx: {
      control: 'object',
      description: '추가 MUI sx 스타일',
      table: {
        type: { summary: 'object' },
      },
    },
  },
};

/** 기본 */
export const Default = {
  args: {},
};
