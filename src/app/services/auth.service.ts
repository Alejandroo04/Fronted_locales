import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://tuapi.com/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  register(user: string, password: string, phone: number, role:string): Observable<any> {

    return this.http.post(`${this.apiUrl}/register`, {user, password, phone, role});
  }

  login(user: string, password: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/login`, {user, password}, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => { 
        localStorage.setItem('usuarioActual', JSON.stringify({
          'token': response.body?.token,
          'userId': response.body?.id,
          'role': response.body?.role
        }));
        console.log(response);
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
}
