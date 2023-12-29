import { Component } from '@angular/core';
import { PersonInterface } from 'src/app/person-Interface';
import { IDatePlaceholder, IIdFromTo, IPersonStatistics } from 'src/app/reports-interface';
import { PersonReportsService } from './person-reports.service';

@Component({
  selector: 'app-person-reports',
  templateUrl: './person-reports.component.html',
  styleUrls: ['./person-reports.component.scss']
})
export class PersonReportsComponent {

  dates: IDatePlaceholder[] = [];
  persons: PersonInterface[] = [];
  model: IIdFromTo = {};
  statistics:IPersonStatistics = {};

  constructor(private personReportsService: PersonReportsService){}

  ngOnInit(){
    this.getDates();
    this.personReportsService.getPersonByRank().subscribe((data:any) =>this.persons = data);

  }

  getDates(){
    var date: Date = new Date();
    if(date.getDate() <= 15){
      var biweekly: IDatePlaceholder = {
        name:'half-monthly',
        from: new Date(date.getFullYear(), date.getMonth(), 1),
        to: new Date(date.getFullYear(), date.getMonth(), 15)
      }
      this.dates.push(biweekly);
    }else{
      var biweekly: IDatePlaceholder = {
        name:'half-monthly',
        from: new Date(date.getFullYear(), date.getMonth(), 16),
        to: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      }
      this.dates.push(biweekly);
    }
    var monthly: IDatePlaceholder = {
      name:'monthly',
        from: new Date(date.getFullYear(), date.getMonth(), 1),
        to: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    }
    this.dates.push(monthly);
  }
}
