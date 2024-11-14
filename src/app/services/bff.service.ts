import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSSService } from './dss.service';
import { Observable } from 'rxjs';
import { StudentDetailsCreateDto } from '../model/student-details-create-dto.model';
import { StudentDetails } from '../model/StudentDto';

@Injectable({
  providedIn: 'root'
})
export class BffService {
    
  private apiUrl = 'http://localhost:9090/bff'; 

  
  constructor(private http: HttpClient, private dssService: DSSService) { }


  addStudentDetails(studentDetails: StudentDetailsCreateDto, files: {[key: string]: File}, documentTypes: string[]): Observable<any> {
    const headers = this.dssService.getHeadersWithFormData();
    
    const formData = new FormData();
  
    formData.append('studentDetails', new Blob([JSON.stringify(studentDetails)], { type: 'application/json' }));
  
    Object.keys(files).forEach((docType) => {
      formData.append('files', files[docType], docType);
    });
  
    //formData.append('documentTypes', JSON.stringify(documentTypes)); // Add document types as JSON
  
      // Append each documentType as a separate formData entry
  documentTypes.forEach((docType) => {
    formData.append('documentTypes', docType);
  });

  
    console.log("addStudentDetails() headers:", headers.get("Authorization"));
    return this.http.post<any>(`${this.apiUrl}/student-details`, formData, { headers });
  }
  

  // addStudentDetails(formData: FormData): Observable<any> {
  //   const headers = this.dssService.getHeadersWithFormData(); // Make sure these headers are appropriate for FormData
     
  //   return this.http.post<any>(`${this.apiUrl}/student-details`, formData, { headers });
  // }
  
  // addStudentDetails(studentDetails: StudentDetails, files: {[key: string]: File}):Observable<any>{
  //   const headers = this.dssService.getHeadersWithFormData();
    
  //   const formData = new FormData();
    
  //   formData.append('studentDetails', new Blob([JSON.stringify(studentDetails)], {type: 'application/json'}));

  //   Object.keys(files).forEach((docType) => {
  //     formData.append('files', files[docType], docType);
  //   });

  //  console.log("addStudentDetails()  headers : "+headers.get("Authorization"));
  //  return this.http.post<any>(`${this.apiUrl}/student-details`, formData, { headers });

  // }

  // addStudentDetails(studentDetails: StudentDetails):Observable<StudentDetails>{
  //   const headers = this.dssService.getHeaders();
  //  console.log("addStudentDetails()  headers : "+headers.get("Authorization"));
  //   return this.http.post<StudentDetails>(this.apiUrl+"/student-details", studentDetails, { headers })
  // }


  add(studentDetails: StudentDetails){

    fetch(this.apiUrl+"/student-details", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here' // Or other auth header
      },
      body: JSON.stringify(studentDetails),
      credentials: 'include' // Important for cookies
    })
    .then(response => {
      if (!response.ok) {
        // Handle errors appropriately
        if (response.status === 401) {
          // Redirect to login or show an error message
          console.error("Unauthorized");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }) 

  }

}
