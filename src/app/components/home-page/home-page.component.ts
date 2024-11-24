import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageService } from '../../service/home-page.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ ReactiveFormsModule,FormsModule,CommonModule, HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})      
export class HomePageComponent implements OnInit {
  

  constructor(private carreraService: HomePageService) {}

  ngOnInit(): void {
   
  }

}
