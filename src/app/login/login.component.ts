import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent implements OnInit{
  public formLogin !: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  submit(){
    const {user, password} = this.formLogin.value;

    if(this.formLogin.valid){
      this.authService.login(user, password).subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: error => {console.log(error);}
      });
    }
  }

  navigateToRegister(){
    this.router.navigateByUrl('/register');
  }
}
