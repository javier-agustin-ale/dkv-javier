import { Component, OnInit } from '@angular/core';
import { Car } from '../../../interfaces/car.interface';
import { __mockCars } from '../../../__mock/__mockCars';
import { CarService } from '../../../services/car/car.service';
import { NEVER, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [CarService],
  standalone: true,
})
export class HomeComponent implements OnInit {
  public carsList$: Observable<Car[]> = NEVER;
  public loading$: Observable<boolean> = NEVER;

  constructor(private carService: CarService) {}

  public ngOnInit(): void {
    this.loading$ = this.carService.loading$;
    this.carsList$ = this.carService.carList$;
  }
}
