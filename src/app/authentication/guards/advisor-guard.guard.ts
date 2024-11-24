import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { inject } from '@angular/core';


export const advisorGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.getRoleFromToken() === 'ADVISER') {
    return true;  
  } else {
    return router.navigate(['/login']);  
  }
};
