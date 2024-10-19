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
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

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
  host: {'class': 'tasks-component'}
})
export class TasksComponent implements OnInit {
  readonly _snackBar = inject(MatSnackBar);
  readonly service = inject(TasksService);
  readonly dialog = inject(MatDialog);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router)

  list: Task[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.loadAll(params?.['search'] ?? '');
    })

    this.loadAll();
  }

  loadAll(search: string = ''): void {
    this.service.query(search).subscribe({
      next: data => {
        console.log(data)
        this.list = data
      },
      error: (error: HttpErrorResponse) => {
        AppUtil.snackBar(this._snackBar, error.message);
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
      error: (error: HttpErrorResponse) => {
        AppUtil.snackBar(this._snackBar, error.message);
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
