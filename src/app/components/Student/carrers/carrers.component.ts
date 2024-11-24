import { ChangeDetectorRef, Component } from '@angular/core';
import { HomePageService } from '../../../service/home-page.service';
import { AuthService } from '../../../service/auth.service';
import { VocationalTestService } from '../../../service/vocational-test.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../../authentication/models/question.model';

@Component({
  selector: 'app-carrers',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, RouterOutlet, RouterLinkActive, HttpClientModule],
  templateUrl: './carrers.component.html',
  styleUrl: './carrers.component.scss'
})
export class CarrersComponent { 
  areasConCarreras: any[] = []; 
  ubicaciones: any[] = [];
  carreras: any[] = [];
  carrerasFilter1: any[] = [];
  carrerasFilter2: any[] = [];
  carreraSeleccionada1: any = null;
  carreraSeleccionada2: any = null;
  ubicacionSeleccionada1: any = null;
  ubicacionSeleccionada2: any = null;
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

  onUbicacion1Change(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const ubicacionId = Number(target.value);
    if (ubicacionId) {
      this.ubicacionSeleccionada1 = ubicacionId;
      this.filterCarreras(); 
      this.carreraSeleccionada1 = null; 
    }
  }

  onUbicacion2Change(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const ubicacionId = Number(target.value);
    if (ubicacionId) {
      this.ubicacionSeleccionada2 = ubicacionId;
      this.filterCarreras(); 
      this.carreraSeleccionada2 = null;
    }
  }

  onCarrera1Change(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const carreraId = target.value;
    if (carreraId) {
      this.carreraSeleccionada1 = this.carreras.find(carrera => carrera.id === Number(carreraId));
    }
  }

  onCarrera2Change(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const carreraId = target.value;
    if (carreraId) {
      this.carreraSeleccionada2 = this.carreras.find(carrera => carrera.id === Number(carreraId));
    }
  }

  filterCarreras(): void {
    
    this.carrerasFilter1 = this.carreras.filter(carrera => {
      return (this.ubicacionSeleccionada1 ? carrera.location?.id === this.ubicacionSeleccionada1 : true) &&
             (this.carreraSeleccionada2 ? carrera.id !== this.carreraSeleccionada2.id : true);
    });
    this.carrerasFilter2 = this.carreras.filter(carrera => {
      return (this.ubicacionSeleccionada2 ? carrera.location?.id === this.ubicacionSeleccionada2 : true) &&
             (this.carreraSeleccionada1 ? carrera.id !== this.carreraSeleccionada1.id : true);
    });
  }

  getUserInfo(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;
        this.loadCarrerasByUser(this.user?.id ?? 0);
        this.loadCarreras(this.user?.id ?? 0);
      },
      error: (err) => {
        this.showTestWarning = true;
      }
    });
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
        this.showTestWarning = this.areasConCarreras.length === 0;
      },
      (error) => {
       
        this.showTestWarning = true;
      }
    );
  }
  loadCarrerasByUser(userId: number): void {
    if (userId) {
      this.vocational.getCarrerasByUser(userId).subscribe(
        (carreras) => {
          this.carreras = carreras;
          this.showTestWarning = carreras.length === 0;
          this.cd.detectChanges();
        },
        (error) => {
        
          this.showTestWarning = true;
          this.cd.detectChanges();
        }
      );
    } else {
    
    }
  }

  loadUbicaciones(): void {
    this.carreraService.getUbicaciones().subscribe(
      ubicaciones => this.ubicaciones = ubicaciones,
      error => console.error('Error al cargar ubicaciones')
    );
  }

  get filteredCarreras() {
    return this.carreras.filter(carrera => !this.carreraSeleccionada1 || carrera.id !== this.carreraSeleccionada1.id);
  }
}