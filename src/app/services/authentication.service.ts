import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { DssCookieService } from './dss-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authUrl = 'http://localhost:8081/dss/api/v1/auth';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  cookieService = inject(DssCookieService);
  cookieTokenDays = 2;
  cookieRefreshTokenDays = 2;
  


  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(username: string, password: string): Observable<any>{
    const params = new HttpParams()
    .set("username", username)
    .set("password", password);

    return this.http.post<{token: string; refresh_token: string}>(`${this.authUrl}/login`, null, {params}).pipe(

      map((response)=> {
        const token = response.token;
        const refresh_token = response.refresh_token;

        if(token && refresh_token){
          //store both in localStorage or sessionStorage
          this.cookieService.setCookie(this.tokenKey, token, this.cookieTokenDays);
          this.cookieService.setCookie(this.refreshTokenKey, refresh_token, this.cookieRefreshTokenDays);
          
          console.log("tokenKey"+ token)
          console.log("refreshTokenKey"+ refresh_token)
 
          return true;
        }
        return false;

      })
    );
  }

  logout(){
    if (isPlatformBrowser(this.platformId)) {
    this.cookieService.deleteCookie(this.tokenKey);
    this.cookieService.deleteCookie(this.refreshTokenKey);
    this.router.navigate([`/login`]);
    }

  }

  isAuthenticated():boolean {
    if (isPlatformBrowser(this.platformId)) {

    // const token = sessionStorage.getItem(this.tokenKey);
    const token = this.cookieService.getCookie(this.tokenKey);
    return !!token;  //&& !this.isTokenExpired(token);
    }
    return false;
  }

  getToken(): string | null {
    return this.cookieService.getCookie(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return this.cookieService.getCookie(this.refreshTokenKey);
  }

  private isTokenExpired(token: string){
     return false;  // Replace this with actual expiration check
  }

}
