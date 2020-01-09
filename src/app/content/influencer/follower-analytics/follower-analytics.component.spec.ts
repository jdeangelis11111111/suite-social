import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerAnalyticsComponent } from './follower-analytics.component';

describe('FollowerAnalyticsComponent', () => {
  let component: FollowerAnalyticsComponent;
  let fixture: ComponentFixture<FollowerAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowerAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
