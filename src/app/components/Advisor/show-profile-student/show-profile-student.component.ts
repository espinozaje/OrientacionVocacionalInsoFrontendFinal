import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { StudentDTO } from '../../../authentication/models/question.model';
import { environment } from '../../../../environments/environment';
import { VocationalTestService } from '../../../service/vocational-test.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-show-profile-student',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './show-profile-student.component.html',
  styleUrl: './show-profile-student.component.scss'
})
export class ShowProfileStudentComponent {
  student: StudentDTO | null = null;
  areasConCarreras: any[] = [];
  constructor(private route: ActivatedRoute, private advisorService: AuthService, private vocational: VocationalTestService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.advisorService.getStudentById(id).subscribe(
        (data) => {
          this.student = data;
          this.loadCarreras(this.student?.id ?? 0);
          if(this.student?.img_profile){
            this.student.img_profile = `${environment.apiUrl}api/v1/auth/${this.student.img_profile}`;
          }
        },
        (error) => {
          console.error('Error fetching advisor data:', error);
        }
      );
    }
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
}
