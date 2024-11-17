import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DSSService } from './dss.service';
import { StudentDto } from '../model/StudentDto';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  [x: string]: any;
  
  private apiUrl = 'http://localhost:9090'; 


  constructor(private http: HttpClient, private dssService: DSSService) { }

  getStudents(pageIndex: number, pageSize: number): Observable<any> {

    const headers = this.dssService.getHeaders();
  //console.log("getStudents()  headers : "+headers.get("Authorization"));

    const params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());
  
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
