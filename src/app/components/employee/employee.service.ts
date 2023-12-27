import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { PersonInterface } from 'src/app/person-Interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

constructor(private http: HttpClient) { }

getEmployees(){
  return this.http.get<PersonInterface[]>(GlobalconstantsModule.apiURL+'/api/person/all')
            .toPromise()
            .then(data => data as PersonInterface[]);
}

deleteEmployees(ids:number[]){
  let params = new HttpParams();
    for (let id of ids) {
      params = params.append('ids', id);
    }
  return this.http.delete(GlobalconstantsModule.apiURL+'/api/person', {params, observe: 'response'});
}

saveEmployee(person: PersonInterface){
  return this.http.post(GlobalconstantsModule.apiURL+'/api/person', person);
}

saveEmployeePhoto(id: number, file:File){
  let formData = new FormData();
  formData.append('photo', file, file.name);
  return this.http.post(GlobalconstantsModule.apiURL+'/api/person/photo', formData , {params: {personId: id.toString()}});
}

resetPassword(ids:number[]){
  let params = new HttpParams();
    for (let id of ids) {
      params = params.append('ids', id);
    }
  return this.http.post(GlobalconstantsModule.apiURL+'/api/person/reset-password', params);
}
}
