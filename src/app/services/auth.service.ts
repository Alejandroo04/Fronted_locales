import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { env } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = env.backUrl; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  getHeaders() {
    const usuario = localStorage.getItem('usuarioActual');
    if (usuario){
        const user= JSON.parse(usuario);
        const token = user.token;
        const headers= new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
        const options = { headers }
        return options;
    }else
        throw "Error accediendo al localStorage";
  }

  register(user: string, password: string, phone: number, role:string, email: string): Observable<any> {

    return this.http.post(`${this.apiUrl}register`, { user, password, phone, role, email});
  }

  login(email: string, password: string): Observable<any> {

    return this.http.post(`${this.apiUrl}login`, {email, password}, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => { 
        localStorage.setItem('usuarioActual', JSON.stringify({
          'token': response.body?.access_token,
          'user_id': response.body?.user_id,
          'roles': response.body?.roles
        }));
        console.log(response.body);
        return response;
      })
    );
  }

  getRole(): string {
    const local = localStorage.getItem('usuarioActual')
    if (local) {
      const user= JSON.parse(local);
      const roles = user.role;
      return roles;
    }else
      throw "errror accediendo al localStorage"
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}api/usuarios`, this.getHeaders());
  }

  logout() {
    localStorage.clear();
  }

}
