import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRegistrationFormComponent } from './teacher-registration-form.component';

describe('TeacherRegistrationFormComponent', () => {
  let component: TeacherRegistrationFormComponent;
  let fixture: ComponentFixture<TeacherRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
