import { Injectable } from '@angular/core';
import { PermissionDto } from '../model/user';
import { DSSService } from './dss.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  

  private permissionsUrl = 'http://localhost:9090/permissions';

  constructor(private dssService: DSSService, private http: HttpClient){}


  getPermissions():Observable<PermissionDto[]> {

    const headers = this.dssService.getHeaders();
    
    return this.http.get<PermissionDto[]>(`${this.permissionsUrl}/list`, { headers });
  }



}
