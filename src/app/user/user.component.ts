import { Component, OnInit} from '@angular/core';
import {UserService} from "./service/user.service";
import {UserResponse} from "./model/user-response.model";
import {RouterService} from "./service/router.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  public adminList: any;
  public managerList: any;
  public employeeList: any;

  constructor(private userService: UserService, private routerService: RouterService) {
  }

  ngOnInit() {
    this.initializeUsers();
  }

  private initializeUsers(): void {
    this.userService.fetchUserAdmin()
      .subscribe({
        next: (data: UserResponse) =>
        {
          console.log('Response:', data);
          this.adminList = data;
        }
      });
    this.userService.fetchUserManager()
      .subscribe({
        next: (data: UserResponse) =>
        {
          console.log('Response:', data);
          this.managerList = data;
        }
      });
    this.userService.fetchUserEmployee()
      .subscribe({
        next: (data: UserResponse) =>
        {
          console.log('Response:', data);
          this.employeeList = data;
        }
      });
  }

  public showUserPage(user: any) {
    console.log('Navigate to page:', user.role, ' - ',user.name);
    const pageUrl = '/user/' + user.role.toLowerCase();
    this.routerService.navigate(pageUrl, {'user': user});
  }

}
