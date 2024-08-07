import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimesheetsAuthComponent } from './components/timesheets-auth/timesheets-auth.component';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'
import { HttpConfigInterceptor } from './http-config.interceptor';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { SidebarModule } from 'primeng/sidebar';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ProjectsComponent } from './components/projects/projects.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ChipsModule } from 'primeng/chips';
import {MultiSelectModule} from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { PersonReportsComponent } from './components/person-reports/person-reports.component';
import { ProjectReportsComponent } from './components/project-reports/project-reports.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetsAuthComponent,
    ChangePassComponent,
    HomeComponent,
    EmployeeComponent,
    ProjectsComponent,
    TasksComponent,
    TimeTrackerComponent,
    ReportsComponent,
    PersonReportsComponent,
    ProjectReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    HttpClientModule,
    CheckboxModule,
    MenuModule,
    InputTextModule,
    PasswordModule,
    SidebarModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    CommonModule,
    MessagesModule,
    ChipsModule,
    MultiSelectModule,
    CardModule,
    FieldsetModule,
    TabMenuModule,
    ChartModule
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
