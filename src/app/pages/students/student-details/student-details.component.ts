import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentsService } from '../service/students.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bms-student-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent implements OnInit {

  student: Student | null = null;
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
      (student: Student) => {
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

}
