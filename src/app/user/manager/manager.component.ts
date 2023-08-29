import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../service/manager.service';
import { UserResponse } from '../model/user-response.model';
import {RouterService} from "../service/router.service";
import {User} from "../model/user.model";
import {LeaveService} from "../service/leave.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  public managerList: UserResponse[] = [];
  public userManager: any;
  managerId: number;
  public page = 'viewMyLeave';

  constructor(private managerService: ManagerService,private routerService:RouterService, private leaveService:LeaveService) {
      this.userManager = this.routerService.getQueryParams().user;
      this.managerId = this.userManager.id;
  }

  ngOnInit(): void {
    this.fetchManagerList();
  }

  private fetchManagerList() {
    this.managerService.fetchManager().subscribe(
      (data: UserResponse[]) => {
        console.log('Retrieve manager list:', data);
        this.managerList = data;
      }/*,
      (error) => {
        console.error('Error retrieving manager list:', error);
      }*/
    );
  }

  public updateEmployeeLeave(){
      this.leaveService.updateleave()

  }




  public navigatePage(page: string){
      this.page = page;

  }
}
