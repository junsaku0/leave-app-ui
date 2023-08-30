
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-my-leave',
  templateUrl: './my-leave.component.html',
  styleUrls: ['./my-leave.component.css']
})
export class MyLeaveComponent implements OnInit, OnChanges {
    public myLeaves:any = {};
    @Input() userId!:number;



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


    ngOnChanges(changes: SimpleChanges) {
        console.log('changes:', this.userId);
        this.fetchMyLeave(this.userId)
    }

    public updateEmployeeLeave(leaveId: number, status: any): void {
        // const updateDetails: LeaveUpdateDetails = {status};

        this.leaveService.updateLeave(leaveId, status).subscribe(
            (response: any) => {
                // Handle success response here
                console.log('Leave updated successfully:', response);
            }
        );
    }






}
