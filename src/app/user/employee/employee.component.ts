import {Component, } from '@angular/core';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent  {
    startDate: any;
    endDate: any;
    totalLeaveDays: any;

    submitButton(){
        alert("I got clicked")
    }




}
