import {Injectable} from "@angular/core";
import {UserRepository} from "../repository/user.repository";
import {Observable} from "rxjs";
import {ManagerRepository} from "../repository/manager.repository";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: UserRepository, private managerRepository: ManagerRepository) {
  }

  public fetchUserAdmin(): Observable<any> {
    return this.userRepository.getUserAdmin();
  }

  public fetchManager(): Observable<any>{
    return this.managerRepository.getManager();
  }


}
