import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './user/admin/admin.component';
import { UserComponent } from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import { ManagerComponent } from './user/manager/manager.component';

<<<<<<< HEAD
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
=======
import {ReactiveFormsModule} from "@angular/forms";
import { LeaveComponent } from './user/leave/leave.component';
>>>>>>> 9d3a8eaca53c269321c57038cd4e46398948be81
import { EmployeeComponent } from './user/employee/employee.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    ManagerComponent,
<<<<<<< HEAD
    EmployeeComponent,


=======
    LeaveComponent,
    EmployeeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
>>>>>>> 9d3a8eaca53c269321c57038cd4e46398948be81
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
