import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-timesheets-auth',
  templateUrl: './timesheets-auth.component.html',
  styleUrls: ['./timesheets-auth.component.scss']
})
export class TimesheetsAuthComponent {
  isChecked = false;
  credentials = {
    email: '',
    password: ''
  }
  constructor(private jwtService:AuthServiceService){}

  login() {
    this.jwtService.login(this.credentials).subscribe(
      (data:any)=>{
        if (this.isChecked){
          localStorage.setItem('token', data.accessToken);
        }else{
          sessionStorage.setItem('token', data.accessToken);
        }
      }
    )
    }
}
