import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EmployeeDetails} from "../model/employee-details.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class EmployeeRepository{


  private readonly baseUrl = '/api/v1/employee'

  private readonly CONTENT_TYPE : string ='application/json';
  private readonly headers;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': this.CONTENT_TYPE
    })
  }

  public createEmployee(requestBody: EmployeeDetails): Observable<any> {
    const getEmployeeUrl = this.baseUrl;
    return this.httpClient.post<any>(getEmployeeUrl, requestBody,{headers: this.headers});
  }

}
