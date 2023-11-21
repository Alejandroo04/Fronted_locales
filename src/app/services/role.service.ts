import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/role.model';
import { env } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl: string = env.backUrl; // Reemplaza con la URL de tu API
  

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}api/roles`,);
  }
}