import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentDTO } from '../../../authentication/models/question.model';
import { AdvisoryService } from '../../../service/advisory.service';

@Component({
  selector: 'app-all-students',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.scss'
})
export class AllStudentsComponent {
 students : StudentDTO[] = [];

 constructor(
  private advisoryService: AdvisoryService
) {}

ngOnInit() {
  this.loadAdvisors();
}


 loadAdvisors() {
  this.advisoryService.getStudents().subscribe(
    data => {
      this.students = data;

      // Llamar al estado de solicitud para cada asesor
      this.students.forEach(student => {
        if (student.id !== undefined) {
     // Cargar el estado de cada solicitud
        } else {
          console.error('El ID del asesor es undefined:', student);
        }
      });
    },
    error => console.error(error)
  );
}
}
