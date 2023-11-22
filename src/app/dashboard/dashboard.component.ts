import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.mode';

import { HttpClientModule } from '@angular/common/http';
import { LocalesComponent } from '../locales/locales.component';
import { UsuarioService } from '../services/usuario.service';
import { Local } from '../locales/local.model';
import { LocalesService } from '../services/locales.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LocalesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [AuthService, UsuarioService, LocalesService]
})
export class DashboardComponent implements OnInit{
  public local: any;
  locales: Local[] = []; 
  usuarios: User[] = [];




  constructor(private router: Router, private authService: AuthService,
    private usuarioService: UsuarioService,
    private localService: LocalesService, 
    ) { }

  ngOnInit(): void {
    const local = localStorage.getItem('usuarioActual');
    if (local) {
      this.local= JSON.parse(local);
    }else
      throw "Error accediendo al localStorage"

    this.loadLocales();
    this.loadUsuarios();
  }

  private async loadLocales(): Promise<void> {
    this.localService.getLocales().subscribe((data) =>{
      this.locales = data
    });
  }
  private async loadUsuarios(): Promise<void>{
    this.usuarioService.getUsuarios().subscribe((data) =>{
      this.usuarios = data;
    });
  }
}
