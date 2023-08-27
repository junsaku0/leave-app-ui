import {Component, Input, OnInit} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {RouterService} from "../service/router.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LeaveDetails} from "../model/leave-details.model";

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit{

  leaveForm: FormGroup;
  @Input() userDetails: any;

  constructor(private leaveService: LeaveService, public routersService: RouterService) {

  this.leaveForm = new FormGroup<any>({
      userId: new FormControl(''),
      name: new FormControl(''),
      role: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    reason: new FormControl(''),
      totalDaysLeave: new FormControl('')
  });


  }
    ngOnInit(): void {

    }

  public OnSubmit(){
      this.leaveForm.controls["userId"].setValue(this.userDetails.id);
      this.leaveForm.controls["name"].setValue(this.userDetails.name);
      this.leaveForm.controls["role"].setValue(this.userDetails.role);
    console.log(this.leaveForm.getRawValue())
    const leaveValue = this.leaveForm.getRawValue()

    this.leaveService.saveLeave(leaveValue).subscribe({
      next: (data: LeaveDetails) =>
      {
        console.log('Saved leave: ', data);
      }
    });
  }

    calculateTotalDays(): number {
        const startDate = this.leaveForm.get('startDate')?.value;
        const endDate = this.leaveForm.get('endDate')?.value;

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const timeDifference = Math.abs(end.getTime() - start.getTime());
            const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

            return totalDays;
        }
        return 0;

    }


}
