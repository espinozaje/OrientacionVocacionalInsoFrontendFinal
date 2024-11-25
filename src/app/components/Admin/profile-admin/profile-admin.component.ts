import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { AdviserService } from '../../../service/adviser.service';
import { FileResponse } from '../../../authentication/models/question.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.scss'
})
export class ProfileAdminComponent {
  selectedFile: File | null = null;
  user: any = { firstName: '', lastName: '', email: '', img_profile: '' };
  adminId: number | undefined;
  isNameDisabled: boolean = true;
  isLastNameDisabled: boolean = true;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;
        this.adminId = data.id ?? 0;
      },
      error: (err) => {
        console.error('Error al obtener la información del usuario', err);
      }
    });
  }

  toggleField(field: string): void {
    if (field === 'name') {
      this.isNameDisabled = !this.isNameDisabled; // Alterna el estado de habilitado/deshabilitado
    } else if (field === 'lastName') {
      this.isLastNameDisabled = !this.isLastNameDisabled; // Alterna el estado de habilitado/deshabilitado
    }
  }

 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);     
      this.authService.updateUserProfileImage(formData).subscribe({
        next: (response: FileResponse) => {        
          this.user.img_profile = response.filePath;


          alert('Imagen de perfil actualizada');
          window.location.reload();
        },
        error: (err) => {
          console.error('Error al actualizar la imagen', err);
          alert('Hubo un error al actualizar la imagen');
        }
      });
    } 
    this.updateUserProfile();
  }

  updateUserProfile(): void {
    this.authService.updateUserProfile(this.user).subscribe({
      next: (updatedUser) => {
        alert('Perfil actualizado exitosamente');
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
        alert('Hubo un error al actualizar el perfil');
      }
    });
  }
}
