import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { AppRoutingModule } from './/app-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConstantsModule } from './/constants.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'underscore';


@NgModule({
  declarations: [
    AppComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    ConstantsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
