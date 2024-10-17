import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DSSService } from './dss.service';
import { UserProfile } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8081/dss/api/v1';

  constructor(private http: HttpClient, private dssService: DSSService) { }


  getUsers():Observable<UserProfile[]>{
    const headers = this.dssService.getHeaders();
      console.log("getStudents()  headers : "+headers.get("Authorization"));
 
     return this.http.get<UserProfile[]>(this.usersUrl+"/users", { headers });
       
   }

   getTotalUsers():Observable<number>{
     const headers = this.dssService.getHeaders();
     return this.http.get<number>(`${this.usersUrl}/users/count`, {headers});

   }

   getTotalRoles():Observable<number>{
    const headers = this.dssService.getHeaders();
    return this.http.get<number>(`${this.usersUrl}/roles/count`, {headers});
   }

   getTotalLogs(){}
}
