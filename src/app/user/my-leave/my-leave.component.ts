import {Component, Input, OnInit} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-my-leave',
  templateUrl: './my-leave.component.html',
  styleUrls: ['./my-leave.component.css']
})
export class MyLeaveComponent implements OnInit {
    public myLeaves:any
    @Input() userId!:number;

constructor(private leaveService: LeaveService, private Http: HttpClient){

}
fetchMyLeave (userId :number) {
    this.leaveService.fetchPersonalLeave(userId).subscribe(
        (data) => { this.myLeaves = data},
    );
}
    ngOnInit(): void {
    let response = this.Http.get("http://localhost:8080/api/v1/leave/head/{id}");
    response.subscribe((data) => this.myLeaves = data);
    // this.fetchMyLeave(this.userId)
    }

}
