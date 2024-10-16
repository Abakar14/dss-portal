import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DSSService {

  constructor(private authService: AuthenticationService) { }

  getHeaders():HttpHeaders{
 
    return  new HttpHeaders({
      'Authorization':`Bearer ${this.authService.getToken()}`     
      }); 

  }
}
