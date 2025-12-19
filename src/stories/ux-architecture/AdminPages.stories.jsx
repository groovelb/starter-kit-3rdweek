import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../components/storybookDocumentation';
import {
  pages,
  orderStatuses,
  statusWorkflow,
  errorStates,
} from '../../data/ux-architecture';

export default {
  title: 'UX Architecture/Admin Pages',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Admin Pages
 *
 * 각 어드민 페이지의 상세 스펙을 시각화합니다.
 * 소스: docs/supabase/information-architecture.md
 */
export const Docs = {
  render: () => {
    const [tabValue, setTabValue] = useState(0);

    const pageKeys = Object.keys(pages);
    const currentPage = pages[pageKeys[tabValue]];

    return (
      <>
        <DocumentTitle
          title="Admin Pages"
          status="Planned"
          note="Admin page specifications"
          brandName="Lumenstate"
          systemName="Admin"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            어드민 페이지 스펙
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            각 페이지별 UI 요소, 테이블 컬럼, 필터, 폼 필드 정의입니다.
          </Typography>

          {/* Page Tabs */}
          <Box sx={ { borderBottom: 1, borderColor: 'divider', mb: 3 } }>
            <Tabs
              value={ tabValue }
              onChange={ (e, v) => setTabValue(v) }
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Login" />
              <Tab label="Product List" />
              <Tab label="Product Edit" />
              <Tab label="Order List" />
              <Tab label="Order Detail" />
            </Tabs>
          </Box>

          {/* Page Content */}
          <Box sx={ { mb: 4 } }>
            <Box sx={ { display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' } }>
              <Chip
                label={ currentPage.url }
                color="primary"
                variant="outlined"
                sx={ { fontFamily: 'monospace' } }
              />
              <Typography variant="body2" color="text.secondary" sx={ { alignSelf: 'center' } }>
                { currentPage.purpose }
              </Typography>
            </Box>

            {/* Layout Components */}
            { currentPage.layoutComponents && (
              <>
                <SectionTitle title="레이아웃 구성" />
                <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 } }>
                  { currentPage.layoutComponents.map((comp) => (
                    <Chip key={ comp } label={ comp } size="small" />
                  )) }
                </Box>
              </>
            ) }

            {/* UI Elements (Login) */}
            { currentPage.uiElements && (
              <>
                <SectionTitle title="UI 요소" />
                <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 } }>
                  { currentPage.uiElements.map((el) => (
                    <Chip key={ el } label={ el } size="small" variant="outlined" />
                  )) }
                </Box>
              </>
            ) }

            {/* Flow (Login) */}
            { currentPage.flow && (
              <>
                <SectionTitle title="플로우" />
                <Stepper orientation="vertical" sx={ { mb: 3 } }>
                  { currentPage.flow.map((step, idx) => (
                    <Step key={ idx } active>
                      <StepLabel>{ step }</StepLabel>
                    </Step>
                  )) }
                </Stepper>
              </>
            ) }

            {/* Table Columns */}
            { currentPage.tableColumns && (
              <>
                <SectionTitle title="테이블 컬럼" />
                <TableContainer sx={ { mb: 3 } }>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={ { fontWeight: 600 } }>Column</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Field</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Width</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Sortable</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { currentPage.tableColumns.map((col) => (
                        <TableRow key={ col.column }>
                          <TableCell>{ col.column }</TableCell>
                          <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ col.field }</TableCell>
                          <TableCell>{ col.width }</TableCell>
                          <TableCell>
                            <Chip
                              label={ col.sortable ? 'Yes' : 'No' }
                              size="small"
                              color={ col.sortable ? 'success' : 'default' }
                            />
                          </TableCell>
                        </TableRow>
                      )) }
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) }

            {/* Filters */}
            { currentPage.filters && (
              <>
                <SectionTitle title="필터" />
                <TableContainer sx={ { mb: 3 } }>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={ { fontWeight: 600 } }>Name</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Type / Options</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { currentPage.filters.map((filter) => (
                        <TableRow key={ filter.name }>
                          <TableCell>{ filter.name }</TableCell>
                          <TableCell>
                            { filter.options ? (
                              <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                                { filter.options.map((opt) => (
                                  <Chip key={ opt } label={ opt } size="small" variant="outlined" />
                                )) }
                              </Box>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                { filter.type }: { filter.placeholder }
                              </Typography>
                            ) }
                          </TableCell>
                        </TableRow>
                      )) }
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) }

            {/* Form Fields */}
            { currentPage.formFields && (
              <>
                <SectionTitle title="폼 필드" />
                <TableContainer sx={ { mb: 3 } }>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={ { fontWeight: 600 } }>Section</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Field</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Type</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Required</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Validation</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { currentPage.formFields.map((field) => (
                        <TableRow key={ `${field.section}-${field.field}` }>
                          <TableCell>{ field.section }</TableCell>
                          <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ field.field }</TableCell>
                          <TableCell>{ field.type }</TableCell>
                          <TableCell>
                            <Chip
                              label={ field.required ? (typeof field.required === 'string' ? field.required : 'Yes') : 'No' }
                              size="small"
                              color={ field.required ? 'error' : 'default' }
                            />
                          </TableCell>
                          <TableCell sx={ { fontSize: 12 } }>{ field.validation }</TableCell>
                        </TableRow>
                      )) }
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) }

            {/* Sections (Order Detail) */}
            { currentPage.sections && (
              <>
                <SectionTitle title="페이지 섹션" />
                { currentPage.sections.map((section) => (
                  <Box
                    key={ section.name }
                    sx={ {
                      p: 2,
                      mb: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                    } }
                  >
                    <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
                      { section.name }
                    </Typography>
                    <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1 } }>
                      { section.items.map((item) => (
                        <Chip key={ item } label={ item } size="small" variant="outlined" />
                      )) }
                    </Box>
                  </Box>
                )) }
              </>
            ) }

            {/* Actions */}
            { currentPage.actions && (
              <>
                <SectionTitle title="액션" />
                <TableContainer sx={ { mb: 3 } }>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={ { fontWeight: 600 } }>Action</TableCell>
                        <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { currentPage.actions.map((action) => (
                        <TableRow key={ action.action }>
                          <TableCell>{ action.action }</TableCell>
                          <TableCell>{ action.description }</TableCell>
                        </TableRow>
                      )) }
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) }
          </Box>
        </PageContainer>
      </>
    );
  },
};

/**
 * Order Status Workflow
 */
export const OrderStatus = {
  render: () => (
    <>
      <DocumentTitle
        title="Order Status Workflow"
        status="Planned"
        note="Order status definitions and transitions"
        brandName="Lumenstate"
        systemName="Admin"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          주문 상태 워크플로우
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          주문 상태 정의 및 허용된 상태 전환입니다.
        </Typography>

        {/* Status Definitions */}
        <SectionTitle title="상태 정의" />
        <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 } }>
          { orderStatuses.map((status) => (
            <Box
              key={ status.value }
              sx={ {
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                minWidth: 150,
              } }
            >
              <Chip
                label={ status.labelKo }
                color={ status.color }
                size="small"
                sx={ { mb: 1 } }
              />
              <Typography variant="caption" display="block" color="text.secondary">
                { status.value } / { status.labelEn }
              </Typography>
            </Box>
          )) }
        </Box>

        {/* Status Workflow */}
        <SectionTitle title="상태 전환" description="허용된 상태 변경" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>From</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>To (Allowed)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { statusWorkflow.map((row) => (
                <TableRow key={ row.from }>
                  <TableCell sx={ { fontFamily: 'monospace' } }>{ row.from }</TableCell>
                  <TableCell>
                    { row.to.length > 0 ? (
                      <Box sx={ { display: 'flex', gap: 1 } }>
                        { row.to.map((to) => (
                          <Chip key={ to } label={ to } size="small" variant="outlined" />
                        )) }
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        (final state)
                      </Typography>
                    ) }
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Visual Workflow */}
        <SectionTitle title="시각적 워크플로우" />
        <Box sx={ { mb: 4 } }>
          <Stepper alternativeLabel>
            { orderStatuses.filter(s => s.value !== 'cancelled').map((status) => (
              <Step key={ status.value } completed={ status.value === 'delivered' }>
                <StepLabel>
                  <Chip
                    label={ status.labelKo }
                    color={ status.color }
                    size="small"
                  />
                </StepLabel>
              </Step>
            )) }
          </Stepper>
          <Typography variant="caption" color="text.secondary" sx={ { display: 'block', textAlign: 'center', mt: 2 } }>
            * cancelled 상태는 pending 또는 confirmed에서만 전환 가능
          </Typography>
        </Box>
      </PageContainer>
    </>
  ),
};

/**
 * Error States
 */
export const ErrorStates = {
  render: () => (
    <>
      <DocumentTitle
        title="Error States"
        status="Planned"
        note="Empty states and error messages"
        brandName="Lumenstate"
        systemName="Admin"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          에러 상태
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          빈 상태 및 에러 메시지 정의입니다.
        </Typography>

        {/* Empty States */}
        <SectionTitle title="빈 상태 (Empty States)" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Context</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { errorStates.empty.map((row) => (
                <TableRow key={ row.context }>
                  <TableCell>{ row.context }</TableCell>
                  <TableCell>{ row.message }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Error Messages */}
        <SectionTitle title="에러 메시지" />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Context</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { errorStates.error.map((row) => (
                <TableRow key={ row.context }>
                  <TableCell>{ row.context }</TableCell>
                  <TableCell sx={ { color: 'error.main' } }>{ row.message }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};
