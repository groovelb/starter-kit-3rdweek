import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  SpacingBox,
} from '../../components/storybookDocumentation';
import { SPACING, toPx } from '../../styles/tokens';

export default {
  title: 'Style/Spacing',
  parameters: {
    layout: 'padded',
  },
};

/**
 * 토큰 객체를 테이블 데이터로 변환하는 헬퍼
 * @param {string} prefix - 토큰 경로 prefix (예: 'SPACING.inset')
 * @param {Object} tokens - 토큰 객체
 * @param {Object} usageMap - 각 키별 용도 설명
 */
const tokensToTableData = (prefix, tokens, usageMap = {}) => {
  return Object.entries(tokens).map(([key, value]) => ({
    token: `${prefix}.${key}`,
    value: value,
    px: toPx(value),
    usage: usageMap[key] || '',
  }));
};

/** 시멘틱 토큰 그룹 컴포넌트 */
const SemanticTokenGroup = ({ name, tokenPath, tokens, description, usageMap }) => {
  const tableData = tokensToTableData(tokenPath, tokens, usageMap);

  return (
    <Box sx={ { mb: 5 } }>
      <Typography variant="h6" sx={ { fontWeight: 600, mb: 0.5 } }>{ name }</Typography>
      <Typography variant="body2" color="text.secondary" sx={ { mb: 2 } }>{ description }</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={ { fontWeight: 600 } }>Token</TableCell>
              <TableCell sx={ { fontWeight: 600 } }>Value</TableCell>
              <TableCell sx={ { fontWeight: 600 } }>Pixel</TableCell>
              <TableCell sx={ { fontWeight: 600 } }>Visual</TableCell>
              <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { tableData.map((row) => (
              <TableRow key={ row.token }>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.token }</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.value }</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.px }px</TableCell>
                <TableCell>
                  <SpacingBox size={ row.px } />
                </TableCell>
                <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>{ row.usage }</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

/** Docs - 간격 시스템 문서 (첫 번째 스토리) */
export const Docs = {
  render: () => {
    // 8px 기반 spacing scale (0-10)
    const spacingScale = [
      { value: 0, px: 0, usage: '간격 없음' },
      { value: 0.5, px: 4, usage: '최소 간격, 아이콘-텍스트' },
      { value: 1, px: 8, usage: '인라인 요소 간격' },
      { value: 1.5, px: 12, usage: '작은 패딩' },
      { value: 2, px: 16, usage: '기본 간격, 컴포넌트 패딩' },
      { value: 2.5, px: 20, usage: '중간 패딩' },
      { value: 3, px: 24, usage: '카드 내부 패딩' },
      { value: 4, px: 32, usage: '섹션 간격' },
      { value: 5, px: 40, usage: '큰 섹션 간격' },
      { value: 6, px: 48, usage: '페이지 패딩' },
      { value: 7, px: 56, usage: '대형 간격' },
      { value: 8, px: 64, usage: '헤더 높이' },
      { value: 9, px: 72, usage: '대형 패딩' },
      { value: 10, px: 80, usage: '페이지 상단' },
    ];

    return (
      <>
        <DocumentTitle
          title="Spacing System"
          status="Available"
          note="8px grid with semantic tokens"
          brandName="Design System"
          systemName="Starter Kit"
          version="1.0"
        />
        <PageContainer>
          {/* 제목 + 1줄 개요 */}
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Spacing System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            8px 그리드 기반의 기본 스페이싱과 용도별 시멘틱 토큰을 정의합니다.
          </Typography>

          {/* Spacing Scale 테이블 (0-10) */}
          <SectionTitle title="Spacing Scale" description="8px 기반 스페이싱 스케일 (0-10)" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Value</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Pixel</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Visual</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { spacingScale.map((row) => (
                  <TableRow key={ row.value }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.value }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.px }px</TableCell>
                    <TableCell>
                      <SpacingBox size={ row.px } />
                    </TableCell>
                    <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>{ row.usage }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 사용 예시 */}
          <SectionTitle title="사용 예시" description="SPACING 토큰을 import해서 사용" />
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
              borderRadius: 1,
              mb: 4,
            } }
          >
{ `import { SPACING } from '@/styles/tokens';

// 시멘틱 토큰 사용
<Box sx={{ p: SPACING.inset.md }}>        {/* 24px */}
<Box sx={{ gap: SPACING.gap.sm }}>        {/* 8px */}
<Box sx={{ mt: SPACING.section.lg }}>     {/* 48px */}

// 반응형 적용
<Box sx={{
  px: {
    xs: SPACING.page.gutter.xs,  {/* 16px */}
    md: SPACING.page.gutter.md,  {/* 32px */}
  }
}}>

// 숫자 직접 사용 (동일 결과)
<Box sx={{ p: 3, gap: 1, mt: 6 }}>` }
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
              borderRadius: 1,
            } }
          >
{ `/* Spacing 토큰 활용 프롬프트 예시 */

"SPACING.inset.md (p: 3, 24px)를 사용해서 카드 내부 패딩을 설정하고,
SPACING.gap.md (spacing: 2, 16px)로 카드 내 요소들 간격을 만들어줘."

"모바일에서는 SPACING.page.gutter.xs (px: 2, 16px),
데스크탑에서는 SPACING.page.gutter.md (px: 4, 32px)로 반응형 여백을 적용해줘."

"SPACING.section.md (mt: 4, 32px)로 섹션 간 수직 간격을 만들고,
섹션 내부는 SPACING.gap.lg (spacing: 3, 24px)으로 설정해줘."` }
          </Box>
        </PageContainer>
      </>
    );
  },
};

/** 1. Semantic Spacing - 시멘틱 토큰 (실제 tokens.js 참조) */
export const SemanticSpacing = {
  name: '1. Semantic Spacing',
  render: () => {
    const insetUsage = {
      none: '패딩 없음',
      xs: '최소 패딩 (버튼 내부)',
      sm: '작은 카드/컨테이너',
      md: '기본 카드/컨테이너',
      lg: '큰 카드/모달',
      xl: '대형 컨테이너',
    };

    const gapUsage = {
      none: '간격 없음',
      xs: '아이콘-텍스트 간격',
      sm: '인라인 요소 간격',
      md: '기본 그리드 간격',
      lg: '카드 그리드 간격',
      xl: '섹션 간격',
    };

    const stackUsage = {
      xs: '조밀한 리스트',
      sm: '기본 리스트',
      md: '여유로운 리스트',
      lg: '폼 필드 간격',
    };

    const inlineUsage = {
      xs: '아이콘-텍스트',
      sm: '버튼 내 아이콘',
      md: '버튼 그룹',
      lg: '액션 바',
    };

    const sectionUsage = {
      sm: '섹션 타이틀 하단',
      md: '섹션 간 기본 간격',
      lg: '대형 섹션 간격',
      xl: '페이지 섹션 간격',
    };

    return (
      <>
        <DocumentTitle
          title="Semantic Spacing"
          status="Available"
          note="Role-based spacing tokens from tokens.js"
          brandName="Design System"
          systemName="Starter Kit"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Semantic Spacing Tokens
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 2 } }>
            <code>src/styles/tokens.js</code>에서 정의된 실제 토큰 값입니다.
          </Typography>
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
              borderRadius: 1,
              mb: 4,
            } }
          >
{ `import { SPACING } from '@/styles/tokens';` }
          </Box>

          <SectionTitle title="컴포넌트 내부 간격" />

          <SemanticTokenGroup
            name="Inset"
            tokenPath="SPACING.inset"
            tokens={ SPACING.inset }
            description="카드, 컨테이너 등 컴포넌트의 내부 패딩"
            usageMap={ insetUsage }
          />

          <SemanticTokenGroup
            name="Gap"
            tokenPath="SPACING.gap"
            tokens={ SPACING.gap }
            description="Flex/Grid 레이아웃에서 자식 요소 간 간격"
            usageMap={ gapUsage }
          />

          <SectionTitle title="스택/인라인 간격" />

          <SemanticTokenGroup
            name="Stack"
            tokenPath="SPACING.stack"
            tokens={ SPACING.stack }
            description="수직 스택 간격 (리스트, 폼 등)"
            usageMap={ stackUsage }
          />

          <SemanticTokenGroup
            name="Inline"
            tokenPath="SPACING.inline"
            tokens={ SPACING.inline }
            description="수평 인라인 간격 (버튼 그룹, 아이콘-텍스트)"
            usageMap={ inlineUsage }
          />

          <SectionTitle title="레이아웃 간격" />

          <SemanticTokenGroup
            name="Section"
            tokenPath="SPACING.section"
            tokens={ SPACING.section }
            description="섹션 간 수직 간격"
            usageMap={ sectionUsage }
          />

          <Box sx={ { mb: 5 } }>
            <Typography variant="h6" sx={ { fontWeight: 600, mb: 0.5 } }>Page</Typography>
            <Typography variant="body2" color="text.secondary" sx={ { mb: 2 } }>
              페이지 레벨 간격 (gutter, top, bottom)
            </Typography>

            <Typography variant="subtitle2" sx={ { fontWeight: 600, mt: 3, mb: 1 } }>
              page.gutter (좌우 여백)
            </Typography>
            <TableContainer sx={ { mb: 3 } }>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={ { fontWeight: 600 } }>Token</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>Value</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>Pixel</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>Visual</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { Object.entries(SPACING.page.gutter).map(([key, value]) => (
                    <TableRow key={ key }>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>
                        SPACING.page.gutter.{ key }
                      </TableCell>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ value }</TableCell>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ toPx(value) }px</TableCell>
                      <TableCell>
                        <SpacingBox size={ toPx(value) } />
                      </TableCell>
                      <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>
                        { { xs: '모바일', sm: '태블릿', md: '데스크톱', lg: '대형 화면' }[key] }
                      </TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
              page.top / page.bottom (상하 패딩)
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={ { fontWeight: 600 } }>Token</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>Value</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>Pixel</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>Visual</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { Object.entries(SPACING.page.top).map(([key, value]) => (
                    <TableRow key={ `top-${key}` }>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>
                        SPACING.page.top.{ key }
                      </TableCell>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ value }</TableCell>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ toPx(value) }px</TableCell>
                      <TableCell>
                        <SpacingBox size={ toPx(value) } />
                      </TableCell>
                    </TableRow>
                  )) }
                  { Object.entries(SPACING.page.bottom).map(([key, value]) => (
                    <TableRow key={ `bottom-${key}` }>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>
                        SPACING.page.bottom.{ key }
                      </TableCell>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ value }</TableCell>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ toPx(value) }px</TableCell>
                      <TableCell>
                        <SpacingBox size={ toPx(value) } />
                      </TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </PageContainer>
      </>
    );
  },
};

/** 2. Usage - 코드에서의 활용 */
export const Usage = {
  name: '2. Usage',
  render: () => (
    <>
      <DocumentTitle
        title="Spacing Usage"
        status="Available"
        note="How to use SPACING tokens in code"
        brandName="Design System"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          코드에서 사용하기
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          SPACING 토큰을 import해서 sx prop에서 사용합니다.
        </Typography>

        <SectionTitle title="Import" />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            borderRadius: 1,
            mb: 4,
          } }
        >
{ `import { SPACING } from '@/styles/tokens';
// 또는
import { SPACING } from '../../styles/tokens';` }
        </Box>

        <SectionTitle
          title="Inset - 컴포넌트 내부 패딩"
          description="카드, 모달, 컨테이너 등"
        />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            borderRadius: 1,
            mb: 4,
          } }
        >
{ `<Card sx={{ p: SPACING.inset.md }}>           {/* 24px */}
  <CardContent sx={{ p: SPACING.inset.sm }}> {/* 16px */}
    Content
  </CardContent>
</Card>

<Modal>
  <Box sx={{ p: SPACING.inset.lg }}>          {/* 32px */}
    Modal Content
  </Box>
</Modal>` }
        </Box>

        <SectionTitle
          title="Gap - Flex/Grid 레이아웃"
          description="자식 요소 간 간격"
        />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            borderRadius: 1,
            mb: 4,
          } }
        >
{ `<Grid container spacing={SPACING.gap.md}>   {/* 16px */}
  <Grid size={{ xs: 6 }}><Item /></Grid>
  <Grid size={{ xs: 6 }}><Item /></Grid>
</Grid>

<Stack spacing={SPACING.stack.sm}>           {/* 16px */}
  <TextField />
  <TextField />
</Stack>

<Box sx={{ display: 'flex', gap: SPACING.gap.sm }}>  {/* 8px */}
  <Button>A</Button>
  <Button>B</Button>
</Box>` }
        </Box>

        <SectionTitle
          title="Section - 섹션 간 수직 간격"
        />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            borderRadius: 1,
            mb: 4,
          } }
        >
{ `<Box sx={{ mt: SPACING.section.lg }}>        {/* 48px */}
  <Typography variant="h2">Section Title</Typography>
</Box>

<Box sx={{ py: SPACING.section.xl }}>        {/* 64px */}
  <SectionContent />
</Box>` }
        </Box>

        <SectionTitle
          title="Page - 반응형 페이지 레이아웃"
        />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            borderRadius: 1,
            mb: 4,
          } }
        >
{ `<Box
  sx={{
    px: {
      xs: SPACING.page.gutter.xs,  {/* 16px */}
      sm: SPACING.page.gutter.sm,  {/* 24px */}
      md: SPACING.page.gutter.md,  {/* 32px */}
    },
    pt: {
      xs: SPACING.page.top.sm,     {/* 64px */}
      md: SPACING.page.top.lg,     {/* 96px */}
    },
    pb: SPACING.page.bottom.md,    {/* 48px */}
  }}
>
  <PageContent />
</Box>` }
        </Box>

        <SectionTitle title="숫자 직접 사용 비교" />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            borderRadius: 1,
          } }
        >
{ `// SPACING 토큰 사용 (의미 명확)
<Box sx={{ p: SPACING.inset.md, gap: SPACING.gap.sm }} />

// 숫자 직접 사용 (동일 결과, 의미 불명확)
<Box sx={{ p: 3, gap: 1 }} />

// 두 방식 모두 유효함. 프로젝트 컨벤션에 따라 선택.` }
        </Box>
      </PageContainer>
    </>
  ),
};
