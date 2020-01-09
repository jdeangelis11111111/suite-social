import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfCardComponent } from './inf-card.component';

describe('InfCardComponent', () => {
  let component: InfCardComponent;
  let fixture: ComponentFixture<InfCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
