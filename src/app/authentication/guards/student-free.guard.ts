import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { inject } from '@angular/core';

export const studentFreeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const role = authService.getRoleFromToken();
    const plan = authService.getPlanFromToken();

    if (role === 'STUDENT' && plan === 'FREE') {
      return true; // Permite acceso a las rutas free
    }

    // Si es un estudiante pero no tiene plan free
    if (role === 'STUDENT') {
      return router.navigate(['/dashboard-student']);
    }
  }

  // Si no está autenticado o no es un estudiante
  return router.navigate(['/login']);
};
