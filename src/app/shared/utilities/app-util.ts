import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_CONFIG} from "./contants";
import {HttpErrorResponse} from "@angular/common/http";

export class AppUtil {
  public static setStorageValue(key: string, value: any): void {
    localStorage.setItem(key, value.toString());
  }

  public static getStorageValue(key: string): string | null {
    return localStorage.getItem(key);
  }

  public static snackBar(snackBar: MatSnackBar, message: string): void {
    snackBar.open(message, SNACKBAR_CONFIG.closeText, {
      duration: SNACKBAR_CONFIG.duration
    })
  }

  public static errorsManage(errors: HttpErrorResponse, isLogin = false): string {
    let message = 'Error';
    if (errors.error && errors.error.errors[0].path === 'password' && isLogin) {
      message = `Credenciales inválidas`;
    }

    if (errors.error && errors.error.errors[0].path === 'email') {
      message = errors.error.errors[0].msg;
    }

    return message;
  }
}
