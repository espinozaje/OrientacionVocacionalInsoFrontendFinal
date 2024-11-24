import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../authentication/models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private apiUrl = `${environment.apiUrl}api/v1/plans`;   // URL del backend
  private apiUrlPurchase = `${environment.apiUrl}api/v1/purchase`;
  private apiUrlCheckout = `${environment.apiUrl}api/v1/checkout`;
  constructor(private http: HttpClient) { }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  }


  createPurchase(purchaseData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPurchase, purchaseData);
  }

  createPaymentOrder(purchaseId: number, returnUrl: string, cancelUrl: string): Observable<any> {
    const params = {
      purchaseId: purchaseId.toString(),
      returnUrl,
      cancelUrl
    };
    return this.http.post<any>(`${this.apiUrlCheckout}/create`, null, { params });
  }

  // Capturar el pago
  capturePaymentOrder(orderId: string): Observable<any> {
    const params = { orderId };
    return this.http.post<any>(`${this.apiUrlCheckout}/capture`, null, { params });
  }

}
