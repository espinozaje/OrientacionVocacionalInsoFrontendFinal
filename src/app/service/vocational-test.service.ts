import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Career, Question, User} from '../authentication/models/question.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VocationalTestService {
  private apiUrl = `${environment.apiUrl}api/v1/vocational-test`;
  private apiUrlAuth = `${environment.apiUrl}api/v1/auth`; 
  private apiUrlCarreras = `${environment.apiUrl}api/v1/career`;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`);
  }

  getCarrerasByUser(userId: number): Observable<Career[]> {
    return this.http.get<Career[]>(`${this.apiUrlCarreras}/by-user/${userId}`, { headers: this.getHeaders() });
  }
  submitTest(test: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, test);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Obtiene el token del almacenamiento
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  submitTestRegister(testData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-register`, testData, { headers: this.getHeaders() });
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.apiUrlAuth}/me`, { headers: this.getHeaders() });
  }
}