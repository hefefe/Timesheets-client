import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { IProject } from 'src/app/project-interface';
import { IIdFromTo } from 'src/app/reports-interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectReportsService {

  constructor(private http: HttpClient) { }

  getProjectStatistics(data:IIdFromTo){
    return this.http.post(GlobalconstantsModule.apiURL+'/api/statistics/project', data);
  }

  getProjects(){
    return this.http.get<IProject[]>(GlobalconstantsModule.apiURL + '/api/project');
  }
}
