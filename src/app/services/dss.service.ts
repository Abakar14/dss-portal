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
    // console.log("getAll Cookies : " +this.);

    console.log("getHeaders() token: " +this.authService.getToken());

    const headers = new HttpHeaders(
      {'Authorization':`Bearer ${this.authService.getToken()}`,
      'Content-Type':'application/json'
      }
    );
    return headers; 

  }
}
