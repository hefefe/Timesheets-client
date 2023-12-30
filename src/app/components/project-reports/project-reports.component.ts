import { Component } from '@angular/core';
import { IProject } from 'src/app/project-interface';
import {
  IDatePlaceholder,
  IIdFromTo,
  IProjectStatistics,
} from 'src/app/reports-interface';
import { ProjectReportsService } from './project-reports.service';

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.scss'],
})
export class ProjectReportsComponent {
  dates: IDatePlaceholder[] = [];
  projects: IProject[] = [];
  model: IIdFromTo = {};
  statistics: IProjectStatistics = {};
  colors: string[] = [];
  selectedDates: IDatePlaceholder = {};
  selectedProject: IProject = {};
  name: string = '';

  data: any;
  options: any;

  dataLine: any;
  optionsLine: any;

  constructor(private projectReportsService: ProjectReportsService) {}

  ngOnInit() {
    this.getDates();
    this.projectReportsService
      .getProjects()
      .subscribe((data: any) =>{ this.projects = data;
        this.selectedDates = this.dates[0];
        this.selectedProject = this.projects[0];});
  }

  getDates() {
    var date: Date = new Date();
    if (date.getDate() <= 15) {
      var biweekly: IDatePlaceholder = {
        name: 'half-monthly',
        from: new Date(date.getFullYear(), date.getMonth(), 2),
        to: new Date(date.getFullYear(), date.getMonth(), 16),
      };
      this.dates.push(biweekly);
    } else {
      var biweekly: IDatePlaceholder = {
        name: 'half-monthly',
        from: new Date(date.getFullYear(), date.getMonth(), 17),
        to: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      };
      this.dates.push(biweekly);
    }
    var monthly: IDatePlaceholder = {
      name: 'monthly',
      from: new Date(date.getFullYear(), date.getMonth(), 2),
      to: new Date(date.getFullYear(), date.getMonth() + 1, 1),
    };
    this.dates.push(monthly);
  }

  getStats() {
    this.model.id = this.selectedProject.id;
    this.model.from = this.selectedDates.from;
    this.model.to = this.selectedDates.to;

    this.projectReportsService
      .getProjectStatistics(this.model)
      .subscribe((data: any) => {
        this.statistics = data;
        this.name = this.selectedDates.name!;

        for (let i = 0; i < this.statistics.taskDoneByType?.length!; i++) {
          this.colors.push(
            '#' + Math.floor(Math.random() * 16777215).toString(16)
          );
        }
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: this.statistics.sprintCompletion?.map(data => data.sprintNumber),
            datasets: [
                {
                    label: 'Story points commited',
                    backgroundColor: documentStyle.getPropertyValue('--gray-500'),
                    borderColor: documentStyle.getPropertyValue('--gray-500'),
                    data: this.statistics.sprintCompletion?.map(data => data.uncommitted)
                },
                {
                    label: 'Story points Done',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: this.statistics.sprintCompletion?.map(data => data.committed)
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
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
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                    title: {
                      display: true,
                      text: 'Sprint number'
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
                      text: 'Story points'
                    }
                }

            }
        };

        this.dataLine = {
          labels: this.statistics.data?.map(data => this.convertDateToString(data.date!)),
          datasets: [
              {
                  label: 'Guideline',
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--gray-500'),
                  yAxisID: 'y',
                  tension: 0,
                  data: this.statistics.data?.map(data => data.uncommitted)
              },
              {
                  label: 'Remaining values',
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--primary-500'),
                  yAxisID: 'y',
                  tension: 0,
                  data: this.statistics.data?.map(data => data.committed)
              }
          ]
      };

      this.optionsLine = {
          stacked: false,
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
                      color: surfaceBorder
                  },
                  title: {
                    display: true,
                    text: 'Days od sprint'
                  }
              },
              y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder
                  },
                  title: {
                    display: true,
                    text: 'Story points'
                  }
              }
          }
      };
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

  convertTimeToString(time: number[]): string {
    return `${time[0] < 10 ? '0' + time[0] : time[0]}hours ${
      time[1] < 10 ? '0' + time[1] : time[1]
    } minutes`;
  }

  convertDateToString(date: number[]) {
    if (date != undefined) {
      return `${
        date[2] < 10 ? '0' + date[2] : date[2]
      } ${this.getMonthShortName(date[1])} ${date[0]}`;
    }
    return '01' + 'Jan' + '1901';
  }
}
