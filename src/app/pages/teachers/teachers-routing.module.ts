import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import { RouterModule, Routes } from '@angular/router';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherRegistrationFormComponent } from './teacher-registration-form/teacher-registration-form.component';

export const routes: Routes = [
 
  { path: '',component: TeachersComponent}, // Student List
{ path: 'registration', component: TeacherRegistrationFormComponent},  // Student Registration
{ path: ':id', component: TeacherDetailsComponent }, // Student Details

  
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ], 
  exports:[
    RouterModule
  ],
  providers:[
   
  ]
})
export class TeachersRoutingModule { }
