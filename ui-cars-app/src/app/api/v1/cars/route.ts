interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  features: string[];
}

export async function GET(request: Request) {
  const cars: Car[] = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020, features: ['Bluetooth', 'Backup Camera'] },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, features: ['Lane Assist', 'Cruise Control'] },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021, features: ['Sport Package', 'Apple CarPlay'] },
    { id: 4, make: 'Chevrolet', model: 'Impala', year: 2018, features: ['Heated Seats', 'Keyless Entry'] },
    { id: 5, make: 'BMW', model: '3 Series', year: 2022, features: ['Navigation', 'Leather Seats'] },
    { id: 6, make: 'Audi', model: 'A4', year: 2021, features: ['Quattro', 'Virtual Cockpit'] },
    { id: 7, make: 'Mercedes-Benz', model: 'C-Class', year: 2020, features: ['Sunroof', 'Ambient Lighting'] },
    { id: 8, make: 'Tesla', model: 'Model 3', year: 2022, features: ['Autopilot', 'Long Range'] },
    { id: 9, make: 'Hyundai', model: 'Elantra', year: 2019, features: ['Wireless Charging', 'Blind Spot Monitor'] },
    { id: 10, make: 'Kia', model: 'Sportage', year: 2021, features: ['All-Wheel Drive', 'Rear Cross Traffic Alert'] },
    { id: 11, make: 'Subaru', model: 'Outback', year: 2020, features: ['Symmetrical AWD', 'Roof Rails'] },
    { id: 12, make: 'Volkswagen', model: 'Golf', year: 2018, features: ['Adaptive Cruise', 'Fog Lights'] },
    { id: 13, make: 'Mazda', model: 'CX-5', year: 2021, features: ['G-Vectoring Control', 'Apple CarPlay'] },
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
 