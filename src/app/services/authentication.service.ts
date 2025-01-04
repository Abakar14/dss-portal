import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './config/auth-config';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private oauthService: OAuthService, private router: Router) {
    // Configure the OAuth2 service
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(localStorage); // Use localStorage for tokens
    this.oauthService.loadDiscoveryDocumentAndTryLogin(); // Discover server settings and try login
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getAccessToken(): string | null {
    return this.oauthService.getAccessToken();
  }

  getRefreshToken(): string | null {
    return this.oauthService.getRefreshToken();
  }

  refreshToken(): void {
    this.oauthService.silentRefresh().catch((err) => {
      console.error('Token refresh error', err);
      this.logout();
    });
  }

  getUserProfile(): any {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}


