import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormFieldErrorsPipe} from "../../shared/pipes/form-field-errors.pipe";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {TasksService} from "../../shared/services/tasks.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppUtil} from "../../shared/utilities/app-util";
import {Task} from "../../shared/interfaces/task";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-tasks-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldErrorsPipe,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
  ],
  templateUrl: './tasks-dialog.component.html',
  styleUrl: './tasks-dialog.component.scss'
})
export class TasksDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<TasksDialogComponent>);
  readonly data = inject<Task>(MAT_DIALOG_DATA);
  readonly _snackBar = inject(MatSnackBar);

  readonly service = inject(TasksService);
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(150)]),
    })
  }

  ngOnInit() {
    if (this.data) {
      const {title, description} = this.data;

      this.form.get('title')?.setValue(title);
      this.form.get('description')?.setValue(description);
    }
  }

  onsubmit(): void {
    if (this.form.valid) {
      if (this.data && this.data.id) {
        const {title, description} = this.form.value;
        const {id, status} = this.data;

        const taskToUpdate: Task = {id, title, description, status};

        this.service.update(taskToUpdate).subscribe({
          next: result => {
            AppUtil.snackBar(this._snackBar, result.message)
            this.dialogRef.close(true);
          },
          error: (error: HttpErrorResponse) => {
            AppUtil.snackBar(this._snackBar, error.message);
          }
        })
      } else {
        this.service.create(this.form.value).subscribe({
          next: result => {
            AppUtil.snackBar(this._snackBar, result.message)
            this.dialogRef.close(true);
          },
          error: (error: HttpErrorResponse) => {
            AppUtil.snackBar(this._snackBar, error.message);
          }
        });
      }
    }
  }
}
