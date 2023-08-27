import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {RouterService} from "../service/router.service";
import {UserResponse} from "../model/user-response.model";
import { Router } from '@angular/router';
import {LeaveService} from "../service/leave.service";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  public createUserForm: any;
  public adminUser: any;
  public managerUserList: any;

  public managerList: any;
  public employeeList: any;
  public leaveList: any;

  public selectedRole: any;
  public currentContent: any;


  constructor(private userService: UserService,
              private leaveService: LeaveService,
              public routerService: RouterService) {
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

    ngOnInit(): void {
        this.fetchManagerList();
        this.fetchEmployeeList();
        this.fetchLeaveList();
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
            this.managerUserList = data;
          }
        });
    }
  }


  private fetchManagerList() {
    this.userService.fetchManagers().subscribe({
      next: (data: any) => {
        console.log('Retrieve manager list:', data);
        this.managerList = data;
      }
    });
  }

    private fetchEmployeeList() {
        this.userService.fetchEmployees().subscribe({
            next: (data: any) => {
                console.log('Retrieve employee list:', data);
                this.employeeList = data;
            }
        });
    }

    private fetchLeaveList() {
        this.leaveService.fetchLeaves().subscribe({
            next: (data: any) => {
                this.leaveList = data.content;
                console.log('Retrieve leave list:', data);
            }
        });
    }

  public showContent(content: string) {
    this.currentContent = content;


  }


  }
