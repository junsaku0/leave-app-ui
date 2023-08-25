import {Component, OnInit,} from '@angular/core';
import {Router} from "@angular/router";
import {RouterService} from "../service/router.service";
import {EmployeeService} from "../service/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    public userEmployee: any;
    public page = 'viewMyLeave';
    startDate = "";
    endDate = "";
    totalLeaveDays:any;
    status = '';
    reason : string = '';
    userId: number;


    constructor(private employeeService: EmployeeService,private routerService:RouterService) {
        this.userEmployee = this.routerService.getQueryParams().user;
        this.userId = this.userEmployee.id
    }

   applyLeave(){
       try {
           if (this.startDate && this.endDate) {
               const firstDate = new Date(this.startDate);
               const lastDate = new Date(this.endDate);
               this.totalLeaveDays = this.calculateTotalLeaveNotIncludedDayOff(firstDate,lastDate)
               console.log("Submitted");
               alert("Success!");
               this.clearField();
               this.status = "PENDING";
           }else {
               throw new Error("");
           }
           console.log(this.startDate);
           console.log(this.endDate);

       } catch (error){
           console.error("An error occurred");
           alert("Both start and end date are required");
       }

   }
    calculateTotalLeaveNotIncludedDayOff (startDate: Date, endDate:Date): number {
        let totalLeaveDays = 0;
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate()+1)){
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                totalLeaveDays ++;
                console.log(`This is day of Week ${dayOfWeek}`)
            }
        }
        console.log ('Total Leave : ' + totalLeaveDays);

        return totalLeaveDays;
    }
    employeeTotalDays (){
        if (this.startDate && this.endDate)
        {
            const firstDate = new Date(this.startDate);
            const lastDate = new Date(this.endDate);
            this.totalLeaveDays = this.calculateTotalLeaveNotIncludedDayOff(firstDate,lastDate)
        }
    }
    leaveReason (){
        console.log (this.reason);
        return this.reason;

    }

    clearField() {
       this.startDate = '';
       this.endDate = '';
       this.reason = '';
       this.status = '';

    }

    inquireLeaveBalance() {
        alert('My Leave Balance..')
    }

    ngOnInit(): void {
    }
    public navigatePage(page: string) {
        this.page = page;
    }
}
