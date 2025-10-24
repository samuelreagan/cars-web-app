'use client';

import { useState, useEffect, use } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import { CarForm } from '@/app/components/shared-components';
import { Car } from '@/app/types/car';

export default function CarUpdate({ params }: { params: Promise<{ id: string }>}) {
  const [data, setData] = useState<Car | null>(null)
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

  async function onUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const make = (data.get('make') as string) ?? '';
    const model = (data.get('model') as string) ?? '';
    const year = Number((data.get('year') as string) ?? '');
    const featuresRaw = (data.get('features') as string) ?? '';
    const features = featuresRaw.split(',').map(s => s.trim()).filter(Boolean);
  
    const response = await fetch(`/api/v1/cars/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ make, model, year, features }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('Failed to save the car');
      return;
    }

    router.push(`/cars/details/${id}`);

  }

  async function onDelete() {
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
        <CarForm formType='update' loading={loading} onSubmit={onUpdate} onCancel={onCancel} onDelete={onDelete} defaultData={data}></CarForm>
      </CardContent>
    </Card>
  )
}