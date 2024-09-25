import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class DssCookieService {

  constructor(private cookieService: CookieService) { }


  setCookie(name:string, value:string, days: number){
    this.cookieService.set(name, value,{expires: days});
    // this.cookieService.set('token', 'your-token-here', {
    //   expires: 1, // Expires in 1 day
    //   secure: true, // Only sent over HTTPS
    //   sameSite: 'Strict', // Prevent CSRF
    // });
  }

  getCookie(name:string){
    return this.cookieService.get(name);
  }

  deleteCookie(name:string){
    this.cookieService.delete(name);
  }

  deleteCookies(){
    // document.cookie.split('; ').forEach(cookie => {
    //   console.log("before "+cookie);
    // });
    
    this.cookieService.deleteAll('/', 'localhost');

    // document.cookie.split('; ').forEach(cookie => {
    //   console.log("after "+ cookie);
    // });
    
 
  }

  getCookies(){
    return this.cookieService.getAll();
  }

 

}
