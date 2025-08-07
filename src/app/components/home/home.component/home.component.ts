import { Component, OnInit } from '@angular/core';
import { Car } from '../../../interfaces/car.interface';
import { __mockCars } from '../../../__mock/__mockCars';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  public cars: Car[] = [];

  public ngOnInit(): void {
    this.cars = __mockCars;
  }
}
