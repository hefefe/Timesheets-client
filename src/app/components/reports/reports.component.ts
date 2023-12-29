import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  items: MenuItem[] | undefined;

  constructor(private router: Router){}
  ngOnInit() {
    this.items = [
        { label: 'Person', icon: 'pi pi-fw pi-user', routerLink: ['/home/reports/person'] },
        { label: 'Project', icon: 'pi pi-fw pi-desktop', routerLink: ['/home/reports/project'] }
    ];
}

}
