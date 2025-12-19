import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default {
  title: 'MUI Component/Input/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Checkbox

사용자가 하나 이상의 옵션을 선택할 수 있는 체크박스 컴포넌트입니다.

### 사용 패턴

| 패턴 | 설명 | 예시 |
|------|------|------|
| Basic | 기본 체크박스 | \`<Checkbox />\` |
| Labeled | 라벨이 있는 체크박스 | \`<FormControlLabel label="라벨" control={<Checkbox />} />\` |
| Group | 체크박스 그룹 | \`<FormGroup>...</FormGroup>\` |
| Indeterminate | 부분 선택 상태 | \`indeterminate\` prop |
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'default'],
      description: '체크박스 색상을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '체크박스 크기를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '체크박스를 비활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: '기본 체크 상태를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: '부분 선택(불확정) 상태를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

/** 기본 체크박스 */
export const Default = {
  args: {
    color: 'primary',
    size: 'medium',
    disabled: false,
    defaultChecked: false,
    indeterminate: false,
  },
  render: (args) => (
    <Checkbox
      color={ args.color }
      size={ args.size }
      disabled={ args.disabled }
      defaultChecked={ args.defaultChecked }
      indeterminate={ args.indeterminate }
    />
  ),
};

/** 라벨이 있는 체크박스 */
export const WithLabel = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={ checked }
            onChange={ (e) => setChecked(e.target.checked) }
          />
        }
        label="이용약관에 동의합니다"
      />
    );
  },
};

/** 크기 비교 */
export const Sizes = {
  render: () => (
    <Stack direction="row" spacing={ 2 } alignItems="center">
      <FormControlLabel
        control={ <Checkbox size="small" defaultChecked /> }
        label="Small"
      />
      <FormControlLabel
        control={ <Checkbox size="medium" defaultChecked /> }
        label="Medium"
      />
      <FormControlLabel
        control={ <Checkbox size="large" defaultChecked /> }
        label="Large"
      />
    </Stack>
  ),
};

/** 색상 변형 */
export const Colors = {
  render: () => (
    <Stack direction="row" spacing={ 1 } flexWrap="wrap" useFlexGap>
      <FormControlLabel
        control={ <Checkbox defaultChecked color="primary" /> }
        label="Primary"
      />
      <FormControlLabel
        control={ <Checkbox defaultChecked color="secondary" /> }
        label="Secondary"
      />
      <FormControlLabel
        control={ <Checkbox defaultChecked color="success" /> }
        label="Success"
      />
      <FormControlLabel
        control={ <Checkbox defaultChecked color="error" /> }
        label="Error"
      />
      <FormControlLabel
        control={ <Checkbox defaultChecked color="info" /> }
        label="Info"
      />
      <FormControlLabel
        control={ <Checkbox defaultChecked color="warning" /> }
        label="Warning"
      />
    </Stack>
  ),
};

/** 비활성화 상태 */
export const Disabled = {
  render: () => (
    <Stack spacing={ 1 }>
      <FormControlLabel
        control={ <Checkbox disabled /> }
        label="비활성화 (미체크)"
      />
      <FormControlLabel
        control={ <Checkbox disabled checked /> }
        label="비활성화 (체크됨)"
      />
    </Stack>
  ),
};

/** 체크박스 그룹 */
export const Group = {
  render: () => {
    const [selected, setSelected] = useState(['react']);

    const handleChange = (event) => {
      const value = event.target.name;
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    };

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">선호하는 프레임워크</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={ selected.includes('react') }
                onChange={ handleChange }
                name="react"
              />
            }
            label="React"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={ selected.includes('vue') }
                onChange={ handleChange }
                name="vue"
              />
            }
            label="Vue"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={ selected.includes('angular') }
                onChange={ handleChange }
                name="angular"
              />
            }
            label="Angular"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={ selected.includes('svelte') }
                onChange={ handleChange }
                name="svelte"
              />
            }
            label="Svelte"
          />
        </FormGroup>
        <FormHelperText>복수 선택 가능</FormHelperText>
      </FormControl>
    );
  },
};

/** 가로 배치 그룹 */
export const GroupRow = {
  render: () => (
    <FormControl component="fieldset">
      <FormLabel component="legend">관심 분야</FormLabel>
      <FormGroup row>
        <FormControlLabel
          control={ <Checkbox defaultChecked /> }
          label="개발"
        />
        <FormControlLabel
          control={ <Checkbox /> }
          label="디자인"
        />
        <FormControlLabel
          control={ <Checkbox /> }
          label="기획"
        />
        <FormControlLabel
          control={ <Checkbox /> }
          label="마케팅"
        />
      </FormGroup>
    </FormControl>
  ),
};

/** Indeterminate (부분 선택) */
export const Indeterminate = {
  render: () => {
    const [checked, setChecked] = useState([true, false, false]);

    const handleParent = (event) => {
      setChecked([event.target.checked, event.target.checked, event.target.checked]);
    };

    const handleChild = (index) => (event) => {
      const newChecked = [...checked];
      newChecked[index] = event.target.checked;
      setChecked(newChecked);
    };

    const allChecked = checked.every(Boolean);
    const someChecked = checked.some(Boolean);

    return (
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={ allChecked }
              indeterminate={ someChecked && !allChecked }
              onChange={ handleParent }
            />
          }
          label="전체 선택"
        />
        <Box sx={ { display: 'flex', flexDirection: 'column', ml: 3 } }>
          <FormControlLabel
            control={ <Checkbox checked={ checked[0] } onChange={ handleChild(0) } /> }
            label="옵션 1"
          />
          <FormControlLabel
            control={ <Checkbox checked={ checked[1] } onChange={ handleChild(1) } /> }
            label="옵션 2"
          />
          <FormControlLabel
            control={ <Checkbox checked={ checked[2] } onChange={ handleChild(2) } /> }
            label="옵션 3"
          />
        </Box>
      </Box>
    );
  },
};

/** 라벨 위치 */
export const LabelPlacement = {
  render: () => (
    <Stack spacing={ 2 }>
      <FormControlLabel
        control={ <Checkbox /> }
        label="End (기본)"
        labelPlacement="end"
      />
      <FormControlLabel
        control={ <Checkbox /> }
        label="Start"
        labelPlacement="start"
      />
      <FormControlLabel
        control={ <Checkbox /> }
        label="Top"
        labelPlacement="top"
      />
      <FormControlLabel
        control={ <Checkbox /> }
        label="Bottom"
        labelPlacement="bottom"
      />
    </Stack>
  ),
};

/** 에러 상태 */
export const WithError = {
  render: () => (
    <FormControl error component="fieldset">
      <FormLabel component="legend">이용약관</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={ <Checkbox color="error" /> }
          label="이용약관에 동의합니다 (필수)"
        />
        <FormControlLabel
          control={ <Checkbox color="error" /> }
          label="개인정보 수집에 동의합니다 (필수)"
        />
      </FormGroup>
      <FormHelperText>필수 항목을 모두 선택해주세요</FormHelperText>
    </FormControl>
  ),
};

/** 실제 사용 예시 - 알림 설정 */
export const NotificationSettings = {
  render: () => {
    const [settings, setSettings] = useState({
      email: true,
      push: true,
      sms: false,
      marketing: false,
    });

    const handleChange = (name) => (event) => {
      setSettings({ ...settings, [name]: event.target.checked });
    };

    return (
      <Paper sx={ { p: 3, width: 320 } }>
        <Typography variant="h6" sx={ { mb: 2, fontWeight: 600 } }>
          알림 설정
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={ settings.email }
                onChange={ handleChange('email') }
              />
            }
            label="이메일 알림"
          />
          <Typography variant="caption" color="text.secondary" sx={ { ml: 4, mb: 1 } }>
            새로운 소식을 이메일로 받습니다
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={ settings.push }
                onChange={ handleChange('push') }
              />
            }
            label="푸시 알림"
          />
          <Typography variant="caption" color="text.secondary" sx={ { ml: 4, mb: 1 } }>
            앱 푸시 알림을 받습니다
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={ settings.sms }
                onChange={ handleChange('sms') }
              />
            }
            label="SMS 알림"
          />
          <Typography variant="caption" color="text.secondary" sx={ { ml: 4, mb: 1 } }>
            중요 알림을 문자로 받습니다
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={ settings.marketing }
                onChange={ handleChange('marketing') }
              />
            }
            label="마케팅 수신 동의"
          />
          <Typography variant="caption" color="text.secondary" sx={ { ml: 4 } }>
            프로모션 및 이벤트 정보를 받습니다
          </Typography>
        </FormGroup>
      </Paper>
    );
  },
};
