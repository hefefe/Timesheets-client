import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { GlobalconstantsModule } from '../../common/globalconstants.module';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private jwtService:AuthServiceService, private router: Router, private route: ActivatedRoute){
    const accessToken = localStorage.getItem(GlobalconstantsModule.atoken) || sessionStorage.getItem(GlobalconstantsModule.atoken);
    if (accessToken){
      this.router.navigate(["/home/timetracker"]);
    }
  }

  login() {
    this.jwtService.login(this.credentials).subscribe(
      (data:any)=>{
        if (this.isChecked){
          localStorage.setItem(GlobalconstantsModule.atoken, data.accessToken);
          localStorage.setItem(GlobalconstantsModule.rtoken, data.refreshToken);
        }else{
          sessionStorage.setItem(GlobalconstantsModule.atoken, data.accessToken);
          sessionStorage.setItem(GlobalconstantsModule.rtoken, data.refreshToken);
        }
        if (data.requiredToChangePassword == true){
          this.router.navigate(["/changePassword"]);
        }else{
          this.router.navigate(["/home/timetracker"]);
        }
      }
    )
    }
}
