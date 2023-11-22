import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.mode';

import { HttpClientModule } from '@angular/common/http';
import { LocalesComponent } from '../locales/locales.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LocalesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [AuthService]
})
export class DashboardComponent implements OnInit{
  public local: any;
  locales?: number;
  usuarios?: number;



  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const local = localStorage.getItem('usuarioActual');
    if (local) {
      this.local= JSON.parse(local);
    }else
      throw "Error accediendo al localStorage"
  }
}
