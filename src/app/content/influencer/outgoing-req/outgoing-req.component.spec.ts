import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingReqComponent } from './outgoing-req.component';

describe('OutgoingReqComponent', () => {
  let component: OutgoingReqComponent;
  let fixture: ComponentFixture<OutgoingReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
