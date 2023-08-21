import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeDetails} from "../model/employee-details.model";
import {ManagerDetails} from "../model/manager-details.model";


@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  private readonly CONTENT_TYPE = 'application/json';
  private readonly headers;
  private readonly baseUrl = 'api/v1';

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': this.CONTENT_TYPE
    })
  }

  public getUserAdmin(): Observable<any> {
    const getUserAdminUrl = this.baseUrl + '/user/admin';
    return this.httpClient.get<any>(getUserAdminUrl, {headers: this.headers});
  }

  public createManager(requestBody: ManagerDetails): Observable<any> {
    const getManagerUrl = this.baseUrl + '/manager';
    return this.httpClient.post<any>(getManagerUrl, requestBody, {headers: this.headers});
  }

  public createEmployee(requestBody: EmployeeDetails): Observable<any> {
    const getEmployeeUrl = this.baseUrl + '/employee';
    return this.httpClient.post<any>(getEmployeeUrl, requestBody,{headers: this.headers});
  }
}
