import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,

    HttpClientModule,
    OAuthModule.forRoot(), // Enable OAuth2
   
  ], 
  providers:[
    provideHttpClient(withInterceptors([authInterceptor])),
  ], 
  bootstrap:[/* Your Main Component */]
})
export class AppModule { }
