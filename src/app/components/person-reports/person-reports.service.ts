import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { IIdFromTo } from 'src/app/reports-interface';

@Injectable({
  providedIn: 'root'
})
export class PersonReportsService {

  constructor(private http: HttpClient) { }

  getPersonStatistics(data:IIdFromTo){
    return this.http.post(GlobalconstantsModule.apiURL+'/api/statistics/person', data);
  }

  getPErsonHistory(data:IIdFromTo){
    return this.http.post(GlobalconstantsModule.apiURL+'/api/timetrack/history', data);
  }

  getPersonByRank(){
    return this.http.get(GlobalconstantsModule.apiURL+'/api/person/for-statistics');
  }
}
