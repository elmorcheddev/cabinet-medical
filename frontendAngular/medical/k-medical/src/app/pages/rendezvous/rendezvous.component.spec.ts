import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousComponent } from './rendezvous.component';

describe('RendezvousComponent', () => {
  let component: RendezvousComponent;
  let fixture: ComponentFixture<RendezvousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendezvousComponent]
    });
    fixture = TestBed.createComponent(RendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
