import { mockedCars } from "../../data/data";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  features: string[];
}

export async function GET(request: Request) {
  return new Response(JSON.stringify(mockedCars), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request: Request) {
  const body = await request.json(); 
  // Insert new car into your DB
 
  return new Response(JSON.stringify(body), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
 