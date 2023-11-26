import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { PersonInterface } from 'src/app/personInterface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

constructor(private http: HttpClient) { }

getEmployees(){
  return this.http.get<PersonInterface[]>(GlobalconstantsModule.apiURL+'/api/person/all')
            .toPromise()
            .then(data => data as PersonInterface[])
            .then(data => data);
}

deleteEmployees(ids:number[]){
  let params = new HttpParams();
    for (let id of ids) {
      params = params.append('ids', id);
    }
  return this.http.delete(GlobalconstantsModule.apiURL+'/api/person', {params, observe: 'response'});
}
}
