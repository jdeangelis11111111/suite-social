import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleReviewsComponent } from './schedule-reviews.component';

describe('ScheduleReviewsComponent', () => {
  let component: ScheduleReviewsComponent;
  let fixture: ComponentFixture<ScheduleReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
