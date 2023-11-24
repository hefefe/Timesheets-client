import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/login';
import { GlobalconstantsModule } from './common/globalconstants.module';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient ) {}

   login(login: Login){
    return this.http.post<Login>(GlobalconstantsModule.apiURL+'/auth', login);
   }
}
