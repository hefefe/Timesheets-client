import { CanActivateFn } from '@angular/router';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';

export const loginGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem(GlobalconstantsModule.atoken) || sessionStorage.getItem(GlobalconstantsModule.atoken);
  if(accessToken){
    return true;
  }
  return false;
};
