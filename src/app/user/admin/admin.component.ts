import {Component} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {RouterService} from "../service/router.service";
import {ManagerService} from "../service/manager.service";
import {EmployeeService} from "../service/employee.service";
import {UserResponse} from "../model/user-response.model";

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

  constructor(private userService: UserService, private managerService: ManagerService,
              private employeeService: EmployeeService, public routerService: RouterService) {
    this.adminUser = routerService.getQueryParams().user;
    this.createUserForm = new FormGroup<any>( {
      name: new FormControl(''),
      hireDate: new FormControl(''),
      manager: new FormControl(''),
      totalLeave: new FormControl('')
    });
  }

  public onSubmit() {
    console.log(this.createUserForm.getRawValue());

    if (this.selectedRole == 'Manager') {
      const formValue = this.createUserForm.getRawValue();

      this.managerService.saveManager(formValue)
        .subscribe({
          next: (data) => {
            console.log('saved data:', data);
          }
        });
    } else if (this.selectedRole == 'Employee') {
      const formValue = this.createUserForm.getRawValue();

      this.employeeService.saveEmployee(formValue)
        .subscribe({
          next: (data) => {
            console.log('saved data:', data);
          }
        });
    }
  }

  public onSelected(role: string) {
    this.selectedRole = role;
    if (this.selectedRole == 'Manager') {
      this.createUserForm.removeControl('manager');
    } else if (this.selectedRole == 'Employee') {
      this.createUserForm.addControl('manager', new FormControl(''));
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
}
