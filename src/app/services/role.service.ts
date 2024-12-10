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
  
  getRoles():Observable<RoleDto[]> {
    const headers = this.dssService.getHeaders();
    return this.http.get<RoleDto[]>(`${this.rolesUrl}/list`, {headers});
  }


  getDetailsRoles():Observable<RoleDto[]> {
    const headers = this.dssService.getHeaders();
    return this.http.get<RoleDto[]>(`${this.rolesUrl}/details`, {headers});
  }


  getRoleById(roleId: number): Observable<Role> {
    const headers = this.dssService.getHeaders();
     console.log("getRoleById(roleId: number) "+roleId);
    return this.http.get<Role>(`${this.rolesUrl}/${roleId}/details`, {headers});
  }


  addPermissionToRole(roleId: number, permissionId: number): Observable<any> {
    const headers = this.dssService.getHeaders();
    console.log("getRoleById(roleId: number) "+roleId);

    return this.http.post(`${this.rolesUrl}/${roleId}/permissions/${permissionId}`,{}, { headers });
  }
  
  removePermissionFromRole(roleId: number, permissionId: number): Observable<any> {
    const headers = this.dssService.getHeaders();
    console.log("getRoleById(roleId: number) "+roleId);
    return this.http.delete(`${this.rolesUrl}/roles/${roleId}/permissions/${permissionId}`, { headers });
  }



}
