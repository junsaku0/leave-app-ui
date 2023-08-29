import { Component, OnInit } from '@angular/core';
import {RouterService} from "../service/router.service";
import {LeaveService} from "../service/leave.service";


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  public userManager: any;
  public user: any;
  managerId: number;
  leaveId: number;
  public page = 'viewMyLeave';

  constructor(private routerService:RouterService, private leaveService:LeaveService) {
      this.userManager = this.routerService.getQueryParams().user;
      this.managerId = this.userManager.id;
      this.leaveId = this.user.id;
  }

  ngOnInit(): void {
  }

    public updateEmployeeLeave(leaveId: number, status: string): void {
        this.leaveService.updateleave(leaveId, status).subscribe(
            (response: any) => {
                // Handle success response here
                console.log('Leave updated successfully:', response);
            }
        );
    }


  public navigatePage(page: string){
      this.page = page;

  }
}
