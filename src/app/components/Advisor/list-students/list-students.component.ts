import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdvisoryDTO, StudentDTO } from '../../../authentication/models/question.model';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AdvisoryService } from '../../../service/advisory.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { SolicitationService } from '../../../service/solicitation.service';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.scss'
})
export class ListStudentsComponent {

  students: StudentDTO[] = [];

  adviserId: number | null = null;

  constructor(private solicitationService: SolicitationService, private authService: AuthService) {
    
  }
  ngOnInit(): void {
    this.adviserId = this.authService.getUserId();
    if (this.adviserId) {
      this.solicitationService.getAcceptedStudents(this.adviserId).subscribe({
        next: (data) => this.students = data,
        error: (err) => console.error(err)
      });
    }
  }
  

  

}
