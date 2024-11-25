import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-advisor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './register-advisor.component.html',
  styleUrl: './register-advisor.component.scss'
})
export class RegisterAdvisorComponent {
  errorMessage: string = '';


  @ViewChild('registerForm') registerForm!: NgForm;

  constructor(private auth: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { firstName, lastName, email, password, specialty} = form.value;     
      this.auth.registerAdviser({ firstName, lastName, email, password, specialty }).subscribe(
        (response: any) => {
          alert('Asesor registrado exitosamente');
        },
        (error: string) => {
          console.error('Error de registro:', error);
          this.errorMessage = error;
        }
      );
    }
  }



}
