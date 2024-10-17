import { Component, ViewChild } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

import { MaterialModule } from '../../../material/material.module';
import { Teacher } from '../../../model/teacher';
import { AddEditTeacherModalComponent } from '../add-edit-teacher-modal/add-edit-teacher-modal.component';

@Component({
  selector: 'bms-teachers',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'matNumber', 'actions']; // Columns to display in the table
  teachers = new MatTableDataSource<Teacher>([]);; // Data source for the table
  totalTeachers = 0; // Total number of students for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private teacherService: TeacherService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadTeachers(); // Load the student list on initialization
  }

  // Load students (with pagination if necessary)
  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe((response: any) => {
      this.teachers.data = response._embedded.teacherDtoList;
      this.teachers.paginator = this.paginator;
      this.teachers.sort = this.sort;
      this.totalTeachers = response.page.totalElements;
    }),
    (error: any) => {
      console.error('Failed to load students', error);
    }
  }

  // Open Add Student modal
  openAddTeacherModal(): void {
    const dialogRef = this.dialog.open(AddEditTeacherModalComponent, {
      width: '400px',
      data: { mode: 'add' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTeachers(); // Refresh the list after adding a student
      }
    });
  }

  // Open Edit Student modal
  openEditTeacherModal(teacher: any): void {
    const dialogRef = this.dialog.open(AddEditTeacherModalComponent, {
      width: '400px',
      data: { teacher: teacher, mode: 'edit' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTeachers(); // Refresh the list after editing a student
      }
    });
  }

  // Confirm delete action
  confirmDeleteTeacher(teacherId: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      // this.studentService.deleteStudent(studentId).subscribe(() => {
      //   this.loadStudents(); // Refresh the list after deletion
      // });
    }
  }

  // Pagination change
  onPageChange(event: any): void {
    // Handle pagination changes (fetch the new page of students)
  }


  viewTeacherDetails(teacherId: number):void{
    this.router.navigate(['/teachers', teacherId ]);
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.teachers.filter = filterValue.trim().toLowerCase();
    if(this.teachers.paginator){
      this.teachers.paginator.firstPage();
    }

  }

}
