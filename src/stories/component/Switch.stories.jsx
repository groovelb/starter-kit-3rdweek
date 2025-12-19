import { useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export default {
  title: 'MUI Component/Input/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Switch

토글 스위치 컴포넌트입니다. 켜기/끄기 상태를 전환할 때 사용합니다.

### 사용 패턴

| 패턴 | 설명 | 예시 |
|------|------|------|
| Basic | 기본 스위치 | \`<Switch />\` |
| Labeled | 라벨이 있는 스위치 | \`<FormControlLabel label="라벨" control={<Switch />} />\` |
| iOS Style | iOS 스타일 스위치 | 커스텀 스타일 적용 |
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'default'],
      description: '스위치 색상을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: '스위치 크기를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '스위치를 비활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: '기본 스위치 상태를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    edge: {
      control: 'select',
      options: ['start', 'end', false],
      description: '스위치 가장자리 위치를 설정합니다.',
      table: {
        type: { summary: 'string | false' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

/** 기본 스위치 */
export const Default = {
  args: {
    color: 'primary',
    size: 'medium',
    disabled: false,
    defaultChecked: false,
  },
  render: (args) => (
    <Switch
      color={ args.color }
      size={ args.size }
      disabled={ args.disabled }
      defaultChecked={ args.defaultChecked }
    />
  ),
};

/** 라벨이 있는 스위치 */
export const WithLabel = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <FormControlLabel
        control={
          <Switch
            checked={ checked }
            onChange={ (e) => setChecked(e.target.checked) }
          />
        }
        label="알림 받기"
      />
    );
  },
};

/** 크기 비교 */
export const Sizes = {
  render: () => (
    <Stack direction="row" spacing={ 2 } alignItems="center">
      <FormControlLabel
        control={ <Switch size="small" defaultChecked /> }
        label="Small"
      />
      <FormControlLabel
        control={ <Switch size="medium" defaultChecked /> }
        label="Medium"
      />
    </Stack>
  ),
};

/** 색상 변형 */
export const Colors = {
  render: () => (
    <Stack direction="row" spacing={ 1 } flexWrap="wrap" useFlexGap>
      <FormControlLabel
        control={ <Switch defaultChecked color="primary" /> }
        label="Primary"
      />
      <FormControlLabel
        control={ <Switch defaultChecked color="secondary" /> }
        label="Secondary"
      />
      <FormControlLabel
        control={ <Switch defaultChecked color="success" /> }
        label="Success"
      />
      <FormControlLabel
        control={ <Switch defaultChecked color="error" /> }
        label="Error"
      />
      <FormControlLabel
        control={ <Switch defaultChecked color="info" /> }
        label="Info"
      />
      <FormControlLabel
        control={ <Switch defaultChecked color="warning" /> }
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
        control={ <Switch disabled /> }
        label="비활성화 (Off)"
      />
      <FormControlLabel
        control={ <Switch disabled checked /> }
        label="비활성화 (On)"
      />
    </Stack>
  ),
};

/** 스위치 그룹 */
export const Group = {
  render: () => (
    <FormControl component="fieldset">
      <FormLabel component="legend">알림 설정</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={ <Switch defaultChecked /> }
          label="이메일 알림"
        />
        <FormControlLabel
          control={ <Switch /> }
          label="SMS 알림"
        />
        <FormControlLabel
          control={ <Switch defaultChecked /> }
          label="푸시 알림"
        />
      </FormGroup>
    </FormControl>
  ),
};

/** 라벨 위치 */
export const LabelPlacement = {
  render: () => (
    <Stack spacing={ 2 }>
      <FormControlLabel
        control={ <Switch /> }
        label="End (기본)"
        labelPlacement="end"
      />
      <FormControlLabel
        control={ <Switch /> }
        label="Start"
        labelPlacement="start"
      />
      <FormControlLabel
        control={ <Switch /> }
        label="Top"
        labelPlacement="top"
      />
      <FormControlLabel
        control={ <Switch /> }
        label="Bottom"
        labelPlacement="bottom"
      />
    </Stack>
  ),
};

/** 상태 텍스트 표시 */
export const WithStatusText = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box sx={ { display: 'flex', alignItems: 'center', gap: 2 } }>
        <Typography variant="body2" color={ checked ? 'text.secondary' : 'text.primary' }>
          Off
        </Typography>
        <Switch
          checked={ checked }
          onChange={ (e) => setChecked(e.target.checked) }
        />
        <Typography variant="body2" color={ checked ? 'text.primary' : 'text.secondary' }>
          On
        </Typography>
      </Box>
    );
  },
};

/** 실제 사용 예시 - 설정 패널 */
export const SettingsPanel = {
  render: () => {
    const [settings, setSettings] = useState({
      darkMode: false,
      notifications: true,
      autoSave: true,
      analytics: false,
      newsletter: false,
    });

    const handleChange = (name) => (event) => {
      setSettings({ ...settings, [name]: event.target.checked });
    };

    const SettingItem = ({ label, description, name, checked }) => (
      <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 1.5 } }>
        <Box sx={ { pr: 2 } }>
          <Typography variant="body1">{ label }</Typography>
          <Typography variant="caption" color="text.secondary">
            { description }
          </Typography>
        </Box>
        <Switch
          checked={ checked }
          onChange={ handleChange(name) }
          edge="end"
        />
      </Box>
    );

    return (
      <Paper sx={ { p: 3, width: 400 } }>
        <Typography variant="h6" sx={ { mb: 2, fontWeight: 600 } }>
          설정
        </Typography>

        <Typography variant="overline" color="text.secondary">
          일반
        </Typography>
        <SettingItem
          label="다크 모드"
          description="어두운 테마를 사용합니다"
          name="darkMode"
          checked={ settings.darkMode }
        />
        <SettingItem
          label="자동 저장"
          description="변경사항을 자동으로 저장합니다"
          name="autoSave"
          checked={ settings.autoSave }
        />

        <Divider sx={ { my: 2 } } />

        <Typography variant="overline" color="text.secondary">
          알림
        </Typography>
        <SettingItem
          label="푸시 알림"
          description="새로운 소식을 알림으로 받습니다"
          name="notifications"
          checked={ settings.notifications }
        />
        <SettingItem
          label="뉴스레터"
          description="주간 뉴스레터를 이메일로 받습니다"
          name="newsletter"
          checked={ settings.newsletter }
        />

        <Divider sx={ { my: 2 } } />

        <Typography variant="overline" color="text.secondary">
          개인정보
        </Typography>
        <SettingItem
          label="분석 데이터 수집"
          description="서비스 개선을 위해 사용 데이터를 수집합니다"
          name="analytics"
          checked={ settings.analytics }
        />
      </Paper>
    );
  },
};

/** 실제 사용 예시 - 공개/비공개 토글 */
export const VisibilityToggle = {
  render: () => {
    const [isPublic, setIsPublic] = useState(false);

    return (
      <Paper sx={ { p: 3, width: 300 } }>
        <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
          <Box>
            <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
              { isPublic ? '공개' : '비공개' }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              { isPublic
                ? '모든 사용자가 볼 수 있습니다'
                : '나만 볼 수 있습니다'
              }
            </Typography>
          </Box>
          <Switch
            checked={ isPublic }
            onChange={ (e) => setIsPublic(e.target.checked) }
            color={ isPublic ? 'success' : 'default' }
          />
        </Box>
      </Paper>
    );
  },
};
