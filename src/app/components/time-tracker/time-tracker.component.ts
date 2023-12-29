import { Component } from '@angular/core';
import { TimeTrackerService } from './time-tracker.service';
import { ProjectsService } from '../projects/projects.service';
import { IProject } from 'src/app/project-interface';
import { IHistoryWithTotalTime, IIsStarted, ITimer } from 'src/app/timer-interface';
import { ITask } from 'src/app/task-interface';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss'],
})
export class TimeTrackerComponent {
  projects: IProject[] = [];

  tasks: ITask[] = [];

  history: IHistoryWithTotalTime = {};

  startTimerData: ITimer = {};

  startedData: IIsStarted = {};

  startedTimer: boolean = false;

  timer: number[] = [0,0,0];

  projectSubject = new Subject<any>();
  interval:any;

  constructor(
    private timeTrackerService: TimeTrackerService,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.projectService.getProjects().then((data) => (this.projects = data));
    this.timeTrackerService
      .getHistory()
      .subscribe((data: any) => this.history = data);
    this.timeTrackerService
      .getIsTimerStarted()
      .subscribe((data: IIsStarted) => {
        if (data.startedTime != undefined) {
          this.startedData = data;
          Object.keys(data.project! || {}).length === 0 ? null : this.timeTrackerService.getTasks(this.startedData.project!.id!).subscribe((data:any)=> this.tasks = data);
          this.startedTimer = true;
          this.prepareData();
          this.startTimer();
        }
      });

      this.projectSubject.pipe(
        distinctUntilChanged())
        .subscribe(() => {
          this.tasks = [];
          this.timeTrackerService.getTasks(this.startedData.project!.id!).subscribe((data:any)=> this.tasks = data);
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
    var minutes: number = Math.floor((time - hours * 3600)/60);
    var seconds: number = time - hours * 3600 - minutes * 60;
    timeInTime.push(hours);
    timeInTime.push(minutes);
    timeInTime.push(seconds);
    return timeInTime;
  }

  convertTimeToString(time: number[]): string {
    return `${time[0] < 10 ? '0' + time[0] : time[0]}:${time[1] < 10 ? '0' + time[1] : time[1]}`;
  }
  convertTimeToStringWithSeconds(time: number[]): string {
    return `${time[0] < 10 ? '0' + time[0] : time[0]}:${time[1] < 10 ? '0' + time[1] : time[1]}:${time.length == 3?time[2]<10?'0'+time[2]:time[2]:'00'}`;
  }

  countUp() {
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
    if(date != undefined){
    return `${date[2] < 10 ? '0' + date[2] : date[2]} ${this.getMonthShortName(
      date[1]
    )} ${date[0]}`;
  }
  return "01" + "Jan" + "1901";
  }

  prepareData() {
    var date:number[] = this.dateToNumberArray();
    if(this.startedData.startedTime != undefined){
      var timeNow:number[] = [date[3],date[4],date[5]];
      var timeFromServer:number[] = [this.startedData.startedTime[0], this.startedData.startedTime[1], this.startedData.startedTime[2] == undefined ? 0 : this.startedData.startedTime[2]];
      var diff = this.convertTimeArrayToNumber(timeNow) - this.convertTimeArrayToNumber(timeFromServer);
      this.timer = this.getHoursAndMinutesAndSeconds(diff);
    }else{
      this.timer = [0,0,0];
    }
  }

  startTimer(){
    this.interval = setInterval(() => {
      this.countUp();
    },1000)
    this.startedTimer = true;
  }

  stopTimer() {
    this.timeTrackerService.stopTimer().subscribe(()=>{
      this.startedData = {};
      this.tasks = [];
      this.startedTimer = false;
      clearInterval(this.interval);
      this.timer = [0,0,0];
      this.startTimerData = {};
      this.timeTrackerService.getHistory().subscribe((data:any) => this.history = data);
    })
  }

  startTimeTracker(){
    this.startTimerData.taskId = this.startedData.task?.id;
    this.startTimerData.description = this.startedData?.description;
    this.timeTrackerService.startTimer(this.startTimerData).subscribe((data:IIsStarted) => {
      this.startedData = data;
      this.startTimer();
    });
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
