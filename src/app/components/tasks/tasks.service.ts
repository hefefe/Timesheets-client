import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { PersonInterface } from 'src/app/personInterface';
import { IProject } from 'src/app/project-interface';
import { ITask, ITaskGroup, ITaskType, IWorkFlow } from 'src/app/task-interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getProjectInfo(id:number){
    return this.http.get<IProject>(GlobalconstantsModule.apiURL + '/api/project/' + id);
  }

  getTasksForProject(id:number){
    let params = new HttpParams();
    params = params.append('projectId', id);
    return this.http.get<ITaskGroup[]>(GlobalconstantsModule.apiURL + '/api/task/project', {params});
  }

  setTaskWorkFlow(taskId:number, workFlowId:number){
    let params = new HttpParams()
    .append('taskId', taskId)
    .append('workFlowId', workFlowId);
    return this.http.put<ITask>(GlobalconstantsModule.apiURL + '/api/task', params);
  }

  createTask(projectId:number, task:ITask){
    let params = new HttpParams().append('projectId', projectId);
    return this.http.post(GlobalconstantsModule.apiURL+'/api/task', task, {params});
  }

  rejectTask(id:number){
    let params = new HttpParams();
    params = params.append('ids', id);
    return this.http.delete(GlobalconstantsModule.apiURL+'/api/task', {params});
  }

  getProjectWorkflow(projectId:number){
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get<IWorkFlow[]>(GlobalconstantsModule.apiURL + '/api/task/workflow', {params});
  }

  getTaskTypes(){
    return this.http.get<ITaskType[]>(GlobalconstantsModule.apiURL + '/api/task/types');
  }

  getEmployeesInProject(projectId:number){
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get<PersonInterface[]>(GlobalconstantsModule.apiURL + '/api/person/in-project', {params});
  }
}
