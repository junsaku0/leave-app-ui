import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './user/admin/admin.component';
import { UserComponent } from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import { ManagerComponent } from './user/manager/manager.component';

import {ReactiveFormsModule} from "@angular/forms";
import { LeaveComponent } from './user/leave/leave.component';
import { EmployeeComponent } from './user/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    ManagerComponent,
    LeaveComponent,
    EmployeeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
