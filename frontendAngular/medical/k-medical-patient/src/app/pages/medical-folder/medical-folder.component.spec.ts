import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFolderComponent } from './medical-folder.component';

describe('MedicalFolderComponent', () => {
  let component: MedicalFolderComponent;
  let fixture: ComponentFixture<MedicalFolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalFolderComponent]
    });
    fixture = TestBed.createComponent(MedicalFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
