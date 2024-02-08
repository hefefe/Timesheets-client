import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PersonInterface } from 'src/app/person-Interface';
import { AppServiceService } from '../home/app-service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  items: MenuItem[] | undefined;
  basicData: PersonInterface = {};
  isNotManagerOrLeader: boolean = false;
  constructor(private appService: AppServiceService){}
  ngOnInit() {
    this.getLoggedInUser();
    // console.log(this.basicData.position);
    // this.items = [
    //     { label: 'Person', icon: 'pi pi-fw pi-user', routerLink: ['/home/reports/person'] },
    //     { label: 'Project', icon: 'pi pi-fw pi-desktop', routerLink: ['/home/reports/project'], disabled: this.isNotManagerOrLeader}
    // ];
}
getLoggedInUser(){
  this.appService.getLoggedUser().subscribe(data => {
    this.basicData = data;
    this.isNotManagerOrLeader = !(this.basicData.position?.toString() == 'MANAGER' || this.basicData.position?.toString() == 'TEAM_LEADER');
    this.items = [
      { label: 'Person', icon: 'pi pi-fw pi-user', routerLink: ['/home/reports/person'] },
      { label: 'Project', icon: 'pi pi-fw pi-desktop', routerLink: ['/home/reports/project'], disabled: this.isNotManagerOrLeader}
  ];
  });
}
}
