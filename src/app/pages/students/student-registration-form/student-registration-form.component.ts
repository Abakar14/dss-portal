import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { Router, RouterModule } from '@angular/router';
import { BffService } from '../../../services/bff.service';
import { DocumentType } from '../../../model/enums/document-type';
import { StudentDetailsCreateDto } from '../../../model/student-details-create-dto.model';
import { Gender } from '../../../model/enums/gender';
import { RelationShip } from '../../../model/relation-ship';


@Component({
  selector: 'bms-student-registration-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  providers:[DatePipe],
  templateUrl: './student-registration-form.component.html',
  styleUrls: ['./student-registration-form.component.scss']
})
export class StudentRegistrationFormComponent implements OnInit{

  schoolId: number = 1;
  registrationForm!: FormGroup;
  genders = Object.values(Gender);
  relationships = Object.values(RelationShip);
  documentTypes = Object.values(DocumentType); // Create a list of document types for selection

  constructor(private fb: FormBuilder,  private bffService: BffService, private router: Router, 
    private cdr: ChangeDetectorRef, private datePipe: DatePipe
  ) { }


  ngOnInit(): void {

    console.log("ngOnInit()");
    this.registrationForm = this.fb.group({

      student: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        birthDate: ['', Validators.required],
        birthPlace: ['', Validators.required],
        gender: [Gender.UNKNOWN, Validators.required], // Set default gender to 'Unknown'
        nationality: ['', Validators.required],      
        address: this.fb.group({
          street: ['', Validators.required],     
          streetNumber: ['', Validators.required],
          postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
          city: ['', Validators.required],
        }),
      }),

      guardians: this.fb.array([]), // FormArray for guardians
      documents: this.fb.array([]), // FormArray for document uploads
      consentActivities: [false, Validators.requiredTrue],
      consentDataProcessing: [false, Validators.requiredTrue]
    });
    // Add a default guardian entry
    this.addGuardian();
    this.cdr.detectChanges();

  }

  // Get guardians FormArray
get guardians() {
  return this.registrationForm.get('guardians') as FormArray;
}

// Add a new guardian
addGuardian() {
  const guardianGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: [Gender.UNKNOWN, Validators.required],
    relationship: [RelationShip.Other, Validators.required],
    country: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    schoolId: this.schoolId,
    phone: ['', Validators.required],
  });
  this.guardians.push(guardianGroup);
}

// Remove a guardian
removeGuardian(index: number) {
  this.guardians.removeAt(index);
}


    // Get documents FormArray
  get documents() {
    return this.registrationForm.get('documents') as FormArray;
  }
  
  addDocument() {
    const documentGroup = this.fb.group({
      file: [null, Validators.required],
      documentType: [null, Validators.required]
    });
    this.documents.push(documentGroup);
  }
 // Remove a document from the FormArray
removeDocument(index: number) {
 this.documents.removeAt(index);
}

onSubmit() {
  if (this.registrationForm.valid) {
    console.log("Submitting form with data:", this.registrationForm.value);

    const formValue = this.registrationForm.value;
    const formattedBirthDate = this.datePipe.transform(formValue.student.birthDate, 'yyyy-MM-dd');

    const studentGenderKey = Object.keys(Gender).find(key => Gender[key as keyof typeof Gender] === formValue.student.gender);

    // Format guardians
    const guardianCreateDtos = formValue.guardians.map((guardian: any) => {

      const guardianGenderKey = Object.keys(Gender).find(key => Gender[key as keyof typeof Gender] === guardian.gender);
      return {
        ...guardian,
        gender: guardianGenderKey,
      };
    });

    // Prepare studentDetailsCreateDto
    const studentDetailsCreateDto: StudentDetailsCreateDto = {
      studentCreateDto: {
        ...formValue.student,
        birthDate: formattedBirthDate,
        schoolId: this.schoolId,
        gender: studentGenderKey,
        guardianCreateDtos, // Include all guardians here
      },
      addressCreateDto: formValue.student.address,
    };

    // Prepare FormData for file uploads
    const formData = new FormData();
    formData.append('studentDetailsCreateDto', new Blob([JSON.stringify(studentDetailsCreateDto)], { type: 'application/json' }));

    this.documents.controls.forEach((doc) => {
      const documentType = doc.get('documentType')?.value;
      const file = doc.get('file')?.value;
      if (documentType && file) {
        formData.append('files', file);
        formData.append('documentTypes', documentType);
        formData.append('ownerType', 'STUDENT');
        formData.append('schoolId', this.schoolId.toString());
      }
    });

    // Call BFF service
    this.bffService.addStudentDetails(formData).subscribe({
      next: (response) => {
        console.log("Student details added successfully:", response);
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error("Error adding student details:", err);
      },
    });
  } else {
    console.log("Form is invalid.");
    this.registrationForm.markAllAsTouched();
  }
}


onFileSelected(event: Event, index: number): void {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;
  
  if (file) {
    this.documents.controls[index].get('file')?.setValue(file); // Only set the form control value, not the input value
  }
}

onCancel(): void {
  console.log("Cancel clicked. Redirecting to student list...");
  this.router.navigate(['/students']);
}


  hasError(groupPath: string, controlName: string, errorName: string): boolean {
    const control = this.registrationForm.get(`${groupPath}.${controlName}`);
    return control ? control.hasError(errorName) && control.touched : false;
  }

}
