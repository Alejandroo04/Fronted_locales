import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../env';


@Injectable({
  providedIn: 'root',
})
export class LocalesService {
  private apiUrl: string = env.backUrl; 

  constructor(private http: HttpClient) {}

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

  getLocales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}api/locales`, this.getHeaders());
  }
  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}api/estados`, this.getHeaders());
  }

  createLocal(local: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/locales`, local, this.getHeaders());
  }

  updateLocal(localId: number, updatedLocal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}api/locales/${localId}`, updatedLocal, this.getHeaders());
  }

  deleteLocal(localId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}api/locales/${localId}`, this.getHeaders());
  }
}