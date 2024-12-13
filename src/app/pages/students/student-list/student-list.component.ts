import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AddEditStudentModalComponent } from '../add-edit-student-modal/add-edit-student-modal.component';
import { StudentsService } from '../../../services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { StudentDto } from '../../../model/StudentDto';

@Component({
  selector: 'bms-student-list',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'matNumber', 'birthDate', 'birthPlace', 'gender', 'addedBy', 'actions']; // All possible columns
  columnsToDisplay: string[] = ['id', 'firstName', 'lastName', 'matNumber', 'actions']; // Default displayed columns
  columnNames: { [key: string]: string } = {
    id: 'ID',
    firstName: 'First Name',
    lastName: 'Last Name',
    matNumber: 'Matriculation No.',
    addedBy: 'Added By',
    gender: 'Gender',
    birthPlace: 'Birth Place',
    birthDate: 'Birthday',
    actions: 'Actions',
  };

  students = new MatTableDataSource<StudentDto>([]);
  totalStudents = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentsService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  ngAfterViewInit(): void {
    this.students.sort = this.sort;
    this.students.paginator = this.paginator;
  }

  loadStudents(pageIndex: number = 0, pageSize: number = 10, sortColumn: string = 'firstName', sortDirection: string = 'asc'): void {
    this.studentService.getStudents(pageIndex, pageSize, sortColumn, sortDirection).subscribe((response: any) => {
      if (response._embedded?.studentResponseDtoList) {
        this.students.data = response._embedded.studentResponseDtoList;
        this.totalStudents = response.page.totalElements;
        this.paginator.pageIndex = pageIndex;
        this.paginator.length = this.totalStudents;
      }
    });
  }

  get columnsToDisplayWithoutActions(): string[] {
    return this.columnsToDisplay.filter((col) => col !== 'actions');
  }

  addColumn(): void {
    const availableColumns = this.displayedColumns.filter(
      (column) => !this.columnsToDisplay.includes(column) && column !== 'actions' // Exclude actions
    );
    if (availableColumns.length) {
      this.columnsToDisplay.splice(this.columnsToDisplay.length - 1, 0, availableColumns[0]); // Add before actions
    }
  }

  removeColumn(): void {
    const removableColumns = this.columnsToDisplay.filter((column) => column !== 'actions'); // Exclude actions
    if (removableColumns.length) {
      this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(removableColumns[removableColumns.length - 1]), 1);
    }
  }

  onSortChange(event: { active: string; direction: string }): void {
    const { active, direction } = event;
    this.loadStudents(this.paginator.pageIndex, this.paginator.pageSize, active, direction || 'asc');
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.loadStudents(event.pageIndex, event.pageSize, this.sort.active, this.sort.direction || 'asc');
  }

  openEditStudentModal(student: StudentDto): void {
    const dialogRef = this.dialog.open(AddEditStudentModalComponent, {
      width: '400px',
      data: { student, mode: 'edit' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadStudents();
    });
  }

  confirmDeleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentId).subscribe(() => this.loadStudents());
    }
  }

  viewStudentDetails(studentId: number): void {
    this.router.navigate(['/students', studentId]);
  }

}