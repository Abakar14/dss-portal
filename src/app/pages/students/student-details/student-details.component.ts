import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  StudentDto } from '../../../model/StudentDto';
import { ActivatedRoute, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { BffService } from '../../../services/bff.service';
import { DocumentService } from '../../../services/document.service';
import { blob } from 'stream/consumers';
import { error } from 'console';



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
  profilePictureUrl: string | null = null;
  version: number = 1;

  constructor(private route: ActivatedRoute, private bffService: BffService, private dmService: DocumentService , private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const studentId = +params['id']; // '+' converts the string to a number
      console.log("ngOnInit studentId", studentId);
      if(studentId){
        this.loadStudentDetails(studentId);
        this.loadProfilePicture(studentId);
      }

    })
  }


  loadProfilePicture(studentId: number):void {
    const ownerType = 'STUDENT';
    const documentType = 'PROFILE_PICTURE';
    const ownerId = studentId; // Replace with the actual schoolId
    const version = this.version; 

    //getProfilePicture(ownerId: number, documentType: string, ownerType: string, version: number ){
    this.dmService.getProfilePicture(ownerId, documentType, ownerType, version).subscribe(
      {
        next:(blob) => {
          this.profilePictureUrl = URL.createObjectURL(blob);
        },
        error: (err) => {
          console.error('Error fetching profile picture:', err);
        }
      });    
  }


  loadStudentDetails(studentId: number) {
    console.log("loadStudentDetails studentId " +studentId);
    this.bffService.getStudentDetailsById(studentId).subscribe(
      (student: StudentDto) => {
        this.student = student;
        this.cdr.detectChanges(); // 
        console.log("Student details loadded", this.student);
      },
      error => {
        console.error('Failed to load student details', error);
      }
    );   
  }

  onProfilePictureChange(event: any):void{
    const file = event.target.files[0];
    if(file){
      //handle profile picture upload logic here
    }
  }


  ngOnDestroy(): void {
    if (this.profilePictureUrl) {
      URL.revokeObjectURL(this.profilePictureUrl);
    }
  }
   
  editStudent(){

  }

}
