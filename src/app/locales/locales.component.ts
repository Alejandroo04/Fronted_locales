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
  

  // // Un único constructor que inyecta todas las dependencias necesarias
  constructor(private router: Router, 
    private localService: LocalesService, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private categoriaService: CategoriaService
    ) {}

  ngOnInit() {
    this.formLocal = this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      telefono: ['', Validators.required],
      representante: ['', Validators.required],
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required],
      encargado: ['', Validators.required],
      status: ['', Validators.required]
    });
    // Cargar locales cuando el componente se inicializa
    this.loadLocales();
    this.loadCategorias();
    this.loadUsuarios();
    this.loadEstados();
    const local = localStorage.getItem('usuarioActual');
    if (local) {
      this.localStorage= JSON.parse(local);
    }else
      throw "Error accediendo al localStorage"
  }


  loadLocales(): void{
    this.localService.getLocales().subscribe((data) =>{
      this.locales = data
    });
  }
  loadCategorias(): void{
    this.categoriaService.getCategorias().subscribe((data) =>{
      this.categorias = data;
    });
  }
  loadUsuarios(): void{
    this.authService.getUsuarios().subscribe((data) =>{
      this.usuarios = data;
    });
  }
  loadEstados(): void{
    this.localService.getEstados().subscribe((data) =>{
      console.log(data);
      this.estados = data;
    });
  }
  
  createLocal(): void {

    if(this.formLocal.valid){
      const nuevoLocal = this.formLocal.value;
      
      this.localService.createLocal(nuevoLocal).subscribe(() =>{
        this.loadLocales();
        this.formLocal.reset();
      });
    
    }
  }

  editLocal(local: Local) {
    // Implementación para editar un local
    this.localService.updateLocal(local.id, local).subscribe(() =>{
      this.loadLocales();
    });
  }

  deleteLocal(local: Local) {
    // Implementación para eliminar un local
    this.localService.deleteLocal(local.id).subscribe(() =>{
      this.loadLocales();
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