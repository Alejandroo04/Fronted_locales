import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LocalesComponent } from "./locales/locales.component";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app.routes";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LocalesComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ]

})
export class AppModule {}