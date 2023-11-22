import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Importa DashboardComponent
import { LocalesComponent } from './locales/locales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirige a 'dashboard'
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },// Ruta para DashboardComponent
  { path: 'locales', component: LocalesComponent }, 
  { path: 'usuarios', component: UsuariosComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
