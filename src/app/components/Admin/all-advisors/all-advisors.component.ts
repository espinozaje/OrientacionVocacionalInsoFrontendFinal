import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { AdvisoryService } from '../../../service/advisory.service';
import { Adviser } from '../../../authentication/models/question.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-advisors',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './all-advisors.component.html',
  styleUrl: './all-advisors.component.scss'
})
export class AllAdvisorsComponent {
  advisors: Adviser[] = [];
  solicitationStatuses: Map<number, string> = new Map();  // Para almacenar los estados de las solicitudes por advisorId
  
  constructor(
    private advisoryService: AdvisoryService
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
          if (advisor.id !== undefined) { // Cargar el estado de cada solicitud
          } else {
            console.error('El ID del asesor es undefined:', advisor);
          }
        });
      },
      error => console.error(error)
    );
  }
  
 
}
