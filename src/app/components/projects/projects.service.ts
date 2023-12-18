import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { ISearchPerson, PersonInterface } from 'src/app/personInterface';
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

  deleteProject(id:number){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.delete(GlobalconstantsModule.apiURL+'/api/project', {params, observe: 'response'});
  }

  getProjectMakers(){
    return this.http.get<PersonInterface[]>(GlobalconstantsModule.apiURL + '/api/person/projectMakers')
    .toPromise()
    .then(data => data as PersonInterface[]);
  }

  getEmployeesInProject(projectId:number){
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get<PersonInterface[]>(GlobalconstantsModule.apiURL+'/api/person/in-project', {params})
    .toPromise()
    .then(data => data as PersonInterface[]);
  }

  searchPerson(searchQuery:ISearchPerson){
    return this.http.post(GlobalconstantsModule.apiURL+'/api/person/search', searchQuery);
  }

  saveProjectPhoto(id: number, file:File){
    let formData = new FormData();
    formData.append('photo', file, file.name);
    return this.http.post(GlobalconstantsModule.apiURL+'/api/project/photo', formData , {params: {projectId: id.toString()}});
  }

  saveProject(project: IProject){
    return this.http.post(GlobalconstantsModule.apiURL+'/api/project', project);
  }
}
