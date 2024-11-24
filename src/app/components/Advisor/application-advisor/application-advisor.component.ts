import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../../service/email.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-application-advisor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './application-advisor.component.html',
  styleUrl: './application-advisor.component.scss'
})
export class ApplicationAdvisorComponent {
  emailForm: FormGroup;
  selectedFile: File | null = null;
  isLoading: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string = '';
  showModal: boolean = false;  
  isSuccessful: boolean = false; 

  constructor(private fb: FormBuilder, private emailService: EmailService, private router: Router) {
    this.emailForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    if (this.emailForm.valid && this.selectedFile) {
      this.isLoading = true;
      this.showModal = true;
      this.isSuccess = false;
      this.isSuccessful = false; 
      this.errorMessage = '';

      const formData = new FormData();
      formData.append('nombre', this.emailForm.get('nombre')?.value);
      formData.append('apellido', this.emailForm.get('apellido')?.value);
      formData.append('email', this.emailForm.get('email')?.value);
      formData.append('archivo', this.selectedFile, this.selectedFile.name);

      this.emailService.sendEmail(formData).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: (response) => {
          this.isSuccess = true;
          this.isSuccessful = true; 
        },
        error: (error) => {
          this.errorMessage = 'Error al enviar el email. Intente nuevamente.';
          this.showModal = false; 
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos y seleccione un archivo.';
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.isSuccessful = false;
     this.router.navigate(['/home']);
  }
}
