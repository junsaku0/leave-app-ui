
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../service/user.service";
import {RouterService} from "../service/router.service";


@Component({
  selector: 'app-my-leave',
  templateUrl: './my-leave.component.html',
  styleUrls: ['./my-leave.component.css']
})
export class MyLeaveComponent implements OnInit, OnChanges {
    public myLeaves:any = {};
    public totalLeaves:number = 0;
    @Input() userId!:number;



constructor(private leaveService: LeaveService,
            private Http: HttpClient,
            private userService: UserService,
            routerService: RouterService){
    // this.totalLeaves = this.userService.getTotalLeaves();
}
    fetchMyLeave (userId :number) {
        this.leaveService.fetchPersonalLeave(userId).subscribe(

            (data) => {let result = this.myLeaves = data
                console.log(result);},

        );
    }
    ngOnInit(): void {
        this.fetchMyLeave(this.userId);
    }

    // public updateEmployeeLeave(leaveId: number, status: any): void {
        // const updateDetails: LeaveUpdateDetails = {status};



    ngOnChanges(changes: SimpleChanges) {
        console.log('changes:', this.userId);
        this.fetchMyLeave(this.userId)
    }

    public updateEmployeeLeave(leaveId: number, status: any): void {
        // const updateDetails: LeaveUpdateDetails = {status};
        this.leaveService.updateLeave(leaveId, status).subscribe(
            (response: any) => {
                // Handle success response here
                console.log('Leave cancelled successfully:', response);
                alert('Leave cancelled successfully');
            }
        );

    }






}
