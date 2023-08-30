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
  public page = 'viewMyLeave';
  userId: number;


    constructor(private routerService:RouterService) {
      this.userManager = this.routerService.getQueryParams().user;
      this.managerId = this.userManager.id;
        this.userId = this.userManager.id

    }

  ngOnInit(): void {
  }

  public navigatePage(page: string){
      this.page = page;

  }
}
