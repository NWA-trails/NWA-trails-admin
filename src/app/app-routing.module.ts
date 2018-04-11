import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent }      from './tables/tables.component';

const routes: Routes = [
  { path: 'tables', component: TablesComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
