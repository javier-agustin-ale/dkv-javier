import { FormControl } from '@angular/forms';

export interface NewCarForm {
  name: FormControl<string>;
  manufacturer: FormControl<string>;
  model: FormControl<string>;
  fuel: FormControl<string>;
  type: FormControl<string>;
  vin: FormControl<string>;
  color: FormControl<string | null>; //maybe null
  mileage: FormControl<number | null>; //maybe null
}
