import { HttpClient, HttpParams } from '@angular/common/http';
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

  getTeachers( pageIndex: number,
    pageSize: number,
    sort: string = 'firstName',
    order: string = 'asc',
    search: string = ''):Observable<any>{

    const headers = this.dssService.getHeaders();
      console.log("getTeachers()  headers : "+headers.get("Authorization"));
 
      let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
      .set('sort', `${sort},${order}`);
       // Add search query if provided
    if (search) {
      params = params.set('search', search);
    }
   
  // return this.http.get<any>(this.apiUrl+"/teachers", { headers,  params });
   return this.http.get<any>(`${this.apiUrl}/teachers`, { headers, params });
       
   }

  countTeachers():Observable<number>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/teachers/count`;
    return this.http.get<number>(url, {headers});
  }


  searchTeachers(filterValue: string, page: number = 0, size: number = 10): Observable<any> {
    
    const headers = this.dssService.getHeaders();

    const params = new HttpParams()
    .set('search', filterValue)
    .set('page', page)
    .set('size', size);
    
    return this.http.get<any>(`${this.apiUrl}/teachers`, { headers, params });

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
