import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'bms-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit{

  constructor(private oauthService: OAuthService, private router: Router) {}
  
  ngOnInit(): void {

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {

      if (this.oauthService.hasValidAccessToken()) {
        this.router.navigate(['/protected']); // Navigate to the protected route
      } else {
        this.router.navigate(['/login']);
      }
    });

  }
  

}
