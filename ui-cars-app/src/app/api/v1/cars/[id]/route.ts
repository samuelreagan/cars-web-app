import { deleteCarById, getCarById, updateCarById } from "@/app/data/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;
  const car = await getCarById(id);

  return new Response(JSON.stringify(car), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;
  const body = await request.json();

  await updateCarById(id, body);

  return new Response(JSON.stringify('OK'), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;

  if (isNaN(id)) {
    return new Response('ID is required', {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const deletedCar = await deleteCarById(id);

  return new Response(`${deletedCar}`, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}