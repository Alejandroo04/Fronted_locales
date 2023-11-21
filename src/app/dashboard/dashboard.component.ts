import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.mode';

import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [AuthService]
})
export class DashboardComponent implements OnInit{
  public local: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const local = localStorage.getItem('usuarioActual');
    if (local) {
      this.local= JSON.parse(local);
    }else
      throw "Error accediendo al localStorage"
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
