'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Car } from './types/car';

const columns: GridColDef<Car>[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0,
    width: 90
  },
  {
    field: 'make',
    headerName: 'Make',
    flex: 0,
    width: 200,
    editable: false,
  },
  {
    field: 'model',
    headerName: 'Model',
    flex: 0,
    width: 200,
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
    valueGetter: (value, row) => row.features?.length ? (row.features).join(', ') : 'None',
  }
];

export default function EnhancedTable() {
  const router = useRouter();
  const [rows, setData] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
      async function fetchData() {
      try {
        const response = await fetch(`/api/v1/cars`);
        setLoading(false);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        // setError(err);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, []);


  const handleRowClick = (row: GridRowParams<Car>, event: React.MouseEvent<unknown>) => {
    event.preventDefault();
    router.push(`/cars/details/${row.id}`);
  };

  const handleAddButtonClick = () => {
    router.push('/cars/add');
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper>
        <DataGrid
          label="Cars"
          loading={loading}
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
          showToolbar
          />
         <Button size="small" variant='contained' onClick={handleAddButtonClick} sx={{ margin: 2, background: "var(--eko-purple)" }}>Add Car</Button>
      </Paper>
    </Box>
  );
}