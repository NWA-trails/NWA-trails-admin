import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { ImageButtonRenderComponent, SafeHtmlPipe } from './tables/imagebutton.render.component';
import { AppRoutingModule } from './/app-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConstantsModule } from './/constants.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser'

import * as _ from 'underscore';


@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    ImageButtonRenderComponent,
    SafeHtmlPipe,
  ],
  entryComponents: [
    ImageButtonRenderComponent
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
