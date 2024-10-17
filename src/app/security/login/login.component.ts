import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../../configuration/register-dialog/register-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormFieldErrorsPipe} from "../../shared/pipes/form-field-errors.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AppUtil} from "../../shared/utilities/app-util";
import {TOKEN_KEY} from "../../shared/utilities/contants";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormFieldErrorsPipe,
    MatProgressSpinnerModule
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly dialog = inject(MatDialog);
  form: FormGroup;

  constructor(private loginService: LoginService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(50), Validators.required]),
    });
  }

  onSubmit(): void {
    this.loginService.login(this.form.value).subscribe({
      next: result => {

        if (result === null) {
          this.dialog.open(RegisterDialogComponent, {});
          return;
        }

        AppUtil.setStorageValue(TOKEN_KEY, result.idToken);
      },
      error: error => {
        console.log(error);
      },
    });
  }

  registerDialogOpen(): void {
    this.dialog.open(RegisterDialogComponent, {
      disableClose: true
    });
  }

}
