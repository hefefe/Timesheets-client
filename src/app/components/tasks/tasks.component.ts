import { TasksService } from './tasks.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonInterface } from 'src/app/personInterface';
import { IProject } from 'src/app/project-interface';
import { ITask, ITaskGroup, ITaskType, IWorkFlow } from 'src/app/task-interface';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  private id:number = 0;
  private sub: any;

  taskGroups:ITaskGroup[] = [];
  projectDetails:IProject = {};
  createTaskDialog: boolean = false;
  task:ITask = {};

  taskTypes:ITaskType[] = [];
  personsInProject:PersonInterface[] = [];
  workflow:IWorkFlow[] = []
  selectedWorkflow:IWorkFlow = {};
  editingTask:boolean = false;
  creatingTask:boolean = false;
  infoDialog:boolean = false;

  searchSubject = new Subject<IWorkFlow>();

  constructor(private route: ActivatedRoute, private _location: Location, private taskService:TasksService) {
    this.searchSubject.pipe(
      distinctUntilChanged())
      .subscribe(() => {
        if (this.selectedWorkflow != this.task.workflow){
        this.taskService.setTaskWorkFlow(this.task.id!, this.selectedWorkflow.id!).subscribe((data:ITask)=>{
          this.taskGroups.forEach((workflowArray:any) => {
            var taskId:number = -1;
            if(workflowArray.workflowDTO?.name == this.task.workflow?.name){
              for (let i = 0; i < workflowArray.tasks.length; i++) {
                if (workflowArray.tasks[i].id == this.task.id){
                  taskId = i;
                }
              }
              if(taskId != -1){
              console.log(taskId);
              workflowArray.tasks?.splice(taskId,1);
            }
            }
          });
          this.taskGroups.forEach(workflowArray => {
            if(workflowArray.workflowDTO?.name == data.workflow?.name) {
              workflowArray.tasks?.push(data!);
            }
          });
        });
      }
        });
  }
  date:string = '';
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.taskService.getProjectInfo(this.id).subscribe((data:any) => {this.projectDetails = data; this.date = this.convert(data.endOfSprint);});
    this.taskService.getTasksForProject(this.id).subscribe((data:any) => this.taskGroups = data);
    this.taskService.getEmployeesInProject(this.id).subscribe((data:any) => this.personsInProject = data)
    this.taskService.getTaskTypes().subscribe((data:any) => this.taskTypes = data);
    this.taskService.getProjectWorkflow(this.id).subscribe((data:any)=> this.workflow = data);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  backClicked() {
    this._location.back();
  }
  convert(date: number[]): string {
    return `${date[2]<10?'0'+date[2]:date[2]}-${date[1]<10?'0'+date[1]:date[1]}-${date[0]} ${date[3]}:${date[4]}:${date[5]}`;
  }

  openNew() {
    this.task = {};
    this.createTaskDialog = true;
    this.creatingTask = true;
  }

  hideDialog() {
    this.createTaskDialog = false;
    this.creatingTask = false;
    this.editingTask = false;
    this.infoDialog = false;
    this.task = {};
  }

  clickTask(task:ITask){
    this.task = task;
    this.selectedWorkflow = task.workflow!;
    this.infoDialog = true;
  }

  saveTask(){
    if(this.editingTask){

    }else if(this.creatingTask){
      this.taskService.createTask(this.id, this.task).subscribe((data:any) => this.taskGroups[0].tasks?.push(data));
    }
    this.createTaskDialog = false;
    this.creatingTask = false;
    this.editingTask = false;
    this.task = {};
  }

  deleteTask(){

  }

  editTask(){

  }
}