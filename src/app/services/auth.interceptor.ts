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

        authService.logout(); // Clear tokens or any session data
        router.navigate(['/login']).then(() => {
          console.log("Redirected to login page due to unauthorized access.");
        }).catch(err => {
          console.error("Error navigating to login page:", err);
        });
      }
      return throwError(error);
    })
  );
};
