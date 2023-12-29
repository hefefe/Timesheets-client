import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetsAuthComponent } from './components/timesheets-auth/timesheets-auth.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { loginGuard } from './components/timesheets-auth/login.guard';
import { ProjectsComponent } from './components/projects/projects.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { ReportsComponent } from './components/reports/reports.component';
import { PersonReportsComponent } from './components/person-reports/person-reports.component';
import { ProjectReportsComponent } from './components/project-reports/project-reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login',
   canDeactivate: [loginGuard],
   component: TimesheetsAuthComponent
  },
  {path: 'changePassword',
   component: ChangePassComponent
  },
  {path: 'home',
   component: HomeComponent,
   children: [
    {path: 'employees', component: EmployeeComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'project/:id', component: TasksComponent},
    {path: 'timetracker', component: TimeTrackerComponent},
    {path: 'reports', component: ReportsComponent, children: [
      {path: 'person', component: PersonReportsComponent},
      {path: 'project', component: ProjectReportsComponent},
    ]}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
