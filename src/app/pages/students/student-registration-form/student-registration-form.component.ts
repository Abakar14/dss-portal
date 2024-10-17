import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'bms-student-registration-form',
  standalone: true,
  imports: [CommonModule, MaterialModule,  ReactiveFormsModule],
  templateUrl: './student-registration-form.component.html',
  styleUrl: './student-registration-form.component.scss'
})
export class StudentRegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentsService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', Validators.required],
      birthPlace: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: [''],
      street: ['', Validators.required],
      houseNumber: [''],
      postalCode: ['', [Validators.required, Validators.pattern(`[0-9]{5}`)]],
      city: ['', Validators.required],
      // Add form controls for other sections like guardian info, emergency contacts, etc.
      consentActivities: [false,  Validators.requiredTrue],
      consentDataProcessing: [false,  Validators.requiredTrue]
      
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // Submit the form data to your backend API
    }else{
      this.registrationForm.markAllAsTouched();
    }
  }

  hasError(controlName: string, errorName:string){
    return this.registrationForm.controls[controlName].hasError(errorName) &&
    this.registrationForm.controls[controlName].touched;

  }

  onFileSelected(event: Event, fileType: string) {
    // const file = (event.target as HTMLInputElement).files[0];
    // Handle file uploads based on fileType ('birthCertificate', 'medicalCertificate', etc.)
  }

  
}
