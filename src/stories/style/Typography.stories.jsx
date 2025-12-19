import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  TreeNode,
} from '../../components/storybookDocumentation';
import { displayFontFamily, bodyFontFamily } from '../../styles/themes/theme';

export default {
  title: 'Style/Typography',
  parameters: {
    layout: 'padded',
  },
};

/** 타이포그래피 시스템 문서 */
export const Docs = {
  render: () => {
    const theme = useTheme();

    // 토큰 구조 (트리 뷰용)
    const tokenStructure = {
      typography: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        fontWeightLight: theme.typography.fontWeightLight,
        fontWeightRegular: theme.typography.fontWeightRegular,
        fontWeightMedium: theme.typography.fontWeightMedium,
        fontWeightBold: theme.typography.fontWeightBold,
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        body1: theme.typography.body1,
        body2: theme.typography.body2,
        subtitle1: theme.typography.subtitle1,
        subtitle2: theme.typography.subtitle2,
        button: theme.typography.button,
        caption: theme.typography.caption,
        overline: theme.typography.overline,
      },
    };

    // 토큰 값 (테이블용)
    const tokenValues = [
      { variant: 'h1', fontSize: theme.typography.h1?.fontSize, fontWeight: theme.typography.h1?.fontWeight, font: 'Display', usage: '히어로 헤드라인' },
      { variant: 'h2', fontSize: theme.typography.h2?.fontSize, fontWeight: theme.typography.h2?.fontWeight, font: 'Display', usage: '섹션 타이틀' },
      { variant: 'h3', fontSize: theme.typography.h3?.fontSize, fontWeight: theme.typography.h3?.fontWeight, font: 'Display', usage: '서브섹션 타이틀' },
      { variant: 'h4', fontSize: theme.typography.h4?.fontSize, fontWeight: theme.typography.h4?.fontWeight, font: 'Display', usage: '카드 타이틀' },
      { variant: 'h5', fontSize: theme.typography.h5?.fontSize, fontWeight: theme.typography.h5?.fontWeight, font: 'Display', usage: '작은 타이틀' },
      { variant: 'h6', fontSize: theme.typography.h6?.fontSize, fontWeight: theme.typography.h6?.fontWeight, font: 'Display', usage: '라벨 타이틀' },
      { variant: 'subtitle1', fontSize: theme.typography.subtitle1?.fontSize, fontWeight: theme.typography.subtitle1?.fontWeight, font: 'Body', usage: '서브타이틀' },
      { variant: 'subtitle2', fontSize: theme.typography.subtitle2?.fontSize, fontWeight: theme.typography.subtitle2?.fontWeight, font: 'Body', usage: '작은 서브타이틀' },
      { variant: 'body1', fontSize: theme.typography.body1?.fontSize, fontWeight: theme.typography.body1?.fontWeight, font: 'Body', usage: '본문 텍스트' },
      { variant: 'body2', fontSize: theme.typography.body2?.fontSize, fontWeight: theme.typography.body2?.fontWeight, font: 'Body', usage: '보조 본문' },
      { variant: 'button', fontSize: theme.typography.button?.fontSize, fontWeight: theme.typography.button?.fontWeight, font: 'Body', usage: '버튼 텍스트' },
      { variant: 'caption', fontSize: theme.typography.caption?.fontSize, fontWeight: theme.typography.caption?.fontWeight, font: 'Body', usage: '캡션, 상태 라벨' },
      { variant: 'overline', fontSize: theme.typography.overline?.fontSize, fontWeight: theme.typography.overline?.fontWeight, font: 'Body', usage: '카테고리, 태그' },
    ];

    // Font Weight 데이터
    const fontWeights = [
      { name: 'Light', token: 'fontWeightLight', value: theme.typography.fontWeightLight },
      { name: 'Regular', token: 'fontWeightRegular', value: theme.typography.fontWeightRegular },
      { name: 'Medium', token: 'fontWeightMedium', value: theme.typography.fontWeightMedium },
      { name: 'Bold', token: 'fontWeightBold', value: theme.typography.fontWeightBold },
    ];

    return (
      <>
        <DocumentTitle
          title="Typography"
          status="Available"
          note="Cormorant Garamond + Pretendard"
          brandName="Lumenstate"
          systemName="Design System"
          version="1.0"
        />
        <PageContainer>
          {/* 제목 + 1줄 개요 */}
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Typography System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            세리프 Display 폰트와 산세리프 Body 폰트의 조합으로 빛의 부드러움을 표현합니다.
          </Typography>

          {/* 폰트 패밀리 */}
          <SectionTitle title="Font Family" description="Lumenstate 타이포그래피 시스템" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Role</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Font</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Sample</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Display</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Cormorant Garamond</TableCell>
                  <TableCell>
                    <Typography sx={ { fontFamily: displayFontFamily, fontSize: 24, fontWeight: 500 } }>
                      Light is the state
                    </Typography>
                  </TableCell>
                  <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>
                    h1-h6 헤딩, 히어로 텍스트
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Body</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Pretendard Variable</TableCell>
                  <TableCell>
                    <Typography sx={ { fontFamily: bodyFontFamily, fontSize: 16 } }>
                      하루의 곡선을 따라 조도를 조율합니다
                    </Typography>
                  </TableCell>
                  <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>
                    본문, 버튼, 캡션
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* 폰트 선택 이유 */}
          <Box sx={ { p: 3, border: '1px solid', borderColor: 'divider', mb: 4 } }>
            <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
              폰트 선택 이유
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
              <strong>Cormorant Garamond:</strong> 세리프 곡선이 빛의 확산을 연상시키며, 기하학적 우아함을 제공합니다.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Pretendard:</strong> 한글/영문 혼용에 최적화되어 있으며, 가변 폰트를 지원합니다.
            </Typography>
          </Box>

          {/* 토큰 구조 (트리 뷰) */}
          <SectionTitle title="토큰 구조" description="theme.typography 계층 구조" />
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', mb: 4 } }>
            { Object.entries(tokenStructure).map(([key, value]) => (
              <TreeNode key={ key } keyName={ key } value={ value } defaultOpen />
            )) }
          </Box>

          {/* 토큰 값 (테이블) - Typography Scale */}
          <SectionTitle title="토큰 값" description="Typography variant별 설정" />
          <TableContainer sx={ { mb: 4 } }>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Variant</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Font</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Size</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Weight</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Sample</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { tokenValues.map((row) => (
                  <TableRow key={ row.variant }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2.5 } }>{ row.variant }</TableCell>
                    <TableCell sx={ { fontSize: 12, py: 2.5 } }>{ row.font }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2.5 } }>{ row.fontSize || '-' }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2.5 } }>{ row.fontWeight || '-' }</TableCell>
                    <TableCell sx={ { py: 2.5 } }>
                      <Typography variant={ row.variant }>
                        { row.font === 'Display' ? 'Light is the state of space.' : '하루의 곡선을 따라 조율합니다.' }
                      </Typography>
                    </TableCell>
                    <TableCell sx={ { color: 'text.secondary', fontSize: 13, py: 2.5 } }>{ row.usage }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* Font Weight 테이블 */}
          <SectionTitle title="Font Weight" description="사용 가능한 폰트 굵기" />
          <TableContainer sx={ { mb: 4 } }>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Name</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Token</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Value</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Sample</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { fontWeights.map((row) => (
                  <TableRow key={ row.token }>
                    <TableCell sx={ { py: 2 } }>{ row.name }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2 } }>{ row.token }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2 } }>{ row.value }</TableCell>
                    <TableCell sx={ { py: 2 } }>
                      <Box component="span" sx={ { fontWeight: row.value } }>
                        The quick brown fox
                      </Box>
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 사용 예시 */}
          <SectionTitle title="사용 예시" description="MUI Typography 컴포넌트 활용" />
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
{ `// Display Typography (Cormorant Garamond)
<Typography variant="h1">빛은 공간의 상태다.</Typography>
<Typography variant="h2">Light is the state of space.</Typography>

// Body Typography (Pretendard)
<Typography variant="body1">하루의 곡선을 따라 조도·색온도를 부드럽게 조율합니다.</Typography>
<Typography variant="caption">260 lx · 3200 K</Typography>

// 상태 라벨 (조도·색온도)
<Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
  480 lx · 4400 K
</Typography>

// color와 함께 사용
<Typography variant="h4" color="primary">3800K Accent 컬러</Typography>
<Typography variant="body2" color="text.secondary">보조 설명 텍스트</Typography>` }
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
{ `/* Lumenstate 타이포그래피 프롬프트 예시 */

"히어로 헤드라인은 Typography variant='h1'으로 만들어줘.
Cormorant Garamond 세리프 폰트가 적용되어 있어."

"서브 카피는 body1으로, 상태 라벨(조도·색온도)은
caption + monospace로 만들어줘."

"제품명은 h4, 마감 태그는 overline으로 표시해줘.
h4는 Cormorant Garamond, overline은 Pretendard야."

"CTA 버튼 텍스트는 button variant 사용해줘.
fontWeight: 500, Pretendard 폰트가 적용돼."` }
          </Box>
        </PageContainer>
      </>
    );
  },
};

/** Display vs Body 비교 */
export const FontComparison = {
  name: 'Font Comparison',
  render: () => (
    <>
      <DocumentTitle
        title="Font Comparison"
        status="Available"
        note="Display vs Body fonts"
        brandName="Lumenstate"
        systemName="Design System"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Font Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          Display 폰트와 Body 폰트의 시각적 차이를 비교합니다.
        </Typography>

        <SectionTitle title="Display (Cormorant Garamond)" description="영문 세리프 - 헤딩용" />
        <Box sx={ { mb: 4 } }>
          <Typography variant="h2" sx={ { mb: 2 } }>
            Light is the state of space.
          </Typography>
          <Typography variant="h4">
            The rhythm of your day, softly illuminated.
          </Typography>
        </Box>

        <SectionTitle title="Body (Pretendard)" description="한글/영문 본문용" />
        <Box sx={ { mb: 4 } }>
          <Typography variant="body1" sx={ { mb: 2 } }>
            하루의 곡선을 따라 조도·색온도를 부드럽게 조율합니다.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lumenstate adjusts brightness and color temperature throughout your day.
          </Typography>
        </Box>

      </PageContainer>
    </>
  ),
};
