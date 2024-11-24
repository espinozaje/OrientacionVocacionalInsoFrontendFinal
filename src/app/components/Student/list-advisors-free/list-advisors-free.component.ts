import { Component } from '@angular/core';
import { AdvisoryService } from '../../../service/advisory.service';
import { AuthService } from '../../../service/auth.service';
import { Adviser } from '../../../authentication/models/question.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-advisors-free',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list-advisors-free.component.html',
  styleUrl: './list-advisors-free.component.scss'
})
export class ListAdvisorsFreeComponent {
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
          if (advisor.id !== undefined) {
       // Cargar el estado de cada solicitud
          } else {
            console.error('El ID del asesor es undefined:', advisor);
          }
        });
      },
      error => console.error(error)
    );
  }
  

}
