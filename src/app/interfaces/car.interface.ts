export interface Car {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  fuel: string;
  type: string;
  vin: string;
  color: string | null; //maybe null
  mileage: number | null; //maybe null
}
