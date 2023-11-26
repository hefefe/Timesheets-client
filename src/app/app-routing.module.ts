import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetsAuthComponent } from './components/timesheets-auth/timesheets-auth.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { loginGuard } from './components/timesheets-auth/login.guard';

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
   children: [{path: 'employee', component: EmployeeComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
