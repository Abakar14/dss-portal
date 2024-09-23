import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../service/students.service';
import { Student } from '../model/student';
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bms-student-card-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './student-card-list.component.html',
  styleUrl: './student-card-list.component.scss'
})
export class StudentCardListComponent implements OnInit {
 
  students: Student[] = [];

  constructor(private studentsService: StudentsService){}
  
  ngOnInit(): void {

    this.studentsService.getStudents().subscribe(

      (response: any) => {
        console.log("data " +response.content);
        this.students = response.content;
       }, 
      (error) => {
        console.error("failed to load students", error);
      }
    );

  
  }

}
