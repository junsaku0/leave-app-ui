import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../model/user-response.model';
import {RouterService} from "../service/router.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  public userManager: any;
  public page = 'viewMyLeave';

  constructor(private routerService:RouterService) {
      this.userManager = this.routerService.getQueryParams().user;
  }

  ngOnInit(): void {
  }

  public navigatePage(page: string){
      this.page = page;

  }
}
