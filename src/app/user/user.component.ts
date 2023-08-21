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
  public manager: any;

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
      })
  }

  public showUserPage(user: any) {
    console.log('Navigate to page:', user.name);
    this.routerService.navigate('/user/admin', {'user': user});
  }


  public ShowManagerPage(user: any) {
    console.log('Manager Page', user);
    this.routerService.navigate('/user/manager', { 'user': user });
  }


}
