import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Admin } from '../../../authentication/models/question.model';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {
  @ViewChild('sideMenu', { static: false }) sideMenu!: ElementRef;
  @ViewChild('menuBtn', { static: false }) menuBtn!: ElementRef;
  @ViewChild('closeBtn', { static: false }) closeBtn!: ElementRef;
  @ViewChild('themeToggler', { static: false }) themeToggler!: ElementRef;

  ubicaciones: any[] = [];
  carreras: any[] = [];
  carreraSeleccionada1: any = null;
  carreraSeleccionada2: any = null;
  user: Admin | null = null;
  showTestWarning: boolean = false; 

  constructor(
    
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {

    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data; 
      },
      error: (err) => {
        
        this.showTestWarning = true; 
      }
    });
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
    this.menuBtn.nativeElement.removeEventListener('click', this.menuBtn.nativeElement.click);
    this.closeBtn.nativeElement.removeEventListener('click', this.closeBtn.nativeElement.click);
    this.themeToggler.nativeElement.removeEventListener('click', this.themeToggler.nativeElement.click);
  }
}
