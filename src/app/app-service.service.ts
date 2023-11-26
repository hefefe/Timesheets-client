import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from './common/globalconstants.module';
import { PersonInterface, Tokens } from './personInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

constructor(private http: HttpClient) { }

getLoggedUser(): Observable<PersonInterface>{
  return this.http.get<PersonInterface>(GlobalconstantsModule.apiURL+'/api/person');
}

logOut(exportToken: Tokens){
  return this.http.post<Tokens>(GlobalconstantsModule.apiURL+"/auth/logout", exportToken)
}

}
