import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsComponent } from './consultations.component';

describe('ConsultationsComponent', () => {
  let component: ConsultationsComponent;
  let fixture: ComponentFixture<ConsultationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationsComponent]
    });
    fixture = TestBed.createComponent(ConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
