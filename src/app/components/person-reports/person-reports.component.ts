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
  colors:string[]=[];
  selectedDates: IDatePlaceholder = {};
  selectedPerson: PersonInterface = {};
  statistics:IPersonStatistics = {};
  history: IHistoryWithTotalTime = {};
  name:string = '';

  data: any;
  options: any;

  dataLine: any;
  optionsLine: any;
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

    this.personReportsService.getPersonStatistics(this.model).subscribe((data:any) => {this.statistics = data;
      this.name = this.selectedDates.name!;

      for(let i=0;i<this.statistics.storyPointsDone?.length!;i++){
        this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
  }

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

          this.data = {
              labels: this.statistics.tasksAndHours?.map(data => data.taskName),
              datasets: [
                  {
                      data: this.statistics.tasksAndHours?.map(data => data.timeOfCompletion),
                      backgroundColor: this.colors
                  }
              ]
          };

          this.options = {
              plugins: {
                  legend: {
                      labels: {
                          usePointStyle: true,
                          color: textColor
                      }
                  }
              }
          };

          this.dataLine = {
            labels: this.statistics.storyPointsDone?.map(data => data.date![2]),
            datasets: [
                {
                    label: 'Story points done',
                    data: this.statistics.storyPointsDone?.map(data => data.storyPoints),
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0
                }
            ]
        };

        this.optionsLine = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                    title: {
                      display: true,
                      text: 'Day of month'
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                    title: {
                      display: true,
                      text: 'Story points done'
                    }
                }
            }
        };
    });
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
