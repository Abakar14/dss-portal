import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeacherService } from '../../services/teacher.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, TeachersRoutingModule
  ],
  providers: [
    TeacherService
  ]
})
export class TeachersModule { }
