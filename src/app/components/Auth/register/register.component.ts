import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessage: string = '';
  showVerificationModal = false;
  verificationCode = '';
  verificationError = '';
  showLoadingModal = false;
  isLoading = false; // Nueva variable para controlar el modal de carga

  @ViewChild('registerForm') registerForm!: NgForm;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { firstName, lastName, email, password } = form.value;
  
      // Mostrar el modal de carga antes de hacer la solicitud
      this.showLoadingModal = true;
  
      // Llamada al servicio para registrar al usuario
      this.auth.registerStudent({ firstName, lastName, email, password }).subscribe(
        (response: any) => {
          
          
          // Ocultar el modal de carga una vez se haya procesado el registro
          this.showLoadingModal = false;
  
          // Ahora, mostrar el modal para ingresar el código de verificación
          this.showVerificationModal = true;
        },
        (error: string) => {
          console.error('Error de registro:', error);
          this.showLoadingModal = false;
          this.errorMessage = error;
        }
      );
    }
  }

  verifyCode() {
    this.isLoading = true; // Mostrar el modal de carga

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.auth.verifyStudentCode(email, this.verificationCode).subscribe(
      (response: any) => {
       
        this.isLoading = false; // Ocultar el modal de carga
        this.showVerificationModal = false;
        this.auth.login(email, password, (token) => {
        
        }).subscribe({
          next: () => this.router.navigate(['/dashboard-student']),
          error: (err) => {
            console.error('Login Failed', err);
          }
        });
      },
      (error: string) => {
        this.isLoading = false; // Ocultar el modal de carga
        console.error('Error de verificación:', error);
        this.verificationError = 'Código incorrecto, inténtalo nuevamente.';
      }
    );
  }

  closeModal() {
    this.showVerificationModal = false;
  }
}