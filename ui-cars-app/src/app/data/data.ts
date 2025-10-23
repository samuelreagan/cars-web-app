import postgres from 'postgres';
import { Car } from '../types/car';

// Initialize the Postgres client
const sql = postgres(process.env.POSTGRES_URL!);


/**
 * Function for testing purposes to seed the database.
 * This would not be used in production code.
 */
export async function seedDatabase() {
  const mockedCars = [
    { make: 'Toyota', model: 'Camry', year: 2020, features: ['Bluetooth', 'Backup Camera'] },
    { make: 'Honda', model: 'Civic', year: 2019, features: ['Lane Assist', 'Cruise Control'] },
    { make: 'Ford', model: 'Mustang', year: 2021, features: ['Sport Package', 'Apple CarPlay'] },
    { make: 'Chevrolet', model: 'Impala', year: 2018, features: ['Heated Seats', 'Keyless Entry'] },
    { make: 'BMW', model: '3 Series', year: 2022, features: ['Navigation', 'Leather Seats'] },
    { make: 'Audi', model: 'A4', year: 2021, features: ['Quattro', 'Virtual Cockpit'] },
    { make: 'Mercedes-Benz', model: 'C-Class', year: 2020, features: ['Sunroof', 'Ambient Lighting'] },
    { make: 'Tesla', model: 'Model 3', year: 2022, features: ['Autopilot', 'Long Range'] },
    { make: 'Hyundai', model: 'Elantra', year: 2019, features: ['Wireless Charging', 'Blind Spot Monitor'] },
    { make: 'Kia', model: 'Sportage', year: 2021, features: ['All-Wheel Drive', 'Rear Cross Traffic Alert'] },
    { make: 'Subaru', model: 'Outback', year: 2020, features: ['Symmetrical AWD', 'Roof Rails'] },
    { make: 'Volkswagen', model: 'Golf', year: 2018, features: ['Adaptive Cruise', 'Fog Lights'] },
    { make: 'Mazda', model: 'CX-5', year: 2021, features: ['G-Vectoring Control', 'Apple CarPlay'] },
  ];

  await sql`DROP TABLE IF EXISTS cars;`;

  await sql`
        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            make TEXT NOT NULL,
            model TEXT NOT NULL,
            year INT NOT NULL,
            features TEXT[]
        );
    `;

  for (const car of mockedCars) {
    await sql`
            INSERT INTO cars (make, model, year, features)
            VALUES (${car.make}, ${car.model}, ${car.year}, ${sql.array(car.features)})
        `;
  }
}

export async function getCars() {
  const cars = await sql`SELECT * FROM cars`;
  return cars;
}

export async function getCarById(id: number) {
  const car = await sql`SELECT * FROM cars WHERE id = ${id}`;
  return car;
}

export async function deleteCarById(id: number) {
  const result = await sql`DELETE FROM cars WHERE id = ${id}`;
  return result;
}

export async function createCar(car: { make: string; model: string; year: number; features: string[] }) {
  const result = await sql`
        INSERT INTO cars (make, model, year, features)
        VALUES (${car.make}, ${car.model}, ${car.year}, ${sql.array(car.features)})
    `;

  return result;
}

export async function updateCarById(id: number, car: Car) {
    const fields = Object.keys(car);
    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const result = await sql`
      UPDATE cars
      SET make = ${car.make},
          model = ${car.model},
          year = ${car.year},
          features = ${sql.array(car.features)}
      WHERE id = ${id}`;

    return result;
}
