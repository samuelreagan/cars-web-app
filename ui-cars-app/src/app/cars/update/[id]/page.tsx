'use client';

import { useState, useEffect, use, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import { CarForm } from '@/app/components/shared-components';
import { Car } from '@/app/types/car';
import { MessageContext } from '@/app/context/MessageContext';

export default function CarUpdate({ params }: { params: Promise<{ id: string }>}) {
  const [data, setData] = useState<Car | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = use(params);
  const router = useRouter();
  const messageContext = useContext(MessageContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/v1/cars/${id}`);
        if (!response.ok) {
          messageContext.showMessage({ severity: 'error', message: 'Unable to fetch the car data' });
          router.push(`/`);
        } else {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        messageContext.showMessage({ severity: 'error', message: 'Error loading car data' });
        router.push(`/`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, messageContext, router]);

  async function onUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const make = (data.get('make') as string)?.trim() ?? '';
    const model = (data.get('model') as string)?.trim() ?? '';
    const year = Number((data.get('year') as string)?.trim() ?? '');
    const featuresRaw = (data.get('features') as string) ?? '';
    const features = featuresRaw.split(',').map(s => s.trim()).filter(Boolean);

    if (!make || !model || !year) {
      messageContext.showMessage({ severity: 'warning', message: 'Please fill in all required fields' });
      return;
    }
  
    let response;
    try {
      response = await fetch(`/api/v1/cars/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ make, model, year, features }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (err) {
      messageContext.showMessage({ severity: 'error', message: 'Error updating car' });
      return;
    }

    if (!response?.ok) {
      messageContext.showMessage({ severity: 'error', message: 'Unable to update the car' });
      return;
    }

    messageContext.showMessage({ severity: 'success', message: 'Car updated successfully!' });
    router.push(`/cars/details/${id}`);
  }

  async function onDelete() {
    let response;
    try {
      response = await fetch(`/api/v1/cars/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      messageContext.showMessage({ severity: 'error', message: 'Error deleting car' });
      return;
    }

    if (!response?.ok) {
      messageContext.showMessage({ severity: 'error', message: 'Unable to delete the car' });
      return;
    }

    messageContext.showMessage({ severity: 'success', message: 'Car deleted successfully!' });
    router.push('/');
  }

  function onCancel() {
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