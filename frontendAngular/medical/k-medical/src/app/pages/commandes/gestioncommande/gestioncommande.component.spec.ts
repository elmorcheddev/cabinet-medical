import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncommandeComponent } from './gestioncommande.component';

describe('GestioncommandeComponent', () => {
  let component: GestioncommandeComponent;
  let fixture: ComponentFixture<GestioncommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioncommandeComponent]
    });
    fixture = TestBed.createComponent(GestioncommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
