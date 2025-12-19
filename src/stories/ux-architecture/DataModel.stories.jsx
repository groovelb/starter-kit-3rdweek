import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  TreeNode,
} from '../../components/storybookDocumentation';
import {
  tables,
  relationships,
  tablesOverview,
  apiEndpoints,
  storageBuckets,
  dataModelTree,
} from '../../data/ux-architecture';

export default {
  title: 'UX Architecture/Data Model',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Data Model Overview
 *
 * 데이터베이스 스키마 및 관계를 시각화합니다.
 * 소스: docs/supabase/data-model.md
 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Data Model"
        status="Planned"
        note="Database schema and relationships"
        brandName="Lumenstate"
        systemName="Supabase"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          데이터 모델
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          Supabase 데이터베이스 스키마, 테이블 관계, API 엔드포인트 정의입니다.
        </Typography>

        {/* Data Model Tree */}
        <SectionTitle title="테이블 구조" description="클릭하여 펼치기/접기" />
        <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 4 } }>
          { Object.entries(dataModelTree).map(([key, value]) => (
            <TreeNode
              key={ key }
              keyName={ key }
              value={ value }
              depth={ 0 }
              defaultOpen={ false }
            />
          )) }
        </Box>

        {/* Tables Overview */}
        <SectionTitle title="테이블 개요" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Table</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Primary Key</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { tablesOverview.map((row) => (
                <TableRow key={ row.table }>
                  <TableCell sx={ { fontFamily: 'monospace', fontWeight: 600 } }>{ row.table }</TableCell>
                  <TableCell>{ row.description }</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.pk }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Relationships */}
        <SectionTitle title="테이블 관계" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Relationship</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Type</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { relationships.map((row) => (
                <TableRow key={ row.relationship }>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.relationship }</TableCell>
                  <TableCell>
                    <Chip label={ row.type } size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{ row.description }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Storage Buckets */}
        <SectionTitle title="Storage 버킷" />
        { storageBuckets.map((bucket) => (
          <Box
            key={ bucket.bucket }
            sx={ {
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            } }
          >
            <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 1 } }>
              <Typography variant="subtitle2" sx={ { fontFamily: 'monospace', fontWeight: 600 } }>
                { bucket.bucket }
              </Typography>
              <Chip
                label={ bucket.public ? 'public' : 'private' }
                size="small"
                color={ bucket.public ? 'success' : 'default' }
              />
            </Box>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  { bucket.structure.map((file) => (
                    <TableRow key={ file.path }>
                      <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ file.path }</TableCell>
                      <TableCell>{ file.description }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )) }
      </PageContainer>
    </>
  ),
};

/**
 * Database Schema Details
 */
export const Schema = {
  render: () => {
    const [tabValue, setTabValue] = useState(0);
    const tableKeys = Object.keys(tables);
    const currentTable = tables[tableKeys[tabValue]];

    return (
      <>
        <DocumentTitle
          title="Database Schema"
          status="Planned"
          note="Detailed table field definitions"
          brandName="Lumenstate"
          systemName="Supabase"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            데이터베이스 스키마
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            테이블별 필드 정의 및 제약조건입니다.
          </Typography>

          {/* Table Tabs */}
          <Box sx={ { borderBottom: 1, borderColor: 'divider', mb: 3 } }>
            <Tabs
              value={ tabValue }
              onChange={ (e, v) => setTabValue(v) }
              variant="scrollable"
              scrollButtons="auto"
            >
              { tableKeys.map((key) => (
                <Tab key={ key } label={ key } sx={ { fontFamily: 'monospace', fontSize: 12 } } />
              )) }
            </Tabs>
          </Box>

          {/* Table Info */}
          <Box sx={ { mb: 2 } }>
            <Typography variant="h6" sx={ { fontFamily: 'monospace', mb: 1 } }>
              { tableKeys[tabValue] }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              { currentTable.description }
            </Typography>
          </Box>

          {/* Fields Table */}
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Field</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Type</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Constraint</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { currentTable.fields.map((field) => (
                  <TableRow key={ field.name }>
                    <TableCell sx={ { fontFamily: 'monospace', fontWeight: 600, fontSize: 13 } }>
                      { field.name }
                    </TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>
                      { field.type }
                    </TableCell>
                    <TableCell>
                      { field.constraint && (
                        <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                          { field.constraint.split(', ').map((c) => (
                            <Chip
                              key={ c }
                              label={ c }
                              size="small"
                              color={
                                c.includes('PK') ? 'primary' :
                                c.includes('FK') ? 'secondary' :
                                c.includes('NOT NULL') ? 'error' :
                                'default'
                              }
                              variant="outlined"
                              sx={ { fontSize: 10 } }
                            />
                          )) }
                        </Box>
                      ) }
                    </TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ field.description }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </PageContainer>
      </>
    );
  },
};

/**
 * API Endpoints
 */
export const API = {
  render: () => (
    <>
      <DocumentTitle
        title="API Endpoints"
        status="Planned"
        note="REST API endpoint definitions"
        brandName="Lumenstate"
        systemName="Supabase"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          API 엔드포인트
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          Supabase REST API 엔드포인트 목록입니다.
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Method</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Endpoint</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Auth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { apiEndpoints.map((row) => (
                <TableRow key={ `${row.method}-${row.endpoint}` }>
                  <TableCell>
                    <Chip
                      label={ row.method }
                      size="small"
                      color={
                        row.method === 'GET' ? 'success' :
                        row.method === 'POST' ? 'primary' :
                        row.method === 'PATCH' ? 'warning' :
                        row.method === 'DELETE' ? 'error' :
                        'default'
                      }
                      sx={ { fontFamily: 'monospace', fontWeight: 600 } }
                    />
                  </TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.endpoint }</TableCell>
                  <TableCell>{ row.description }</TableCell>
                  <TableCell>
                    <Chip
                      label={ row.auth }
                      size="small"
                      variant="outlined"
                      color={ row.auth === 'Admin' ? 'error' : 'default' }
                    />
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};
