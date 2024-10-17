import {HttpInterceptorFn} from '@angular/common/http';
import {AppUtil} from "../utilities/app-util";
import {TOKEN_KEY} from "../utilities/contants";

export const HttpTokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = AppUtil.getStorageValue(TOKEN_KEY);
  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: `${token}`
    }
  });

  return next(modifiedRequest);
};
