import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean = false;

  constructor() {}

  setLoading(value: boolean) {
    this.loading = value;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
