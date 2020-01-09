import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPaymentComponent } from './brand-payment.component';

describe('BrandPaymentComponent', () => {
  let component: BrandPaymentComponent;
  let fixture: ComponentFixture<BrandPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
