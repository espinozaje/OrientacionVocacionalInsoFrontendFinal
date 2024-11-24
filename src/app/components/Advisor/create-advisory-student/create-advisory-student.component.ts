import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdvisoryService } from '../../../service/advisory.service';
import { CommonModule, formatDate } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { SolicitationService } from '../../../service/solicitation.service';

@Component({
  selector: 'app-create-advisory-student',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule],
  templateUrl: './create-advisory-student.component.html',
  styleUrl: './create-advisory-student.component.scss'
})
export class CreateAdvisoryStudentComponent {
  advisoryForm: FormGroup;
  students: any[] = [];
  isLoading: boolean = false;  
  showConfirmation: boolean = false;  
  loadingMessage: string = "Procesando..."; 
  minDate: string = ''; 
  minTime: string = ''; 
  isTimeEnabled: boolean = false; 
  adviserId: number | null = null;

  constructor(private fb: FormBuilder, private advisoryService: AdvisoryService, private authService: AuthService, private solicitationService: SolicitationService) {
    this.advisoryForm = this.fb.group({
      link: ['', Validators.required],
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      studentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAdvisers();
    this.minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }


  onDateChange(): void {
    const selectedDate = this.advisoryForm.get('date')?.value;
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  
    if (selectedDate === today) {
      
      this.isTimeEnabled = true;
      this.minTime = this.getCurrentTime();
    } else if (selectedDate > today) {
      
      this.isTimeEnabled = true;
      this.minTime = '00:00';
    } else {
     
      this.isTimeEnabled = false;
      this.minTime = '';
    }
  }
  
  private getCurrentTime(): string {
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  

  loadAdvisers(): void {
    this.adviserId = this.authService.getUserId();
    if (this.adviserId) {
      this.solicitationService.getAcceptedStudents(this.adviserId).subscribe({
        next: (data) => this.students = data,
        error: (err) => console.error(err)
      });
    }
  }

  createAdvisory(): void {
    const selectedDate = this.advisoryForm.get('date')?.value;
    const selectedTime = this.advisoryForm.get('time')?.value;
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const currentTime = this.getCurrentTime();
  
    // Validación adicional para horas pasadas en el día actual
    if (selectedDate === currentDate && selectedTime < currentTime) {
      alert('No puedes seleccionar horas pasadas.');
      return;
    }
  
    const adviserId = this.getAdvisorIdFromToken();
    const advisoryData = {
      ...this.advisoryForm.value,
      adviserId
    };
  
    this.isLoading = true;
    this.loadingMessage = "Creando asesoría...";
  
    this.advisoryService.createAdvisory(advisoryData).subscribe(
      response => {
        this.isLoading = false;
        this.showConfirmation = true;
        this.loadingMessage = "Asesoría creada con éxito!";
        setTimeout(() => {
          this.showConfirmation = false;
        }, 3000);
      },
      error => {
        this.isLoading = false;
        if (error.status === 500 && error.error.message === "El estudiante ya tiene 2 asesorías programadas este mes.") {
          alert("El estudiante ya tiene 2 asesorías programadas este mes.") ;
        } else {
       
          this.loadingMessage = "Hubo un error, por favor intente nuevamente.";
        }
      }
    );
  }

  private getAdvisorIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return 0;
  }
}
