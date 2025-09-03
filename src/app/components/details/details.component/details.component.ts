import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Car } from '../../../interfaces/car.interface';
import { CarService } from '../../../services/car/car.service';

@Component({
  selector: 'app-details.component',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true,
})
export class DetailsComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'manufacturer',
    'model',
    'fuel',
    'type',
    'vin',
    'color',
    'mileage',
  ];
  public dataSource: MatTableDataSource<Car> = new MatTableDataSource();
  public carName: string = '';

  private carService = inject(CarService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public ngOnInit(): void {
    this.getIdFromUrl();
  }

  public navigateBack(): void {
    this.router.navigate(['']);
  }

  private getIdFromUrl(): void {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const carId = params.get('id');
      if (carId) {
        this.carService.getCarById$(carId).subscribe((car) => {
          this.dataSource.data = [car];
          this.carName = this.dataSource.data[0].name;
        });
      }
    });
  }
}
