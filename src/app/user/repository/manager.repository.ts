import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IManager} from "../manager/manager.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ManagerRepository{


  private readonly baseUrl = '/api/v1/manager'

  private readonly CONTENT_TYPE : string ='application/json';
  private readonly headers;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': this.CONTENT_TYPE
    })
  }

  public getManager(): Observable<any> {
    const getManagerUrl = this.baseUrl;
    return this.httpClient.get<any>(getManagerUrl, {headers: this.headers});
  }



}
