'use client';

import { Button, CardActions, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';

export default function AddCar() {
    const router = useRouter();

  function handleAdd() {
    // Handle update logic here
    console.log('Add');
  }

  function handleCancel() {
    // Handle delete logic here
    console.log('Cancel');
    router.push('/');
  }

  return (
    <Card>
        <CardContent>
          <Typography
            sx={{ textAlign: 'center', marginBottom: 2 }}
            variant="h4"
            component="h2"
          >
            Add Car
          </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" variant='contained' onClick={handleAdd}>Add</Button>
            <Button size="small" color='error' variant='contained' onClick={handleCancel}>Cancel</Button>
        </CardActions>
    </Card>
  )
}