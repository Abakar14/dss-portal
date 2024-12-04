import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DSSService } from './dss.service';
import { Role, RoleDto } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private rolesUrl = 'http://localhost:9090/roles';

  constructor(private http: HttpClient, private dssService: DSSService) { }

  getTotalRoles():Observable<number>{
    const headers = this.dssService.getHeaders();
    return this.http.get<number>(`${this.rolesUrl}/count`, {headers});
   }
  
  getAllRoles():Observable<RoleDto[]> {
    const headers = this.dssService.getHeaders();
    return this.http.get<RoleDto[]>(`${this.rolesUrl}/list`, {headers});
  }

  getRoleById(roleId: number): Observable<Role> {
    const headers = this.dssService.getHeaders();
     console.log("getRoleById(roleId: number) "+roleId);
    return this.http.get<Role>(`${this.rolesUrl}/${roleId}/details`, {headers});
  }
}
