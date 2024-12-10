import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DSSService } from './dss.service';
import { Role, User, UserCreateDto, UserProfile } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:9090/users';
  private permissionsUrl = 'http://localhost:9090/permissions';

  constructor(private http: HttpClient, private dssService: DSSService) { }


  getUsers():Observable<User[]>{
    const headers = this.dssService.getHeaders();
      console.log("getStudents()  headers : "+headers.get("Authorization"));
 
     return this.http.get<User[]>(`${this.usersUrl}/list`, { headers });
       
   }

   getTotalUsers():Observable<number>{
     const headers = this.dssService.getHeaders();
     return this.http.get<number>(`${this.usersUrl}/count`, {headers});

   }

   getTotalPermissions():Observable<number>{
    const headers = this.dssService.getHeaders();
    return this.http.get<number>(`${this.permissionsUrl}/count`, {headers});
   }

   deleteUser(userId: number):Observable<UserProfile> {
    throw new Error('Method not implemented.');
  }

  addUser(user: UserCreateDto): Observable<UserCreateDto> {
    console.log("CreateUserDto:", JSON.stringify(user, null, 2)); // Pretty print the object
    const headers = this.dssService.getHeaders();
    return this.http.post<UserCreateDto>(`${this.usersUrl}`, user, { headers });
}


  updateUser(userId: number, user: UserProfile) : Observable<UserProfile>{
    throw new Error('Method not implemented.');
  }


  addRoleToUser(userId: number, roleId: number): Observable<any> {
    const headers = this.dssService.getHeaders();
    return this.http.post<any>(`${this.usersUrl}/${userId}/roles/${roleId}`,null, { headers });
  }
  
  removeRoleFromUser(userId: number, roleId: number): Observable<any> {
    const headers = this.dssService.getHeaders();
    return this.http.delete<any>(`${this.usersUrl}/${userId}/roles/${roleId}`, { headers });
  }


  

  

}
