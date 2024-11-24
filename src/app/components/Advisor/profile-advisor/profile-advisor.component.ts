import { Component, ElementRef, ViewChild } from '@angular/core';
import { Adviser, Availability, DayOfWeek, FileResponse, User } from '../../../authentication/models/question.model';
import { AuthService } from '../../../service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdviserService } from '../../../service/adviser.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-advisor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './profile-advisor.component.html',
  styleUrl: './profile-advisor.component.scss'
})
export class ProfileAdvisorComponent {
  selectedFile: File | null = null;
  user: any = { firstName: '', lastName: '', email: '', specialty: '', img_profile: '' };
  adviserId: number | undefined;
  availabilities: any[] = [];
  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  isNameDisabled: boolean = true;
  isLastNameDisabled: boolean = true;
  selectedDay: string = '';
  selectedStartTime: string = '';
  selectedEndTime: string = '';
  isEditing: boolean = false;
  editIndex: number | null = null;

  constructor(private authService: AuthService, private availabilityService: AdviserService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;
        this.adviserId = data.id ?? 0;
        this.loadAvailability();
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

  loadAvailability() {
    if (this.adviserId) {
      this.availabilityService.getAvailability(this.adviserId).subscribe({
        next: (data) => {
          this.availabilities = data;
          this.sortAvailabilities();
        },
        error: (err) => {
          console.error('Error al cargar la disponibilidad', err);
        }
      });
    }
  }

  sortAvailabilities() {
    this.availabilities.sort(
      (a, b) => this.daysOfWeek.indexOf(a.dayOfWeek) - this.daysOfWeek.indexOf(b.dayOfWeek)
    );
  }

  startAddingAvailability() {
    this.isEditing = true;
    this.selectedDay = '';
    this.selectedStartTime = '';
    this.selectedEndTime = '';
    this.editIndex = null;
  }

  saveAvailability() { 
    if (this.selectedDay && this.selectedStartTime && this.selectedEndTime) {
      const newAvailability = {
        dayOfWeek: this.selectedDay,
        startTime: this.selectedStartTime,
        endTime: this.selectedEndTime
      };
  
      if (this.editIndex !== null) {
        // Editar disponibilidad existente
        this.availabilities[this.editIndex] = newAvailability;
        this.editIndex = null;
        this.sortAvailabilities(); // Ordenar después de editar
      } else {
        // Agregar nueva disponibilidad
        this.availabilityService.addAvailability(this.adviserId!, newAvailability).subscribe({
          next: (addedAvailability) => {
            this.availabilities.push(addedAvailability);
            this.sortAvailabilities(); // Ordenar después de agregar
            alert('Horario añadido con éxito.');
          },
          error: (err: HttpErrorResponse) => {
            const errorMessage = err.error?.message || 'Hubo un error al agregar el horario.';
           
            alert(errorMessage);
          }
        });
      }
  
      this.cancelEditing();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.selectedDay = '';
    this.selectedStartTime = '';
    this.selectedEndTime = '';
    this.editIndex = null;
  }

  removeDay(index: number) {
    const availability = this.availabilities[index];
    this.availabilityService.deleteAvailability(this.adviserId!, availability.dayOfWeek)
      .subscribe({
        next: () => {
          this.availabilities.splice(index, 1);
          this.sortAvailabilities(); // Ordenar después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar el horario:', err);
          alert('Hubo un error al eliminar el horario.');
        }
      });
  }

  onSubmitAvailability() {
    if (this.adviserId) {
      this.availabilityService.updateAvailability(this.adviserId, this.availabilities).subscribe({
        next: () => {
          this.sortAvailabilities(); // Asegurarse de que esté ordenado después de actualizar
          console.log('Horarios actualizados exitosamente.');
        },
        error: (err) => {
          console.error('Error al actualizar la disponibilidad', err);
        }
      });
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
