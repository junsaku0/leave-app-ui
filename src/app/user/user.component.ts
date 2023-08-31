import { Component, OnInit} from '@angular/core';
import {UserService} from "./service/user.service";
import {UserResponse} from "./model/user-response.model";
import {RouterService} from "./service/router.service";
import {User} from "./model/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  public userList: any;
  public userFilter: User[] = [];
  public selectedRole = 'all';

  constructor(private userService: UserService,
              private routerService: RouterService) {
  }

  ngOnInit() {
    this.initializeUsers();
  }

  private initializeUsers(): void {
    this.userService.fetchAllUsers()
      .subscribe({
        next: (data: UserResponse) =>
        {
          console.log('Response:', data);
          this.userList = data;
          this.userFilter = this.userList;
        }
      });
  }

  public showUserPage(user: any) {
    console.log('Navigate to page:', user.role, ' - ',user.name);
    const pageUrl = '/user/' + user.role.toLowerCase();
    this.routerService.navigate(pageUrl, {'user': user});
  }

  public selectRole(role: string) {
    this.selectedRole = role;
    if (this.selectedRole == 'all') {
      this.userFilter = this.userList;
    } else if (this.selectedRole == 'admin') {
        this.userService.fetchUserAdmin()
            .subscribe({
                next: (data: User[]) =>
                {
                    console.log('Response:', data);
                    this.userFilter = data;
                }
            });
    } else if (this.selectedRole == 'manager') {
      this.userService.fetchUserManager()
        .subscribe({
          next: (data: User[]) =>
            {
              console.log('Response:', data);
              this.userFilter = data;
            }
        });
    } else if (this.selectedRole == 'employee') {
      this.userService.fetchUserEmployee()
        .subscribe({
          next: (data: User[]) =>
            {
              console.log('Response:', data);
              this.userFilter = data;
            }
        });
    }
  }

  filterResults(text: string) {
    if (!text) {
      this.userFilter = this.userList;
    }
    this.userFilter = this.userFilter.filter(
      userFilter => userFilter?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

}
