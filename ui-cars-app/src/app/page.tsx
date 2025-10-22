'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';


interface Data {
  id: number;
  make: string;
  model: string;
  year: number;
  features: string;
}

function createData(
  id: number,
  make: string,
  model: string,
  year: number,
  features: string[]
): Data {
  return {
    id,
    make,
    model,
    year,
    features: features.join(', ')
  };
}

// const rows = [
//   createData(1, 'Toyota', 'Camry', 2020, ['Bluetooth', 'Backup Camera']),
//   createData(2, 'Honda', 'Civic', 2019, ['Lane Assist', 'Cruise Control']),
//   createData(3, 'Ford', 'Mustang', 2021, ['Sport Package', 'Apple CarPlay']),
//   createData(4, 'Chevrolet', 'Impala', 2018, ['Heated Seats', 'Keyless Entry']),
//   createData(5, 'BMW', '3 Series', 2022, ['Navigation', 'Leather Seats']),
//   createData(6, 'Audi', 'A4', 2021, ['Quattro', 'Virtual Cockpit']),
//   createData(7, 'Mercedes-Benz', 'C-Class', 2020, ['Sunroof', 'Ambient Lighting']),
//   createData(8, 'Tesla', 'Model 3', 2022, ['Autopilot', 'Long Range']),
//   createData(9, 'Hyundai', 'Elantra', 2019, ['Wireless Charging', 'Blind Spot Monitor']),
//   createData(10, 'Kia', 'Sportage', 2021, ['All-Wheel Drive', 'Rear Cross Traffic Alert']),
//   createData(11, 'Subaru', 'Outback', 2020, ['Symmetrical AWD', 'Roof Rails']),
//   createData(12, 'Volkswagen', 'Golf', 2018, ['Adaptive Cruise', 'Fog Lights']),
//   createData(13, 'Mazda', 'CX-5', 2021, ['G-Vectoring Control', 'Apple CarPlay']),
// ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function handleFilter() {}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const columns: GridColDef<(typeof any)[number]>[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0
  },
  {
    field: 'make',
    headerName: 'Make',
    flex: 0,
    editable: false,
  },
  {
    field: 'model',
    headerName: 'Model',
    flex: 0,
    editable: false,
  },
  {
    field: 'year',
    headerName: 'Year',
    flex: 0,
    editable: false,
  },
  {
    field: 'features',
    headerName: 'Features',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    // valueGetter: (valu, row) => (row.features).join(', '),
  }
];

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    label: 'ID',
  },
  {
    id: 'make',
    numeric: false,
    label: 'Make',
  },
  {
    id: 'model',
    numeric: false,
    label: 'Model',
  },
  {
    id: 'year',
    numeric: true,
    label: 'Year',
  },
  {
    id: 'features',
    numeric: false,
    label: 'Features',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }
      ]}
    >
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >Cars</Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const router = useRouter();
  const [rows, setData] = React.useState<Data[]>([]);

  useEffect(() => {
      async function fetchData() {
      try {
        const response = await fetch(`/api/v1/cars`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err) {
        // setError(err);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, []);


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (row, event: React.MouseEvent<unknown>) => {
    event.preventDefault();
    router.push(`/cars/details/${row.id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.make}</TableCell>
                    <TableCell align="left">{row.model}</TableCell>
                    <TableCell align="left">{row.year}</TableCell>
                    <TableCell align="left">{row.features}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper> */}
      <Paper>
        <DataGrid
          label="Cars"
          rows={rows}
          onRowClick={handleRowClick}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // disableRowSelectionOnClick
          />
      </Paper>
    </Box>
  );
}