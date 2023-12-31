import {Injectable} from "@angular/core";
import {UserRepository} from "../repository/user.repository";
import {Observable} from "rxjs";
import {UserDetails} from "../model/user-details.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: UserRepository) {
  }

  public fetchUserAdmin(): Observable<any> {
    return this.userRepository.getUserAdmin();
  }

  public fetchUserManager(): Observable<any>{
    return this.userRepository.getUserManager();
  }

  public fetchUserEmployee(): Observable<any>{
      return this.userRepository.getUserEmployee();
  }

    public fetchAllUsers(): Observable<any>{
        return this.userRepository.getAllUsers();
    }

  public saveUser(requestBody: UserDetails): Observable<any> {
      return this.userRepository.createUser(requestBody);
  }

    public fetchManagers(): Observable<any>{
        return this.userRepository.getManagers();
    }

    public fetchEmployees(): Observable<any>{
        return this.userRepository.getEmployees();
    }

    public editUserLeave(id: any, userLeaveDetails: any) {
        return this.userRepository.updateUserLeaveDetails(id, userLeaveDetails);
    }

}
