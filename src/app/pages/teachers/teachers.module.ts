import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';
import { TeachersRoutingModule } from './teachers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,    
    ReactiveFormsModule,
   TeachersRoutingModule
  ],
  providers: [
    TeacherService
  ]
})
export class TeachersModule { }
