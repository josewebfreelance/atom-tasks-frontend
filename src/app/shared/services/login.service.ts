import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SECURITY_URL} from "../utilities/contants";
import {Login} from "../interfaces/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  login(entity: Login): Observable<any> {
    return this.http.post(`${SECURITY_URL}/login`, entity);
  }
}
