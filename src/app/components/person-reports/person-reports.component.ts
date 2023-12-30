import { Component } from '@angular/core';
import { PersonInterface } from 'src/app/person-Interface';
import { IDatePlaceholder, IIdFromTo, IPersonStatistics } from 'src/app/reports-interface';
import { PersonReportsService } from './person-reports.service';
import { IHistoryWithTotalTime } from 'src/app/timer-interface';

@Component({
  selector: 'app-person-reports',
  templateUrl: './person-reports.component.html',
  styleUrls: ['./person-reports.component.scss']
})
export class PersonReportsComponent {

  dates: IDatePlaceholder[] = [];
  persons: PersonInterface[] = [];
  model: IIdFromTo = {};
  selectedDates: IDatePlaceholder = {};
  selectedPerson: PersonInterface = {};
  statistics:IPersonStatistics = {};
  history: IHistoryWithTotalTime = {};

  constructor(private personReportsService: PersonReportsService){}

  ngOnInit(){
    this.getDates();
    this.personReportsService.getPersonByRank().subscribe((data:any) =>{this.persons = data;
      this.selectedDates = this.dates[0];
      this.selectedPerson = this.persons[0];
    });
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

  getStats(){
    this.model.id = this.selectedPerson.id;
    this.model.from = this.selectedDates.from;
    this.model.to = this.selectedDates.to;

    this.personReportsService.getPersonStatistics(this.model).subscribe((data:any) => this.statistics = data);
    this.personReportsService.getPErsonHistory(this.model).subscribe((data: any) => this.history = data);
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

  convertTimeToString(time: number[]): string {
    return `${time[0] < 10 ? '0' + time[0] : time[0]}:${time[1] < 10 ? '0' + time[1] : time[1]}`;
  }

  convertDateToString(date: number[]) {
    if(date != undefined){
    return `${date[2] < 10 ? '0' + date[2] : date[2]} ${this.getMonthShortName(
      date[1]
    )} ${date[0]}`;
  }
  return "01" + "Jan" + "1901";
  }
}
