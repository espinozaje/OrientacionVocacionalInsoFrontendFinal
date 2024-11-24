import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Adviser, AdvisoryDTO, StudentDTO } from '../authentication/models/question.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdvisoryService {
  private apiUrl = `${environment.apiUrl}api/v1`; // URL de tu backend

  constructor(private http: HttpClient) {}

  createAdvisory(advisory: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/advisories/create`, advisory);
  }

  getAdvisers(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/adviser/listAdvisors`, { headers }).pipe(
      map ((advisers : Adviser[])=>{
        return advisers.map(adviser => {
          // Agregar la URL base a la imagen de perfil
          adviser.img_profile = `${environment.apiUrl}api/v1/auth/${adviser.img_profile}`;
          return adviser;

      });
  })
);

  }

  getStudents(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/students/listStudents`, { headers }).pipe(
      map ((students : StudentDTO[])=>{
        return students.map(student => {
          
          student.img_profile = `${environment.apiUrl}api/v1/auth/${student.img_profile}`;
          return student;

      });
  })
);
  }

  getAdvisoriesByUserId(userId: number): Observable<AdvisoryDTO[]> {
    return this.http.get<AdvisoryDTO[]>(`${this.apiUrl}/advisories/user/${userId}`);
  }

  updateAdvisory(advisory: AdvisoryDTO): Observable<AdvisoryDTO> {
    return this.http.put<AdvisoryDTO>(`${this.apiUrl}/advisories/update`, advisory);
  }

  deleteAdvisory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/advisories/delete?advisoryId=${id}`);
  }
}
