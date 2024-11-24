import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdvisoryService } from '../../../service/advisory.service';
import { AdvisoryDTO } from '../../../authentication/models/question.model';
import { AuthService } from '../../../service/auth.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-list-advisory-student',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule, FormsModule],
  templateUrl: './list-advisory-student.component.html',
  styleUrl: './list-advisory-student.component.scss'
})
export class ListAdvisoryStudentComponent {
  advisories: AdvisoryDTO[] = [];
  loading = false;
  confirmation = false;
  selectedAdvisory: AdvisoryDTO | null = null;
  constructor(private advisoryService: AdvisoryService, private fb: FormBuilder, private auth: AuthService) {
  }
  ngOnInit() {
    const userId = this.getStudentIdFromToken();
    
    // Obtener las asesorías del usuario
    this.advisoryService.getAdvisoriesByUserId(userId).subscribe(advisories => {
      this.advisories = advisories;
  
     
      advisories.forEach(advisory => {
        if (advisory.adviserId) {
         
          this.auth.getAdvisorById(String(advisory.adviserId)).subscribe(adviser => {
         
            advisory.adviser = adviser;
  
           
            if (adviser.img_profile) {
              adviser.img_profile = `${environment.apiUrl}api/v1/auth/${adviser.img_profile}`;
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

  loadAdvisories(userId: number) {
    this.advisoryService.getAdvisoriesByUserId(userId).subscribe(
      data => this.advisories = data,
      error => console.error(error)
    );
  }
}
