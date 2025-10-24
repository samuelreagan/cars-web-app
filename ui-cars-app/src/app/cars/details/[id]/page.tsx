'use client';

import { useState, useEffect, use } from 'react';
import { Button, CardActions, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import { SkeletonForm } from '@/app/components/shared-components';

export default function CarDetails({ params }: { params: Promise<{ id: string }>}) {
  const [data, setData] = useState<{make: string, model: string, year: string, features: string[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        setLoading(false);
      } catch (err) {
        // setError(err);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  function handleUpdate() {
    router.push(`/cars/update/${id}`);
  }

  async function handleDelete() {
    const response = await fetch(`/api/v1/cars/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('Failed to delete the car');
      return;
    }

    router.push('/');
  }

  function getFeatureList(features: string[]) {
    if (features.length === 0) {
      return '';
    }

    return (
      <ul className="list-disc pl-5">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    );
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
          { loading ? <SkeletonForm></SkeletonForm> : 
          <Typography component="article" variant="body1" fontSize={18}>
            <p className="mb-2"><b>Make</b>: { data?.make }</p>
            <p className="mb-2"><b>Model</b>: { data?.model }</p>
            <p className="mb-2"><b>Year</b>: { data?.year }</p>
            <p className="mb-2"><b>Features</b>{ !data?.features.length ? ': None' : '' }</p>
            { getFeatureList(data?.features || []) }
          </Typography>
        }
        </CardContent>
        <CardActions>
            <Button size="small" variant='contained' onClick={handleUpdate} sx={{ background: "var(--eko-purple)" }}>Update</Button>
            <Button size="small" color='error' variant='contained' onClick={handleDelete}>Delete</Button>
        </CardActions>
    </Card>
  )
}