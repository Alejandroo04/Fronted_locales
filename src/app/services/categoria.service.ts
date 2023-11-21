import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.model';
import { env } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl: string = env.backUrl; // Reemplaza con la URL de tu API
  
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


  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}api/categorias`, this.getHeaders());
  }
  getCategoria(id:number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}api/categorias/${id}`, this.getHeaders());
  }
}