import { Component } from '@angular/core';

@Component({
  selector: 'app-timesheets-header',
  templateUrl: './timesheets-header.component.html',
  styleUrls: ['./timesheets-header.component.scss']
})
export class TimesheetsHeaderComponent {
  date: Date | undefined;
}