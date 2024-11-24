import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule, RouterLink],
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
        this.loading = true; // Activar el estado de carga
        this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
            (response) => {
                this.loading = false; // Desactivar el estado de carga
                // Aquí se procesa la respuesta en caso de éxito
                if (response.message) {
                    this.message = response.message; // Usar el mensaje del backend
                } else {
                    this.message = 'Se ha enviado un correo con instrucciones para restablecer la contraseña.'; // Mensaje por defecto
                }
            },
            (error) => {
                this.loading = false; // Desactivar el estado de carga
                // Manejo del error en la solicitud
                console.error('Error en la solicitud:', error); // Log de error
                if (error.error && error.error.error) {
                    this.message = error.error.error; // Mostrar mensaje de error específico
                } else {
                    this.message = 'Hubo un error al enviar el correo. Inténtalo de nuevo.';
                }
            }
        );
    }
}
}