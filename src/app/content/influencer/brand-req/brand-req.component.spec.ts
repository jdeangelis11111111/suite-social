import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandReqComponent } from './brand-req.component';

describe('BrandReqComponent', () => {
  let component: BrandReqComponent;
  let fixture: ComponentFixture<BrandReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
