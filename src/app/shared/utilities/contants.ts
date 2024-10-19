import {environment} from "../../../environments/environment";
import {SnackbarConfig} from "../interfaces/snackbar-config";

export const SECURITY_URL = `${environment.apiUrl}/auth`;
export const CONFIG_URL = `${environment.apiUrl}/users`;
export const OPERATION_URL = `${environment.apiUrl}/tasks`;
export const TOKEN_KEY = 'Atom-application-tasks.idToken';
export const USER_KEY = 'Atom-application-tasks.user';
export const WORD_INITIAL_KEY = 'Atom-application-tasks.wordInitial';

export const SNACKBAR_CONFIG: SnackbarConfig = {
  duration: 5 * 1000,
  closeText: 'Cerrar'
}
