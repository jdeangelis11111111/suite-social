import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastCollabsComponent } from './past-collabs.component';

describe('PastCollabsComponent', () => {
  let component: PastCollabsComponent;
  let fixture: ComponentFixture<PastCollabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastCollabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastCollabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
