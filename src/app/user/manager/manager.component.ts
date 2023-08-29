import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../model/user-response.model';
import {RouterService} from "../service/router.service";
import {LeaveService} from "../service/leave.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  public userManager: any;
  managerId: number;
  public page = 'viewMyLeave';

  constructor(private routerService:RouterService, private leaveService:LeaveService) {
      this.userManager = this.routerService.getQueryParams().user;
      this.managerId = this.userManager.id;
  }


  ngOnInit(): void {
  }

  public updateEmployeeLeave(){
      // this.leaveService.updateleave()

  }

  public navigatePage(page: string){
      this.page = page;

  }
}
