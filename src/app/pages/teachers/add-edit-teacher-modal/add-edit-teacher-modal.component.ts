import { Component, Inject } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';

@Component({
    selector: 'bms-add-edit-teacher-modal',
    imports: [CommonModule, ReactiveFormsModule, MaterialModule],
    templateUrl: './add-edit-teacher-modal.component.html',
    styleUrl: './add-edit-teacher-modal.component.scss'
})
export class AddEditTeacherModalComponent {


  teacherForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditTeacherModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private teachersService: TeacherService
  ) {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
     
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit') {
      // Populate the form if editing
      this.teacherForm.patchValue(this.data.teacher);
    }
  }

  onSubmit(): void {
    if (this.data.mode === 'add') {
    //  Add a new teacher
      this.teachersService.addTeacher(this.teacherForm.value).subscribe(() => {
        this.dialogRef.close(true); // Close and refresh
      });
    } else {
    //  Edit an existing teacher
      this.teachersService.updateTeacher(this.data.teacher.id, this.teacherForm.value).subscribe(() => {
        this.dialogRef.close(true); // Close and refresh
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the modal without making changes
  }

}
