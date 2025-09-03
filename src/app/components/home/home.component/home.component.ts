import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { NEVER, Observable, take } from 'rxjs';
import { Car } from '../../../interfaces/car.interface';
import { CarService } from '../../../services/car/car.service';
import { NewCarDialog } from '../../new-car/new-car-dialog/new-car-dialog';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatTableModule, MatPaginator, MatProgressBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [CarService],
  standalone: true,
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  public carsList$: Observable<Car[]> = NEVER;
  public isCarListLoading$: Observable<boolean> = NEVER;

  public displayedColumns: string[] = [
    'name',
    'manufacturer',
    'model',
    'milage',
  ];
  public dataSource: MatTableDataSource<Car> = new MatTableDataSource();

  constructor(
    private carService: CarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.defineStreams();
  }

  public rowSelected(carId: string): void {
    this.router.navigate(['/car', carId]);
  }

  public addNewCar(): void {
    const dialogRef = this.dialog.open(NewCarDialog, {
      width: '700px',
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.carService.updateCarList$();
    });
  }

  public defineStreams(): void {
    this.isCarListLoading$ = this.carService.isCarListLoading$;
    this.carsList$ = this.carService.carList$;

    this.carsList$.pipe(take(1)).subscribe((list) => {
      const carList: Car[] = list.sort((a, b) => a.name.localeCompare(b.name));
      this.dataSource.data = carList;
    });
  }
}
