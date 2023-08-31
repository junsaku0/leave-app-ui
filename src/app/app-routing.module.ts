import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./user/admin/admin.component";
import {UserComponent} from "./user/user.component";
import {ManagerComponent} from "./user/manager/manager.component";
import {EmployeeComponent} from "./user/employee/employee.component";

import {MyLeaveComponent} from "./user/my-leave/my-leave.component";


import {ViewMyEmployeeLeaveComponent} from "./user/view-my-employee-leave/view-my-employee-leave.component";
import {LeaveComponent} from "./user/leave/leave.component";


const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: '', component: UserComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'manager', component: ManagerComponent },
        {path: 'employee', component: EmployeeComponent},
        {path: 'myLeave', component: MyLeaveComponent},
      {path: 'viewMyEmployee', component: ViewMyEmployeeLeaveComponent},
      {path: 'leave', component: LeaveComponent}



    ]
  },
    { path: 'viewMyEmployeeLeave', component: ViewMyEmployeeLeaveComponent},

    {
    path: '**', redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
