import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListassistantComponent } from './listassistant.component';

describe('ListassistantComponent', () => {
  let component: ListassistantComponent;
  let fixture: ComponentFixture<ListassistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListassistantComponent]
    });
    fixture = TestBed.createComponent(ListassistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
