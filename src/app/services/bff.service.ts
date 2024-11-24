import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSSService } from './dss.service';
import { Observable } from 'rxjs';
import { StudentDto } from '../model/StudentDto';


@Injectable({
  providedIn: 'root'
})
export class BffService {
    
  private apiUrl = 'http://localhost:9090/bff'; 

  
  constructor(private http: HttpClient, private dssService: DSSService) { }
  

  addStudentDetails(formData: FormData): Observable<any> {
    const headers = this.dssService.getHeadersWithFormData(); // Make sure these headers are appropriate for FormData
     
    return this.http.post<any>(`${this.apiUrl}/student-details`, formData, { headers });
  }

  getStudentDetailsById(studentId: number):Observable<StudentDto>{

    const headers = this.dssService.getHeaders();
   
    const url = `${this.apiUrl}/student-details/${studentId}`;
    

    return this.http.get<StudentDto>(url, {headers});
  }
  

}
