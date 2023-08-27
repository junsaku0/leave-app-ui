import {Component, Input} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {RouterService} from "../service/router.service";

@Component({
  selector: 'app-view-my-employee-leave',
  templateUrl: './view-my-employee-leave.component.html',
  styleUrls: ['./view-my-employee-leave.component.css']
})
export class ViewMyEmployeeLeaveComponent {
    public employeeLeaves: any = {};
    public userManager: any;
    @Input() managerId!: number;


    constructor(private leaveService: LeaveService, private routerService: RouterService) {
        this.userManager = this.routerService.getQueryParams().user;
    }

    ngOnInit() {
        this.fetchEmployeeLeaves(this.managerId);
    }

    fetchEmployeeLeaves(managerId: number) {
        this.leaveService.fetchMyEmployeeLeave(managerId).subscribe(
            (data) => {
                this.employeeLeaves = data;
            },
        );
    }

}
