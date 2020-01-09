import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxBrandComponent } from './inbox-brand.component';

describe('InboxBrandComponent', () => {
  let component: InboxBrandComponent;
  let fixture: ComponentFixture<InboxBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
