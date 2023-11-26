import { Component } from '@angular/core';
import { ChangePassService } from './change-pass.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent {
  credentials = {
    password: '',
    confirmPassword: ''
  }
  constructor(private changePasswordService:ChangePassService){}

  setPassword() {
    if (this.credentials.password == this.credentials.confirmPassword){
      this.changePasswordService.setPassword(this.credentials).subscribe();
    }
  }
}
