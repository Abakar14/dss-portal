import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { Router } from '@angular/router';
import { StudentDetails } from '../../../model/student';
import { BffService } from '../../../services/bff.service';

@Component({
  selector: 'bms-student-registration-form',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './student-registration-form.component.html',
  styleUrls: ['./student-registration-form.component.scss']
})
export class StudentRegistrationFormComponent{

  registrationForm!: FormGroup;
  genders: string[] = ['Male', 'Female', 'Diverse'];

  constructor(private fb: FormBuilder,  private bffService: BffService, private router: Router) { 
   
    this.registrationForm = this.fb.group({

      student: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        birthDate: ['', Validators.required],
        birthPlace: ['', Validators.required],
        gender: ['', Validators.required],
        nationality: ['', Validators.required],
        address: this.fb.group({
          street: ['', Validators.required],
          houseNumber: ['', Validators.required],
          postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
          city: ['', Validators.required],
        }),
      }),
      guardian: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
        phone: ['', Validators.required],
      }),
      documents: this.fb.group({
        birthCertificate: [''],
        medicalCertificate: [''],
        schoolReport: ['']
      }),
      consentActivities: [false, Validators.requiredTrue],
      consentDataProcessing: [false, Validators.requiredTrue]
    });
  }

  hasError(path: string, controlName: string, errorName: string): boolean {
    const control = this.registrationForm.get(`${path}.${controlName}`);
    return control ? control.hasError(errorName) && control.touched : false;
  }
  

  // hasError(groupName: string, controlName: string, errorName: string): boolean {
  //   const control = this.registrationForm.get(`${groupName}.${controlName}`);
  //   return control ? control.hasError(errorName) && control.touched : false;
  // }

  onSubmit() {
    console.log("onSubmit()");
    if (this.registrationForm.valid) {
      console.log("onSubmit() valid");
      const studentDetails: StudentDetails = {        
        student: {
          id: 0, 
          ...this.registrationForm.value.student,
          address: this.registrationForm.value.student.address
        },
        guardian: this.registrationForm.value.guardian,
        address: this.registrationForm.value.student.address,
        document: {
          id: 0,
          fileName: this.registrationForm.value.documents.birthCertificate?.name || '',
        },
      };

      console.log("onSubmit() before addStudentDetails : ");
      this.bffService.addStudentDetails(studentDetails).subscribe({
        next: (response) => {
          console.log("Student details added successfully:", response);
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('Error adding student details:', err);
        }
      });    
    } else {
      console.log("onSubmit() invalid");
      this.registrationForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any, documentType: string): void {
    const file = event.target.files[0];
    if (file) {
      this.registrationForm.get(`documents.${documentType}`)?.setValue(file);
    }
  }

}
