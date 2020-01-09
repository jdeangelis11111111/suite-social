import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogInfComponent } from './confirm-dialog-inf.component';

describe('ConfirmDialogInfComponent', () => {
  let component: ConfirmDialogInfComponent;
  let fixture: ComponentFixture<ConfirmDialogInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
