'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { Button } from '@mui/material';

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

export default function EnhancedTable() {
  const router = useRouter();
  const [rows, setData] = React.useState<Data[]>([]);
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


  const handleRowClick = (row, event: React.MouseEvent<unknown>) => {
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