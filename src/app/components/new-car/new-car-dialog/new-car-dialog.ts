import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { NewCarForm } from '../../../interfaces/new-car-form.interface';
import { NewCar } from '../../../interfaces/new-car.interface';
import { CarService } from '../../../services/car/car.service';

@Component({
  selector: 'app-new-car-dialog',
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './new-car-dialog.html',
  styleUrl: './new-car-dialog.scss',
  standalone: true,
})
export class NewCarDialog implements OnInit {
  public newCarForm!: FormGroup<NewCarForm>;

  constructor(
    private carService: CarService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<NewCarDialog>
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public saveNewCar(): void {
    const formValue = this.newCarForm.value as NewCar;

    const nullableFields = ['color', 'mileage'];

    const hasEmptyStrings = Object.entries(formValue).some(([key, val]) => {
      if (nullableFields.includes(key)) {
        return false;
      }
      return typeof val === 'string' && val.trim() === '';
    });

    if (this.newCarForm.invalid || hasEmptyStrings) {
      this.newCarForm.markAllAsTouched();
      this.showSnackBar('Please complete all required fields.', 'Accept');
      return;
    }

    this.carService
      .saveNewCar$(this.newCarForm.value as NewCar)
      .pipe(take(1))
      .subscribe((response: boolean | HttpErrorResponse) => {
        if (typeof response === 'boolean') {
          this.dialogRef.close(response);
          return;
        }
        this.showSnackBar(response.error, 'Accept');
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

  private showSnackBar(message: string, button: string): void {
    this.snackBar.open(message, button, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
