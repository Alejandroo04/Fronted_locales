import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit{

  public formRegister !: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }
  
  ngOnInit(): void {

    this.formRegister = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  
  onRegister() {
    const {user, password, phone, role} = this.formRegister.value;

    this.authService.register(user, password, phone, role).subscribe({
      next: () => {
        console.log("registro success");
        this.router.navigateByUrl('/login');
      },
      error: error => {console.log(error);}
    });
  }
}
