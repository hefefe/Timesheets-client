import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PersonInterface, Tokens } from './person-Interface';
import { AppServiceService } from './components/home/app-service.service';
import { GlobalconstantsModule } from './common/globalconstants.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
