import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./user/admin/admin.component";
import {UserComponent} from "./user/user.component";
import {ManagerComponent} from "./user/manager/manager.component";

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: '', component: UserComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'manager', component: ManagerComponent }

    ]
  },
  {
    path: '**', redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
