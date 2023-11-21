import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { LocalesService } from '../services/locales.service';
import { CategoriaService } from '../services/categoria.service';
import { Local } from './local.model';
import { Categoria } from '../model/categoria.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './locales.component.html',
  styleUrl: './locales.component.css',
  providers: [LocalesService, CategoriaService]
})
export class LocalesComponent implements OnInit {
  locales: Local[] = []; 
  categorias: Categoria[] = [];
  showForm: Boolean = false;
  public formLocal !: FormGroup;

  // // Un único constructor que inyecta todas las dependencias necesarias
  constructor(private router: Router, 
    private localService: LocalesService, 
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
    ) {}

  ngOnInit() {
    this.formLocal = this.formBuilder.group({
      nombreNegocio: ['', Validators.required],
      ubicacion: ['', Validators.required],
      telefono: ['', Validators.required],
      representanteLegal: ['', Validators.required],
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required]
    });
    // Cargar locales cuando el componente se inicializa
    this.loadLocales();
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
}