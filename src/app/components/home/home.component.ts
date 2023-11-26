import { Component } from '@angular/core';
import { PersonInterface, Tokens } from 'src/app/personInterface';
import { AppServiceService } from './app-service.service';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'timesheets-client';
  sidebarVisible: boolean = false;
  basicData: PersonInterface = {}

  tokens: Tokens = {
    accessToken: '',
    refreshToken: ''
  }

  constructor(private appService: AppServiceService, private router: Router){
    this.getLoggedInUser();
  }
  ngOnInit() {

}

 logout(){
  const aToken = localStorage.getItem(GlobalconstantsModule.atoken) || sessionStorage.getItem(GlobalconstantsModule.atoken);
  const rToken = localStorage.getItem(GlobalconstantsModule.rtoken) || sessionStorage.getItem(GlobalconstantsModule.rtoken);
  if(aToken && rToken){
    this.tokens.accessToken = aToken;
    this.tokens.refreshToken = rToken;
    this.appService.logOut(this.tokens).subscribe();
    localStorage.removeItem(GlobalconstantsModule.atoken);
    sessionStorage.removeItem(GlobalconstantsModule.atoken);
    localStorage.removeItem(GlobalconstantsModule.rtoken);
    sessionStorage.removeItem(GlobalconstantsModule.rtoken);
    this.router.navigate(["/login"]);
  }
 }

 getLoggedInUser(){
  this.appService.getLoggedUser().subscribe(data => this.basicData = data);
}
}
