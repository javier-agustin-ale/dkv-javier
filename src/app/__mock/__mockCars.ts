import { Car } from '../interfaces/car.interface';

export const __mockCars: Car[] = [
  {
    id: '1',
    name: 'Toyota Wrangler',
    manufacturer: 'Land Rover',
    model: 'CX-9',
    fuel: 'Diesel',
    type: 'Cargo Van',
    vin: 'GCPM63Z13MT381419',
    color: 'yellow',
    mileage: null,
  },
  {
    id: '2',
    name: 'Toyota Jeep',
    manufacturer: 'BMW',
    model: 'C4',
    fuel: 'Diesel',
    type: '4x4',
    vin: 'GCPM63Z13MT382343',
    color: null,
    mileage: 10000,
  },
];
