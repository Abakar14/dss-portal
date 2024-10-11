import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSSService } from './dss.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://localhost:9090/dss/api/v1/students'; 
  constructor(private http: HttpClient, private dssService: DSSService) { }


  
}
