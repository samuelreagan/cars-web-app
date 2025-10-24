'use client';
 
import { CarForm } from '@/app/components/shared-components';
import { MessageContext } from '@/app/context/MessageContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function AddCar() {
  const router = useRouter();
  const messageContext = useContext(MessageContext);

  function handleCancel() {
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
  
    if (!make || !model || !year) {
      messageContext.showMessage({ severity: 'warning', message: 'Please fill in all required fields' });
      return;
    }

    let response;

    try {
      response = await fetch(`/api/v1/cars`, {
        method: 'POST',
        body: JSON.stringify({ make, model, year, features }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (err) {
      messageContext.showMessage({ severity: 'error', message: 'Error adding the car' });
      return;
    }
  
    if (!response.ok) {
      messageContext.showMessage({ severity: 'error', message: 'Unable to add the car' });
      return;
    }

    messageContext.showMessage({ severity: 'success', message: 'Car added successfully!' });
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