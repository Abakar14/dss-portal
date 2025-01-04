import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService = inject(OAuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (oauthService.hasValidAccessToken()) {
    // Extract required roles from route data
    const requiredRoles = route.data?.['roles'] as string[] | undefined;
    console.log('isAuthenticated :', requiredRoles);

    if (requiredRoles && requiredRoles.length > 0) {
      // Retrieve roles from the user's claims
      const userRoles = oauthService.getIdentityClaims()?.['roles'] || [];
      const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

      if (!hasRequiredRole) {
        console.warn('Access denied: User lacks the required roles.', { requiredRoles, userRoles });
        router.navigate(['access-denied']);
        return false;
      }
    }

    return true; // User is authenticated and has the required roles
  } else {
    // Redirect to login page with return URL
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
