import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { UserService } from '../../../services/user.service';
import { Gender } from '../../../model/enums/gender';
import { Role, RoleDto, UserCreateDto } from '../../../model/user';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'bms-add-edit-user-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrl: './add-edit-user-dialog.component.scss'
})
export class AddEditUserDialogComponent implements OnInit {

  hidePassword = true; // Default password visibility
  userForm: FormGroup;
  genders = Object.values(Gender); // Get values of the Gender enum
  roles: RoleDto[] = [];


  constructor(
    public dialogRef: MatDialogRef<AddEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roleService: RoleService, 
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      schoolId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      roleId: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit') {
      // Populate the form if editing
      this.userForm.patchValue(this.data.user);
    }

    this.userForm.statusChanges.subscribe((status) => {
      console.log('Form Status:', status);
    });
  
    this.userForm.valueChanges.subscribe((value) => {
      console.log('Form Value:', value);
    });

    this.roleService.getRoles().subscribe((roles: RoleDto[]) => {
      this.roles = roles;
    });
  }

  onSubmit(): void {

    console.log("onSubmit");
    if (this.data.mode === 'add') {
      const formValue = this.userForm.value;
      console.log("add");
      if (this.userForm.valid) {
        //  Add a new user
        console.log("this.userForm.valid userForm.value: " + this.userForm.value);

        const user: UserCreateDto = {
          ...formValue,
          gender: formValue.gender.toUpperCase(), // Convert gender to uppercase
          schoolId: +formValue.schoolId, // Ensure schoolId is a number
          roleId: +formValue.roleId // Ensure roleId is a number
        };

        console.log("CreateUserDto:", JSON.stringify(user, null, 2)); // Log the payload


        this.userService.addUser(user).subscribe(() => {
          this.dialogRef.close(true); // Close and refresh
        });

      } else {
        console.error('Form is invalid');
        this.userForm.markAllAsTouched();
      }


    } else {
      //  Edit an existing user
      this.userService.updateUser(this.data.user.id, this.userForm.value).subscribe(() => {
        this.dialogRef.close(true); // Close and refresh
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the modal without making changes
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  get genderControl() {
    return this.userForm.get('gender');
  }

}
