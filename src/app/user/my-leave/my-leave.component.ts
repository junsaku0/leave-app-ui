
import {Component, Input, OnInit} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-my-leave',
  templateUrl: './my-leave.component.html',
  styleUrls: ['./my-leave.component.css']
})
export class MyLeaveComponent implements OnInit {
    public myLeaves:any;
    @Input() userId!:number;
    @Input() userDetails: any;

constructor(private leaveService: LeaveService, private Http: HttpClient){

}
fetchMyLeave (userId :number) {
    this.leaveService.fetchPersonalLeave(userId).subscribe(
        (data) => { this.myLeaves = data},
    );
}
    ngOnInit(): void {
    try {
        let response = this.Http.get("http://localhost:8080/api/v1/leave/head/{id}");
        response.subscribe((data) => this.myLeaves = data);
    }catch (error) {
        console.error('There was an error fetching: ', error);

    }// this.fetchMyLeave(this.userId)
    }




}
