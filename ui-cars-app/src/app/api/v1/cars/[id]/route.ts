import { mockedCars } from "@/app/api/data/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const id = +(await params).id;
  const car = mockedCars.find(car => car.id === id);

  return new Response(JSON.stringify(car), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  // const body = await request.json();

  return new Response(JSON.stringify('OK'), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;

  if (isNaN(id)) {
    return new Response('ID is required', {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(`${id}`, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}