import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DSSService } from './dss.service';
import { StudentDto } from '../model/StudentDto';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  [x: string]: any;
  
  private apiUrl = 'http://localhost:9090'; 


  constructor(private http: HttpClient, private dssService: DSSService) { }


  getStudents(
    pageIndex: number,
    pageSize: number,
    sort: string = 'firstName',
    order: string = 'asc',
    search: string = ''
  ): Observable<any> {
    const headers = this.dssService.getHeaders();
  
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('sort', `${sort},${order}`);
  
    // Add search query if provided
    if (search) {
      params = params.set('search', search);
    }
  
    return this.http.get<any>(`${this.apiUrl}/students`, { headers, params });
  }
  



  searchStudents(filterValue: string, page: number = 0, size: number = 10): Observable<any> {
    
    const headers = this.dssService.getHeaders();

    const params = new HttpParams()
    .set('search', filterValue)
    .set('page', page)
    .set('size', size);
    
    return this.http.get<any>(`${this.apiUrl}/students`, { headers, params });

  }
  
  countStudents():Observable<number>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/students/count`;
    return this.http.get<number>(url, {headers});
  }


  getStudentById(studentId: number):Observable<StudentDto>{

    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/students/${studentId}`;

    return this.http.get<StudentDto>(url, {headers});
  }

  addStudent(student: StudentDto):Observable<StudentDto>{
    const headers = this.dssService.getHeaders();
    return this.http.post<StudentDto>(this.apiUrl+"/students", student, { headers })
  }

  updateStudent(studentId: number, student: StudentDto): Observable<StudentDto>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/student/${studentId}`;
    return this.http.put<StudentDto>(url, student, { headers })


  }
  deleteStudent(studentId: number):Observable<void>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/students/${studentId}`;
    return this.http.delete<void>(url, {headers});

  }


}
