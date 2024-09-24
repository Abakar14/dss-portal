import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { AuthenticationService } from '../../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  [x: string]: any;
  
  private apiUrl = 'http://localhost:9090/dss/api/v1/students'; 

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getStudents():Observable<Student[]>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Student[]>(this.apiUrl, {headers});
  }

  getStudentById(id: number):Observable<Student>{

    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Student>(this.apiUrl, {headers});
  }

  addStudent(student: Student):Observable<Student>{
   const headers: HttpHeaders = this.getHeaders();
    return this.http.post<Student>(this.apiUrl, student, { headers })

  }

  updateStudent(studentId: number, student: Student): Observable<Student>{
    const headers: HttpHeaders = this.getHeaders();
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.put<Student>(url, student, { headers })


  }
  deleteStudent(studentId: number):Observable<void>{
    const headers: HttpHeaders = this.getHeaders();
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.delete<void>(url, {headers});

  }





  getHeaders(): HttpHeaders{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.authService.getToken()}`
    });
    return headers;
  }



}
