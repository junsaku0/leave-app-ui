import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LeaveService} from "../service/leave.service";
import {RouterService} from "../service/router.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LeaveDetails} from "../model/leave-details.model";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarOptions, EventClickArg, EventInput} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit{

  leaveForm: FormGroup;
  @Input() userDetails: any;
    public leaveList: any;


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


  constructor(private leaveService: LeaveService, public router: RouterService) {

  this.leaveForm = new FormGroup<any>({
      userId: new FormControl(''),
      name: new FormControl(''),
      role: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    reason: new FormControl(''),
      totalDaysLeave: new FormControl('')
  });


  }
    ngOnInit(): void {
        this.fetchLeaveList();
        this.fetchLeaveEntries();

    }

  public OnSubmit(){
      this.leaveForm.controls["userId"].setValue(this.userDetails.id);
      this.leaveForm.controls["name"].setValue(this.userDetails.name);
      this.leaveForm.controls["role"].setValue(this.userDetails.role);
    console.log(this.leaveForm.getRawValue())
    const leaveValue = this.leaveForm.getRawValue()

    this.leaveService.saveLeave(leaveValue).subscribe({
      next: (data: LeaveDetails) =>
      {
          alert('Success!');
          this.leaveForm.reset();
        console.log('Saved leave: ', data);
      },
    });
  }

    calculateTotalDays(): number {
        const startDate = this.leaveForm.get('startDate')?.value;
        const endDate = this.leaveForm.get('endDate')?.value;


        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            let totalDays = 0;
            let currentDate = new Date(start);

            while (currentDate <= end ) {
                if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                    totalDays++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return totalDays;
        }

        return 0;

    }

    private fetchLeaveList() {
        this.leaveService.fetchAllLeave().subscribe({
            next: (data: any) => {
                this.leaveList = data.content;
                console.log('Retrieve leave list:', data);
            }
        });
    }



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
}
