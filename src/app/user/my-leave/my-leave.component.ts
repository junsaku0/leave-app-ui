import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-my-leave',
  templateUrl: './my-leave.component.html',
  styleUrls: ['./my-leave.component.css']
})
export class MyLeaveComponent {

    @Input() userDetails: any;


}
