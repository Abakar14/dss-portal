import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { TeacherService } from '../../services/teacher.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Role, UserProfile } from '../../model/user';


@Component({
  selector: 'bms-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
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
  userPermissions!: string[];



  constructor(private studentService: StudentsService, 
  private teacherService: TeacherService, 
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

        const allRoles = this.flattenRoles(user.role);
        this.userRoles = allRoles.map(role => role.name);

        // this.userRoles = user.role.childRoles.map(role => role.name);

        const allPermissions = new Set<string>();
        allRoles.forEach(role => {
          role.permissions?.forEach(permission => allPermissions.add(permission.name))
        });
        
        this.userPermissions = Array.from(allPermissions);

        this.isLoading = false;
        console.log("User Roles: ", this.userRoles);
        console.log("User Permissions: ", this.userPermissions);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        this.isLoading = false;
       
      }
    );
  }

  private flattenRoles(role: Role): Role[] {
    const roles: Role[] = [role];
    role.childRoles?.forEach(childRole => {
      roles.push(...this.flattenRoles(childRole));
    });
    return roles;
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

    hasPermission(permission: string): boolean {
      return this.userPermissions.includes(permission);
    }


}
