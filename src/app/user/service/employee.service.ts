import {Injectable} from "@angular/core";
import {EmployeeDetails} from "../model/employee-details.model";
import {ManagerRepository} from "../repository/manager.repository";
import {EmployeeRepository} from "../repository/employee.repository";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private employeeRepository: EmployeeRepository) {
  }

  public saveEmployee(requestBody: EmployeeDetails) {
    return this.employeeRepository.createEmployee(requestBody);
  }
}
