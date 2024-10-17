import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SECURITY_URL} from "../utilities/contants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(entity: any): Observable<any> {
    return this.http.post(`${SECURITY_URL}/login`, entity);
  }
}
