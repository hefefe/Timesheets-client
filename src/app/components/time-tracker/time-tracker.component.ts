import { Component } from '@angular/core';
import { TimeTrackerService } from './time-tracker.service';
import { ProjectsService } from '../projects/projects.service';
import { IProject } from 'src/app/project-interface';
import { IHistoryWithTotalTime, IIsStarted } from 'src/app/timer-interface';
import { ITask } from 'src/app/task-interface';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss'],
})
export class TimeTrackerComponent {
  projects: IProject[] = [];

  history: IHistoryWithTotalTime = {};

  selectedProject: IProject = {};

  selectedTask: ITask = {};

  startedData: IIsStarted = {};

  startedTimer: boolean = false;

  timer: number[] = [0,0,0];

  constructor(
    private timeTrackerService: TimeTrackerService,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.projectService.getProjects().then((data) => (this.projects = data));
    this.timeTrackerService
      .getHistory()
      .subscribe((data: any) => (this.history = data));
    this.timeTrackerService
      .getIsTimerStarted()
      .subscribe((data: IIsStarted) => {
        console.log(data);
        if (data.startedTime != undefined) {
          this.startedData = data;
          this.startedTimer = true;
        }
      });
  }

  getMonthShortName(monthNumber: number) {
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[monthNumber - 1];
  }

  getHoursAndMinutes(time: number) {
    var timeInTime: number[] = [];
    var hours: number = Math.floor(time / 60);
    var minutes: number = time - Math.floor(time / 60) * 60;
    timeInTime.push(hours);
    timeInTime.push(minutes);
    return timeInTime;
  }

  getHoursAndMinutesAndSeconds(time: number) {
    var timeInTime: number[] = [];
    var hours: number = Math.floor(time / 3600);
    var minutes: number = Math.floor(time - hours * 3600);
    var seconds: number = time - hours * 3600 - minutes * 60;
    timeInTime.push(hours);
    timeInTime.push(minutes);
    timeInTime.push(seconds);
    return timeInTime;
  }

  convertTimeToString(time: number[]): string {
    console.log(time);
    return `${time[0] < 10 ? '0' + time[0] : time[0]}:${
      time[1] < 10 ? '0' + time[1] : time[1]
    }`;
  }

  coutUp() {
    this.timer = this.getHoursAndMinutesAndSeconds(
      this.convertTimeArrayToNumber(this.timer) + 1
    );
  }

  convertTimeArrayToNumber(time: number[]) {
    var secondsInHours = time[0] * 3600;
    var secondsInMinutes = time[1] * 60;
    var seconds = time[2];
    return secondsInHours + secondsInMinutes + seconds;
  }

  convertDateToString(date: number[]) {
    return `${date[2] < 10 ? '0' + date[2] : date[2]} ${this.getMonthShortName(
      date[1]
    )} ${date[0]}`;
  }

  prepareData() {
    console.log(this.startedData.startedTime != undefined);
    var date:number[] = this.dateToNumberArray();
    if(this.startedData.startedTime != undefined){
      this.timer = [
        date[3]-this.startedData.startedTime[0],
        date[4]-this.startedData.startedTime[1],
        date[5]-this.startedData.startedTime[2] == undefined ? 0 : this.startedData.startedTime[2]
      ];
    }else{
      this.timer = [0,0,0];
    }
  }

  stopTimer() {
    this.timeTrackerService.stopTimer().subscribe(()=>{
      this.startedData = {};
      this.startedTimer = false;
      this.timer = [0,0,0];
      this.selectedTask = {};
      this.selectedProject = {};
      this.timeTrackerService.getHistory().subscribe((data:any) => this.history = data);
    })
  }

  dateToNumberArray(){
    var date:Date = new Date();
    var numberArray:number[] = [];
    numberArray.push(date.getFullYear());
    numberArray.push(date.getMonth());
    numberArray.push(date.getDay());
    numberArray.push(date.getHours());
    numberArray.push(date.getMinutes());
    numberArray.push(date.getSeconds());
    return numberArray;
  }
}
