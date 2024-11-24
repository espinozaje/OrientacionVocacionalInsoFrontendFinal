import { Component } from '@angular/core';
import { Adviser, AdvisoryDTO, Solicitation } from '../../../authentication/models/question.model';
import { AuthService } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdvisoryService } from '../../../service/advisory.service';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { SolicitationService } from '../../../service/solicitation.service';
@Component({
  selector: 'app-dashboard-advisor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-advisor.component.html',
  styleUrl: './dashboard-advisor.component.scss'
})
export class DashboardAdvisorComponent {
  user: Adviser | null = null;
  showTestWarning: boolean = false; 
  advisories: AdvisoryDTO[] = [];
  solicitations: Solicitation[] = [];
  constructor(
   
    private authService: AuthService,
    private advisoryService: AdvisoryService,
    private solicitationService: SolicitationService
  ) {}


  ngOnInit() {
    this.getUserInfo();
   
    const userId = this.getStudentIdFromToken();
    this.advisoryService.getAdvisoriesByUserId(userId).subscribe(advisories => {
      this.advisories = advisories;
  
      // Ordenamos las asesorías por fecha y hora
      this.advisories.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
  
        return dateA.getTime() - dateB.getTime();
      });
  
      // Tomamos solo las 3 asesorías más cercanas
      this.advisories = this.advisories.slice(0, 3);
  
      // Asignamos información del estudiante para cada asesoría
      this.advisories.forEach(advisory => {
        if (advisory.studentId) {
          this.authService.getStudentById(String(advisory.studentId)).subscribe(student => {
            advisory.student = student;
            if (student.img_profile) {
              student.img_profile = `${environment.apiUrl}api/v1/auth/${student.img_profile}`;
            }
          });
        }
      });
    });
  }



  
  

  private getStudentIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
     
      return payload.userId;
    }
    return 0;
  }
  getUserInfo(): void {

    this.authService.getUserInfo().subscribe({
      next: (data) => {
        
        this.user = data; 
      },
      error: (err) => {
        
        this.showTestWarning = true;
      }
    });
  }

  

}
