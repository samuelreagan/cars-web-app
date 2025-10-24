'use client';

import { useState, useEffect, use, useContext, useRef } from 'react';
import { Button, CardActions, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import { SkeletonForm } from '@/app/components/shared-components';
import { MessageContext } from '@/app/context/MessageContext';

export default function CarDetails({ params }: { params: Promise<{ id: string }>}) {
  const [data, setData] = useState<{make: string, model: string, year: string, features: string[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = use(params);
  const router = useRouter();
  const messageContext = useContext(MessageContext);

  // Fixes issue w/ looping useEffect due to changing context value (thanks copilot)
  // Ideally handle this in a better way
  const showMessageRef = useRef(messageContext.showMessage);
  useEffect(() => { showMessageRef.current = messageContext.showMessage; }, [messageContext.showMessage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/v1/cars/${id}`);
        if (!response.ok) {
          showMessageRef.current?.({ severity: 'error', message: 'Unable to fetch the car data' });
          router.push(`/`);
        } else {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        showMessageRef.current?.({ severity: 'error', message: 'Error loading car data' });
        router.push(`/`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, router]);

  function onUpdate() {
    router.push(`/cars/update/${id}`);
  }

  function onGoBack() {
    router.push(`/`);
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
            <Button size="small" variant='contained' onClick={onUpdate} sx={{ background: "var(--eko-purple)" }}>Update</Button>
            <Button size="small" color='error' variant='contained' onClick={onDelete}>Delete</Button>
            <Button size="small" color='error' variant='contained' sx={{ background: "var(--foreground)" }} onClick={onGoBack}>Go Back</Button>
        </CardActions>
    </Card>
  )
}