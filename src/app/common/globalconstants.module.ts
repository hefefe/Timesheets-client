import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GlobalconstantsModule {
  public static apiURL: string = "http://localhost:8080";
 }
