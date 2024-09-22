import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from './service/students.service';
import { StudentsRoutingModule } from './students-routing.module';



@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule, 
    StudentsRoutingModule
   
  ], providers: [
    StudentsService
  ]
})
export class StudentsModule { }
