import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from './cookie.service';
import { UserProfile } from '../model/user';
//import jwtDecode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authUrl = 'http://localhost:8081/dss/api/v1/auth';
  private usersUrl = 'http://localhost:9090';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private username = 'username';
  cookieService = inject(CookieService);
  cookieTokenDays = 1;
  cookieRefreshTokenDays = 2; 


  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(username: string, password: string): Observable<any>{
    console.log("AuthenticationService login()....");
    const params = new HttpParams()
    .set("username", username)
    .set("password", password);

    return this.http.post<{token: string; refresh_token: string}>(`${this.authUrl}/login`, null, {params}).pipe(

      map((response)=> {
        const token = response.token;
        const refresh_token = response.refresh_token;

        if(token && refresh_token){       
          this.cookieService.setCookie(this.tokenKey, token, this.cookieTokenDays);
          this.cookieService.setCookie(this.refreshTokenKey, refresh_token, this.cookieRefreshTokenDays);
          this.cookieService.setCookie(this.username, username, this.cookieTokenDays);
 
          return true;
        }
        return false;

      })
    );
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
  
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    return payload.roles || []; // Return roles from the payload
  }
  

  getUserProfile():Observable<UserProfile>{
    console.log("AuthenticationService getUserProfile()....");
    const username = this.cookieService.getCookie(this.username);
    // const headers = this.dssService.getHeaders();
    const url = `${this.usersUrl}/users/username?username=`+username;
    // console.log("getStudents()  headers : "+headers.get("Authorization"));
    const headers =  new HttpHeaders({
      'Authorization':`Bearer ${this.cookieService.getCookie(this.tokenKey)}`     
      }); 
   return this.http.get<UserProfile>(url, { headers });
  
  }



  logout(){

  console.log("AuthenticationService logout");
  this.cookieService.deleteCookie(this.tokenKey);
  this.router.navigate(['/login']);

  }

  removeToken():void{
    console.log("AuthenticationService removeToken()....");
    if (isPlatformBrowser(this.platformId)) {
    this.cookieService.deleteCookie(this.tokenKey);
    }
  }

  isAuthenticated():boolean {
    console.log("AuthenticationService isAuthenticated()....");
    if (isPlatformBrowser(this.platformId)) {

    // const token = sessionStorage.getItem(this.tokenKey);
    const token = this.cookieService.getCookie(this.tokenKey);
    return !!token;  //&& !this.isTokenExpired(token);
    }
    return false;
  }

  getToken(): string | null {
    console.log("AuthenticationService getToken()....");
    const token = this.cookieService.getCookie(this.tokenKey);
    if (token && this.isTokenExpired(token)) {
      this.logout();
      return null;
    }
    return token;
  }
  

  getRefreshToken(): string | null {
    console.log("AuthenticationService getRefreshToken()....");
    return this.cookieService.getCookie(this.refreshTokenKey);
  }

  refreshToken(): Observable<any> {
    console.log("AuthenticationService refreshToken()....");
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error("No refresh token available"));
    }
  
    const params = new HttpParams().set("refresh_token", refreshToken);
  
    return this.http.post<{ token: string; refresh_token: string }>(
      `${this.authUrl}/refresh-token`, 
      null, 
      { params }
    ).pipe(
      map(response => {
        const token = response.token;
        const newRefreshToken = response.refresh_token;
  
        if (token && newRefreshToken) {
          this.cookieService.setCookie(this.tokenKey, token, this.cookieTokenDays);
          this.cookieService.setCookie(this.refreshTokenKey, newRefreshToken, this.cookieRefreshTokenDays);
          return true;
        }
        this.logout();
        return false;
      }),
      catchError(error => {
        this.logout();
        return throwError(error);
      })
    );
  }
  

  private isTokenExpired(token: string): boolean {
    console.log("AuthenticationService isTokenExpired()....");
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(new Date().getTime() / 1000); // Current time in seconds
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // If decoding fails, consider the token expired
    }
  }

}


