import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialiteComponent } from './specialite.component';

describe('SpecialiteComponent', () => {
  let component: SpecialiteComponent;
  let fixture: ComponentFixture<SpecialiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialiteComponent]
    });
    fixture = TestBed.createComponent(SpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
