import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllStudentsComponent } from './all-students/all-students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';


export const routes: Routes = [

{
  path: "",
  component: AllStudentsComponent  
  },
  {
    path: "details/:id",
    component: StudentDetailsComponent  
    }


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






