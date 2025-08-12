import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, NEVER, Observable, of, take } from 'rxjs';
import { Car } from '../../interfaces/car.interface';
import { HttpClient } from '@angular/common/http';
import { NewCar } from '../../interfaces/new-car.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseUrl = environment.apiUrl;

  private carListSubject = new BehaviorSubject<Car[]>([]);
  public carList$: Observable<Car[]> = this.carListSubject.asObservable();

  public loading$: Observable<boolean> = NEVER;

  constructor(private httpClient: HttpClient) {
    this.updateCarList$();
  }

  public updateCarList$(): void {
    // TODO: Manage errors or list empty
    this.httpClient
      .get<Car[]>(this.baseUrl + 'vehicles')
      .pipe(take(1))
      .subscribe((carList) => {
        this.carListSubject.next(carList);
      });
  }

  public saveNewCar(newCar: NewCar): Observable<boolean> {
    // Manage saving and return observable true when saved correclty
    console.log(newCar);
    return of(true);
  }
}
