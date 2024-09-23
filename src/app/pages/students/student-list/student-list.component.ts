import { Component, OnInit } from '@angular/core';
import { AddEditStudentModalComponent } from '../add-edit-student-modal/add-edit-student-modal.component';
import { StudentsService } from '../service/students.service';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'bms-student-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit{

  displayedColumns: string[] = ['firstName', 'lastName', 'matNumber', 'actions']; // Columns to display in the table
  students = new MatTableDataSource(); // Data source for the table
  totalStudents = 0; // Total number of students for pagination

  constructor(private studentService: StudentsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadStudents(); // Load the student list on initialization
  }

  // Load students (with pagination if necessary)
  loadStudents(): void {
    this.studentService.getStudents().subscribe((response: any) => {
      this.students.data = response.content;
      this.totalStudents = response.page.totalElements;
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
  onPageChange(event: any): void {
    // Handle pagination changes (fetch the new page of students)
  }

}
