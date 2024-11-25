import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const role = authService.getRoleFromToken();
    const plan = authService.getPlanFromToken();

    if (role === 'ADVISER') {
      router.navigate(['/dashboard/advisor']);
      return false; // Opción 1: Redirige pero no avanza
    }else if (role === 'ADMIN') {
      router.navigate(['/dashboard-admin/register-advisor']);
      return false;
    } else if (role === 'STUDENT' && plan === 'PREMIUM') {
      router.navigate(['/dashboard-student']);
      return false;
    } else if (role === 'STUDENT' && plan === 'FREE') {
      router.navigate(['/dashboard-student-free']);
      return false;
    } else {
      router.navigate(['/home']);
      return false;
    }
  }

  
  return true;
};
