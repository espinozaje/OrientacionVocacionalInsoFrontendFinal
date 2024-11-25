import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password-admin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './change-password-admin.component.html',
  styleUrl: './change-password-admin.component.scss'
})
export class ChangePasswordAdminComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  changePassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      console.error('La nueva contraseña y su confirmación son obligatorias');
      return;
    }
  
    if (this.newPassword !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }
    
    // Obtenemos el email desde el token
    const email = this.authService.getEmailFromToken();
  
    if (!email) {
      console.error('No se pudo obtener el correo del token');
      return;
    }
  
    // Llamada al servicio de cambio de contraseña
    this.authService.changePasswordAdmin(email, this.newPassword).subscribe({
      next: (response) => {
        console.log('Contraseña cambiada exitosamente');
        // Redirigir al dashboard o a otra página después de cambiar la contraseña
        this.router.navigate(['/dashboard-admin/register-advisor']);
      },
      error: (err) => {
        console.error('Error al cambiar la contraseña', err);
      }
    });
  }
}
