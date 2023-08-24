import { Component } from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {RouterService} from "../service/router.service";
import {FormControl, FormGroup} from "@angular/forms";
import {UserResponse} from "../model/user-response.model";
import {LeaveDetails} from "../model/leave-details.model";

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {

  leaveForm: FormGroup;

  constructor(private leaveService: LeaveService, public routersService: RouterService) {

  this.leaveForm = new FormGroup<any>({
    name: new FormControl(''),
    role: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    reason: new FormControl('')
  })

  }

  public OnSubmit(){
    console.log(this.leaveForm.getRawValue())
    const leaveValue = this.leaveForm.getRawValue()

    this.leaveService.saveLeave(leaveValue).subscribe({
      next: (data: LeaveDetails) =>
      {
        console.log('Saved leave: ', data);
      }
    });
  }


}
