import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditStudentModalComponent } from '../add-edit-student-modal/add-edit-student-modal.component';
import { StudentsService } from '../service/students.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from '../model/student';
import { MaterialModule } from '../../../material/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'bms-student-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit{

  displayedColumns: string[] = ['firstName', 'lastName', 'matNumber', 'actions']; // Columns to display in the table
  students = new MatTableDataSource<Student>([]);; // Data source for the table
  totalStudents = 0; // Total number of students for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentsService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents(); // Load the student list on initialization
  }

  // Load students (with pagination if necessary)
  loadStudents(): void {
    this.studentService.getStudents().subscribe((response: any) => {
      this.students.data = response.content;
      this.students.paginator = this.paginator;
      this.students.sort = this.sort;
      this.totalStudents = response.page.totalElements;
    }),
    (error: any) => {
      console.error('Failed to load students', error);
    }
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
  onPageChange(event: any): void {
    // Handle pagination changes (fetch the new page of students)
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
