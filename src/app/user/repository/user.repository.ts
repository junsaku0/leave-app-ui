import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDetails} from "../model/user-details.model";


@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  private readonly CONTENT_TYPE = 'application/json';
  private readonly headers;
  private readonly baseUrl = 'api/v1/user';

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': this.CONTENT_TYPE
    })
  }

  public getUserAdmin(): Observable<any> {
    const getUserAdminUrl = this.baseUrl + '/admin';
    return this.httpClient.get<any>(getUserAdminUrl, {headers: this.headers});
  }

  public getUserManager(): Observable<any> {
    const getUserManagerUrl = 'api/v1/manager';
    return this.httpClient.get<any>(getUserManagerUrl, {headers: this.headers});
  }

  public getUserEmployee(): Observable<any> {
      const getUserEmployeeUrl = this.baseUrl + '/employee';
      return this.httpClient.get<any>(getUserEmployeeUrl, {headers: this.headers});
  }

    public getAllUsers(): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl, {headers: this.headers});
    }

    public createUser(requestBody: UserDetails): Observable<any> {
        const getUserUrl = this.baseUrl;
        return this.httpClient.post<any>(getUserUrl, requestBody, {headers: this.headers});
    }



    public getManagers(): Observable<any> {
        const getManagersUrl = 'api/v1/manager';
        return this.httpClient.get<any>(getManagersUrl, {headers: this.headers});
    }

    public getEmployees(): Observable<any> {
        const getEmployeesUrl = 'api/v1/employee';
        return this.httpClient.get<any>(getEmployeesUrl, {headers: this.headers});
    }


}
