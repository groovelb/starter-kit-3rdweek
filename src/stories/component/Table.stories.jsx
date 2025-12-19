import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

export default {
  title: 'MUI Component/DataDisplay/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Table

데이터를 행과 열로 구성하여 표시하는 테이블 컴포넌트입니다.

### 사용 패턴

| 패턴 | 설명 | 예시 |
|------|------|------|
| Basic | 기본 테이블 | \`<Table><TableBody>...</TableBody></Table>\` |
| Dense | 밀집 테이블 | \`size="small"\` |
| Striped | 줄무늬 배경 | 홀수/짝수 행 배경색 |
| Sortable | 정렬 가능 | \`TableSortLabel\` 사용 |
| Selectable | 선택 가능 | \`Checkbox\` 포함 |
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: '테이블 셀의 크기를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    stickyHeader: {
      control: 'boolean',
      description: '테이블 헤더를 고정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    padding: {
      control: 'select',
      options: ['normal', 'checkbox', 'none'],
      description: '셀 패딩을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' },
      },
    },
  },
};

/** 샘플 데이터 생성 */
const createData = (id, name, calories, fat, carbs, protein) => ({
  id,
  name,
  calories,
  fat,
  carbs,
  protein,
});

const rows = [
  createData(1, '프로즌 요거트', 159, 6.0, 24, 4.0),
  createData(2, '아이스크림 샌드위치', 237, 9.0, 37, 4.3),
  createData(3, '에클레어', 262, 16.0, 24, 6.0),
  createData(4, '컵케이크', 305, 3.7, 67, 4.3),
  createData(5, '진저브레드', 356, 16.0, 49, 3.9),
];

/** 사용자 데이터 */
const userRows = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: '관리자', status: '활성' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: '편집자', status: '활성' },
  { id: 3, name: '박민수', email: 'park@example.com', role: '뷰어', status: '비활성' },
  { id: 4, name: '최수진', email: 'choi@example.com', role: '편집자', status: '활성' },
  { id: 5, name: '정대현', email: 'jung@example.com', role: '뷰어', status: '대기' },
];

/** 기본 테이블 */
export const Default = {
  args: {
    size: 'medium',
    stickyHeader: false,
    padding: 'normal',
  },
  render: (args) => (
    <TableContainer component={ Paper } sx={ { maxHeight: args.stickyHeader ? 300 : 'none' } }>
      <Table size={ args.size } stickyHeader={ args.stickyHeader } padding={ args.padding }>
        <TableHead>
          <TableRow>
            <TableCell>디저트 (100g)</TableCell>
            <TableCell align="right">칼로리</TableCell>
            <TableCell align="right">지방 (g)</TableCell>
            <TableCell align="right">탄수화물 (g)</TableCell>
            <TableCell align="right">단백질 (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((row) => (
            <TableRow key={ row.id }>
              <TableCell component="th" scope="row">
                { row.name }
              </TableCell>
              <TableCell align="right">{ row.calories }</TableCell>
              <TableCell align="right">{ row.fat }</TableCell>
              <TableCell align="right">{ row.carbs }</TableCell>
              <TableCell align="right">{ row.protein }</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

/** 밀집 테이블 (Dense) */
export const Dense = {
  render: () => (
    <TableContainer component={ Paper }>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>디저트 (100g)</TableCell>
            <TableCell align="right">칼로리</TableCell>
            <TableCell align="right">지방 (g)</TableCell>
            <TableCell align="right">탄수화물 (g)</TableCell>
            <TableCell align="right">단백질 (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((row) => (
            <TableRow key={ row.id }>
              <TableCell component="th" scope="row">
                { row.name }
              </TableCell>
              <TableCell align="right">{ row.calories }</TableCell>
              <TableCell align="right">{ row.fat }</TableCell>
              <TableCell align="right">{ row.carbs }</TableCell>
              <TableCell align="right">{ row.protein }</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

/** 줄무늬 테이블 (Striped) */
export const Striped = {
  render: () => (
    <TableContainer component={ Paper }>
      <Table>
        <TableHead>
          <TableRow sx={ { backgroundColor: 'primary.main' } }>
            <TableCell sx={ { color: 'white', fontWeight: 700 } }>디저트 (100g)</TableCell>
            <TableCell sx={ { color: 'white', fontWeight: 700 } } align="right">칼로리</TableCell>
            <TableCell sx={ { color: 'white', fontWeight: 700 } } align="right">지방 (g)</TableCell>
            <TableCell sx={ { color: 'white', fontWeight: 700 } } align="right">탄수화물 (g)</TableCell>
            <TableCell sx={ { color: 'white', fontWeight: 700 } } align="right">단백질 (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((row, index) => (
            <TableRow
              key={ row.id }
              sx={ { backgroundColor: index % 2 === 0 ? 'grey.50' : 'white' } }
            >
              <TableCell component="th" scope="row">
                { row.name }
              </TableCell>
              <TableCell align="right">{ row.calories }</TableCell>
              <TableCell align="right">{ row.fat }</TableCell>
              <TableCell align="right">{ row.carbs }</TableCell>
              <TableCell align="right">{ row.protein }</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

/** 선택 가능한 테이블 */
export const Selectable = {
  render: () => {
    const [selected, setSelected] = useState([]);

    const handleSelectAll = (event) => {
      if (event.target.checked) {
        setSelected(rows.map((row) => row.id));
      } else {
        setSelected([]);
      }
    };

    const handleSelect = (id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = [...selected, id];
      } else {
        newSelected = selected.filter((item) => item !== id);
      }

      setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
      <TableContainer component={ Paper }>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={ selected.length > 0 && selected.length < rows.length }
                  checked={ rows.length > 0 && selected.length === rows.length }
                  onChange={ handleSelectAll }
                />
              </TableCell>
              <TableCell>디저트 (100g)</TableCell>
              <TableCell align="right">칼로리</TableCell>
              <TableCell align="right">지방 (g)</TableCell>
              <TableCell align="right">탄수화물 (g)</TableCell>
              <TableCell align="right">단백질 (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  key={ row.id }
                  hover
                  onClick={ () => handleSelect(row.id) }
                  selected={ isItemSelected }
                  sx={ { cursor: 'pointer' } }
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={ isItemSelected } />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    { row.name }
                  </TableCell>
                  <TableCell align="right">{ row.calories }</TableCell>
                  <TableCell align="right">{ row.fat }</TableCell>
                  <TableCell align="right">{ row.carbs }</TableCell>
                  <TableCell align="right">{ row.protein }</TableCell>
                </TableRow>
              );
            }) }
          </TableBody>
        </Table>
        <Box sx={ { p: 2, borderTop: 1, borderColor: 'divider' } }>
          <Typography variant="body2" color="text.secondary">
            { selected.length }개 선택됨
          </Typography>
        </Box>
      </TableContainer>
    );
  },
};

/** 정렬 가능한 테이블 */
export const Sortable = {
  render: () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const handleSort = (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const sortedRows = [...rows].sort((a, b) => {
      if (order === 'asc') {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      }
      return a[orderBy] > b[orderBy] ? -1 : 1;
    });

    const headCells = [
      { id: 'name', label: '디저트 (100g)', align: 'left' },
      { id: 'calories', label: '칼로리', align: 'right' },
      { id: 'fat', label: '지방 (g)', align: 'right' },
      { id: 'carbs', label: '탄수화물 (g)', align: 'right' },
      { id: 'protein', label: '단백질 (g)', align: 'right' },
    ];

    return (
      <TableContainer component={ Paper }>
        <Table>
          <TableHead>
            <TableRow>
              { headCells.map((headCell) => (
                <TableCell
                  key={ headCell.id }
                  align={ headCell.align }
                  sortDirection={ orderBy === headCell.id ? order : false }
                >
                  <TableSortLabel
                    active={ orderBy === headCell.id }
                    direction={ orderBy === headCell.id ? order : 'asc' }
                    onClick={ () => handleSort(headCell.id) }
                  >
                    { headCell.label }
                  </TableSortLabel>
                </TableCell>
              )) }
            </TableRow>
          </TableHead>
          <TableBody>
            { sortedRows.map((row) => (
              <TableRow key={ row.id } hover>
                <TableCell component="th" scope="row">
                  { row.name }
                </TableCell>
                <TableCell align="right">{ row.calories }</TableCell>
                <TableCell align="right">{ row.fat }</TableCell>
                <TableCell align="right">{ row.carbs }</TableCell>
                <TableCell align="right">{ row.protein }</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};

/** 페이지네이션 테이블 */
export const WithPagination = {
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>디저트 (100g)</TableCell>
                <TableCell align="right">칼로리</TableCell>
                <TableCell align="right">지방 (g)</TableCell>
                <TableCell align="right">탄수화물 (g)</TableCell>
                <TableCell align="right">단백질 (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={ row.id }>
                    <TableCell component="th" scope="row">
                      { row.name }
                    </TableCell>
                    <TableCell align="right">{ row.calories }</TableCell>
                    <TableCell align="right">{ row.fat }</TableCell>
                    <TableCell align="right">{ row.carbs }</TableCell>
                    <TableCell align="right">{ row.protein }</TableCell>
                  </TableRow>
                )) }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ [2, 3, 5] }
          component="div"
          count={ rows.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onPageChange={ handleChangePage }
          onRowsPerPageChange={ handleChangeRowsPerPage }
          labelRowsPerPage="페이지당 행:"
        />
      </Paper>
    );
  },
};

/** 실제 사용 예시 - 사용자 목록 */
export const UserList = {
  render: () => {
    const getStatusColor = (status) => {
      switch (status) {
        case '활성': return 'success';
        case '비활성': return 'error';
        case '대기': return 'warning';
        default: return 'default';
      }
    };

    const getRoleVariant = (role) => {
      switch (role) {
        case '관리자': return 'filled';
        default: return 'outlined';
      }
    };

    return (
      <TableContainer component={ Paper }>
        <Table>
          <TableHead>
            <TableRow sx={ { backgroundColor: 'grey.100' } }>
              <TableCell sx={ { fontWeight: 700 } }>이름</TableCell>
              <TableCell sx={ { fontWeight: 700 } }>이메일</TableCell>
              <TableCell sx={ { fontWeight: 700 } }>역할</TableCell>
              <TableCell sx={ { fontWeight: 700 } }>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { userRows.map((row) => (
              <TableRow key={ row.id } hover>
                <TableCell>
                  <Typography variant="body2" sx={ { fontWeight: 500 } }>
                    { row.name }
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    { row.email }
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={ row.role }
                    size="small"
                    variant={ getRoleVariant(row.role) }
                    color={ row.role === '관리자' ? 'primary' : 'default' }
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={ row.status }
                    size="small"
                    color={ getStatusColor(row.status) }
                  />
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};

/** 고정 헤더 테이블 */
export const StickyHeader = {
  render: () => (
    <Paper sx={ { width: '100%', overflow: 'hidden' } }>
      <TableContainer sx={ { maxHeight: 200 } }>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={ { fontWeight: 700 } }>디저트 (100g)</TableCell>
              <TableCell sx={ { fontWeight: 700 } } align="right">칼로리</TableCell>
              <TableCell sx={ { fontWeight: 700 } } align="right">지방 (g)</TableCell>
              <TableCell sx={ { fontWeight: 700 } } align="right">탄수화물 (g)</TableCell>
              <TableCell sx={ { fontWeight: 700 } } align="right">단백질 (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((row) => (
              <TableRow key={ row.id } hover>
                <TableCell component="th" scope="row">
                  { row.name }
                </TableCell>
                <TableCell align="right">{ row.calories }</TableCell>
                <TableCell align="right">{ row.fat }</TableCell>
                <TableCell align="right">{ row.carbs }</TableCell>
                <TableCell align="right">{ row.protein }</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  ),
};
