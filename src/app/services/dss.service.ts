import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { DssCookieService } from './dss-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class DSSService {

  constructor(private authService: AuthenticationService, private dssCookie: DssCookieService) { }

  getHeaders():HttpHeaders{
    const token = this.authService.getToken();
    console.log("getHeaders() token: " +token);

    return  new HttpHeaders({
      'Authorization':`Bearer ${this.authService.getToken()}`     
      }); 

  }
}
