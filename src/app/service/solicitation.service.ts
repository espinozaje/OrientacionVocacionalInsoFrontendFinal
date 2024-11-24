import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Adviser, Solicitation, StudentDTO } from '../authentication/models/question.model';
@Injectable({
  providedIn: 'root'
})
export class SolicitationService {
private baseUrl = `${environment.apiUrl}api/v1/solicitations`
  constructor(private http: HttpClient) { }


  sendSolicitation(studentId: number, adviserId: number): Observable<void> {
    const params = new HttpParams()
      .set('studentId', studentId.toString())
      .set('adviserId', adviserId.toString());
  
    return this.http.post<void>(`${this.baseUrl}/send`, null, { params });
  }

  getSolicitationStatus(studentId: number, adviserId: number): Observable<{ status: string }> {
    const params = new HttpParams()
      .set('studentId', studentId.toString())
      .set('adviserId', adviserId.toString());
  
    return this.http.get<{ status: string }>(`${this.baseUrl}/solicitation-status`, { params });
  }

  getSolicitationsForAdviser(adviserId: number): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>(`${this.baseUrl}/adviser/${adviserId}`);
  }

  respondToSolicitation(solicitationId: number, status: 'ACCEPTED' | 'REJECTED'): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${solicitationId}/respond?status=${status}`,
      {}
    );
  }

  getAcceptedStudents(adviserId: number): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.baseUrl}/accepted-students?adviserId=${adviserId}`);
  }
  
  getAcceptedAdvisers(studentId: number): Observable<Adviser[]> {
    return this.http.get<Adviser[]>(`${this.baseUrl}/accepted-advisers?studentId=${studentId}`);
  }
}
