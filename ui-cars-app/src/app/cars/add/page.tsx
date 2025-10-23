'use client';

import CarForm from '@/app/components/shared-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';

export default function AddCar() {
  const router = useRouter();

  function handleCancel() {
    console.log('Cancel');
    router.push('/');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const make = (data.get('make') as string) ?? '';
    const model = (data.get('model') as string) ?? '';
    const year = Number((data.get('year') as string) ?? '');
    const featuresRaw = (data.get('features') as string) ?? '';
    const features = featuresRaw.split(',').map(s => s.trim()).filter(Boolean);

    console.log({ make, model, year, features });
  
    const response = await fetch(`/api/v1/cars`, {
      method: 'POST',
      body: JSON.stringify({ make, model, year, features }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('Failed to add the car');
      return;
    }

    router.push('/');
  }

  return (
    <Card>
      <CardContent>
        <CarForm formType='add' onSubmit={handleSubmit} onCancel={handleCancel}></CarForm>
      </CardContent>
    </Card>
  )
}