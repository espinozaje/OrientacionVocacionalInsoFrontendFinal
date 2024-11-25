import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { VocationalTestService } from '../../../service/vocational-test.service';
import { FileResponse, User } from '../../../authentication/models/question.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-student-premium',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './profile-student-premium.component.html',
  styleUrl: './profile-student-premium.component.scss'
})
export class ProfileStudentPremiumComponent {
  user: User = {id: 0, firstName: '', lastName: '', email: '', img_profile: '' };  // Información del usuario
  selectedFile: File | null = null;  // Variable para almacenar el archivo seleccionado
  areasConCarreras: any[] = [];
  isNameDisabled: boolean = true;
isLastNameDisabled: boolean = true;
isCancelPlanModalOpen: boolean = false; // Estado para controlar el modal
  constructor(private profileService: AuthService, private vocational: VocationalTestService) {}

  ngOnInit(): void {
    // Obtener la información actual del usuario usando el servicio
    this.profileService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;
        this.loadCarreras(this.user?.id ?? 0);
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

  openCancelPlanModal(): void {
    this.isCancelPlanModalOpen = true; // Abre el modal
  }

  closeCancelPlanModal(): void {
    this.isCancelPlanModalOpen = false; // Cierra el modal
  }

  cancelPlan(): void {
    this.profileService.cancelPlan(this.user?.id ?? 0).subscribe({
      next: () => {
        alert('Plan cancelado exitosamente.');
        this.closeCancelPlanModal();
        this.profileService.logout();
      },
      error: (err) => {
        console.error('Error al cancelar el plan', err);
        alert('Hubo un error al cancelar el plan.');
        this.closeCancelPlanModal();
      }
    });
  }
  
  loadCarreras(userId: number): void {
    this.vocational.getCarrerasByUser(userId).subscribe(
      (carreras) => {
        const areasMap = new Map();
        
        carreras.forEach((career: any) => {
          const areaName = career.areaName;
          if (!areasMap.has(areaName)) {
            areasMap.set(areaName, []);
          }
          areasMap.get(areaName).push(career);
        });

        // Convertir el mapa en un array para tener un formato adecuado para la vista
        this.areasConCarreras = Array.from(areasMap, ([areaName, careers]) => ({ areaName, careers }));
       
      },
      (error) => {
        console.error('Error al cargar las carreras', error);
       
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  
  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);     
      this.profileService.updateUserProfileImage(formData).subscribe({
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
    this.profileService.updateUserProfile(this.user).subscribe({
      next: (updatedUser) => {
        alert('Perfil actualizado exitosamente');
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
        alert(err.error.message || 'Hubo un error al actualizar el perfil');
      }
    });
  }
}
