
import {Component, Input, OnInit} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-my-leave',
  templateUrl: './my-leave.component.html',
  styleUrls: ['./my-leave.component.css']
})
export class MyLeaveComponent implements OnInit {
    public myLeaves:any = {};
    @Input() userId!:number;
    @Input() userDetails: any;
    @Input()managerId!:number;


constructor(private leaveService: LeaveService, private Http: HttpClient){

}
    fetchMyLeave (userId :number) {
        this.leaveService.fetchPersonalLeave(userId).subscribe(
            (data) => { this.myLeaves = data},
        );
    }
    ngOnInit(): void {

        this.fetchMyLeave(this.userId)
    }

    public updateEmployeeLeave(leaveId: number, status: any): void {
        // const updateDetails: LeaveUpdateDetails = {status};

        this.leaveService.updateleave(leaveId, status).subscribe(
            (response: any) => {
                // Handle success response here
                console.log('Leave updated successfully:', response);
            }
        );
    }






}
