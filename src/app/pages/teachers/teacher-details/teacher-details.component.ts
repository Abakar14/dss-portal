import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherDto } from '../../../model/teacher';
import { TeacherService } from '../../../services/teacher.service';

@Component({
    selector: 'bms-teacher-details',
    imports: [RouterModule, CommonModule],
    templateUrl: './teacher-details.component.html',
    styleUrl: './teacher-details.component.scss'
})
export class TeacherDetailsComponent implements OnInit{

  teacher: TeacherDto | null = null;
  document: any;

  constructor(private route: ActivatedRoute, private teacherService: TeacherService){}

  ngOnInit(): void {
    const teacherId = +this.route.snapshot.paramMap.get('id')!;
    console.log("ngOnInit teacherId " +teacherId);
    if(teacherId){
      this.loadTeacherDetails(teacherId);
    }
  }


  loadTeacherDetails(teacherId: number) {
    console.log("loadTeacherDetails teacherId " +teacherId);
    this.teacherService.getTeacherById(teacherId).subscribe(
      (teacher: TeacherDto) => {
        this.teacher = teacher;
      }
    ),
    (error: any) => {
      console.error('Failed to load teacher details', error);
    }
  }

  onProfilePictureChange(event: any):void{
    const file = event.target.files[0];
    if(file){
      //handle profile picture upload logic here
    }
  }

}
