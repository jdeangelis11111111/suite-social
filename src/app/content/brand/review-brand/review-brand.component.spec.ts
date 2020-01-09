import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBrandComponent } from './review-brand.component';

describe('ReviewBrandComponent', () => {
  let component: ReviewBrandComponent;
  let fixture: ComponentFixture<ReviewBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
