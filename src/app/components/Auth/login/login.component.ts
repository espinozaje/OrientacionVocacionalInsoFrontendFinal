import { Component} from '@angular/core';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../service/auth.service';
import { AuthGoogleService } from '../../../service/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule, RouterLink],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  verificationCode: string = '';
  isEmailVerified: boolean = false; 
  isVerificationFormVisible: boolean = false; 
  verificationErrorMessage: string = '';
  isLoading: boolean = false; 
  showSuccessMessage: boolean = false; 
  
  constructor(private authService: AuthService) {}

  login(): void {
    if (!this.email || !this.password) {
      console.error('Email y contraseña son requeridos');
      return;
    }

    this.authService.login(this.email, this.password, (token) => {}).subscribe({
      next: (response) => {
        
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error de autenticación. Por favor, revisa tus credenciales.';
        }
        console.error('Error de autenticación', err);
      }
    });
  }

  resendVerificationCode(): void {
   
    if (!this.email) {
      this.errorMessage = 'Por favor, ingresa tu correo electrónico para reenviar el código de verificación.';
      this.isLoading = false; 
      return; 
    }
  
   
    this.isLoading = true; 
    this.showSuccessMessage = false; 
  
   
    this.authService.resendVerificationCode(this.email).subscribe({
      next: (response) => {
        this.isLoading = false; 
        this.showSuccessMessage = true; 
        this.isVerificationFormVisible = true; 
      },
      error: (err) => {
        this.isLoading = false; 
        this.errorMessage = err.error.message || 'Error al reenviar el código';
        console.error('Error al reenviar el código', err);
      }
    });
  }

  verifyCode(): void {
    if (!this.verificationCode) {
      this.verificationErrorMessage = 'Por favor, ingresa el código de verificación.';
      return;
    }
  
    this.authService.verifyStudentCode(this.email, this.verificationCode).subscribe({
      next: (response) => {
        alert('Correo verificado con éxito');
        this.isEmailVerified = true; 
        this.isVerificationFormVisible = false;
        this.verificationErrorMessage = '';
      },
      error: (err) => {
        this.verificationErrorMessage = err.error.message || 'Código incorrecto o expirado';
        console.error('Error al verificar el código', err);
      }
    });
  }
}