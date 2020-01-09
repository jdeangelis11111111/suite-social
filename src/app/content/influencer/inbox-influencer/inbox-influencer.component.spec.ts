import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxInfluencerComponent } from './inbox-influencer.component';

describe('InboxInfluencerComponent', () => {
  let component: InboxInfluencerComponent;
  let fixture: ComponentFixture<InboxInfluencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxInfluencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
