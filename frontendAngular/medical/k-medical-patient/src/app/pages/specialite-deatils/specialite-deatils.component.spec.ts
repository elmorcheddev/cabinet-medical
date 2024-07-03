import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialiteDeatilsComponent } from './specialite-deatils.component';

describe('SpecialiteDeatilsComponent', () => {
  let component: SpecialiteDeatilsComponent;
  let fixture: ComponentFixture<SpecialiteDeatilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialiteDeatilsComponent]
    });
    fixture = TestBed.createComponent(SpecialiteDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
