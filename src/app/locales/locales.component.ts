import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { LocalesService } from '../services/locales.service';
import { CategoriaService } from '../services/categoria.service';
import { Local } from './local.model';
import { Categoria } from '../model/categoria.model';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.mode';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './locales.component.html',
  styleUrl: './locales.component.css',
  providers: [LocalesService, CategoriaService, AuthService]
})
export class LocalesComponent implements OnInit {
  public localStorage: any;
  locales: Local[] = []; 
  categorias: Categoria[] = [];
  usuarios: User[] = [];
  estados: any;
  showForm: Boolean = false;
  selectedCategoria: any; 
  public formLocal !: FormGroup;
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
  

  // // Un único constructor que inyecta todas las dependencias necesarias
  constructor(private router: Router, 
    private localService: LocalesService, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private categoriaService: CategoriaService
    ) {}

  ngOnInit() {
    this.formLocal = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      telefono: ['', Validators.required],
      representante: ['', Validators.required],
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required],
      encargado: ['', Validators.required],
      status: ['', Validators.required]
    });

    Swal.fire({
      title: "Cargando información!",
      didOpen: () => {
        Swal.showLoading();
        // Load data when the component initializes
        this.loadData().then(() => {
          Swal.close(); // Close the loading spinner after data is loaded
        });
      },
    });
    const local = localStorage.getItem('usuarioActual');
    if (local) {
      this.localStorage= JSON.parse(local);
    }else
      throw "Error accediendo al localStorage"
  }

  private async loadData(): Promise<void> {
    try {
      // Load your data here
      await this.loadLocales();
      await this.loadCategorias();
      await this.loadUsuarios();
      await this.loadEstados();
    } catch (error) {
      console.error('Error loading data:', error);
      // Handle the error as needed (show an error message, log, etc.)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al cargar la información. Por favor, inténtalo nuevamente.',
      });
    }
  }


  private async loadLocales(): Promise<void> {
    this.localService.getLocales().subscribe((data) =>{
      this.locales = data
    });
  }
  private async loadCategorias(): Promise<void>{
    this.categoriaService.getCategorias().subscribe((data) =>{
      this.categorias = data;
    });
  }
  private async loadUsuarios(): Promise<void>{
    this.authService.getUsuarios().subscribe((data) =>{
      this.usuarios = data;
    });
  }
  private async loadEstados(): Promise<void>{
    this.localService.getEstados().subscribe((data) =>{
      console.log(data);
      this.estados = data;
    });
  }
  
  createLocal(): void {
    if(this.formLocal.valid){
      if(!this.editando){

        const nuevoLocal = this.formLocal.value;
        
        this.localService.createLocal(nuevoLocal).subscribe({
          next: () =>{
            this.loadLocales();
            this.Toast.fire({
              icon: "success",
              title: "Local creado correctamente"
            });
            this.formLocal.reset();
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
      
        const local = this.formLocal.value;
        
          // Implementación para editar un local
        this.localService.updateLocal(local.id, local).subscribe({
          next: () =>{
            this.Toast.fire({
              icon: "success",
              title: "Local actualizado correctamente"
            });
            this.loadLocales();
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
    }
  }

  editLocal(local: Local) {

    this.formLocal.patchValue({
      id: local.id,
      nombre: local.nombre,
      ubicacion: local.ubicacion,
      telefono: local.telefono,
      representante: local.representante_legal.id, 
      categoria: local.categoria_id,
      subcategoria: local.subcategoria_id,
      encargado: local.encargado_id,
      status: local.estado_id
    });
    this.showForm=true
    this.editando = true;
    
  }

  deleteLocal(local: Local) {
    // Implementación para eliminar un local
    this.localService.deleteLocal(local.id).subscribe({
      next: () =>{
        this.Toast.fire({
          icon: "success",
          title: "Local Eliminado correctamente"
        });
        this.loadLocales();
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

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onCategoriaChange() {
    const categoriaId = this.formLocal.get('categoria')?.value;
    if (categoriaId) {
      console.log(categoriaId);
      this.categoriaService.getCategoria(categoriaId).subscribe(data =>{
        this.selectedCategoria = data;
      });
      console.log(this.selectedCategoria);
    } 
  }
}