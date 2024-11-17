import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditStudentModalComponent } from '../add-edit-student-modal/add-edit-student-modal.component';
import { StudentsService } from '../../../services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { StudentDto } from '../../../model/StudentDto';


@Component({
  selector: 'bms-student-list',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit{

  displayedColumns: string[] = ['firstName', 'lastName', 'matNumber', 'actions']; // Columns to display in the table
  students = new MatTableDataSource<StudentDto>([]);; // Data source for the table
  totalStudents = 0; // Total number of students for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentsService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents(); // Load the student list on initialization
  }

  // Load students (with pagination if necessary)
  loadStudents(pageIndex: number = 0, pageSize: number = 10): void {

    this.studentService.getStudents(pageIndex, pageSize).subscribe((response: any) => {

      if (response._embedded?.studentResponseDtoList) {
        this.students.data = response._embedded.studentResponseDtoList;
        this.totalStudents = response.page.totalElements; // Total elements in backend
        this.paginator.pageIndex = pageIndex; // Current page
        this.paginator.length = this.totalStudents; // Total items
      } else {
        console.error("No students returned from the server.");
      }
    }, error => {
      console.error('Failed to load students', error);
    });
  }
  

  // Open Add Student modal
  openAddStudentModal(): void {
    const dialogRef = this.dialog.open(AddEditStudentModalComponent, {
      width: '400px',
      data: { mode: 'add' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents(); // Refresh the list after adding a student
      }
    });
  }

  // Open Edit Student modal
  openEditStudentModal(student: any): void {
    const dialogRef = this.dialog.open(AddEditStudentModalComponent, {
      width: '400px',
      data: { student: student, mode: 'edit' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents(); // Refresh the list after editing a student
      }
    });
  }

  // Confirm delete action
  confirmDeleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      // this.studentService.deleteStudent(studentId).subscribe(() => {
      //   this.loadStudents(); // Refresh the list after deletion
      // });
    }
  }

  // Pagination change
  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    console.log("onPageChange(): ", `pageIndex: ${pageIndex} pageSize: ${pageSize}`);
    this.loadStudents(pageIndex, pageSize);
  }
  

  viewStudentDetails(studentId: number):void{
    this.router.navigate(['/students', studentId ]);
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.students.filter = filterValue.trim().toLowerCase();
    if(this.students.paginator){
      this.students.paginator.firstPage();
    }

  }

}
