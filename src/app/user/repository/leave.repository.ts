import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LeaveDetails} from "../model/leave-details.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class LeaveRepository {

    private readonly baseUrl = '/api/v1/leave'

    private readonly CONTENT_TYPE: string = 'application/json';
    private readonly headers;

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': this.CONTENT_TYPE
        })
    }

    public createLeave(requestBody: LeaveDetails): Observable<any> {
        const getLeaveUrl = this.baseUrl;
        return this.httpClient.post<any>(getLeaveUrl, requestBody, {headers: this.headers})
    }

    public getLeaves(){
        const getLeavesUrl = this.baseUrl + '/head';
        return this.httpClient.get<any>(getLeavesUrl, {headers: this.headers})
    }
public getMyEmployeeLeave(id: number){
      const getMyEmployeeLeaveUrl = this.baseUrl + '/head/' + id;
      return this.httpClient.get<any>(getMyEmployeeLeaveUrl,{headers: this.headers} )
}

public getAllLeave(){
      const getAllLeaveUrl = this.baseUrl + '/head';
      return this.httpClient.get<any>(getAllLeaveUrl, {headers: this.headers});
}

public updateLeave(id: number, status: any){
      const getUpdateLeaveUrl = this.baseUrl + '/' + id;
      return this.httpClient.put<any>(getUpdateLeaveUrl, status,{headers: this.headers})

}
    public getMyLeave(id: number) {
        const getMyLeaveUrl = this.baseUrl + '/' + id;
        return this.httpClient.get<any>(getMyLeaveUrl, {headers: this.headers})
    }


}
