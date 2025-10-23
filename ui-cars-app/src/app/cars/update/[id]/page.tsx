'use client';

import { useState, useEffect, use } from 'react';
import { Button, CardActions, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';

export default function CarUpdate({ params }: { params: Promise<{ id: string }>}) {
  const [data, setData] = useState<{make: string, model: string, year: string } | null>(null)
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/v1/cars/${id}`);
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
  }, [id]);

  async function handleSave() {
        // Handle delete logic here
    console.log('Save');
    const response = await fetch(`/api/v1/cars/${id}`, {
      method: 'PUT',
    });

    if (!response.ok) {
      console.error('Failed to save the car');
      return;
    }

    router.push('/');

  }

  async function handleDelete() {
    // Handle delete logic here
    console.log('Delete');
    const response = await fetch(`/api/v1/cars/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('Failed to delete the car');
      return;
    }

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
            Car Details
          </Typography>
          <dl>
            <Typography component="dt" variant="subtitle1">Make:</Typography>
            <Typography component="dd" variant="body1" gutterBottom>{ data?.make }</Typography>
            <Typography component="dt" variant="subtitle1">Model:</Typography>
            <Typography component="dd" variant="body1" gutterBottom>{ data?.model }</Typography>
            <Typography component="dt" variant="subtitle1">Year:</Typography>
            <Typography component="dd" variant="body1" gutterBottom>{ data?.year }</Typography>
          </dl>
        </CardContent>
        <CardActions>
            <Button size="small" variant='contained' onClick={handleSave}>Save</Button>
            <Button size="small" color='error' variant='contained' onClick={handleDelete}>Delete</Button>
        </CardActions>
    </Card>
  )
}