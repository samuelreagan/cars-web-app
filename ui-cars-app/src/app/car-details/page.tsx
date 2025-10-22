'use client';

import { useState, useEffect } from 'react';

export default function CarDetails() {
  // const res = await fetch('http://localhost:3000/api/v1/cars/2');
  useEffect(() => {
    async function fetchData() {
    //   try {
        const response = await fetch('/api/v1/cars/2'); // Relative path to your API route
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch data');
    //     }
    //     const result = await response.json();
    //     setData(result);
    //   } catch (err) {
    //     setError(err);
    //   } finally {
    //     setLoading(false);
    //   }
    }
    fetchData();
  }, []);

  return (
      <h1>Car Details</h1>
  )
}