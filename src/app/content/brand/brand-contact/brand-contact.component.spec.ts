import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandContactComponent } from './brand-contact.component';

describe('BrandContactComponent', () => {
  let component: BrandContactComponent;
  let fixture: ComponentFixture<BrandContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
