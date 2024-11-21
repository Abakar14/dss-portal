import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const authToken = authService.getToken();
  const authReq = authToken ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } }) : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.error("401 Unauthorized - Redirecting to login");

        authService.refreshToken().subscribe({
          next: () => {
            console.log("Token refreshed successfully");
          },
          error: () => {
            console.error("Token refresh failed, logging out");
            authService.logout();
            router.navigate(['/login']);
          }
        });
      }
      return throwError(error);
    })
  );
};
