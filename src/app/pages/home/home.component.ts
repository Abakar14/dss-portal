import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { TeacherService } from '../../services/teacher.service';
import { DocumentService } from '../../services/document.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserProfile } from '../../model/user';
import { BffService } from '../../services/bff.service';


@Component({
  selector: 'bms-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterOutlet, RouterModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  userName: string = '';
  userRoles: string[] = [];
  totalStudents: number = 0;
  totalTeachers: number = 0;
  totalDocuments: number = 0;
  isLoading: boolean = true;



  constructor(private studentService: StudentsService, 
  private teacherService: TeacherService, 
  private documentService: DocumentService,
  private bffService: BffService,
  private authService: AuthenticationService 
  ){}

  ngOnInit(): void {

    this.fetchUserProfile();
    this.fetchStatistics();  
    
  }



  fetchUserProfile(): void {

    this.authService.getUserProfile().subscribe(
      (user: UserProfile) => {
        this.userName = `${user.firstname} ${user.lastname}`;
        this.userRoles = user.roles.map(role => role.name);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        this.isLoading = false;
        // Optionally handle errors, e.g., redirect to login if unauthorized
      }
    );


  }

  fetchStatistics(){

    this.studentService.countStudents().subscribe(
      total => { this.totalStudents = total; }
    );

    this.teacherService.countTeachers().subscribe(
      total => { this.totalTeachers = total;}
    );

  }




    // Helper method to check for a specific role
    hasRole(role: string): boolean {
      return this.userRoles.includes(role);
    }


}
