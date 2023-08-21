import {Injectable} from "@angular/core";
import {UserRepository} from "../repository/user.repository";
import {Observable} from "rxjs";
import {ManagerDetails} from "../model/manager-details.model";
import {EmployeeDetails} from "../model/employee-details.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: UserRepository) {
  }

  public fetchUserAdmin(): Observable<any> {
    return this.userRepository.getUserAdmin();
  }

  public saveManager(requestBody: ManagerDetails) {
    return this.userRepository.createManager(requestBody);
  }

  public saveEmployee(requestBody: EmployeeDetails) {
    return this.userRepository.createEmployee(requestBody);
  }
}
