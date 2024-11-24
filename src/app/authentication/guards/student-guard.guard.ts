import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { inject } from '@angular/core';

export const studentGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const role = authService.getRoleFromToken();
    const plan = authService.getPlanFromToken();

    if (role === 'STUDENT' && plan === 'PREMIUM') {
      return true; // Permite acceso a las rutas premium
    }

    // Si es un estudiante pero no tiene plan premium
    if (role === 'STUDENT') {
      return router.navigate(['/dashboard-student-free']);
    }
  }

  // Si no está autenticado o no es un estudiante
  return router.navigate(['/login']);
};
