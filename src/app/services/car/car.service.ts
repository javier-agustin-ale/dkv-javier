import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  take,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { Car } from '../../interfaces/car.interface';
import { NewCar } from '../../interfaces/new-car.interface';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseUrl = environment.apiUrl;

  private carListSubject = new BehaviorSubject<Car[]>([]);
  public carList$: Observable<Car[]> = this.carListSubject.asObservable();

  private carListLoadingSubject = new BehaviorSubject<boolean>(false);
  public isCarListLoading$: Observable<boolean> =
    this.carListLoadingSubject.asObservable();

  private detailsLoadingSubject = new BehaviorSubject<boolean>(false);
  public isDetailsLoading$: Observable<boolean> =
    this.detailsLoadingSubject.asObservable();

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.updateCarList$();
  }

  public updateCarList$(): void {
    this.carListLoadingSubject.next(true);
    this.httpClient
      .get<Car[]>(this.baseUrl + '/vehicles')
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open('Error getting data, please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          return throwError(() => error);
        })
      )
      .subscribe((carList) => {
        this.carListSubject.next(carList);
        this.carListLoadingSubject.next(false);
      });
  }

  public getCarById$(carId: string): Observable<Car> {
    return this.httpClient.get<Car>(this.baseUrl + `/vehicles/${carId}`);
  }

  public saveNewCar$(newCar: NewCar): Observable<boolean> {
    return this.httpClient.post<Car>(this.baseUrl + '/vehicles', newCar).pipe(
      map(() => true),
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        return of(false);
      })
    );
  }
}
