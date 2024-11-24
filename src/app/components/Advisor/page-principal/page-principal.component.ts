import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Adviser, Solicitation, User } from '../../../authentication/models/question.model';
import { AuthService } from '../../../service/auth.service';
import { HomePageService } from '../../../service/home-page.service';
import { VocationalTestService } from '../../../service/vocational-test.service';
import { SolicitationService } from '../../../service/solicitation.service';

@Component({
  selector: 'app-page-principal',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, RouterOutlet, RouterLinkActive, HttpClientModule],
  templateUrl: './page-principal.component.html',
  styleUrl: './page-principal.component.scss'
})
export class PagePrincipalComponent {
  @ViewChild('sideMenu', { static: false }) sideMenu!: ElementRef;
  @ViewChild('menuBtn', { static: false }) menuBtn!: ElementRef;
  @ViewChild('closeBtn', { static: false }) closeBtn!: ElementRef;
  @ViewChild('themeToggler', { static: false }) themeToggler!: ElementRef;

  ubicaciones: any[] = [];
  carreras: any[] = [];
  carreraSeleccionada1: any = null;
  carreraSeleccionada2: any = null;
  user: Adviser | null = null;
  showTestWarning: boolean = false; 
  solicitations: Solicitation[] = [];

  constructor(
    
    private authService: AuthService,
    private solicitationService: SolicitationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSolicitations();
    this.getUserInfo();
  }

 

  getUserInfo(): void {

    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data; // Asigna los detalles del usuario// Cargar las carreras después de obtener el usuario
      },
      error: (err) => {
        
        this.showTestWarning = true; // Muestra el aviso si hay un error
      }
    });
  }


  
  

  logout(): void {
    this.authService.logout();
    
  }


  loadSolicitations(): void {
    const adviserId = this.authService.getUserId(); 
  
    if (!adviserId) {
      console.error('Error: No se pudo obtener el ID del asesor. Asegúrate de haber iniciado sesión.');
      alert('Error: No se pudo cargar las solicitudes. Por favor, inicia sesión.');
      return;
    }
  
    this.solicitationService.getSolicitationsForAdviser(adviserId).subscribe({
      next: (data) => {

        this.solicitations = data.filter((solicitation: any) => solicitation.status !== 'REJECTED');
      },
      error: (err) => {
        console.error('Error al cargar las solicitudes:', err);
        alert('Ocurrió un error al cargar las solicitudes. Por favor, inténtalo nuevamente.');
      }
    });
  }


  respondToSolicitation(solicitationId: number, status: 'ACCEPTED' | 'REJECTED'): void {
    this.solicitationService.respondToSolicitation(solicitationId, status).subscribe({
      next: () => {
        alert('Solicitud actualizada.');
        // Actualiza la lista visible en el frontend
        if (status === 'REJECTED') {
          this.solicitations = this.solicitations.filter(solicitation => solicitation.id !== solicitationId);
        } else {
          this.loadSolicitations(); // Recarga las solicitudes aceptadas
        }
      },
      error: (err) => console.error(err)
    });
  }
  

  ngAfterViewInit() {
    this.menuBtn.nativeElement.addEventListener('click', () => {
      this.sideMenu.nativeElement.style.display = 'block';
    });

    this.closeBtn.nativeElement.addEventListener('click', () => {
      this.sideMenu.nativeElement.style.display = 'none';
    });

    this.themeToggler.nativeElement.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme-variables');
      this.themeToggler.nativeElement.querySelector('span:nth-child(1)').classList.toggle('active');
      this.themeToggler.nativeElement.querySelector('span:nth-child(2)').classList.toggle('active');
    });
  }

  ngOnDestroy() {
    // Limpieza de listeners para evitar fugas de memoria
    this.menuBtn.nativeElement.removeEventListener('click', this.menuBtn.nativeElement.click);
    this.closeBtn.nativeElement.removeEventListener('click', this.closeBtn.nativeElement.click);
    this.themeToggler.nativeElement.removeEventListener('click', this.themeToggler.nativeElement.click);
  }
}