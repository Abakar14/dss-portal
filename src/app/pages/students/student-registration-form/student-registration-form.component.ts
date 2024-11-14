import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { Router } from '@angular/router';
import { BffService } from '../../../services/bff.service';
import { DocumentType } from '../../../model/document-type';
import { StudentDetailsCreateDto } from '../../../model/student-details-create-dto.model';
import { Gender } from '../../../model/gender';
import { RelationShip } from '../../../model/relation-ship';


@Component({
  selector: 'bms-student-registration-form',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers:[DatePipe],
  templateUrl: './student-registration-form.component.html',
  styleUrls: ['./student-registration-form.component.scss']
})
export class StudentRegistrationFormComponent implements OnInit{

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
      guardian: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: [Gender.UNKNOWN, Validators.required], // Set default gender to 'Unknown'
        relationship: [RelationShip.Other, Validators.required], // Set default gender to 'Unknown'
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
        phone: ['', Validators.required],
      }),
 
      documents: this.fb.array([]), // FormArray for document uploads
      consentActivities: [false, Validators.requiredTrue],
      consentDataProcessing: [false, Validators.requiredTrue]
    });
    this.cdr.detectChanges();

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
    // Format birthDate
    const formattedBirthDate = this.datePipe.transform(formValue.student.birthDate, 'yyyy-MM-dd');

    const genderKey = Object.keys(Gender).find(key => Gender[key as keyof typeof Gender] === formValue.student.gender);


    const guardianGenderKey = Object.keys(Gender).find(key => Gender[key as keyof typeof Gender] === formValue.guardian.gender);

    // Prepare studentDetails from the form data
    const studentDetailsCreateDto: StudentDetailsCreateDto = {
      studentCreateDto: { 
                          ...formValue.student,
                          birthDate: formattedBirthDate,
                          gender: genderKey
                          },
      guardianCreateDto: {
        ...formValue.guardian,
          gender: guardianGenderKey
      },
      addressCreateDto: formValue.student.address,
    };

    // Prepare files and document types
    const files: { [key: string]: File } = {};
    const documentTypes: string[] = []; // Array to hold document types

    this.documents.controls.forEach((doc) => {
      const documentType = doc.get('documentType')?.value;
      const file = doc.get('file')?.value;
      if (documentType && file) {
        files[documentType] = file; // Use document type as the key
        documentTypes.push(documentType); // Add each document type to the array
      }
    });

    // Call the BFF service with both parameters
    this.bffService.addStudentDetails(studentDetailsCreateDto, files, documentTypes).subscribe({
      next: (response) => {
        console.log("Student details added successfully:", response);
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error("Error adding student details:", err);
      }
    });
  } else {
    console.log("Form is invalid.");
    this.registrationForm.markAllAsTouched();
  }
}


onFileSelected(event: any, index: number): void {
  const file = event.target.files[0];
  if (file) {
    this.documents.controls[index].get('file')?.setValue(file);
  }
}



  hasError(groupPath: string, controlName: string, errorName: string): boolean {
    const control = this.registrationForm.get(`${groupPath}.${controlName}`);
    return control ? control.hasError(errorName) && control.touched : false;
  }

}
