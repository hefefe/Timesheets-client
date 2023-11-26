import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { changePassword } from './change-pass.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {

  constructor(private http: HttpClient ) {}

   setPassword(setPassword: changePassword){
    return this.http.post<changePassword>(GlobalconstantsModule.apiURL+'/auth/setPassword', setPassword);
   }

}
