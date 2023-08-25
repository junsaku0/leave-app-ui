import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyEmployeeLeaveComponent } from './view-my-employee-leave.component';

describe('ViewMyEmployeeLeaveComponent', () => {
  let component: ViewMyEmployeeLeaveComponent;
  let fixture: ComponentFixture<ViewMyEmployeeLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMyEmployeeLeaveComponent]
    });
    fixture = TestBed.createComponent(ViewMyEmployeeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
