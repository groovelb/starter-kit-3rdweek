import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import { DocumentTitle, PageContainer, SectionTitle } from '../../components/storybookDocumentation';

import { componentTokenMap, tokenCategories, componentList } from '../../data/componentTokenMap';

export default {
  title: 'Style/Component Tokens',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## 컴포넌트별 토큰 사용 가이드

MUI 컴포넌트가 디자인될 때 어떤 테마 토큰을 참조하는지 보여줍니다.

### 목적
- 디자이너가 각 컴포넌트의 스타일링 구조를 이해
- 토큰 변경 시 영향받는 컴포넌트 파악
        `,
      },
    },
  },
};

/** 컴포넌트 토큰 문서 */
export const Default = {
  render: () => {
    const categories = ['palette', 'typography', 'spacing', 'shape', 'shadows', 'transitions', 'zIndex'];

    const categoryDescriptions = {
      palette: '색상 토큰 - 버튼, 칩, 알림 등 대부분의 컬러풀한 컴포넌트에 영향',
      typography: '타이포그래피 토큰 - 모든 텍스트 요소에 영향',
      spacing: '간격 토큰 (8px 기반) - 모든 컴포넌트의 여백에 영향',
      shape: '모양 토큰 - 카드, 버튼, 인풋 필드 등 모서리에 영향',
      shadows: '그림자 토큰 - elevation 있는 컴포넌트에 영향',
      transitions: '전환 효과 토큰 - 애니메이션 있는 컴포넌트에 영향',
      zIndex: '레이어 순서 토큰 - 모달, 드롭다운 등에 영향',
    };

    const matrix = componentList.map((name) => {
      const component = componentTokenMap[name];
      return {
        name,
        description: component?.description || '',
        categories: categories.map((cat) => component?.tokens[cat]?.items.length || 0),
        total: Object.values(component?.tokens || {}).reduce(
          (sum, cat) => sum + (cat.items?.length || 0), 0
        ),
      };
    });

    return (
      <>
        <DocumentTitle
          title="Component Tokens"
          status="Available"
          note="Theme token usage by component"
          brandName="Design System"
          systemName="Starter Kit"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Component Token Usage
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            MUI 컴포넌트가 테마의 어떤 토큰을 사용하는지 확인합니다.
          </Typography>

          <SectionTitle title="Token Categories" description="테마 토큰 카테고리 설명" />

          <TableContainer sx={ { mb: 6 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: '20%' } }>Category</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: '20%' } }>Name</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { categories.map((cat) => (
                  <TableRow key={ cat }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ cat }</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>{ tokenCategories[cat]?.name }</TableCell>
                    <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>
                      { categoryDescriptions[cat] }
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          <SectionTitle title="Usage Matrix" description="컴포넌트 × 토큰 카테고리 사용 현황 (숫자는 토큰 개수)" />

          <TableContainer sx={ { mb: 6 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: '15%' } }>Component</TableCell>
                  { categories.map((cat) => (
                    <TableCell key={ cat } align="center" sx={ { fontWeight: 600, fontSize: 11 } }>
                      { tokenCategories[cat]?.name }
                    </TableCell>
                  )) }
                  <TableCell align="center" sx={ { fontWeight: 600 } }>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { matrix.map((row) => (
                  <TableRow key={ row.name }>
                    <TableCell sx={ { fontWeight: 600 } }>{ row.name }</TableCell>
                    { row.categories.map((count, idx) => (
                      <TableCell key={ idx } align="center">
                        { count > 0 ? (
                          <Box
                            sx={ {
                              display: 'inline-block',
                              minWidth: 24,
                              py: 0.25,
                              px: 0.75,
                              backgroundColor: count >= 5 ? 'primary.main' : count >= 3 ? 'grey.300' : 'grey.100',
                              color: count >= 5 ? 'white' : 'text.primary',
                              fontSize: 12,
                              fontWeight: 600,
                            } }
                          >
                            { count }
                          </Box>
                        ) : (
                          <Typography variant="caption" color="text.disabled">-</Typography>
                        ) }
                      </TableCell>
                    )) }
                    <TableCell align="center" sx={ { fontWeight: 600 } }>{ row.total }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={ { display: 'flex', gap: 3, mb: 6 } }>
            <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
              <Box sx={ { width: 24, height: 20, backgroundColor: 'primary.main' } } />
              <Typography variant="caption">5+ (많이 사용)</Typography>
            </Box>
            <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
              <Box sx={ { width: 24, height: 20, backgroundColor: 'grey.300' } } />
              <Typography variant="caption">3-4 (보통)</Typography>
            </Box>
            <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
              <Box sx={ { width: 24, height: 20, backgroundColor: 'grey.100' } } />
              <Typography variant="caption">1-2 (적게 사용)</Typography>
            </Box>
          </Box>

          <SectionTitle title="Component Details" description="컴포넌트별 상세 토큰 정보" />

          { componentList.map((name) => {
            const component = componentTokenMap[name];
            if (!component) return null;

            return (
              <Box key={ name } sx={ { mb: 4 } }>
                <Typography variant="h6" sx={ { fontWeight: 600, mb: 1 } }>
                  { component.name }
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={ { mb: 2 } }>
                  { component.description }
                </Typography>

                <TableContainer sx={ { mb: 2 } }>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={ { fontWeight: 600, width: '15%' } }>Category</TableCell>
                        <TableCell sx={ { fontWeight: 600, width: '30%' } }>Token</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Role</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { Object.entries(component.tokens).flatMap(([category, data]) =>
                        data.items.map((item, idx) => (
                          <TableRow key={ `${category}-${idx}` }>
                            { idx === 0 ? (
                              <TableCell
                                rowSpan={ data.items.length }
                                sx={ { fontWeight: 600, verticalAlign: 'top' } }
                              >
                                { tokenCategories[category]?.name }
                              </TableCell>
                            ) : null }
                            <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>
                              { item.token }
                            </TableCell>
                            <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>
                              { item.role }
                            </TableCell>
                          </TableRow>
                        ))
                      ) }
                    </TableBody>
                  </Table>
                </TableContainer>

                <Divider />
              </Box>
            );
          }) }
        </PageContainer>
      </>
    );
  },
};
