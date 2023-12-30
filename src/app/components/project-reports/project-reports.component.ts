import { Component } from '@angular/core';
import { IProject } from 'src/app/project-interface';
import { IDatePlaceholder, IIdFromTo, IProjectStatistics } from 'src/app/reports-interface';
import { ProjectReportsService } from './project-reports.service';

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.scss']
})
export class ProjectReportsComponent {
  dates: IDatePlaceholder[] = [];
  projects: IProject[] = [];
  model: IIdFromTo = {};
  statistics:IProjectStatistics = {};

  constructor(private projectReportsService: ProjectReportsService){}

  ngOnInit(){
    this.getDates();
    this.projectReportsService.getProjects().subscribe((data:any) =>this.projects = data);

  }

  getDates(){
    var date: Date = new Date();
    if(date.getDate() <= 15){
      var biweekly: IDatePlaceholder = {
        name:'half-monthly',
        from: new Date(date.getFullYear(), date.getMonth(), 2),
        to: new Date(date.getFullYear(), date.getMonth(), 16)
      }
      this.dates.push(biweekly);
    }else{
      var biweekly: IDatePlaceholder = {
        name:'half-monthly',
        from: new Date(date.getFullYear(), date.getMonth(), 17),
        to: new Date(date.getFullYear(), date.getMonth() + 1, 1)
      }
      this.dates.push(biweekly);
    }
    var monthly: IDatePlaceholder = {
      name:'monthly',
        from: new Date(date.getFullYear(), date.getMonth(), 2),
        to: new Date(date.getFullYear(), date.getMonth() + 1, 1)
    }
    this.dates.push(monthly);
  }
}
