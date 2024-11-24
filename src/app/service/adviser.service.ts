import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Availability } from '../authentication/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class AdviserService {
  private baseUrl = `${environment.apiUrl}api/v1/availability`

  constructor(private http: HttpClient) { }

  getAvailability(adviserId: number): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.baseUrl}/${adviserId}`);
  }

  // Actualizar disponibilidad del asesor
  updateAvailability(adviserId: number, availability: Availability[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${adviserId}`, availability);
  }

  deleteAvailability(adviserId: number, dayOfWeek: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${adviserId}/${dayOfWeek}`);
  }


  addAvailability(
    adviserId: number,
    availability: { dayOfWeek: string; startTime: string; endTime: string }
  ): Observable<Availability> {
    return this.http.post<Availability>(`${this.baseUrl}/${adviserId}`, availability).pipe(
      catchError((error: HttpErrorResponse) => {
        // Pasar el mensaje de error al componente
        return throwError(() => error);
      })
    );
  }
}
