import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plan } from '../../../authentication/models/question.model';
import { Observable } from 'rxjs';
import { PlansService } from '../../../service/plans.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent implements OnInit {
  // Variables para almacenar los planes obtenidos del backend
  freePlan: any = {};
  premiumPlan: any = {};

  constructor(
    private planService: PlansService,
    private auth: AuthService, // Servicio para manejar las compras
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener los planes desde el backend
    this.planService.getPlans().subscribe((plans: any[]) => {
      console.log(plans);
      this.freePlan = plans.find(plan => plan.name === 'Free') || this.freePlan;
      this.premiumPlan = plans.find(plan => plan.name === 'Premium') || this.premiumPlan;
    });
  }

 
  selectPlan(plan: any): void {
    if (plan.name === 'Premium') {
      this.createPurchase(plan); 
    }
  }

  // Método para crear la compra
  createPurchase(plan: any): void {
    const purchaseData = {
      userId: this.auth.getUserId(), 
      items: [
        {
          price: plan.price,
          quantity: 1,
          planId: plan.id
        }
      ]
    };

    
    // Llamada al servicio para crear la compra y obtener la URL de PayPal
    this.planService.createPurchase(purchaseData).subscribe(response => {
      const orderPay = {
        purchaseId: response.id,
        returnUrl: 'https://orientacion-vocacional.vercel.app/success',
        cancelUrl: 'https://orientacion-vocacional.vercel.app/dashboard-student-free/plans'
      }
      this.planService.createPaymentOrder(orderPay.purchaseId, orderPay.returnUrl, orderPay.cancelUrl).subscribe(response => {
        window.location.href = response.paypalUrl;
      })
    }, error => {
      console.error('Error al crear la compra:', error);
    });
  }
}
