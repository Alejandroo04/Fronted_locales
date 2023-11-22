import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


import { User } from '../model/user.mode';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { Role } from '../model/role.model';
import { RoleService } from '../services/role.service';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers:[UsuarioService, RoleService]
})
export class UsuariosComponent implements OnInit {
  public localStorage:any;
  public formUsuario !: FormGroup;
  usuarios: User[] = [];
  roles:Role[] = [];
  showForm: Boolean = false;
  editando: Boolean = false;
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


  constructor(private router: Router, 
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
    ) {}

  ngOnInit(): void {
    const local = localStorage.getItem('usuarioActual');
    if (local)
      this.localStorage= JSON.parse(local);
    else
      throw "Error accediendo al localStorage";

    this.loadUsuarios();

    this.roleService.getRoles().subscribe(data => {
      this.roles = data;
      console.log(this.roles);
    });

    this.formUsuario = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone:  ['', Validators.required],
      email: ['', Validators.required],
      rol_id: ['', Validators.required],
    });
  }

  private async loadUsuarios(): Promise<void>{
    this.usuarioService.getUsuarios().subscribe((data) =>{
      this.usuarios = data;
    });
  }
  
  createUsuario(): void {
    if(this.formUsuario.valid){
      if(!this.editando){

        const nuevoUsuario = this.formUsuario.value;
        
        this.usuarioService.createUsuario(nuevoUsuario).subscribe({
          next: () =>{
            this.Toast.fire({
              icon: "success",
              title: "Usuario creado correctamente"
            });
            this.formUsuario.reset();
          }, error: error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
          }
        });
      
      }else{
      
        const usuario = this.formUsuario.value;
        
          // Implementación para editar un local
        this.usuarioService.updateUsuario(usuario.id, usuario).subscribe({
          next: () =>{
            this.Toast.fire({
              icon: "success",
              title: "Usuarios actualizado correctamente"
            });
            this.loadUsuarios();
          },error: error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
          }
        });
        this.editando = false;
      }
      this.loadUsuarios();
    }
  }

  editUsuario(usuario: User) {
    this.formUsuario.patchValue({
      id: usuario.id,
      name: usuario.name,
      last_name: usuario.last_name,
      phone: usuario.phone,
      email: usuario.email, 
      rol_id: usuario.rol_id
    });
    this.showForm=true
    this.editando = true;
  }

  deleteUsuario(usuario: User) {
    // Implementación para eliminar un local
    this.usuarioService.deleteUsuario(usuario.id).subscribe({
      next: () =>{
        this.Toast.fire({
          icon: "success",
          title: "Usuario Eliminado correctamente"
        });
        this.loadUsuarios();
      },error: error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    });
  }




}
