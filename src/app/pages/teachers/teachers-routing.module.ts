import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  //Student list
  {
    path: '',
    component: TeachersComponent  
    },
    // { path: 'registration', component: TeacherRegistrationFormComponent }, // Teacher Registration
    // { path: ':id', component: TeacherDetailsComponent }, // Teacher Details
  
  
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
