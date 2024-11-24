import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career, Location } from '../authentication/models/question.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private carrerasUrl = `${environment.apiUrl}api/v1/career`; 

  constructor(private http: HttpClient) { }

  getCareersByLocation(locationId: string): Observable<Career[]> {
    return this.http.get<Career[]>(`${this.carrerasUrl}/byLocation/${locationId}`);
  }
  getCarreraById(carreraId: string): Observable<any> {
    return this.http.get<any>(`${this.carrerasUrl}/CareersByID/${carreraId}`);
  }
  getUbicaciones(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.carrerasUrl}/showLocations`);
  }


  getCarreras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.carrerasUrl}/showCareers`);
  }

  // Método para obtener una carrera por su ID
  
}
