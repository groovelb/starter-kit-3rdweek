import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

export default {
  title: 'MUI Component/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Tabs

탭 네비게이션 컴포넌트입니다. 관련된 콘텐츠 그룹 간의 전환을 제공합니다.

### 사용 패턴

| 패턴 | 설명 | 예시 |
|------|------|------|
| Basic | 기본 탭 | \`<Tabs><Tab label="탭1" /></Tabs>\` |
| Centered | 중앙 정렬 | \`centered\` prop |
| Scrollable | 스크롤 가능 | \`variant="scrollable"\` |
| Vertical | 세로 방향 | \`orientation="vertical"\` |
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '탭의 방향을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['standard', 'scrollable', 'fullWidth'],
      description: '탭의 레이아웃 변형을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'standard' },
      },
    },
    centered: {
      control: 'boolean',
      description: '탭을 중앙에 배치합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    textColor: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary'],
      description: '탭 텍스트 색상을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    indicatorColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '탭 인디케이터 색상을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
  },
};

/** 탭 패널 컴포넌트 */
const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={ value !== index }
    id={ `tabpanel-${index}` }
    aria-labelledby={ `tab-${index}` }
    { ...other }
  >
    { value === index && (
      <Box sx={ { p: 3 } }>
        <Typography>{ children }</Typography>
      </Box>
    ) }
  </div>
);

/** 기본 탭 */
export const Default = {
  args: {
    orientation: 'horizontal',
    variant: 'standard',
    centered: false,
    textColor: 'primary',
    indicatorColor: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={ { width: '100%' } }>
        <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
          <Tabs
            value={ value }
            onChange={ handleChange }
            orientation={ args.orientation }
            variant={ args.variant }
            centered={ args.centered }
            textColor={ args.textColor }
            indicatorColor={ args.indicatorColor }
          >
            <Tab label="탭 1" />
            <Tab label="탭 2" />
            <Tab label="탭 3" />
          </Tabs>
        </Box>
        <TabPanel value={ value } index={ 0 }>
          첫 번째 탭의 콘텐츠입니다.
        </TabPanel>
        <TabPanel value={ value } index={ 1 }>
          두 번째 탭의 콘텐츠입니다.
        </TabPanel>
        <TabPanel value={ value } index={ 2 }>
          세 번째 탭의 콘텐츠입니다.
        </TabPanel>
      </Box>
    );
  },
};

/** 중앙 정렬 탭 */
export const Centered = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <Box sx={ { width: '100%' } }>
        <Tabs
          value={ value }
          onChange={ (e, v) => setValue(v) }
          centered
        >
          <Tab label="홈" />
          <Tab label="프로필" />
          <Tab label="설정" />
        </Tabs>
      </Box>
    );
  },
};

/** 전체 너비 탭 */
export const FullWidth = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <Box sx={ { width: '100%' } }>
        <Tabs
          value={ value }
          onChange={ (e, v) => setValue(v) }
          variant="fullWidth"
        >
          <Tab label="전화" />
          <Tab label="즐겨찾기" />
          <Tab label="최근" />
        </Tabs>
      </Box>
    );
  },
};

/** 스크롤 가능한 탭 */
export const Scrollable = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <Box sx={ { maxWidth: 480 } }>
        <Tabs
          value={ value }
          onChange={ (e, v) => setValue(v) }
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="아이템 1" />
          <Tab label="아이템 2" />
          <Tab label="아이템 3" />
          <Tab label="아이템 4" />
          <Tab label="아이템 5" />
          <Tab label="아이템 6" />
          <Tab label="아이템 7" />
        </Tabs>
      </Box>
    );
  },
};

/** 세로 방향 탭 */
export const Vertical = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <Box sx={ { display: 'flex', height: 224, bgcolor: 'background.paper' } }>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={ value }
          onChange={ (e, v) => setValue(v) }
          sx={ { borderRight: 1, borderColor: 'divider' } }
        >
          <Tab label="아이템 1" />
          <Tab label="아이템 2" />
          <Tab label="아이템 3" />
          <Tab label="아이템 4" />
        </Tabs>
        <TabPanel value={ value } index={ 0 }>
          아이템 1의 내용
        </TabPanel>
        <TabPanel value={ value } index={ 1 }>
          아이템 2의 내용
        </TabPanel>
        <TabPanel value={ value } index={ 2 }>
          아이템 3의 내용
        </TabPanel>
        <TabPanel value={ value } index={ 3 }>
          아이템 4의 내용
        </TabPanel>
      </Box>
    );
  },
};

/** 색상 변형 */
export const Colors = {
  render: () => {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    return (
      <Box sx={ { display: 'flex', flexDirection: 'column', gap: 4 } }>
        <Box>
          <Typography variant="subtitle2" sx={ { mb: 1 } }>Primary (기본)</Typography>
          <Tabs
            value={ value1 }
            onChange={ (e, v) => setValue1(v) }
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="탭 1" />
            <Tab label="탭 2" />
            <Tab label="탭 3" />
          </Tabs>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={ { mb: 1 } }>Secondary</Typography>
          <Tabs
            value={ value2 }
            onChange={ (e, v) => setValue2(v) }
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="탭 1" />
            <Tab label="탭 2" />
            <Tab label="탭 3" />
          </Tabs>
        </Box>
      </Box>
    );
  },
};

/** 비활성화 탭 */
export const Disabled = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <Tabs value={ value } onChange={ (e, v) => setValue(v) }>
        <Tab label="활성" />
        <Tab label="비활성" disabled />
        <Tab label="활성" />
      </Tabs>
    );
  },
};
