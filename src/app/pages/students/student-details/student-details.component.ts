import { Component, OnInit } from '@angular/core';
import {  StudentDto } from '../../../model/StudentDto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentsService } from '../../../services/students.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'bms-student-details',
  standalone: true,
  imports: [RouterModule, CommonModule, MaterialModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent implements OnInit {

  student: StudentDto | null = null;
  document: any;

  constructor(private route: ActivatedRoute, private studentService: StudentsService){}

  ngOnInit(): void {
    const studentId = +this.route.snapshot.paramMap.get('id')!;
    console.log("ngOnInit studentId " +studentId);
    if(studentId){
      this.loadStudentDetails(studentId);
    }
  }


  loadStudentDetails(studentId: number) {
    console.log("loadStudentDetails studentId " +studentId);
    this.studentService.getStudentById(studentId).subscribe(
      (student: StudentDto) => {
        this.student = student;
      }
    ),
    (error: any) => {
      console.error('Failed to load student details', error);
    }
  }

  onProfilePictureChange(event: any):void{
    const file = event.target.files[0];
    if(file){
      //handle profile picture upload logic here
    }
  }

  editStudent(){

  }

}
