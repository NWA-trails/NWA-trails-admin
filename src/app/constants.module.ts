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
  public static conditonURL = "https://nwa-trails-webservice.herokuapp.com/trailcondition";
  public static poiURL = "https://nwa-trails-webservice.herokuapp.com/pointofinterest";

  public static trailReports = "Trail Condition Reports";
  public static poiReports = "Points of Interest";
  public static users = "Users";

  public static limitedRole = "ROLE_LIMITED";
  public static adminRole = "ROLE_ADMIN";

  public static tableOptions = [ConstantsModule.trailReports, ConstantsModule.poiReports, ConstantsModule.users ];
  public static userOptions = [ConstantsModule.limitedRole, ConstantsModule.adminRole];
}
