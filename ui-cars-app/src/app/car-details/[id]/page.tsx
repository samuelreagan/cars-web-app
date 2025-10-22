'use client';

import { useState, useEffect, use } from 'react';

export default function CarDetails({ params }: { params: Promise<{ id: string }>}) {
  const [data, setData] = useState<{make: string, model: string, year: string } | null>(null)
  const { id } = use(params);

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

  return (
    <section className='p-4 rounded-sm'>
      <h1 className='text-center font-bold'>Car Details</h1>
      <dl>
        <dt>Make: </dt>
        <dd>{ data?.make }</dd>
        <dt>Model: </dt>
        <dd>{ data?.model }</dd>
        <dt>Year: </dt>
        <dd>{ data?.year }</dd>
      </dl>
    </section>
  )
}