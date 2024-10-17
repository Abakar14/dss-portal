import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTeacherModalComponent } from './add-edit-teacher-modal.component';

describe('AddEditTeacherModalComponent', () => {
  let component: AddEditTeacherModalComponent;
  let fixture: ComponentFixture<AddEditTeacherModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTeacherModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTeacherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
