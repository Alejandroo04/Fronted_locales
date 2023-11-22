import { Injectable } from '@angular/core';
import { env } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.mode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl: string = env.backUrl;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<any[]>(`${this.apiUrl}api/usuarios`, this.getHeaders());
  }

  createUsuario(usuario: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/usuarios`, usuario, this.getHeaders());
  }

  updateUsuario(usuarioId: number, updatedUsuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}api/usuarios/${usuarioId}`, updatedUsuario, this.getHeaders());
  }

  deleteUsuario(usuarioId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}api/usuarios/${usuarioId}`, this.getHeaders());
  }




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
}
