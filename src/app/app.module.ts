import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './user/admin/admin.component';
import { UserComponent } from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import { ManagerComponent } from './user/manager/manager.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeeComponent } from './user/employee/employee.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    ManagerComponent,
    EmployeeComponent,


  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
