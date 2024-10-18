import {Routes} from '@angular/router';
import {adminAuthGuard} from "./shared/guards/admin-auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login', loadComponent: () => import('./security/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'tasks',
    canActivate: [adminAuthGuard],
    loadComponent: () => import('./operation/tasks/tasks.component').then(m => m.TasksComponent),
  }
];
