import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OPERATION_URL} from "../utilities/contants";
import {Task} from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly http = inject(HttpClient);

  query(search?: string): Observable<any> {
    return this.http.get(`${OPERATION_URL}?search=${search}`);
  }

  create(entity: Task): Observable<any> {
    return this.http.post(OPERATION_URL, entity);
  }

  update(entity: Task): Observable<any> {
    return this.http.put(`${OPERATION_URL}/${entity.id}`, entity);
  }

  delete(taskId: string | undefined): Observable<any> {
    return this.http.delete(`${OPERATION_URL}/${taskId}`);
  }
}
