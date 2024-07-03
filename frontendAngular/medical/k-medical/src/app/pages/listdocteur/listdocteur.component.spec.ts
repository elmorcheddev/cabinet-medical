import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdocteurComponent } from './listdocteur.component';

describe('ListdocteurComponent', () => {
  let component: ListdocteurComponent;
  let fixture: ComponentFixture<ListdocteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListdocteurComponent]
    });
    fixture = TestBed.createComponent(ListdocteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
