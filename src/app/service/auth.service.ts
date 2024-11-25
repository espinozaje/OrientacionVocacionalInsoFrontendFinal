import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Adviser, FileResponse, User} from '../authentication/models/question.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}api/v1/auth`; 
  private tokenKey = 'authToken';
  private apiUrlStudent = `${environment.apiUrl}api/v1/students`;
  private apiUrlAsesor = `${environment.apiUrl}api/v1/adviser`; 
  constructor(private http: HttpClient, private router: Router) { }

  cancelPlan(studentId: number): Observable<any> {
    const token = localStorage.getItem(this.tokenKey); // O el lugar donde almacenas el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.put(`${this.apiUrlStudent}/${studentId}/cancel-plan`, {}, { headers });
  }
  
  registerStudent(requestBody: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerStudent`, requestBody).pipe(
      catchError(this.handleError)
    );
  }


  registerAdviser(requestBody: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerAdviser`, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  getAdvisorById(id: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get(`${this.apiUrlAsesor}/getAdviser/${id}`, { headers });
  }

  getStudentById(id: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrlStudent}/getStudent/${id}`, { headers });
  }


  resendVerificationCode(email: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email);
    return this.http.post<any>(`${this.apiUrlStudent}/resend-verification-code`,{}, { params });
  }


  verifyStudentCode(email: string, verificationCode: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('verificationCode', verificationCode);
  
    return this.http.post(`${this.apiUrlStudent}/verify`, {}, { params }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud de verificación:', error);
        return throwError(error);
      })
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      console.error(`Error del backend: ${error.status}, ` + `mensaje: ${error.error}`);
    }
    return throwError('Hubo un problema con el registro; por favor intenta nuevamente.');
  }
  


  forgotPassword(email: string) {
    const body = new HttpParams().set('email', email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`${this.apiUrl}/forgot-password`, body.toString(), { headers })
        .pipe(
            map((response: any) => {
              
                return response;
            }),
            catchError((error: any) => {
               
                console.error('Error en forgotPassword:', error);
                return throwError(() => new Error(error.error?.error || 'Hubo un error al enviar el correo. Verifique el correo que sea válido'));
            })
        );
}

resetPassword(token: string, newPassword: string) {
  const body = new HttpParams()
      .set('token', token)
      .set('newPassword', newPassword);

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  return this.http.post(`${this.apiUrl}/reset-password`, body.toString(), { headers })
      .pipe(map((response: any) => response));
}

obtenerPerfil() {
  const token = localStorage.getItem(this.tokenKey);
   // Obtiene el token
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` // Añade el token en el header
  });

  return this.http.get<Adviser>(`${this.apiUrlAsesor}/profile`, { headers });
}


login(email: string, password: string, callback: (token: string) => void):  Observable<any> {
  const params = new HttpParams()
    .set('email', email)
    .set('password', password);

  return this.http.post<any>(`${this.apiUrl}/login`, null, { params }).pipe(
    tap(response => {
 
      if (response.token) {
        this.setToken(response.token);

        // Obtener el rol del usuario desde el token
        const userRole = this.getRoleFromToken();

        if (userRole === 'ADVISER') {
         
          if (response.requiresPasswordChange) {
           
            this.router.navigate(['/dashboard/change-password']);
          } else {
            
            this.router.navigate(['/dashboard/advisor']);
          }
        } else if (userRole === 'ADMIN') {
         
          if (response.requiresPasswordChange) {
           
            this.router.navigate(['/dashboard-admin/change-password']);
          } else {
            
            this.router.navigate(['/dashboard-admin/register-advisor']);
          }
        }
         else if (userRole === 'STUDENT') {
          
          this.router.navigate(['/dashboard-student']);
        } else {
          console.error('Rol de usuario no reconocido');
        }
      }
    })
  );
}
changePassword(email: string, newPassword: string): Observable<any> {
  const params = new HttpParams()
    .set('email', email)
    .set('newPassword', newPassword);

  return this.http.post<any>(`${this.apiUrl}/change-password`, null, { params });
}

changePasswordAdmin(email: string, newPassword: string): Observable<any> {
  const params = new HttpParams()
    .set('email', email)
    .set('newPassword', newPassword);

  return this.http.post<any>(`${this.apiUrl}/change-password-admin`, null, { params });
}

getRoleFromToken(): string | null {
  const token = localStorage.getItem('authToken');
  if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
  }
  return null;
}

getPlanFromToken(): string | null {
  const token = localStorage.getItem('authToken');
  if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
     
      return payload.plan || null;
  }
  return null;
}

getEmailFromToken(): string | null {
  const token = localStorage.getItem('authToken');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || null;  // Aquí obtenemos el email del payload
  }
  return null;
}


private setToken(token:string):void{
  localStorage.setItem(this.tokenKey, token);
}

private getToken(): string | null{
  if(typeof window!== 'undefined'){
    return localStorage.getItem(this.tokenKey);
  }else{
    return null;
  }
}


isAuthenticated(): boolean{
  const token = this.getToken();
  if(!token){
    return false;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp * 1000;
  return Date.now() < exp;
}

logout(): void{
  localStorage.removeItem(this.tokenKey);
  this.router.navigate(['/login']);
}

getUserInfo(): Observable<Adviser> {
  const token = this.getToken();  // Obtiene el token del localStorage
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  return this.http.get<Adviser>(`${this.apiUrl}/me`, { headers }).pipe(
    map((response: Adviser) => {
      // Aquí modificas la URL de la imagen del perfil
      if (response.img_profile) {
        // Asegúrate de construir la URL completa de la imagen
        response.img_profile = `${environment.apiUrl}api/v1/auth/${response.img_profile}`;
      }
      return response;  // Devuelves el objeto modificado
    })
  );
}



    
updateUserProfile(userData: any): Observable<User> {
  const token = this.getToken(); // Obtiene el token del localStorage
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.put<User>(`${this.apiUrl}/update`, userData, { headers });
}

// Actualizar la foto de perfil del usuario
updateUserProfileImage(file: FormData): Observable<FileResponse> {
  const token = this.getToken(); // Obtiene el token del localStorage
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put<FileResponse>(`${this.apiUrl}/update-image`, file, {headers});
}


getUserId(): number | null {
  const token = localStorage.getItem(this.tokenKey);
  if (!token) {
    return null; // No hay token almacenado
  }

  try {
    // Dividimos el token JWT en sus tres partes: header, payload, signature
      const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || null; // Devuelve el userId si existe, o null
  } catch (error) {
    console.error('Error al decodificar el token JWT:', error);
    return null;
  }
}

}
