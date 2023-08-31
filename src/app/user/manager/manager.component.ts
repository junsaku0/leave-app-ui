import { Component, OnInit } from '@angular/core';
import {RouterService} from "../service/router.service";
import {UserService} from "../service/user.service";
import {UserResponse} from "../model/user-response.model";

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

    public userList: any;
    public selectedUser: any = undefined;

    constructor(private userService: UserService,
                private routerService:RouterService) {
      this.userManager = this.routerService.getQueryParams().user;
      this.managerId = this.userManager.id;
        this.userId = this.userManager.id

    }

  ngOnInit(): void {
      this.fetchUserList();
  }

  public navigatePage(page: string){
      this.page = page;

  }


    public showUserPage(user: any) {
        console.log('Navigate to page:', user.role, ' - ',user.name, '-', user);
        if (user.role == this.userManager.role) {
            this.userManager = user;
            this.userId = this.userManager.id;
        }
        const pageUrl = '/user/' + user.role.toLowerCase();
        this.routerService.navigate(pageUrl, {'user': user});
    }

    public fetchUserList() {
        this.userService.fetchAllUsers()
            .subscribe({
                next: (data: UserResponse) =>
                {
                    console.log('Response:', data);
                    this.userList = data;
                }
            });
    }

    protected readonly undefined = undefined;
}
