import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {RouterService} from "../service/router.service";
import { Calendar } from '@fullcalendar/core';



@Component({
  selector: 'app-view-my-employee-leave',
  templateUrl: './view-my-employee-leave.component.html',
  styleUrls: ['./view-my-employee-leave.component.css']
})
export class ViewMyEmployeeLeaveComponent implements OnChanges, OnInit {
    public employeeLeaves: any = {};
    public userManager: any;
    @Input() managerId!: number;




    constructor(private leaveService: LeaveService, private routerService: RouterService) {
        this.userManager = this.routerService.getQueryParams().user;
    }

    ngOnInit() {
        this.fetchEmployeeLeaves(this.managerId);

    }

    ngOnChanges(changes: SimpleChanges) {
        // this.managerId = changes.currentValue;
        console.log('changes:', this.managerId)
        this.fetchEmployeeLeaves(this.managerId);
    }

    fetchEmployeeLeaves(managerId: number) {
        this.leaveService.fetchMyEmployeeLeave(managerId).subscribe(
            (data) => {
                this.employeeLeaves = data;
            },
        );
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





