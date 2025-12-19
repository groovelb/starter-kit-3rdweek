import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

export default {
  title: 'MUI Component/Input/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Select

드롭다운 목록에서 하나 이상의 옵션을 선택하는 컴포넌트입니다.

### 사용 패턴

| 패턴 | 설명 | 예시 |
|------|------|------|
| Basic | 기본 단일 선택 | \`<Select><MenuItem>...</MenuItem></Select>\` |
| Multiple | 다중 선택 | \`multiple\` prop |
| Grouped | 그룹화된 옵션 | \`ListSubheader\` 사용 |
| Native | 네이티브 셀렉트 | \`native\` prop |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: '셀렉트의 시각적 스타일을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: '셀렉트의 크기를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '셀렉트를 비활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: '에러 상태를 표시합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiple: {
      control: 'boolean',
      description: '다중 선택을 활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

/** 기본 셀렉트 */
export const Default = {
  args: {
    variant: 'outlined',
    size: 'medium',
    disabled: false,
    error: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <FormControl
        sx={ { minWidth: 200 } }
        variant={ args.variant }
        size={ args.size }
        disabled={ args.disabled }
        error={ args.error }
      >
        <InputLabel>나이</InputLabel>
        <Select
          value={ value }
          label="나이"
          onChange={ (e) => setValue(e.target.value) }
        >
          <MenuItem value="">
            <em>선택 안함</em>
          </MenuItem>
          <MenuItem value={ 10 }>10대</MenuItem>
          <MenuItem value={ 20 }>20대</MenuItem>
          <MenuItem value={ 30 }>30대</MenuItem>
          <MenuItem value={ 40 }>40대 이상</MenuItem>
        </Select>
      </FormControl>
    );
  },
};

/** Variant 비교 */
export const AllVariants = {
  render: () => {
    const [values, setValues] = useState({ outlined: '', filled: '', standard: '' });

    const handleChange = (variant) => (event) => {
      setValues({ ...values, [variant]: event.target.value });
    };

    return (
      <Stack spacing={ 3 } sx={ { width: 200 } }>
        <FormControl variant="outlined">
          <InputLabel>Outlined</InputLabel>
          <Select value={ values.outlined } label="Outlined" onChange={ handleChange('outlined') }>
            <MenuItem value={ 1 }>옵션 1</MenuItem>
            <MenuItem value={ 2 }>옵션 2</MenuItem>
            <MenuItem value={ 3 }>옵션 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled">
          <InputLabel>Filled</InputLabel>
          <Select value={ values.filled } label="Filled" onChange={ handleChange('filled') }>
            <MenuItem value={ 1 }>옵션 1</MenuItem>
            <MenuItem value={ 2 }>옵션 2</MenuItem>
            <MenuItem value={ 3 }>옵션 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard">
          <InputLabel>Standard</InputLabel>
          <Select value={ values.standard } label="Standard" onChange={ handleChange('standard') }>
            <MenuItem value={ 1 }>옵션 1</MenuItem>
            <MenuItem value={ 2 }>옵션 2</MenuItem>
            <MenuItem value={ 3 }>옵션 3</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    );
  },
};

/** 크기 비교 */
export const Sizes = {
  render: () => {
    const [small, setSmall] = useState('');
    const [medium, setMedium] = useState('');

    return (
      <Stack spacing={ 3 } direction="row" alignItems="flex-start">
        <FormControl size="small" sx={ { minWidth: 150 } }>
          <InputLabel>Small</InputLabel>
          <Select value={ small } label="Small" onChange={ (e) => setSmall(e.target.value) }>
            <MenuItem value={ 1 }>옵션 1</MenuItem>
            <MenuItem value={ 2 }>옵션 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="medium" sx={ { minWidth: 150 } }>
          <InputLabel>Medium</InputLabel>
          <Select value={ medium } label="Medium" onChange={ (e) => setMedium(e.target.value) }>
            <MenuItem value={ 1 }>옵션 1</MenuItem>
            <MenuItem value={ 2 }>옵션 2</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    );
  },
};

/** 도움말 텍스트 & 에러 */
export const WithHelperText = {
  render: () => {
    const [value, setValue] = useState('');
    const [errorValue, setErrorValue] = useState('');

    return (
      <Stack spacing={ 3 } sx={ { width: 250 } }>
        <FormControl>
          <InputLabel>카테고리</InputLabel>
          <Select value={ value } label="카테고리" onChange={ (e) => setValue(e.target.value) }>
            <MenuItem value="tech">기술</MenuItem>
            <MenuItem value="design">디자인</MenuItem>
            <MenuItem value="business">비즈니스</MenuItem>
          </Select>
          <FormHelperText>관심 카테고리를 선택하세요</FormHelperText>
        </FormControl>

        <FormControl error>
          <InputLabel>필수 선택</InputLabel>
          <Select
            value={ errorValue }
            label="필수 선택"
            onChange={ (e) => setErrorValue(e.target.value) }
          >
            <MenuItem value="a">옵션 A</MenuItem>
            <MenuItem value="b">옵션 B</MenuItem>
          </Select>
          <FormHelperText>필수 선택 항목입니다</FormHelperText>
        </FormControl>
      </Stack>
    );
  },
};

/** 다중 선택 */
export const Multiple = {
  render: () => {
    const [values, setValues] = useState([]);

    const options = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'];

    return (
      <FormControl sx={ { minWidth: 300 } }>
        <InputLabel>프레임워크</InputLabel>
        <Select
          multiple
          value={ values }
          onChange={ (e) => setValues(e.target.value) }
          input={ <OutlinedInput label="프레임워크" /> }
          renderValue={ (selected) => (
            <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
              { selected.map((value) => (
                <Chip key={ value } label={ value } size="small" />
              )) }
            </Box>
          ) }
        >
          { options.map((option) => (
            <MenuItem key={ option } value={ option }>
              { option }
            </MenuItem>
          )) }
        </Select>
        <FormHelperText>사용 가능한 프레임워크를 모두 선택하세요</FormHelperText>
      </FormControl>
    );
  },
};

/** 그룹화된 옵션 */
export const Grouped = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <FormControl sx={ { minWidth: 250 } }>
        <InputLabel>지역</InputLabel>
        <Select value={ value } label="지역" onChange={ (e) => setValue(e.target.value) }>
          <ListSubheader>수도권</ListSubheader>
          <MenuItem value="seoul">서울</MenuItem>
          <MenuItem value="incheon">인천</MenuItem>
          <MenuItem value="gyeonggi">경기</MenuItem>

          <ListSubheader>충청권</ListSubheader>
          <MenuItem value="daejeon">대전</MenuItem>
          <MenuItem value="chungnam">충남</MenuItem>
          <MenuItem value="chungbuk">충북</MenuItem>

          <ListSubheader>영남권</ListSubheader>
          <MenuItem value="busan">부산</MenuItem>
          <MenuItem value="daegu">대구</MenuItem>
          <MenuItem value="ulsan">울산</MenuItem>
        </Select>
      </FormControl>
    );
  },
};

/** 비활성화 옵션 */
export const DisabledOptions = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <FormControl sx={ { minWidth: 200 } }>
        <InputLabel>요금제</InputLabel>
        <Select value={ value } label="요금제" onChange={ (e) => setValue(e.target.value) }>
          <MenuItem value="free">무료</MenuItem>
          <MenuItem value="basic">베이직</MenuItem>
          <MenuItem value="pro" disabled>프로 (준비 중)</MenuItem>
          <MenuItem value="enterprise" disabled>엔터프라이즈 (준비 중)</MenuItem>
        </Select>
        <FormHelperText>현재 사용 가능한 요금제만 선택 가능</FormHelperText>
      </FormControl>
    );
  },
};

/** 비활성화 셀렉트 */
export const Disabled = {
  render: () => (
    <FormControl sx={ { minWidth: 200 } } disabled>
      <InputLabel>비활성화</InputLabel>
      <Select value="" label="비활성화">
        <MenuItem value={ 1 }>옵션 1</MenuItem>
        <MenuItem value={ 2 }>옵션 2</MenuItem>
      </Select>
      <FormHelperText>선택할 수 없습니다</FormHelperText>
    </FormControl>
  ),
};

/** 네이티브 셀렉트 */
export const Native = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <FormControl sx={ { minWidth: 200 } }>
        <InputLabel variant="standard" htmlFor="native-select">
          브라우저
        </InputLabel>
        <Select
          native
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
          inputProps={ { id: 'native-select' } }
          variant="standard"
        >
          <option value="">선택하세요</option>
          <option value="chrome">Chrome</option>
          <option value="firefox">Firefox</option>
          <option value="safari">Safari</option>
          <option value="edge">Edge</option>
        </Select>
        <FormHelperText>네이티브 셀렉트 - 모바일에서 더 나은 UX</FormHelperText>
      </FormControl>
    );
  },
};

/** 실제 사용 예시 - 필터 */
export const FilterExample = {
  render: () => {
    const [category, setCategory] = useState('all');
    const [status, setStatus] = useState('all');
    const [sort, setSort] = useState('newest');

    return (
      <Box sx={ { p: 3, bgcolor: 'grey.50', width: 500 } }>
        <Typography variant="subtitle2" sx={ { mb: 2, fontWeight: 600 } }>
          필터 옵션
        </Typography>
        <Stack direction="row" spacing={ 2 }>
          <FormControl size="small" sx={ { minWidth: 120 } }>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={ category }
              label="카테고리"
              onChange={ (e) => setCategory(e.target.value) }
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="tech">기술</MenuItem>
              <MenuItem value="design">디자인</MenuItem>
              <MenuItem value="marketing">마케팅</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={ { minWidth: 120 } }>
            <InputLabel>상태</InputLabel>
            <Select
              value={ status }
              label="상태"
              onChange={ (e) => setStatus(e.target.value) }
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="active">활성</MenuItem>
              <MenuItem value="pending">대기</MenuItem>
              <MenuItem value="inactive">비활성</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={ { minWidth: 120 } }>
            <InputLabel>정렬</InputLabel>
            <Select
              value={ sort }
              label="정렬"
              onChange={ (e) => setSort(e.target.value) }
            >
              <MenuItem value="newest">최신순</MenuItem>
              <MenuItem value="oldest">오래된순</MenuItem>
              <MenuItem value="name">이름순</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    );
  },
};
