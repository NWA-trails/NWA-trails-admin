import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ConstantsModule {
  public static userURL = "https://nwa-trails-webservice.herokuapp.com/user";
  public static conditonURL = "https://nwa-trails-webservice.herokuapp.com/trailcondition"
 }
