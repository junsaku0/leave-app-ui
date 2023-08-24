import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LeaveDetails} from "../model/leave-details.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class LeaveRepository{

  private readonly baseUrl = '/api/v1/leave'

  private readonly CONTENT_TYPE : string ='application/json';
  private readonly headers;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': this.CONTENT_TYPE
    })
  }

public createLeave(requestBody: LeaveDetails): Observable<any>{
    const getLeaveUrl = this.baseUrl;
    return this.httpClient.post<any>(getLeaveUrl, requestBody, {headers: this.headers})
}


}
