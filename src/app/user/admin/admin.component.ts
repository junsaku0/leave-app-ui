import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {RouterService} from "../service/router.service";
import {UserResponse} from "../model/user-response.model";
import {LeaveService} from "../service/leave.service";

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

  public userList: any;
  public selectedUser: any = undefined;

  public managerList: any;
  public employeeList: any;
  public leaveList: any;

  public selectedRole: any;
  public currentContent: any;
  public selectedLeave: any;
  public leaveView = 'table';

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
        this.fetchLeaveEntries();
        this.fetchUserList();
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

    fetchLeaveEntries(): void {
        this.leaveService.fetchAllLeave().subscribe((response: any) => {
            const leaveEntries = response.content;
            console.log('Leave Entries:', leaveEntries);

            const approvedLeaves = leaveEntries.filter((leaveEntry: any) => leaveEntry.status === 'APPROVED');


            this.leaveList = leaveEntries;
            this.calendarOptions.events = this.mapLeaveEntriesToEvents(approvedLeaves);
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
        const startDate = event.start?.toLocaleDateString() || '';
        const endDate = event.end?.toLocaleDateString() || '';
        this.selectedLeave = {
            name: event.title,
            startDate: startDate,
            endDate: endDate,
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

    public updateEmployeeLeave(leaveId: number, status: any): void {
        // const updateDetails: LeaveUpdateDetails = {status};

        this.leaveService.updateLeave(leaveId, status).subscribe(
            (response: any) => {
                // Handle success response here
                console.log('Leave updated successfully:', response);
                this.fetchLeaveList();
            }
        );
    }


    public showUserPage(user: any) {
        console.log('Navigate to page:', user.role, ' - ',user.name, '-', user);
        const pageUrl = '/user/' + user.role.toLowerCase();
        this.routerService.navigate(pageUrl, {'user': user});
    }

    public fetchUserList() {
        this.userService.fetchAllUsers()
            .subscribe({
                next: (data: UserResponse) =>
                {
                    console.log('Response:', data);
                    this.userList = data;
                }
            });
    }

    public setLeaveView(view: string) {
      this.leaveView = view;
    }

    }


