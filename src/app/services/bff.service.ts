import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSSService } from './dss.service';
import { Observable } from 'rxjs';


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
  
  // add(studentDetails: StudentDetails){

  //   fetch(this.apiUrl+"/student-details", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer your_token_here' // Or other auth header
  //     },
  //     body: JSON.stringify(studentDetails),
  //     credentials: 'include' // Important for cookies
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       // Handle errors appropriately
  //       if (response.status === 401) {
  //         // Redirect to login or show an error message
  //         console.error("Unauthorized");
  //       }
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return response.json();
  //   }) 

  // }

}
