import { createCar, getCars } from "@/app/data/data";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  features: string[];
}

export async function GET(request: Request) {
  const cars = await getCars();

  return new Response(JSON.stringify(cars), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request: Request) {
  const body = await request.json(); 

  console.log('Creating car:', body);

  if (!body.make || !body.model || !body.year) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let newCar;
  try {
    newCar = await createCar(body);
  } catch (error) {
    console.error('Error creating car:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
 
  return new Response(JSON.stringify(newCar), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
 