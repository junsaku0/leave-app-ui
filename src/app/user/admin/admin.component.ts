
import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {RouterService} from "../service/router.service";
import {UserResponse} from "../model/user-response.model";
import { Router } from '@angular/router';
import {LeaveService} from "../service/leave.service";
import { ViewChild} from '@angular/core';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  public createUserForm: any;
  public adminUser: any;
  public managerUserList: any;

  public managerList: any;
  public employeeList: any;
  public leaveList: any;

  public selectedRole: any;
  public currentContent: any;

    public selectedLeave: any;
    @ViewChild('calendar') calendar!: FullCalendarComponent;
    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        eventClick: this.handleEventClick.bind(this) // Add this line
    };


  constructor(private userService: UserService,
              private leaveService: LeaveService,
              public routerService: RouterService) {
    this.adminUser = routerService.getQueryParams().user;



    this.adminUser = { name: 'Admin User' }; // the original code is below this
    //this.adminUser = routerService.getQueryParams().user;
    this.createUserForm = new FormGroup<any>( {
      name: new FormControl(''),
      role: new FormControl(''),
      head: new FormControl(''),
      hireDate: new FormControl(''),
      totalLeave: new FormControl('')
    });

    this.currentContent = 'viewLeaves';
  }


    ngOnInit(): void {
        this.fetchManagerList();
        this.fetchEmployeeList();
        this.fetchLeaveList();
    }


  public onSubmit() {
    const formValue = this.createUserForm.getRawValue();
    console.log('save user info:', formValue);
    this.userService.saveUser(formValue)
       .subscribe({
           next: (data) => {
               console.log('saved data:', data);
           }
       });
  }
  public onSelected(role: string) {
    this.selectedRole = role;
    if (this.selectedRole == 'MANAGER') {
        this.createUserForm.controls["head"].setValue('superAdmin');
    }
    if (this.selectedRole == 'EMPLOYEE') {
      this.userService.fetchUserManager()
        .subscribe({
          next: (data: UserResponse) =>
          {
            console.log('Retrieve manager list:', data);
            this.managerUserList = data;
          }
        });
    }
  }
  private fetchManagerList() {
    this.userService.fetchManagers().subscribe({
      next: (data: any) => {
        console.log('Retrieve manager list:', data);
        this.managerList = data;
      }
    });
  }

    private fetchEmployeeList() {
        this.userService.fetchEmployees().subscribe({
            next: (data: any) => {
                console.log('Retrieve employee list:', data);
                this.employeeList = data;
            }
        });
    }

    private fetchLeaveList() {
        this.leaveService.fetchAllLeave().subscribe({
            next: (data: any) => {
                this.leaveList = data.content;
                console.log('Retrieve leave list:', data);
            }
        });
    }



  public showContent(content: string) {
    this.currentContent = content;
  }
  public viewManagers() {
    this.fetchManagerList();
  }
/*
  applyLeave(content: string) {
    if (content === 'applyLeaves') {
      // Redirect to the leave HTML page
      this.router.navigate(['/leave'])
    }
  }

*/
    fetchLeaveEntries(): void {
        this.leaveService.fetchAllLeave().subscribe((response: any) => {
            const leaveEntries = response.content;
            console.log('Leave Entries:', leaveEntries);
            this.leaveList = leaveEntries;
            this.calendarOptions.events = this.mapLeaveEntriesToEvents(leaveEntries);
            const calendarApi = this.calendar.getApi();
            calendarApi.removeAllEvents();
            calendarApi.addEventSource(this.calendarOptions.events);
            calendarApi.render();
        });
    }

    showLeaveDetails(leaveEntry: any) {
        this.selectedLeave = leaveEntry;
    }

    handleEventClick(info: EventClickArg) {
        const event = info.event;
        this.selectedLeave = {
            name: event.title,
            startDate: event.start,
            endDate: event.end
        };
    }


    private mapLeaveEntriesToEvents(leaveEntries: any[]): EventInput[] {
        const events: EventInput[] = [];

        if (leaveEntries) {
            leaveEntries.forEach((leaveEntry: any) => {
                if (leaveEntry && leaveEntry.name) {
                    const event: EventInput = {
                        title: leaveEntry.name,
                        start: leaveEntry.startDate,
                        end: leaveEntry.endDate
                    };
                    events.push(event);
                }
            });
        }
        return events;
    }


    }


