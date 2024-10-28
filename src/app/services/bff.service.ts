import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSSService } from './dss.service';
import { Observable } from 'rxjs';
import { StudentDetails } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class BffService {
    
  private apiUrl = 'http://localhost:9090/bff'; 

  
  constructor(private http: HttpClient, private dssService: DSSService) { }

  addStudentDetails(studentDetails: StudentDetails):Observable<StudentDetails>{
    const headers = this.dssService.getHeaders();
   console.log("addStudentDetails()  headers : "+headers.get("Authorization"));
    return this.http.post<StudentDetails>(this.apiUrl+"/student-details", studentDetails, { headers })
  }

}
