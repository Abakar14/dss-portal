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
import { ReportType } from '../../../model/enums/report-type';
import { ReportRequest } from '../../../model/report-request';

@Component({
  selector: 'bms-student-list',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select','id', 'firstName', 'lastName', 'matNumber', 'birthDate', 'birthPlace', 'gender', 'addedBy', 'actions']; // All possible columns
  columnsToDisplay: string[] = [...this.displayedColumns]; // Default displayed columns


   columnsToDisplayWithoutActions: string[] = this.columnsToDisplay.filter((col) => col !== 'actions' && col !== 'select');

  selectedStudents: Set<StudentDto> = new Set<StudentDto>();
  searchQuery: string = '';

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
  ReportType = ReportType;

  constructor(private studentService: StudentsService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  ngAfterViewInit(): void {
    this.students.sort = this.sort;
    this.students.paginator = this.paginator; // Link the paginator
  }
  

  loadStudents(
    pageIndex: number = 0,
    pageSize: number = 10,
    sortColumn: string = 'firstName',
    sortDirection: string = 'asc',
    searchQuery: string = ''
  ): void {
    this.studentService.getStudents(pageIndex, pageSize, sortColumn, sortDirection, searchQuery).subscribe((response: any) => {
      if (response._embedded?.studentResponseDtoList) {
        this.students.data = response._embedded.studentResponseDtoList; // Update table data
        this.totalStudents = response.page.totalElements; // Update total students count
  
        console.log('Backend response pagination:', response.page);
  
        // Synchronize paginator
        this.paginator.length = response.page.totalElements; // Total students from backend
        this.paginator.pageIndex = response.page.number;     // Set current page index
        this.paginator.pageSize = response.page.size;        // Set page size
      } else {
        console.error('No students returned from the server.');
      }
    });
  }

  addColumn(): void {
    const availableColumns = this.displayedColumns.filter(
      (column) => !this.columnsToDisplay.includes(column) && column !== 'actions' && column !== 'select'
    );
  
    if (availableColumns.length) {
      this.columnsToDisplay.splice(this.columnsToDisplay.length - 1, 0, availableColumns[0]); // Add before actions
      this.columnsToDisplayWithoutActions = this.columnsToDisplay.filter(
        (col) => col !== 'actions' && col !== 'select'
      );
    }
  }
  

  // addColumn(): void {
  //   const availableColumns = this.displayedColumns.filter(
  //     (column) => !this.columnsToDisplay.includes(column) && column !== 'actions' // Exclude actions
  //   );
  //   if (availableColumns.length) {
  //     this.columnsToDisplay.splice(this.columnsToDisplay.length - 1, 0, availableColumns[0]); // Add before actions
  //   }
  // }

  removeColumn(): void {
    const removableColumns = this.columnsToDisplay.filter(
      (column) => column !== 'actions' && column !== 'select'
    );
  
    if (removableColumns.length) {
      this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(removableColumns[removableColumns.length - 1]), 1);
      this.columnsToDisplayWithoutActions = this.columnsToDisplay.filter(
        (col) => col !== 'actions' && col !== 'select'
      );
    }
  }
  
  // removeColumn(): void {
  //   const removableColumns = this.columnsToDisplay.filter((column) => column !== 'actions'); // Exclude actions
  //   if (removableColumns.length) {
  //     this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(removableColumns[removableColumns.length - 1]), 1);
  //   }
  // }

  onSortChange(event: { active: string; direction: string }): void {
    const { active, direction } = event;
    this.loadStudents(this.paginator.pageIndex, this.paginator.pageSize, active, direction || 'asc');
  }
  onPageChange(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
  
    console.log('Paginator event:', { pageIndex, pageSize });
  
    // Load students with the new page size and index
    this.loadStudents(
      pageIndex,
      pageSize,
      this.sort?.active || 'firstName', // Use the current sorting column
      this.sort?.direction || 'asc',   // Use the current sorting direction
      this.searchQuery || ''           // Use the current search query
    );
  
    // Explicitly update paginator state
    this.paginator.pageIndex = pageIndex;
    this.paginator.pageSize = pageSize;
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

  // Update Selection Logic
  toggleSelection(student: StudentDto): void {
    if (this.selectedStudents.has(student)) {
      this.selectedStudents.delete(student);
    } else {
      this.selectedStudents.add(student);
    }
  }


  isSelected(student: StudentDto): boolean {
    return this.selectedStudents.has(student);
  }

  toggleSelectAll(event: any): void {
    if (event.checked) {
      this.students.data.forEach((student) => this.selectedStudents.add(student));
    } else {
      this.selectedStudents.clear();
    }
  }

  isAllSelected(): boolean {
    return this.students.data.every((student) => this.selectedStudents.has(student));
  }

  isIndeterminate(): boolean {
    return this.selectedStudents.size > 0 && !this.isAllSelected();
  }

  // Download Functionality
  downloadList(fileType: ReportType): void {
    // Create a ReportRequest payload
    const payload: ReportRequest = {
      studentIds: Array.from(this.selectedStudents).map(student => student.id),
      columnsToDisplay: this.columnsToDisplayWithoutActions,
      type: fileType,
    };
  
    console.log("downloadList : "+ this.columnsToDisplay +" Type "+fileType)
    // Call the backend service
    this.studentService.generateReport(payload).subscribe(
      (response: Blob) => {
        // Determine the file extension based on ReportType
        const fileExtension = fileType === ReportType.PDF ? 'pdf' : fileType === ReportType.EXCEL ? 'xlsx' : 'csv';
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `student_list.${fileExtension}`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error generating report:', error);
      }
    );
  }
  
  
  // Print Functionality
  printList(): void {
    // Create a ReportRequest payload for PDF
    const payload: ReportRequest = {
      studentIds: Array.from(this.selectedStudents).map(student => student.id),
      columnsToDisplay: this.columnsToDisplayWithoutActions,
      type: ReportType.PDF,
    };
  
    // Call the backend service
    this.studentService.generateReport(payload).subscribe(
      (response: Blob) => {
        // Open the PDF in a new tab for printing
        const url = window.URL.createObjectURL(response);
        const printWindow = window.open(url, '_blank');
        printWindow?.focus();
        printWindow?.print();
      },
      (error) => {
        console.error('Error generating print report:', error);
      }
    );
  }
  
  


applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.searchQuery = filterValue;
  this.loadStudents(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction || 'asc', this.searchQuery);
}
}