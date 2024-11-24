import { Component } from '@angular/core';
import { Adviser } from '../../../authentication/models/question.model';
import { SolicitationService } from '../../../service/solicitation.service';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdvisoryService } from '../../../service/advisory.service';

@Component({
  selector: 'app-my-advisors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-advisors.component.html',
  styleUrl: './my-advisors.component.scss'
})
export class MyAdvisorsComponent {
 
  advisers: Adviser[] = [];

  studentId: number | null = null;

  constructor(private solicitationService: SolicitationService, private authService: AuthService) {
    
  }
  ngOnInit(): void {
    this.studentId = this.authService.getUserId();
    if (this.studentId) {
      this.solicitationService.getAcceptedAdvisers(this.studentId).subscribe({
        next: (data) => this.advisers = data,
        error: (err) => console.error(err)
      });
    }
  }
  


}
