import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../../authentication/models/question.model';
import { AuthService } from '../../../service/auth.service';
import { HomePageService } from '../../../service/home-page.service';
import { VocationalTestService } from '../../../service/vocational-test.service';

@Component({
  selector: 'app-dashboard-premium',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard-premium.component.html',
  styleUrl: './dashboard-premium.component.scss'
})
export class DashboardPremiumComponent {
  @ViewChild('sideMenu', { static: false }) sideMenu!: ElementRef;
  @ViewChild('menuBtn', { static: false }) menuBtn!: ElementRef;
  @ViewChild('closeBtn', { static: false }) closeBtn!: ElementRef;
  @ViewChild('themeToggler', { static: false }) themeToggler!: ElementRef;

  ubicaciones: any[] = [];
  carreras: any[] = [];
  carrerasfilter: any[] =[];
  carreraSeleccionada1: any = null;
  carreraSeleccionada2: any = null;
  showTestWarning: boolean = false;
  user: User | null = null;
  constructor(
    private carreraService: HomePageService,
    private authService: AuthService,
    private vocational: VocationalTestService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadUbicaciones();
    this.getUserInfo();
  }
  
  onUbicacionChange(event: Event): void {
    const target = event.target as HTMLSelectElement; 
    const ubicacionId = target.value; 
    if (ubicacionId) { 
      this.carreraService.getCareersByLocation(ubicacionId).subscribe(carreras => this.carrerasfilter = carreras);
     
    }
  }

  getUserInfo(): void {

    this.authService.getUserInfo().subscribe({
      next: (data) => {
        
        this.user = data; // Asigna los detalles del usuario
        this.loadCarrerasByUser(this.user?.id ?? 0); // Cargar las carreras después de obtener el usuario
      },
      error: (err) => {
        
        this.showTestWarning = true; // Muestra el aviso si hay un error
      }
    });
  }

  loadCarrerasByUser(userId: number): void {
    if (userId) {
      this.vocational.getCarrerasByUser(userId).subscribe(
        (carreras) => {
          this.carreras = carreras;
          this.showTestWarning = carreras.length === 0; 
         
          this.cd.detectChanges(); // Forzar detección de cambios
        }, 
        (error) => {
         
          this.showTestWarning = true; 
        
          this.cd.detectChanges(); // Forzar detección de cambios
        }
      );
    } else {
      console.warn('El ID del usuario es 0, no se cargan las carreras.');
    }
  }

  loadUbicaciones(): void {
    this.carreraService.getUbicaciones().subscribe(
      ubicaciones => this.ubicaciones = ubicaciones,
      error => console.error('Error al cargar ubicaciones')
    );
  }



  onCarrera1Change(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const carreraId = target.value;
    if (carreraId) {
      this.carreraService.getCarreraById(carreraId).subscribe(carrera => this.carreraSeleccionada1 = carrera);
    }
    if (this.carreraSeleccionada2?.id === carreraId) {
      this.carreraSeleccionada2 = null;
    }
  }

  onCarrera2Change(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const carreraId = target.value;
    if (carreraId) {
      this.carreraService.getCarreraById(carreraId).subscribe(carrera => this.carreraSeleccionada2 = carrera);
    }
  }

  get filteredCarreras() {
    return this.carreras.filter(carrera => !this.carreraSeleccionada1 || carrera.id !== this.carreraSeleccionada1.id);
  }

  logout(): void {
    this.authService.logout();
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
