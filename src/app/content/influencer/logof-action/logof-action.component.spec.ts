import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogofActionComponent } from './logof-action.component';

describe('LogofActionComponent', () => {
  let component: LogofActionComponent;
  let fixture: ComponentFixture<LogofActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogofActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogofActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
