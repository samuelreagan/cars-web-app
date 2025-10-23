'use client';

import { useState, useEffect, use } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import CarForm from '@/app/components/shared-components';
import { Car } from '@/app/types/car';

export default function CarUpdate({ params }: { params: Promise<{ id: string }>}) {
  const [data, setData] = useState<Car | null>(null)
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

  async function onUpdate() {
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

  async function onDelete() {
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

  function onCancel() {
    console.log('Cancel');
    router.push('/');
  }

  return (
    <Card>
      <CardContent>
        <CarForm formType='update' onSubmit={onUpdate} onCancel={onCancel} onDelete={onDelete} defaultData={data}></CarForm>
      </CardContent>
    </Card>
  )
}