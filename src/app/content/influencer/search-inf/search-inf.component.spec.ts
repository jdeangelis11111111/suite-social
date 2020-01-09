import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInfComponent } from './search-inf.component';

describe('SearchInfComponent', () => {
  let component: SearchInfComponent;
  let fixture: ComponentFixture<SearchInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
