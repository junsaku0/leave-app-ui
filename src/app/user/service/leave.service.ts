import {Injectable} from "@angular/core";
import {LeaveRepository} from "../repository/leave.repository";
import {LeaveDetails} from "../model/leave-details.model";


@Injectable({providedIn: 'root'})

export class LeaveService{

  constructor(private leaveRepository: LeaveRepository) {

  }

  public saveLeave(requestBody: LeaveDetails){
    return this.leaveRepository.createLeave(requestBody);
  }

  public fetchPersonalLeave(id: number){
      return this.leaveRepository.getMyLeave(id);
  }

    public fetchLeaves(){
        return this.leaveRepository.getLeaves();
    }

  public fetchMyEmployeeLeave(id: number){
      return this.leaveRepository.getMyEmployeeLeave(id);
  }

  public fetchAllLeave(){
      return this.leaveRepository.getAllLeave();
  }

  public updateLeave(id: number, status: any){
      return this.leaveRepository.updateLeave(id, status);
  }
}
