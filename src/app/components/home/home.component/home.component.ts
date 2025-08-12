import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../../../interfaces/car.interface';
import { CarService } from '../../../services/car/car.service';
import { NEVER, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCarDialog } from '../../new-car/new-car-dialog/new-car-dialog';
import { config } from 'process';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatTableModule, MatPaginator],
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
  public loading$: Observable<boolean> = NEVER;

  public displayedColumns: string[] = [
    'name',
    'manufacturer',
    'model',
    'milage',
  ];
  public dataSource: MatTableDataSource<Car> = new MatTableDataSource();

  constructor(private carService: CarService, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.loading$ = this.carService.loading$;
    this.carsList$ = this.carService.carList$;

    this.carsList$.subscribe((list) => {
      this.dataSource = new MatTableDataSource<Car>(
        list.sort((a, b) => a.name.localeCompare(b.name))
      );
    });
  }

  public rowSelected(row: Car): void {
    console.log(row);
  }

  public addNewCar(): void {
    this.dialog.open(NewCarDialog, {
      width: '700px',
      maxWidth: '700px',
    });

    // const dialogRef = this.dialog.open(NewCarDialog, {
    //   data: row,
    // });
    // dialogRef.afterClosed().subscribe(success) => {
    //   console.log(newCarForm);
    // });
  }

  //this.carService.updateCarList$();
}
