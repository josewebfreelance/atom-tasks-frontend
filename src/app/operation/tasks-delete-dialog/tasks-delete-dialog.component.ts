import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../shared/interfaces/task";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TasksService} from "../../shared/services/tasks.service";
import {AppUtil} from "../../shared/utilities/app-util";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-tasks-delete-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton
  ],
  templateUrl: './tasks-delete-dialog.component.html',
  styleUrl: './tasks-delete-dialog.component.scss'
})
export class TasksDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TasksDeleteDialogComponent>);
  readonly data = inject<Task>(MAT_DIALOG_DATA);
  readonly _snackBar = inject(MatSnackBar);

  readonly service = inject(TasksService);

  constructor() {
  }

  onSubmit(): void {
    const {id} = this.data;
    this.service.delete(id).subscribe({
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
