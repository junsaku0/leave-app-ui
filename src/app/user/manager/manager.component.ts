import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../service/manager.service';
import { UserResponse } from '../model/user-response.model';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  public managerList: UserResponse[] = [];

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.fetchManagerList();
  }

  private fetchManagerList() {
    this.managerService.fetchManager().subscribe(
      (data: UserResponse[]) => {
        console.log('Retrieve manager list:', data);
        this.managerList = data;
      }/*,
      (error) => {
        console.error('Error retrieving manager list:', error);
      }*/
    );
  }
}
