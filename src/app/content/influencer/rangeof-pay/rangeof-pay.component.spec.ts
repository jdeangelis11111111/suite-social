import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeofPayComponent } from './rangeof-pay.component';

describe('RangeofPayComponent', () => {
  let component: RangeofPayComponent;
  let fixture: ComponentFixture<RangeofPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeofPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeofPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
