import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppUtil} from "../utilities/app-util";
import {TOKEN_KEY} from "../utilities/contants";

export const adminAuthGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);

  if (!AppUtil.getStorageValue(TOKEN_KEY)) {

    router.navigate(['/login']).then();
    return false;
  }

  return true;
};
