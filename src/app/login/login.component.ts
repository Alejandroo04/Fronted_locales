import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

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
  private  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  submit(){
    const {email, password} = this.formLogin.value;

    if(this.formLogin.valid){
      this.authService.login(email, password).subscribe({
        next: () => {
          this.Toast.fire({
            icon: "success",
            title: "Has iniciado sesión correctamente"
          });
        
          this.router.navigateByUrl('/dashboard')
        },
        error: error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡Credenciales invalidas!. Por favor, inténtalo nuevamente.',
          });
        }
      });
    }
  }

  navigateToRegister(){
    this.router.navigateByUrl('/register');
  }
}
