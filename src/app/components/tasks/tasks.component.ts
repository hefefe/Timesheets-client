import { TasksService } from './tasks.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from 'src/app/project-interface';
import { ITask, ITaskGroup } from 'src/app/task-interface';

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
  constructor(private route: ActivatedRoute, private _location: Location, private taskService:TasksService) {}

  date:string = '';
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
    });
    console.log(this.id);
    this.taskService.getProjectInfo(this.id).subscribe((data:any) => {this.projectDetails = data; this.date = this.convert(data.endOfSprint);});
    this.taskService.getTasksForProject(this.id).subscribe((data:any) => {this.taskGroups = data; console.log(data);});
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

  openNew(){}
}
