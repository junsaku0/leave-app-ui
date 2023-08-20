import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


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


}
