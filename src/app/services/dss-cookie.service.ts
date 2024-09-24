import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class DssCookieService {

  constructor(private cookieService: CookieService) { }


  setCookie(name:string, value:string, days: number){
    this.cookieService.set(name, value,{expires: days});
  }

  getCookie(name:string){
    return this.cookieService.get(name);
  }

  deleteCookie(name:string){
    this.cookieService.delete(name);
  }

  deleteCookies(){
    this.cookieService.deleteAll();
  }

}
