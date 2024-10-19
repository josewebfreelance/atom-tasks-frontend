import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {LoadingInterceptor} from "./shared/interceptors/loading.interceptor";
import {LoadingService} from "./shared/services/loading.service";
import {HttpTokenInterceptorInterceptor} from "./shared/interceptors/http-token-interceptor.interceptor";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    LoadingService,
    provideHttpClient(withInterceptors([LoadingInterceptor])),
    provideHttpClient(withInterceptors([HttpTokenInterceptorInterceptor])),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ]
};
