import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StudentsService } from '../service/students.service';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'bms-add-edit-student-modal',
  standalone: true,
  imports: [MatDialogModule,ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './add-edit-student-modal.component.html',
  styleUrl: './add-edit-student-modal.component.scss'
})
export class AddEditStudentModalComponent implements OnInit{


  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private studentService: StudentsService
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      matNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit') {
      // Populate the form if editing
      this.studentForm.patchValue(this.data.student);
    }
  }

  onSubmit(): void {
    if (this.data.mode === 'add') {
      // Add a new student
      // this.studentService.addStudent(this.studentForm.value).subscribe(() => {
      //   this.dialogRef.close(true); // Close and refresh
      // });
    } else {
      // Edit an existing student
      // this.studentService.updateStudent(this.data.student.id, this.studentForm.value).subscribe(() => {
      //   this.dialogRef.close(true); // Close and refresh
      // });
    }
  }
}
