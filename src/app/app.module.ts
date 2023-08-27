import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminComponent} from './user/admin/admin.component';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import {ManagerComponent} from './user/manager/manager.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LeaveComponent} from './user/leave/leave.component';
import {EmployeeComponent} from './user/employee/employee.component';
import {MyLeaveComponent} from './user/my-leave/my-leave.component';
import { ViewMyEmployeeLeaveComponent } from './user/view-my-employee-leave/view-my-employee-leave.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    ManagerComponent,
      LeaveComponent,
    EmployeeComponent,
    MyLeaveComponent,
    ViewMyEmployeeLeaveComponent,

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
