import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isAuthenticated()){
      // Extract required roles from route data
    const requiredRoles = route.data?.['roles'] as string[] | undefined;
    console.log("isAuthenticated : "+requiredRoles);

    if(requiredRoles && requiredRoles.length > 0){
      const userRoles = authService.getUserRoles();
      const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

      if (!hasRequiredRole) {
        console.warn("Access denied: User lacks the required roles.", { requiredRoles, userRoles });
        router.navigate(['access-denied']);
        return false;
      }
      // if(hasRequiredRole){
      //   return true;
      // }else {
      //   router.navigate(['access-denied']);
      //   return false;
      // }

    }


    return true;
  }else {
    router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
    return false;
  }

};
