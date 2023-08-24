import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../service/manager.service';
import { UserResponse } from '../model/user-response.model';
import {RouterService} from "../service/router.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  public managerList: UserResponse[] = [];
  public userManager: any;
  public page = 'viewMyLeave';

  constructor(private managerService: ManagerService,private routerService:RouterService) {
      this.userManager = this.routerService.getQueryParams().user;
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

  public navigatePage(page: string){
      this.page = page;

  }
}
