import { Component, Input } from '@angular/core';
import { Adviser } from '../../../authentication/models/question.model';
import { AdvisoryService } from '../../../service/advisory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SolicitationService } from '../../../service/solicitation.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-list-advisors',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-advisors.component.html',
  styleUrl: './list-advisors.component.scss'
})
export class ListAdvisorsComponent {
  advisors: Adviser[] = [];
solicitationStatuses: Map<number, string> = new Map();  // Para almacenar los estados de las solicitudes por advisorId

constructor(
  private advisoryService: AdvisoryService,
  private soli: SolicitationService,
  private auth: AuthService
) {}

ngOnInit() {
  this.loadAdvisors();
}

loadAdvisors() {
  this.advisoryService.getAdvisers().subscribe(
    data => {
      this.advisors = data;

      // Llamar al estado de solicitud para cada asesor
      this.advisors.forEach(advisor => {
        if (advisor.id !== undefined) {
          this.getSolicitationStatus(advisor.id);  // Cargar el estado de cada solicitud
        } else {
          console.error('El ID del asesor es undefined:', advisor);
        }
      });
    },
    error => console.error(error)
  );
}

getSolicitationStatus(adviserId: number): void {
  const studentId = this.auth.getUserId();
  if (studentId === null) {
    console.error('No se pudo obtener el ID del estudiante.');
    return;
  }

  // Llamada al backend para obtener el estado de la solicitud
  this.soli.getSolicitationStatus(studentId, adviserId).subscribe({
    next: (response: { status: string }) => {
      this.solicitationStatuses.set(adviserId, response.status);  // Guardar el estado en la map
    },
    error: (err) => {
      console.error('Error al obtener el estado de la solicitud:', err);
    }
  });
}

sendSolicitation(advisorId: number | undefined): void {
  if (advisorId === undefined) {
    console.error('El ID del asesor no está definido.');
    alert('Error: No se pudo enviar la solicitud.');
    return;
  }

  const studentId = this.auth.getUserId();
  if (studentId === null) {
    console.error('No se pudo obtener el ID del estudiante.');
    alert('Error: No se pudo enviar la solicitud.');
    return;
  }

  // Enviar la solicitud
  this.soli.sendSolicitation(studentId, advisorId).subscribe({
    next: () => {
      alert('Solicitud enviada con éxito.');
      this.getSolicitationStatus(advisorId);  // Recargar el estado
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}
