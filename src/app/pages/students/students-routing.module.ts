import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRegistrationFormComponent } from './student-registration-form/student-registration-form.component';


export const routes: Routes = [
//Student list
{ path: '',component: StudentListComponent}, // Student List
{ path: 'registration', component: StudentRegistrationFormComponent},  // Student Registration
{ path: ':id', component: StudentDetailsComponent }, // Student Details

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ], 
  exports:[
    RouterModule
  ],
  providers:[
   
  ]
})
export class StudentsRoutingModule { }






