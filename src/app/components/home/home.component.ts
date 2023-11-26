import { Component } from '@angular/core';
import { Tokens } from 'src/app/personInterface';
import { AppServiceService } from './app-service.service';
import { GlobalconstantsModule } from 'src/app/common/globalconstants.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'timesheets-client';
  sidebarVisible: boolean = false;
  basicData = {
    firstName: '',
    lastName: '',
    photo: '',
    experience: '',
    position: ''
  }

  tokens: Tokens = {
    accessToken: '',
    refreshToken: ''
  }

  constructor(private appService: AppServiceService){ }
  ngOnInit() {
    this.getLoggedInUser();
    console.log(this.basicData.firstName);
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
  }
 }

 getLoggedInUser(){
  this.appService.getLoggedUser().subscribe(data =>
    {this.basicData.firstName = data.firstName;
      console.log(data.firstName);
    this.basicData.lastName = data.lastName;
    this.basicData.photo = data.photo;
    this.basicData.experience = data.experience;
    this.basicData.position = data.position;});
}
}
