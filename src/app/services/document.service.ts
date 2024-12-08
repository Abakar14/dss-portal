import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSSService } from './dss.service';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private baseUrl = 'http://localhost:9090/documents';
  
  constructor(private http: HttpClient, private dssService: DSSService) { }
  

  getProfilePicture(ownerId: number, documentType: string, ownerType: string, version: number ){
    
    const headers = this.dssService.getHeadersToken(); // Make sure these headers are appropriate for FormData
 
    const url = `${this.baseUrl}/owners/${ownerId}/${ownerType}/${documentType}/${version}/download`;
    
    return this.http.get(url, { headers, responseType: 'blob' }); // Fetch as Blob

  }

  addProfilePicture(formData: FormData){
    
    const headers = this.dssService.getHeadersToken(); // Make sure these headers are appropriate for FormData
 
    const url = `${this.baseUrl}/upload`;
    
    return this.http.post<any>(url, formData, { headers }); // Fetch as Blob

  }
  
}
