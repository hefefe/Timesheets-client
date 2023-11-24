import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimesheetsHeaderComponent } from './timesheets-header/timesheets-header.component';
import { TimesheetsAuthComponent } from './timesheets-auth/timesheets-auth.component';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'
import { HttpConfigInterceptor } from './http-config.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetsHeaderComponent,
    TimesheetsAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    HttpClientModule,
    CheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
