import {Component} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {RouterService} from "../service/router.service";
import {UserResponse} from "../model/user-response.model";
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public createUserForm: any;
  public adminUser: any;
  public managerList: any;
  public selectedRole: any;
  public currentContent: any;


  constructor(private userService: UserService, public routerService: RouterService) {
    this.adminUser = routerService.getQueryParams().user;
    this.createUserForm = new FormGroup<any>( {
      name: new FormControl(''),
      role: new FormControl(''),
      head: new FormControl(''),
      hireDate: new FormControl(''),
      totalLeave: new FormControl('')
    });

    this.currentContent = 'viewLeaves';
  }

  public onSubmit() {
    const formValue = this.createUserForm.getRawValue();
    console.log('save user info:', formValue);
    this.userService.saveUser(formValue)
       .subscribe({
           next: (data) => {
               console.log('saved data:', data);
           }
       });
  }

  public onSelected(role: string) {
    this.selectedRole = role;
    if (this.selectedRole == 'MANAGER') {
        this.createUserForm.controls["head"].setValue('superAdmin');
    }
    if (this.selectedRole == 'EMPLOYEE') {
      this.userService.fetchUserManager()
        .subscribe({
          next: (data: UserResponse) =>
          {
            console.log('Retrieve manager list:', data);
            this.managerList = data;
          }
        });
    }
  }


  private fetchManagerList() {
    this.userService.fetchUserManager().subscribe({
      next: (data: UserResponse[]) => {
        console.log('Retrieve manager list:', data);
        this.managerList = data;
      }
    });
  }

  ngOnInit(): void {
    this.viewManagers();
  }


  public showContent(content: string) {
    this.currentContent = content;
  }
  public viewManagers() {
    this.fetchManagerList();
  }

/*
  applyLeave(content: string) {
    if (content === 'applyLeaves') {
      // Redirect to the leave HTML page
      this.router.navigate(['/leave'])
    }
  }

*/


  }
