import {Injectable} from "@angular/core";
import {ManagerRepository} from "../repository/manager.repository";
import {ManagerDetails} from "../model/manager-details.model";


@Injectable({
  providedIn: 'root'
})
export class ManagerService {


  constructor(private managerRepository: ManagerRepository) {
  }

  public saveManager(requestBody: ManagerDetails) {
    return this.managerRepository.createManager(requestBody);
  }
}
