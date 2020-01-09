import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonDontComponent } from './don-dont.component';

describe('DonDontComponent', () => {
  let component: DonDontComponent;
  let fixture: ComponentFixture<DonDontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonDontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonDontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
