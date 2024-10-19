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
import {TOKEN_KEY, USER_KEY, WORD_INITIAL_KEY} from "../../shared/utilities/contants";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

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
  readonly router = inject(Router);
  readonly _snackBar = inject(MatSnackBar);

  isPasswordHide = true;

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
        let worInitial = '';

        if (result === null) {
          this.dialog.open(RegisterDialogComponent, {});
          return;
        }

        const split = result.user.displayName.split(' ');

        if (split.length <= 2) {
          worInitial = `${split[0][0]}${split[1][0]}`;
        }

        AppUtil.setStorageValue(WORD_INITIAL_KEY, worInitial);
        AppUtil.setStorageValue(USER_KEY, result.user.displayName);
        AppUtil.setStorageValue(TOKEN_KEY, result.idToken);
        this.router.navigate(['/tasks']).then();
      },
      error: (error: HttpErrorResponse) => {
        const message = AppUtil.errorsManage(error, true);

        AppUtil.snackBar(this._snackBar, message);
      }
    });
  }

  registerDialogOpen(): void {
    this.dialog.open(RegisterDialogComponent, {
      disableClose: true
    });
  }

}
