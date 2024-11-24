import { Component } from '@angular/core';
import { Adviser } from '../../../authentication/models/question.model';
import { AdvisoryService } from '../../../service/advisory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { environment } from '../../../../environments/environment';
import { AdviserService } from '../../../service/adviser.service';
@Component({
  selector: 'app-show-profile-adviser',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './show-profile-adviser.component.html',
  styleUrl: './show-profile-adviser.component.scss'
})
export class ShowProfileAdviserComponent {
  advisor: any;
  adviserId: number | undefined;
  availabilities: any[] = [];
  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(private route: ActivatedRoute, private advisorService: AuthService, private horario: AdviserService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adviserId = Number(id);
      this.advisorService.getAdvisorById(id).subscribe(
        (data) => {
          this.loadAvailability();
          this.advisor = data;
          if(this.advisor?.img_profile){
            this.advisor.img_profile = `${environment.apiUrl}api/v1/auth/${this.advisor.img_profile}`;
          }
        },
        (error) => {
          console.error('Error fetching advisor data:', error);
        }
      );
    }
  }



  loadAvailability() {
    if (this.adviserId) {
      this.horario.getAvailability(this.adviserId).subscribe({
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

}
