import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencenrsComponent } from './influencenrs.component';

describe('InfluencenrsComponent', () => {
  let component: InfluencenrsComponent;
  let fixture: ComponentFixture<InfluencenrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencenrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencenrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
