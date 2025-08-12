import { Component, OnInit } from '@angular/core';
import {
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarService } from '../../../services/car/car.service';
import { NewCarForm } from '../../../interfaces/new-car-form.interface';
import { take } from 'rxjs';
import { NewCar } from '../../../interfaces/new-car.interface';

@Component({
  selector: 'app-new-car-dialog',
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-car-dialog.html',
  styleUrl: './new-car-dialog.scss',
  standalone: true,
})
export class NewCarDialog implements OnInit {
  public newCarForm!: FormGroup<NewCarForm>;

  constructor(
    private carService: CarService,
    private dialogRef: MatDialogRef<NewCarDialog>
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public saveNewCar(): void {
    this.carService
      .saveNewCar(this.newCarForm.value as NewCar)
      .pipe(take(1))
      .subscribe((response) => {
        if (response) this.dialogRef.close();
        // Manage error when saving
      });
  }

  private createForm(): void {
    this.newCarForm = new FormGroup<NewCarForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      manufacturer: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      model: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      fuel: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      type: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      vin: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      color: new FormControl(null),
      mileage: new FormControl(null),
    });
  }
}
