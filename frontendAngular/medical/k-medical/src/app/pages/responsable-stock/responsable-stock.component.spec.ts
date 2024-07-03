import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableStockComponent } from './responsable-stock.component';

describe('ResponsableStockComponent', () => {
  let component: ResponsableStockComponent;
  let fixture: ComponentFixture<ResponsableStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsableStockComponent]
    });
    fixture = TestBed.createComponent(ResponsableStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
