import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_CONFIG} from "./contants";

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
}
