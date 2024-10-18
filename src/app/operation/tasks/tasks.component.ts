import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {TasksService} from "../../shared/services/tasks.service";
import {CommonModule, DatePipe} from "@angular/common";
import {NavBarComponent} from "../../shared/components/nav-bar/nav-bar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {TasksDialogComponent} from "../tasks-dialog/tasks-dialog.component";
import {Task} from "../../shared/interfaces/task";
import {AppUtil} from "../../shared/utilities/app-util";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TasksDeleteDialogComponent} from "../tasks-delete-dialog/tasks-delete-dialog.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    NavBarComponent,
  ],
  providers: [TasksService, DatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  encapsulation: ViewEncapsulation.None,
  host:{ 'class': 'tasks-component'}
})
export class TasksComponent implements OnInit {
  readonly _snackBar = inject(MatSnackBar);
  readonly service = inject(TasksService);
  readonly dialog = inject(MatDialog);

  list: Task[] = [];

  ngOnInit() {
    this.loadAll();
  }

  loadAll(): void {
    this.service.query().subscribe({
      next: data => {
        this.list = data
      },
      error: error => {
        console.log(error)
      }
    })
  }

  createTaskOpen(data?: Task): void {
    const dialog = this.dialog.open(TasksDialogComponent, {
      disableClose: true,
      data
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }

  updateTaskStatus(task: Task): void {
    task.status = !task.status;

    this.service.update(task).subscribe({
      next: result => {
        AppUtil.snackBar(this._snackBar, result.message)
        this.loadAll();
      },
      error: result => {
        AppUtil.snackBar(this._snackBar, result.message)
      }
    })
  }

  deleteTaskOpen(data: Task): void {

    const dialog = this.dialog.open(TasksDeleteDialogComponent, {
      data
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.loadAll();
      }
    });
  }
}
