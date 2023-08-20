import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) {
  }

  public navigate(url: any, queryParams?: any) {
    return this.router.navigate([url], {state: {queryParams: queryParams}});
  }

  public getQueryParams() {
    if (window.history.state) {
      return window.history.state.queryParams;
    }
  }
}
