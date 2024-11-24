import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlansService } from '../../service/plans.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private plansService: PlansService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParamMap.get('token');
    if (orderId) {
      this.plansService.capturePaymentOrder(orderId).subscribe(
        (response) => {
          if (response.newToken) {
           
            localStorage.setItem('authToken', response.newToken);
       
          }
    
         
          if (response.completed) {
            console.log('Pago completado con éxito');
          }

       
          setTimeout(() => {
           this.router.navigate(['/dashboard-student']);  
          }, 2000);

        },
        (error) => {
          console.error('Error al capturar el pago:', error);
        }
      );
    } else {
      console.error('No se encontró el ID de la orden.');
    }
  }
}
