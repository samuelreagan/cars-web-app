import { seedDatabase } from "@/app/data/data";

export async function GET() {
  await seedDatabase();

  return new Response('OK', {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}