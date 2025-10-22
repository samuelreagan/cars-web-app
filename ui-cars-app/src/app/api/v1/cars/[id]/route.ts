import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  console.log(id);

  const car = {
    id: 3,
    make: 'Dodge',
    model: 'Ram',
    year: 2005,
    features: ['Extra Large Bed']
  };


  return new Response(JSON.stringify(car), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  const body = await request.json();

  return new Response(JSON.stringify({ id, ...body }), {
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