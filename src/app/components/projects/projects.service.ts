import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { IProject } from 'src/app/project-interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects(){
    return this.http.get<IProject[]>(GlobalconstantsModule.apiURL + '/api/project')
    .toPromise()
    .then(data => data as IProject[]);
  }
}
