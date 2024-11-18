import { Component, ViewChild } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { Teacher } from '../../../model/teacher';
import { AddEditTeacherModalComponent } from '../add-edit-teacher-modal/add-edit-teacher-modal.component';

@Component({
  selector: 'bms-teachers',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'matNumber', 'actions']; // Columns to display in the table
  teachers = new MatTableDataSource<Teacher>([]);; // Data source for the table
  totalTeachers = 0; // Total number of students for pagination
  currentSort: { column: string; direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private teacherService: TeacherService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadTeachers(); // Load the student list on initialization
  }

  // Load students (with pagination if necessary)
  loadTeachers(pageIndex: number = 0,
    pageSize: number = 10,
    sort: string = 'firstName',
    order: string = 'asc',
    search: string = ''): void {

    this.teacherService.getTeachers(pageIndex, pageSize, sort, order, search).subscribe(
      (response: any) => {
        if (response._embedded?.teacherDtoList) {
          this.teachers.data = response._embedded.teacherDtoList;                                                  
          this.totalTeachers = response.page.totalElements;
          this.paginator.pageIndex = pageIndex; // Current page
          this.paginator.length = this.totalTeachers; // Total items
        
        }else{
          console.error("No teachers returned from the server.");
        }
    }),
    (error: any) => {
      console.error('Failed to load teachers.', error);
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
  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    console.log("onPageChange(): ", `pageIndex: ${pageIndex} pageSize: ${pageSize}`);
    this.loadTeachers(pageIndex, pageSize);
  }

     // Handle sort changes
     onSortChange(sort: Sort): void {
      const { active, direction } = sort;
      this.loadTeachers(this.paginator.pageIndex, this.paginator.pageSize, active, direction || 'asc');
    }


  viewTeacherDetails(teacherId: number):void{
    this.router.navigate(['/teachers', teacherId ]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.loadTeachers(0, this.paginator.pageSize, this.sort.active, this.sort.direction || 'asc', filterValue);
  }

  onHeaderDoubleClick(column: string): void {
    if (this.currentSort.column === column) {
      // Toggle direction if the same column is clicked
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      // Reset to ascending if a different column is clicked
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }
    console.log(`Sorting by column: ${this.currentSort.column}, Direction: ${this.currentSort.direction}`);

    // Load students with new sorting parameters
    this.loadTeachers(
      this.paginator?.pageIndex || 0,
      this.paginator?.pageSize || 10,
      this.currentSort.column,
      this.currentSort.direction
    );
  }

}
