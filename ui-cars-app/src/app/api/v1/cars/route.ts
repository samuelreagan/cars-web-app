interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  features: string[];
}

export async function GET(request: Request) {
  const cars: Car[] = [
    {
        id: 1,
        make: 'Ford',
        model: 'Taurus',
        year: 2004,
        features: ['Automatic Windows', 'Leather Seats']
    },
    {
        id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2012,
        features: ['AC']
    },
    {
        id: 3,
        make: 'Dodge',
        model: 'Ram',
        year: 2005,
        features: ['Extra Large Bed']
    }
  ];


  return new Response(JSON.stringify(cars), {
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
 