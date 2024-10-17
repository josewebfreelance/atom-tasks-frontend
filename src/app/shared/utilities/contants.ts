import {environment} from "../../../environments/environment";

export const SECURITY_URL = `${environment.apiUrl}/auth`;
export const CONFIG_URL = `${environment.apiUrl}/users`;
export const EMAIL_VALID = '^([\\w\\._-]+@([\\w-]+\\.)+[\\w-]{2,5})(;{1}([\\w\\._-]+@([\\w-]+\\.)+[\\w-]{2,5}))*$';
