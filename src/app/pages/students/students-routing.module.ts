import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';


export const routes: Routes = [
//Student list
{
  path: '',
  component: StudentListComponent  
  },
  //Student details
  {
    path: ':id',
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






