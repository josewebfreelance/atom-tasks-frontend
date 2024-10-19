import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ConfigurationService} from "../../shared/services/configuration.service";
import {FormFieldErrorsPipe} from "../../shared/pipes/form-field-errors.pipe";
import {HttpErrorResponse} from "@angular/common/http";
import {AppUtil} from "../../shared/utilities/app-util";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../shared/services/login.service";
import {Login} from "../../shared/interfaces/login";
import {Router} from "@angular/router";
import {TOKEN_KEY} from "../../shared/utilities/contants";

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormFieldErrorsPipe
  ],
  providers: [
    ConfigurationService
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RegisterDialogComponent>);
  readonly _snackBar = inject(MatSnackBar);
  readonly service = inject(ConfigurationService);
  readonly loginService = inject(LoginService);
  readonly router = inject(Router);

  isPasswordHide = true;

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(50), Validators.required]),
    })
  }

  onSubmit(): void {
    this.service.register(this.form.value).subscribe({
      next: result => {
        AppUtil.snackBar(this._snackBar, result.message);

        const user: Login = {
          email: this.form.get('email')?.value,
          password: this.form.get('password')?.value,
        };
        this.loginService.login(user).subscribe({
          next: (result) => {
            this.dialogRef.close();

            setTimeout(() => {
              this.router.navigate(['/tasks']).then();
              AppUtil.setStorageValue(TOKEN_KEY, result.idToken);
            }, 3000);
          },
          error: (error: HttpErrorResponse) => {
            const message = AppUtil.errorsManage(error);
            AppUtil.snackBar(this._snackBar, message);
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        const message = AppUtil.errorsManage(error);
        AppUtil.snackBar(this._snackBar, message);
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
