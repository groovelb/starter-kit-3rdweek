import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Lamp,
  LampDesk,
  LampFloor,
  LampCeiling,
  Lightbulb,
  Power,
  SlidersHorizontal,
  Settings,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Plus,
  Minus,
  Check,
  Eye,
  EyeOff,
  Heart,
  Star,
  Bookmark,
  Share2,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Home,
  ShoppingBag,
  User,
  Search,
  Filter,
} from 'lucide-react';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../components/storybookDocumentation';
import { BRAND_COLORS } from '../../styles/themes/theme';

export default {
  title: 'Style/Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Lucide Icons

Lumenstate는 lucide-react 아이콘 라이브러리를 사용합니다.

### 특징
- 1.5px 스트로크로 브랜드 라인 스타일과 일치
- 경량, 트리쉐이킹 지원
- Feather Icons 계승으로 미니멀 미감 보장

### 설치
\`\`\`bash
pnpm add lucide-react
\`\`\`
        `,
      },
    },
  },
};

/** 아이콘 그리드 아이템 */
const IconItem = ({ icon: IconComponent, name, size = 24 }) => (
  <Box
    sx={ {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
      p: 2,
      border: '1px solid',
      borderColor: 'divider',
      minWidth: 100,
    } }
  >
    <IconComponent size={ size } strokeWidth={ 1.5 } color={ BRAND_COLORS.warmBlack } />
    <Typography variant="caption" sx={ { fontFamily: 'monospace', fontSize: 11 } }>
      { name }
    </Typography>
  </Box>
);

/** Docs - lucide-react 아이콘 시스템 */
export const Docs = {
  render: () => {
    // Lumenstate에서 자주 사용할 아이콘들
    const lightingIcons = [
      { icon: Sun, name: 'Sun' },
      { icon: Moon, name: 'Moon' },
      { icon: Sunrise, name: 'Sunrise' },
      { icon: Sunset, name: 'Sunset' },
      { icon: Lamp, name: 'Lamp' },
      { icon: LampDesk, name: 'LampDesk' },
      { icon: LampFloor, name: 'LampFloor' },
      { icon: LampCeiling, name: 'LampCeiling' },
      { icon: Lightbulb, name: 'Lightbulb' },
      { icon: Power, name: 'Power' },
    ];

    const uiIcons = [
      { icon: Menu, name: 'Menu' },
      { icon: X, name: 'X' },
      { icon: ChevronRight, name: 'ChevronRight' },
      { icon: ChevronLeft, name: 'ChevronLeft' },
      { icon: ChevronDown, name: 'ChevronDown' },
      { icon: ChevronUp, name: 'ChevronUp' },
      { icon: ArrowRight, name: 'ArrowRight' },
      { icon: ArrowLeft, name: 'ArrowLeft' },
      { icon: Plus, name: 'Plus' },
      { icon: Minus, name: 'Minus' },
      { icon: Check, name: 'Check' },
      { icon: Search, name: 'Search' },
      { icon: Filter, name: 'Filter' },
      { icon: SlidersHorizontal, name: 'SlidersHorizontal' },
      { icon: Settings, name: 'Settings' },
      { icon: ExternalLink, name: 'ExternalLink' },
    ];

    const actionIcons = [
      { icon: Heart, name: 'Heart' },
      { icon: Star, name: 'Star' },
      { icon: Bookmark, name: 'Bookmark' },
      { icon: Share2, name: 'Share2' },
      { icon: Eye, name: 'Eye' },
      { icon: EyeOff, name: 'EyeOff' },
    ];

    const navIcons = [
      { icon: Home, name: 'Home' },
      { icon: ShoppingBag, name: 'ShoppingBag' },
      { icon: User, name: 'User' },
    ];

    return (
      <>
        <DocumentTitle
          title="Icons"
          status="Available"
          note="lucide-react icon library"
          brandName="Lumenstate"
          systemName="Design System"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Icon System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            1.5px 스트로크의 미니멀 아이콘으로 브랜드 라인 스타일과 일치합니다.
          </Typography>

          {/* 라이브러리 정보 */}
          <SectionTitle title="Library" description="lucide-react 선택 이유" />
          <Box sx={ { p: 3, border: '1px solid', borderColor: 'divider', mb: 4 } }>
            <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
              <strong>1.5px 스트로크:</strong> Lumenstate의 기하학적 라인 스타일과 일치
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
              <strong>경량:</strong> 트리쉐이킹 지원으로 번들 사이즈 최적화
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Feather Icons 계승:</strong> 미니멀 미감 보장, 넓은 아이콘 선택지
            </Typography>
          </Box>

          {/* 조명 관련 아이콘 */}
          <SectionTitle title="Lighting Icons" description="조명 제품 관련 아이콘" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 } }>
            { lightingIcons.map((item) => (
              <IconItem key={ item.name } icon={ item.icon } name={ item.name } />
            )) }
          </Box>

          {/* UI 아이콘 */}
          <SectionTitle title="UI Icons" description="인터페이스 요소" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 } }>
            { uiIcons.map((item) => (
              <IconItem key={ item.name } icon={ item.icon } name={ item.name } />
            )) }
          </Box>

          {/* 액션 아이콘 */}
          <SectionTitle title="Action Icons" description="사용자 액션" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 } }>
            { actionIcons.map((item) => (
              <IconItem key={ item.name } icon={ item.icon } name={ item.name } />
            )) }
          </Box>

          {/* 네비게이션 아이콘 */}
          <SectionTitle title="Navigation Icons" description="네비게이션 요소" />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 } }>
            { navIcons.map((item) => (
              <IconItem key={ item.name } icon={ item.icon } name={ item.name } />
            )) }
          </Box>

          {/* 사용 예시 */}
          <SectionTitle title="사용 예시" description="lucide-react 아이콘 사용법" />
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
              mb: 4,
            } }
          >
{ `// Import
import { Sun, Moon, Lamp, ChevronRight } from 'lucide-react';

// 기본 사용
<Sun size={24} strokeWidth={1.5} />

// 색상 적용
<Moon size={24} color="#FFC66E" />  // 3800K Accent
<Lamp size={24} color="#12100E" />  // Warm Black

// 크기 변형
<Sun size={16} />  // Small
<Sun size={24} />  // Medium (기본)
<Sun size={32} />  // Large

// MUI Box와 함께
<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Sun size={20} />
  <Typography>낮 모드</Typography>
</Box>

// 버튼 안에서
<Button startIcon={<ChevronRight size={18} />}>
  다음
</Button>` }
          </Box>

          {/* Vibe Coding Prompt */}
          <SectionTitle
            title="Vibe Coding Prompt"
            description="AI 코딩 도구에서 활용할 수 있는 프롬프트 예시"
          />
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.900',
              color: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
            } }
          >
{ `/* Lumenstate lucide-react 아이콘 프롬프트 */

"lucide-react의 Sun, Moon, Sunrise 아이콘을 사용해서
시간대 선택 UI를 만들어줘. strokeWidth는 1.5로."

"햄버거 메뉴는 lucide-react Menu 아이콘,
닫기는 X 아이콘을 사용해줘. size={24}로."

"타임라인 스크러버 양쪽에 Sun(낮)과 Moon(밤)
아이콘을 배치해줘. 색상은 #12100E."

"제품 카드에 Heart 아이콘으로 즐겨찾기 기능을 추가해줘.
선택 시 fill로 변경하고 색상은 #FFC66E로."` }
          </Box>
        </PageContainer>
      </>
    );
  },
};

/** 크기 및 스타일 비교 */
export const SizeComparison = {
  name: 'Size Comparison',
  render: () => {
    const sizes = [16, 20, 24, 32, 48];

    return (
      <>
        <DocumentTitle
          title="Icon Sizes"
          status="Available"
          note="Size and stroke comparison"
          brandName="Lumenstate"
          systemName="Design System"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Size Comparison
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            아이콘 크기별 비교 및 권장 사용처입니다.
          </Typography>

          <SectionTitle title="크기별 비교" />
          <TableContainer sx={ { mb: 4 } }>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Size</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Preview</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>권장 용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { sizes.map((size) => (
                  <TableRow key={ size }>
                    <TableCell sx={ { fontFamily: 'monospace' } }>{ size }px</TableCell>
                    <TableCell>
                      <Box sx={ { display: 'flex', gap: 2, alignItems: 'center' } }>
                        <Sun size={ size } strokeWidth={ 1.5 } />
                        <Moon size={ size } strokeWidth={ 1.5 } />
                        <Lamp size={ size } strokeWidth={ 1.5 } />
                      </Box>
                    </TableCell>
                    <TableCell sx={ { color: 'text.secondary' } }>
                      { size === 16 && '인라인 텍스트, 태그' }
                      { size === 20 && '버튼 내부, 입력 필드' }
                      { size === 24 && '기본 UI (네비게이션, 카드)' }
                      { size === 32 && '강조 아이콘, 빈 상태' }
                      { size === 48 && '히어로, 피처 섹션' }
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          <SectionTitle title="Stroke Width 비교" />
          <Box sx={ { display: 'flex', gap: 4, mb: 4 } }>
            { [1, 1.5, 2].map((stroke) => (
              <Box key={ stroke } sx={ { textAlign: 'center' } }>
                <Sun size={ 48 } strokeWidth={ stroke } />
                <Typography variant="caption" sx={ { display: 'block', mt: 1, fontFamily: 'monospace' } }>
                  strokeWidth: { stroke }
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  { stroke === 1.5 ? '(권장)' : '' }
                </Typography>
              </Box>
            )) }
          </Box>

          <SectionTitle title="시간대별 아이콘 조합" description="Lumenstate 시나리오" />
          <Box sx={ { display: 'flex', gap: 4, justifyContent: 'center', py: 4 } }>
            <Box sx={ { textAlign: 'center' } }>
              <Box sx={ { p: 3, backgroundColor: '#F5F2EE', border: '1px solid', borderColor: 'divider', mb: 1 } }>
                <Sun size={ 48 } strokeWidth={ 1.5 } color="#FFC66E" />
              </Box>
              <Typography variant="caption">낮</Typography>
              <Typography variant="caption" sx={ { display: 'block', fontFamily: 'monospace' } }>
                480 lx · 4400 K
              </Typography>
            </Box>
            <Box sx={ { textAlign: 'center' } }>
              <Box sx={ { p: 3, backgroundColor: '#F5F2EE', border: '1px solid', borderColor: 'divider', mb: 1 } }>
                <Sunset size={ 48 } strokeWidth={ 1.5 } color="#E6A84A" />
              </Box>
              <Typography variant="caption">저녁</Typography>
              <Typography variant="caption" sx={ { display: 'block', fontFamily: 'monospace' } }>
                320 lx · 3600 K
              </Typography>
            </Box>
            <Box sx={ { textAlign: 'center' } }>
              <Box sx={ { p: 3, backgroundColor: '#12100E', border: '1px solid', borderColor: 'divider', mb: 1 } }>
                <Moon size={ 48 } strokeWidth={ 1.5 } color="#F2E9DA" />
              </Box>
              <Typography variant="caption">밤</Typography>
              <Typography variant="caption" sx={ { display: 'block', fontFamily: 'monospace' } }>
                120 lx · 2700 K
              </Typography>
            </Box>
          </Box>
        </PageContainer>
      </>
    );
  },
};
