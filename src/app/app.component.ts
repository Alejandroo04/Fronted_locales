import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LocalesComponent } from './locales/locales.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LocalesComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'LocalAdmin';
  public local: any;

  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    const local = localStorage.getItem('usuarioActual');
    if (local) {
      this.local= JSON.parse(local);
    }else
      throw "Error accediendo al localStorage"
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
