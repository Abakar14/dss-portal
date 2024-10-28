import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSSService } from './dss.service';
import { Observable } from 'rxjs/internal/Observable';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://localhost:9090'; 


  constructor(private http: HttpClient, private dssService: DSSService) { }

  getTeachers():Observable<Teacher[]>{
    const headers = this.dssService.getHeaders();
      console.log("getTeachers()  headers : "+headers.get("Authorization"));
 
     return this.http.get<Teacher[]>(this.apiUrl+"/teachers", { headers });
       
   }

  countTeachers():Observable<number>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/teachers/count`;
    return this.http.get<number>(url, {headers});
  }


  getTeacherById(teacherId: number):Observable<Teacher>{

    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/teachers/${teacherId}`;

    return this.http.get<Teacher>(url, {headers});
  }

  addTeacher(teacher: Teacher):Observable<Teacher>{
    const headers = this.dssService.getHeaders();
    return this.http.post<Teacher>(this.apiUrl+"/teachers", teacher, { headers })
  }

  updateTeacher(teacherId: number, teacher: Teacher): Observable<Teacher>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/teachers/${teacherId}`;
    return this.http.put<Teacher>(url, teacher, { headers })


  }

  deleteTeacher(teacherId: number):Observable<void>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/teachers/${teacherId}`;
    return this.http.delete<void>(url, {headers});

  }
}
