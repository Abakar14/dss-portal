import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../../services/students.service';
import { StudentsRoutingModule } from './students-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, 
    StudentsRoutingModule, 
    ReactiveFormsModule,
   
   
  ], providers: [
    StudentsService
  ]
})
export class StudentsModule { }
