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

  deleteStudent(studentId: number){

  }





  updateStudent(id?: any, value?: any){

  }



}
