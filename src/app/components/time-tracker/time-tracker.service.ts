import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { ITimer } from 'src/app/timer-interface';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService {

  constructor(private http: HttpClient) { }

  getIsTimerStarted(){
    return this.http.get(GlobalconstantsModule.apiURL + '/api/timetrack/started/time');
  }

  startTimer(timer:ITimer){
    return this.http.post(GlobalconstantsModule.apiURL + '/api/timetrack', timer);
  }

  stopTimer(){
    return this.http.delete(GlobalconstantsModule.apiURL + '/api/timetrack');
  }

  getHistory(){
    return this.http.get(GlobalconstantsModule.apiURL + '/api/timetrack/history');
  }

  getTasks(projectId:number){
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get(GlobalconstantsModule.apiURL + '/api/task/user', {params});
  }
}
