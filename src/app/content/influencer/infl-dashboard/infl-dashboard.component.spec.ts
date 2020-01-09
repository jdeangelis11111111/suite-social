import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InflDashboardComponent } from './infl-dashboard.component';

describe('InflDashboardComponent', () => {
  let component: InflDashboardComponent;
  let fixture: ComponentFixture<InflDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InflDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InflDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
