import { Injectable, OnInit } from '@angular/core';
import { delay, NEVER, Observable, of, tap } from 'rxjs';
import { Car } from '../../interfaces/car.interface';
import { __mockCars } from '../../__mock/__mockCars';

@Injectable()
export class CarService {
  public carList$: Observable<Car[]> = NEVER;
  public loading$: Observable<boolean> = NEVER;

  constructor() {
    this.defineStreams();
  }

  private getCarList(): Observable<Car[]> {
    this.loading$ = of(true);
    return of(__mockCars).pipe(delay(1000));
  }

  private defineStreams(): void {
    this.carList$ = this.getCarList();
  }
}
