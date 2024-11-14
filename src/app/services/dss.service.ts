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
      'Authorization':`Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'     
      }); 

  }


  getHeadersWithFormData():HttpHeaders{
 
    return  new HttpHeaders({
      'Authorization':`Bearer ${this.authService.getToken()}`,
      'accept': 'application/json'   
      }); 

  }
}
