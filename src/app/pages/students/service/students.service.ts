import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { DSSService } from '../../../services/dss.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  [x: string]: any;
  
  private apiUrl = 'http://localhost:9090/dss/api/v1/students'; 

  constructor(private http: HttpClient, private dssService: DSSService, private authService : AuthenticationService) { }

  getStudents():Observable<Student[]>{
   //const headers = this.dssService.getHeaders();
    //  console.log("getStudents()  headers : "+headers.get("Authorization"));
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`, 
   
    });
      
    return this.http.get<Student[]>(this.apiUrl, { headers });
      
  }

  // getStudents(page: number = 0, size: number = 10): Observable<any> {
  //   const params = new HttpParams().set('page', page).set('size', size);
  //   return this.http.get<any>(`${this.apiUrl}/students`, { params });
  // }
  

  getStudentById(studentId: number):Observable<Student>{

    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/${studentId}`;

    return this.http.get<Student>(url, {headers});
  }

  addStudent(student: Student):Observable<Student>{
    const headers = this.dssService.getHeaders();
    return this.http.post<Student>(this.apiUrl, student, { headers })
  }

  updateStudent(studentId: number, student: Student): Observable<Student>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.put<Student>(url, student, { headers })


  }
  deleteStudent(studentId: number):Observable<void>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.delete<void>(url, {headers});

  }
}
