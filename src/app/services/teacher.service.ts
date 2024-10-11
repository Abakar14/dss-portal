import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DSSService } from './dss.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://localhost:9090/dss/api/v1/teachers'; 


  constructor(private http: HttpClient, private dssService: DSSService) { }


  countTeachers():Observable<number>{
    const headers = this.dssService.getHeaders();
    const url = `${this.apiUrl}/count`;
    return this.http.get<number>(url, {headers});
  }
}
