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
import { BRAND_COLORS } from '../../styles/themes/theme';

export default {
  title: 'Style/Colors',
  parameters: {
    layout: 'padded',
  },
};

/** 브랜드 컬러 블록 컴포넌트 */
const BrandColorBlock = ({ name, hex, description, isDark = false }) => (
  <Box
    sx={ {
      display: 'flex',
      flexDirection: 'column',
      width: 200,
      border: '1px solid',
      borderColor: 'divider',
    } }
  >
    <Box
      sx={ {
        height: 120,
        backgroundColor: hex,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        p: 2,
      } }
    >
      <Typography
        variant="h6"
        sx={ {
          color: isDark ? '#F5F2EE' : '#12100E',
          fontWeight: 600,
        } }
      >
        { name }
      </Typography>
    </Box>
    <Box sx={ { p: 2 } }>
      <Typography
        variant="body2"
        sx={ { fontFamily: 'monospace', fontWeight: 600, mb: 0.5 } }
      >
        { hex }
      </Typography>
      <Typography variant="caption" color="text.secondary">
        { description }
      </Typography>
    </Box>
  </Box>
);

/** 시멘틱 컬러 행 컴포넌트 */
const SemanticColorRow = ({ name, light, main, dark, description }) => (
  <TableRow>
    <TableCell sx={ { fontWeight: 600 } }>{ name }</TableCell>
    <TableCell>
      <Box sx={ { display: 'flex', gap: 0.5 } }>
        <Box sx={ { width: 24, height: 24, backgroundColor: light, border: '1px solid', borderColor: 'divider' } } />
        <Box sx={ { width: 24, height: 24, backgroundColor: main, border: '1px solid', borderColor: 'divider' } } />
        <Box sx={ { width: 24, height: 24, backgroundColor: dark, border: '1px solid', borderColor: 'divider' } } />
      </Box>
    </TableCell>
    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ main }</TableCell>
    <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>{ description }</TableCell>
  </TableRow>
);

/** Docs - Lumenstate 색상 시스템 문서 */
export const Docs = {
  render: () => {
    const theme = useTheme();

    // 토큰 구조 (트리 뷰용)
    const tokenStructure = {
      palette: {
        brand: theme.palette.brand,
        primary: theme.palette.primary,
        secondary: theme.palette.secondary,
        text: theme.palette.text,
        background: theme.palette.background,
      },
    };

    // 브랜드 컬러 토큰 값
    const brandTokens = [
      { token: 'brand.wallTintWhite', value: BRAND_COLORS.wallTintWhite, description: '라이트 배경' },
      { token: 'brand.warmWhite', value: BRAND_COLORS.warmWhite, description: '다크 모드 텍스트' },
      { token: 'brand.warmBlack', value: BRAND_COLORS.warmBlack, description: '라이트 모드 텍스트 / 다크 배경' },
      { token: 'brand.accent', value: BRAND_COLORS.accent, description: '액센트 (링크, CTA, 포커스)' },
    ];

    return (
      <>
        <DocumentTitle
          title="Color System"
          status="Available"
          note="Lumenstate 4-color brand palette"
          brandName="Lumenstate"
          systemName="Design System"
          version="1.0"
        />
        <PageContainer>
          {/* 제목 + 1줄 개요 */}
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Color System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            3800K 색온도 기반의 4색 제한 팔레트입니다. 그래디언트/글로우/블러를 금지합니다.
          </Typography>

          {/* 브랜드 컬러 (4색) */}
          <SectionTitle
            title="Brand Colors"
            description="Lumenstate 4색 시스템 - 이 색상만 사용합니다"
          />
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 2, mb: 6 } }>
            <BrandColorBlock
              name="Wall Tint White"
              hex={ BRAND_COLORS.wallTintWhite }
              description="라이트 배경"
            />
            <BrandColorBlock
              name="3800K White"
              hex={ BRAND_COLORS.warmWhite }
              description="다크 모드 텍스트"
            />
            <BrandColorBlock
              name="Warm Black"
              hex={ BRAND_COLORS.warmBlack }
              description="다크 배경 / 라이트 텍스트"
              isDark
            />
            <BrandColorBlock
              name="3800K Accent"
              hex={ BRAND_COLORS.accent }
              description="액센트 (CTA, 링크)"
            />
          </Box>

          {/* 토큰 구조 (트리 뷰) */}
          <SectionTitle title="토큰 구조" description="theme.palette 계층 구조" />
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', mb: 4 } }>
            { Object.entries(tokenStructure).map(([key, value]) => (
              <TreeNode key={ key } keyName={ key } value={ value } defaultOpen />
            )) }
          </Box>

          {/* 토큰 값 (테이블) */}
          <SectionTitle title="토큰 값" description="브랜드 컬러 토큰" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Token</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Value</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Preview</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { brandTokens.map((row) => (
                  <TableRow key={ row.token }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.token }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.value }</TableCell>
                    <TableCell>
                      <Box
                        sx={ {
                          width: 24,
                          height: 24,
                          backgroundColor: row.value,
                          border: '1px solid',
                          borderColor: 'divider',
                        } }
                      />
                    </TableCell>
                    <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>{ row.description }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 라이트/다크 모드 */}
          <SectionTitle title="모드별 적용" description="라이트 모드와 다크 모드 색상 배치" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>요소</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>라이트 모드</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>다크 모드</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>배경</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>#F5F2EE (Wall Tint White)</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>#12100E (Warm Black)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>본문 텍스트</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>#12100E (Warm Black)</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>#F2E9DA (3800K White)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>보조 텍스트</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>#12100E 80%</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>#F2E9DA 80%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>액센트</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>#FFC66E</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>#FFC66E</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* 사용 예시 */}
          <SectionTitle title="사용 예시" description="MUI sx prop에서의 브랜드 컬러 활용" />
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
{ `// 브랜드 컬러 직접 사용
<Box sx={{ backgroundColor: 'primary.main' }} />  // #12100E (Warm Black)
<Box sx={{ backgroundColor: 'secondary.main' }} />  // #FFC66E (Accent)

// 배경/텍스트
<Box sx={{ backgroundColor: 'background.default' }} />  // #F5F2EE
<Typography sx={{ color: 'text.primary' }}>본문</Typography>  // #12100E
<Typography sx={{ color: 'text.secondary' }}>보조</Typography>  // #12100ECC

// CTA 버튼
<Button
  sx={{
    backgroundColor: 'secondary.main',  // #FFC66E (Accent)
    color: 'primary.main',              // #12100E (Warm Black)
    '&:hover': { backgroundColor: 'secondary.dark' }
  }}
>
  제품 보기
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
{ `/* Lumenstate 4색 팔레트 프롬프트 */

"배경은 #F5F2EE (Wall Tint White), 텍스트는 #12100E (Warm Black)로
조명 제품 카드를 만들어줘. 그래디언트 금지."

"CTA 버튼은 secondary.main (#FFC66E Accent) 배경에
primary.main (#12100E Warm Black) 텍스트로 만들어줘."

"primary.main은 #12100E (Warm Black),
secondary.main은 #FFC66E (Accent)야. 다크 모드에서
primary는 #F5F2EE로 전환되고, secondary는 #FFC66E 유지."

"히어로 섹션의 헤드라인은 text.primary, 서브텍스트는
text.secondary (80% opacity)로 구분해줘. 글로우/블러 금지."` }
          </Box>
        </PageContainer>
      </>
    );
  },
};

/** 시멘틱 토큰 - 역할별 색상 */
export const SemanticTokens = {
  name: 'Semantic Tokens',
  render: () => {
    const theme = useTheme();
    return (
      <>
        <DocumentTitle
          title="Semantic Tokens"
          status="Available"
          note="Role-based semantic colors"
          brandName="Lumenstate"
          systemName="Design System"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Semantic Tokens
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            색상에 의미와 역할을 부여한 토큰입니다.
          </Typography>

          <SectionTitle title="브랜드 및 상태 색상" />

          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Role</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Shades</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Main Value</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <SemanticColorRow
                  name="Primary"
                  light={ theme.palette.primary.light }
                  main={ theme.palette.primary.main }
                  dark={ theme.palette.primary.dark }
                  description="기본 텍스트, 아이콘, 보더"
                />
                <SemanticColorRow
                  name="Secondary"
                  light={ theme.palette.secondary.light }
                  main={ theme.palette.secondary.main }
                  dark={ theme.palette.secondary.dark }
                  description="CTA 버튼, 링크, 액센트"
                />
                <SemanticColorRow
                  name="Error"
                  light={ theme.palette.error.light }
                  main={ theme.palette.error.main }
                  dark={ theme.palette.error.dark }
                  description="오류, 삭제, 위험"
                />
                <SemanticColorRow
                  name="Warning"
                  light={ theme.palette.warning.light }
                  main={ theme.palette.warning.main }
                  dark={ theme.palette.warning.dark }
                  description="주의, 경고"
                />
                <SemanticColorRow
                  name="Success"
                  light={ theme.palette.success.light }
                  main={ theme.palette.success.main }
                  dark={ theme.palette.success.dark }
                  description="성공, 완료"
                />
                <SemanticColorRow
                  name="Info"
                  light={ theme.palette.info.light }
                  main={ theme.palette.info.main }
                  dark={ theme.palette.info.dark }
                  description="정보, 안내"
                />
              </TableBody>
            </Table>
          </TableContainer>

          <SectionTitle title="Grey Scale (Warm Tone)" />

          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 4 } }>
            { Object.entries(theme.palette.grey)
              .filter(([key]) => !key.startsWith('A'))
              .map(([shade, color]) => (
                <Box
                  key={ shade }
                  sx={ {
                    width: 60,
                    height: 60,
                    backgroundColor: color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  } }
                >
                  <Typography
                    variant="caption"
                    sx={ {
                      color: parseInt(shade) >= 500 ? '#F5F2EE' : '#12100E',
                      fontSize: 10,
                      fontWeight: 600,
                    } }
                  >
                    { shade }
                  </Typography>
                </Box>
              )) }
          </Box>
        </PageContainer>
      </>
    );
  },
};
