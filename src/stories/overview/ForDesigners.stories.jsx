import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import { DocumentTitle, PageContainer, SectionTitle } from '../../components/storybookDocumentation';

export default {
  title: 'Overview/For Designers',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## 디자이너 가이드

Figma에 익숙한 디자이너를 위한 React + MUI + Storybook 환경 이해 가이드입니다.

### 목적
- Figma 개념과 코드 개념의 1:1 매핑
- React와 Storybook의 관계 이해
- 디자인-개발 협업 워크플로우
        `,
      },
    },
  },
};

/**
 * DocContent Component
 * Separated to use React hooks properly
 */
function DocContent() {
  const theme = useTheme();
  return (
    <>
      <DocumentTitle
        title="For Designers"
        status="Available"
        note="Figma to React + Storybook concept guide"
        brandName="Design System"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          디자이너 가이드
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          익숙한 Figma 개념으로 React + MUI + Storybook 이해하기
        </Typography>

        <SectionTitle title="목차" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>핵심 비유</TableCell>
                <TableCell>Figma vs React + Storybook</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>개념 매핑</TableCell>
                <TableCell>Figma 용어와 코드 용어 매핑</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>테마 구조</TableCell>
                <TableCell>Figma Styles = Theme</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>프로젝트 구조</TableCell>
                <TableCell>파일 위치와 관계</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Storybook 사용법</TableCell>
                <TableCell>컴포넌트 탐색 및 테스트</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="핵심 비유" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>Figma</TableCell>
                <TableCell>디자인 파일 + 컴포넌트 문서</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>React + Storybook</TableCell>
                <TableCell>실제 코드 + 컴포넌트 문서</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
          핵심 차이점: Figma는 그림이고, Storybook은 실제 동작하는 코드입니다.
          Storybook의 버튼은 실제로 클릭되고, 호버 효과가 나타나며, 비활성화 상태가 적용됩니다.
        </Typography>

        <SectionTitle title="개념 매핑: Figma → 코드" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Figma</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>코드</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Component</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>React Component</TableCell>
                <TableCell>재사용 가능한 UI 블록</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Variants</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Props</TableCell>
                <TableCell>컴포넌트 상태와 옵션</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Styles</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Theme</TableCell>
                <TableCell>디자인 토큰: 색상, 타이포그래피, 효과</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>UI Kit</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>MUI</TableCell>
                <TableCell>미리 만들어진 컴포넌트 라이브러리</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Override</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>sx prop</TableCell>
                <TableCell>인스턴스 스타일 오버라이드</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Auto Layout</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Grid / Flexbox</TableCell>
                <TableCell>자동 정렬 레이아웃</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Component Docs</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Storybook</TableCell>
                <TableCell>이 문서화 도구</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Theme = Figma Styles" />
        <Typography variant="body2" sx={ { mb: 3 } }>
          Figma에서 Color Styles와 Text Styles를 중앙 관리하듯이,
          코드에서는 Theme 파일에서 모든 디자인 토큰을 관리합니다.
        </Typography>
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Figma Styles</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>코드 Theme</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Color Styles (Primary, Secondary)</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>palette.primary, palette.secondary</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Text Styles (Heading, Body)</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>typography.h1, typography.body1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Effect Styles (Shadow)</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>components.MuiPaper.styleOverrides</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="현재 테마 값" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>Primary 색상</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ theme.palette.primary.main }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Secondary 색상</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ theme.palette.secondary.main }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Border Radius</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ theme.shape.borderRadius }px</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="두 개의 독립적인 앱" />
        <Typography variant="body2" sx={ { mb: 3 } }>
          React 프로젝트에서 실제 서비스(App)와 Storybook은 완전히 독립된 앱으로 실행됩니다.
          같은 컴포넌트를 공유하지만 진입점과 설정 파일이 다릅니다.
        </Typography>
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }></TableCell>
                <TableCell sx={ { fontWeight: 600 } }>프로덕션 앱</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Storybook</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>명령어</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>pnpm dev</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>pnpm storybook</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>진입점</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>main.jsx → App.jsx</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>.storybook/main.js</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>설정 파일</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>vite.config.js</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>.storybook/preview.jsx</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>포트</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>localhost:5173</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>localhost:6006</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="디자인 → 개발 워크플로우" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: 80 } }>1단계</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '25%' } }>Figma에서 디자인</TableCell>
                <TableCell>컴포넌트, Variants, Styles 정의</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>2단계</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>React로 구현</TableCell>
                <TableCell>Figma 디자인을 코드로 변환</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>3단계</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Storybook에서 리뷰</TableCell>
                <TableCell>디자이너가 구현된 컴포넌트 검토</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>4단계</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>프로덕션 배포</TableCell>
                <TableCell>검토된 컴포넌트로 완성된 제품</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Storybook 사용하기" />
        <Typography variant="body2" sx={ { mb: 3 } }>
          Storybook은 Figma의 Component Docs와 Inspect 패널을 합친 것과 같습니다.
          실제 코드로 만들어진 컴포넌트를 시각적으로 확인하고, Props를 변경하며 테스트할 수 있습니다.
        </Typography>
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Figma Inspect 패널</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Storybook Controls</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>컴포넌트 속성 보기</TableCell>
                <TableCell>Props 실시간 조절</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Variants 선택</TableCell>
                <TableCell>드롭다운으로 Variants 변경</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>읽기 전용 (수정 불가)</TableCell>
                <TableCell>인터랙티브 조작</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="빠른 시작 연습" />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
          } }
        >
{ `1. 사이드바에서 Component → Button → Doc으로 이동
2. 하단 Controls 패널에서 variant를 "outlined"로 변경
3. color를 "secondary"로 변경
4. 버튼이 실시간으로 업데이트되는 것을 확인` }
        </Box>
      </PageContainer>
    </>
  );
}

/** Documentation */
export const Doc = {
  render: () => <DocContent />,
};
