import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CONFIG_URL} from "../utilities/contants";
import {Register} from "../interfaces/register";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor(private http: HttpClient) {
  }

  register(entity: Register): Observable<any> {
    return this.http.post(`${CONFIG_URL}`, entity);
  }
}
