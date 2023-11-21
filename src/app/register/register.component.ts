import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';
import { Role } from '../model/role.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService, RoleService]
})
export class RegisterComponent implements OnInit{

  public formRegister !: FormGroup;
  roles: Role[] = []; 

  constructor(private router: Router, private formBuilder: FormBuilder, 
              private authService: AuthService, 
              private roleService: RoleService) { }
  
  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.roleService.getRoles().subscribe(data => {
      this.roles = data.filter(rol => rol.id !== 3);
      console.log(this.roles);
    });


  }
  
  onRegister() {
    const {username, password, phone, role, email} = this.formRegister.value;

    this.authService.register(username, password, phone, role, email).subscribe({
      next: () => {
        console.log("registro success");
        this.router.navigateByUrl('/login');
      },
      error: error => {console.log(error);}
    });
  }
}
